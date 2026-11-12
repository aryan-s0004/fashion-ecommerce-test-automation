import { spawn, spawnSync } from 'node:child_process';
import { copyFile, cp, mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'node_modules', '@playwright', 'test', 'cli.js');
const viteCli = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
if (!existsSync(cli) || !existsSync(viteCli)) {
  console.error('Project dependencies are missing. Run npm install first.');
  process.exit(1);
}

const isWindows = process.platform === 'win32';
const browserLocations = isWindows
  ? [
      ['chrome', ['Google\\Chrome\\Application\\chrome.exe']],
      ['edge', ['Microsoft\\Edge\\Application\\msedge.exe', 'Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'Program Files\\Microsoft\\Edge\\Application\\msedge.exe']],
    ]
  : [
      ['chrome', ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable']],
      ['edge', ['/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/usr/bin/microsoft-edge']],
    ];
const installRoots = isWindows
  ? [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.ProgramW6432].filter(Boolean)
  : [''];
const browsers = new Map();
for (const [name, paths] of browserLocations) {
  const executable = paths.flatMap(p => installRoots.map(r => path.join(r, p))).find(existsSync);
  if (!executable) {
    console.error(`${name === 'chrome' ? 'Google Chrome' : 'Microsoft Edge'} was not detected. Install it to run the visible demonstration.`);
    process.exitCode = 1;
  } else browsers.set(name, executable);
}
if (process.exitCode) process.exit(process.exitCode);
const ffmpegPath = findFfmpeg();
if (!ffmpegPath) {
  console.error('Playwright FFmpeg was not detected. Install it with `npx playwright install ffmpeg` before running the demo.');
  process.exit(1);
}

const baseURL = 'http://127.0.0.1:4173';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const waitForServer = async (timeoutMs = 30000) => {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return true;
    } catch {}
    await delay(250);
  }
  return false;
};

let server = null;
let ownsServer = false;
if (!(await waitForServer(500))) {
  server = spawn(process.execPath, [viteCli, '--configLoader', 'native', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  ownsServer = true;
  server.stdout.on('data', data => process.stdout.write(`[Vite] ${data}`));
  server.stderr.on('data', data => process.stderr.write(`[Vite] ${data}`));
  server.on('error', error => console.error('Vite server error:', error));
  if (!(await waitForServer())) {
    server.kill();
    throw new Error(`Vite server did not become ready at ${baseURL}`);
  }
}
console.log(`Myntra site ready at ${baseURL}`);

async function runPlaywright(args, env) {
  return await new Promise(resolve => {
    const child = spawn(process.execPath, [cli, 'test', ...args], { cwd: root, env: { ...process.env, ...env }, stdio: 'inherit', windowsHide: true });
    child.on('error', error => { console.error('Playwright runner error:', error); resolve(1); });
    child.on('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
  });
}

async function listFiles(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(full));
    else files.push(full);
  }
  return files;
}

function findFfmpeg() {
  const browserRoot = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(process.env.LOCALAPPDATA || '', 'ms-playwright');
  if (!existsSync(browserRoot)) return null;
  const executable = isWindows ? 'ffmpeg-win64.exe' : 'ffmpeg-linux';
  const folder = readdirSync(browserRoot)
    .filter(name => name.startsWith('ffmpeg-') && existsSync(path.join(browserRoot, name, executable)))
    .sort((a, b) => Number(b.slice('ffmpeg-'.length)) - Number(a.slice('ffmpeg-'.length)))[0];
  return folder ? path.join(browserRoot, folder, executable) : null;
}

const demoReports = {};
let exitCode = 0;
try {
  for (const browser of ['chrome', 'edge']) {
    const label = browser === 'chrome' ? 'Google Chrome' : 'Microsoft Edge';
    const reportDir = `test-results/demo-html-reports/${browser}`;
    const jsonPath = `test-results/demo-results-${browser}.json`;
    const outputDir = `test-results/demo-artifacts/${browser}`;
    console.log(`\n========== ${label}: one visible launch, one page, 28 sequential scenarios ==========`);
    const result = await runPlaywright(['tests/demo/myntra-full-demo.spec.ts', `--project=${browser}`], {
      DEMO: '1', DEMO_PROJECT: browser, DEMO_SERVER_EXTERNAL: '1',
      REPORT_DIR: reportDir, JSON_PATH: jsonPath, OUTPUT_DIR: outputDir,
    });
    if (result !== 0) exitCode = result;

    const jsonFile = path.join(root, jsonPath);
    if (existsSync(jsonFile)) {
      const report = JSON.parse(await readFile(jsonFile, 'utf8'));
      const stats = report.stats || {};
      demoReports[browser] = { project: label, browserLaunches: 1, mainPages: 1, scenarios: 28, passedTests: stats.expected ?? 0, failedTests: stats.unexpected ?? 0, skippedTests: stats.skipped ?? 0, durationMs: stats.duration ?? 0, htmlReport: `playwright-report/demo-${browser}/index.html` };
      console.log(`${label} demo report: ${demoReports[browser].passedTests} demo test passed, ${demoReports[browser].failedTests} failed.`);
    }

    const videoFiles = (await listFiles(path.join(root, outputDir))).filter(file => file.toLowerCase().endsWith('.webm'));
    if (videoFiles.length) {
      const videoDir = path.join(root, 'test-results', 'demo-videos');
      await mkdir(videoDir, { recursive: true });
      const destination = path.join(videoDir, `myntra-full-demo-${browser}.webm`);
      await copyFile(videoFiles[0], destination);
      const videoInfo = await stat(destination);
      const validationFrame = path.join(videoDir, `.${browser}-video-validation.png`);
      const validation = spawnSync(ffmpegPath, ['-v', 'error', '-i', destination, '-frames:v', '1', '-y', validationFrame], { encoding: 'utf8' });
      const playable = validation.status === 0 && existsSync(validationFrame) && (await stat(validationFrame)).size > 0;
      await unlink(validationFrame).catch(() => undefined);
      if (demoReports[browser]) {
        demoReports[browser].video = path.relative(root, destination).replaceAll('\\', '/');
        demoReports[browser].videoBytes = videoInfo.size;
        demoReports[browser].videoValidated = playable;
      }
      console.log(`${label} complete video: ${destination} (${videoInfo.size} bytes; ${playable ? 'validated' : 'not validated'}).`);
      if (!playable) exitCode = exitCode || 1;
    } else {
      console.error(`${label} demo did not produce a video.`);
      exitCode = exitCode || 1;
    }
  }

  console.log('\n========== Full isolated regression validation (headless) ==========');
  console.log('Running the complete existing regression suite in Chrome and Edge with one worker.');
  const regressionCode = await runPlaywright(['--project=chrome', '--project=edge'], {
    DEMO: '0', DEMO_PROJECT: '', DEMO_SERVER_EXTERNAL: '1',
    REPORT_DIR: 'playwright-report', JSON_PATH: 'test-results/results.json', OUTPUT_DIR: 'test-results/regression-artifacts',
  });
  if (regressionCode !== 0) exitCode = regressionCode;
  const regressionFile = path.join(root, 'test-results', 'results.json');
  const regression = existsSync(regressionFile) ? JSON.parse(await readFile(regressionFile, 'utf8')) : null;
  for (const browser of ['chrome', 'edge']) {
    const source = path.join(root, 'test-results', 'demo-html-reports', browser);
    const destination = path.join(root, 'playwright-report', `demo-${browser}`);
    if (existsSync(path.join(source, 'index.html'))) await cp(source, destination, { recursive: true, force: true });
  }
  const summary = {
    title: 'Myntra — Automated Regression Testing',
    visibleDemo: demoReports,
    regression: regression?.stats || null,
    totalVisibleDemoScenarios: Object.keys(demoReports).length * 28,
    regressionBrowsers: ['chrome', 'edge'],
    videoDirectory: 'test-results/demo-videos/',
    htmlReport: 'playwright-report/index.html',
  };
  await mkdir(path.join(root, 'test-results'), { recursive: true });
  await writeFile(path.join(root, 'test-results', 'demo-summary.json'), JSON.stringify(summary, null, 2));
  const stats = regression?.stats || {};
  console.log('\n========== FINAL DEMONSTRATION SUMMARY ==========');
  console.log(`Visible demo: Chrome 1 browser launch / 1 main tab / 28 scenarios; Edge 1 browser launch / 1 main tab / 28 scenarios.`);
  console.log(`Regression results: ${stats.expected ?? 0} passed, ${stats.unexpected ?? 0} failed, ${stats.skipped ?? 0} skipped.`);
  console.log('Demo videos: test-results/demo-videos/myntra-full-demo-chrome.webm and myntra-full-demo-edge.webm');
  console.log('Demo HTML reports: playwright-report/demo-chrome/index.html and playwright-report/demo-edge/index.html');
  console.log('Regression HTML report: playwright-report/index.html; JSON summary: test-results/demo-summary.json');
} finally {
  if (ownsServer && server && server.exitCode === null) {
    server.kill('SIGTERM');
    await Promise.race([new Promise(resolve => server.once('exit', resolve)), delay(5000)]);
    if (server.exitCode === null) server.kill('SIGKILL');
  }
}
process.exitCode = exitCode;
