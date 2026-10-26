import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const reportPath = resolve(process.argv[2] ?? 'reports/results.json');
const report = JSON.parse(await readFile(reportPath, 'utf8'));

const projects = new Map();
let total = 0;
let passed = 0;
let failed = 0;
let skipped = 0;
let flaky = 0;
let retried = 0;

function visit(suite) {
  for (const child of suite.suites ?? []) {
    visit(child);
  }

  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      total += 1;
      const name = test.projectName ?? 'unknown';
      const counts = projects.get(name) ?? { passed: 0, failed: 0, skipped: 0, flaky: 0 };
      const attempts = test.results ?? [];
      const status = test.status ?? attempts.at(-1)?.status;

      if (status === 'expected' || status === 'passed') {
        passed += 1;
        counts.passed += 1;
      } else if (status === 'skipped') {
        skipped += 1;
        counts.skipped += 1;
      } else if (status === 'flaky') {
        flaky += 1;
        counts.flaky += 1;
      } else {
        failed += 1;
        counts.failed += 1;
      }

      if (attempts.length > 1) {
        retried += attempts.length - 1;
      }
      projects.set(name, counts);
    }
  }
}

for (const suite of report.suites ?? []) {
  visit(suite);
}

const stats = report.stats ?? {};
const execution = {
  source: reportPath,
  startedAt: stats.startTime ?? null,
  durationSeconds: Number.isFinite(stats.duration) ? Number((stats.duration / 1000).toFixed(2)) : null,
  total,
  passed,
  failed,
  skipped,
  flaky,
  retries: retried,
  projects: Object.fromEntries(projects)
};

console.log(JSON.stringify(execution, null, 2));
