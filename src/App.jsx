import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ArrowRight,
  Star,
  Check,
  Trash2,
  Minus,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import products from "./products.json";
const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
const read = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) || d;
  } catch {
    return d;
  }
};
export default function App() {
  const [page, setPage] = useState(location.hash.slice(1) || "home"),
    [category, setCategory] = useState("All"),
    [query, setQuery] = useState(""),
    [search, setSearch] = useState(""),
    [sort, setSort] = useState("featured"),
    [maxPrice, setMaxPrice] = useState(10000),
    [selected, setSelected] = useState(products[0]),
    [size, setSize] = useState(""),
    [cart, setCart] = useState(() => read("myntra-cart", [])),
    [wish, setWish] = useState(() => read("myntra-wishlist", [])),
    [user, setUser] = useState(() => read("myntra-user", null)),
    [toast, setToast] = useState(""),
    [ordered, setOrdered] = useState(false),
    [filterType, setFilterType] = useState("All"),
    [filterBrand, setFilterBrand] = useState("All"),
    [minRating, setMinRating] = useState(0),
    [minDiscount, setMinDiscount] = useState(0),
    [registering, setRegistering] = useState(false),
    [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(
    () => localStorage.setItem("myntra-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("myntra-wishlist", JSON.stringify(wish)),
    [wish],
  );
  useEffect(() => {
    const f = () => setPage(location.hash.slice(1) || "home");
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    if (toast) {
      let t = setTimeout(() => setToast(""), 2400);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const go = (p) => {
    setPage(p);
    location.hash = p;
    window.scrollTo(0, 0);
  };
  const notify = (s) => setToast(s);
  const toggleWish = (p) => {
    setWish((w) =>
      w.some((x) => x.id === p.id) ? w.filter((x) => x.id !== p.id) : [...w, p],
    );
    notify(
      wish.some((x) => x.id === p.id)
        ? "Removed from wishlist"
        : "Added to wishlist",
    );
  };
  const add = (p) => {
    if (!size) {
      notify("Please select a size");
      return;
    }
    setCart((c) => {
      let x = c.find((i) => i.id === p.id && i.size === size);
      return x
        ? c.map((i) =>
            i.id === p.id && i.size === size ? { ...i, qty: i.qty + 1 } : i,
          )
        : [...c, { ...p, size, qty: 1 }];
    });
    notify("Added to bag");
    go("cart");
  };
  const displayed = useMemo(() => {
    let a = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.price <= maxPrice &&
        (filterType === "All" || p.type === filterType) &&
        (filterBrand === "All" || p.brand === filterBrand) &&
        (p.rating || 0) >= minRating &&
        Math.round((1 - p.price / p.mrp) * 100) >= minDiscount &&
        (!search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())),
    );
    if (sort === "price-low") a.sort((x, y) => x.price - y.price);
    if (sort === "price-high") a.sort((x, y) => y.price - x.price);
    if (sort === "name") a.sort((x, y) => x.name.localeCompare(y.name));
    if (sort === "rating") a.sort((x, y) => (y.rating || 0) - (x.rating || 0));
    if (sort === "discount") a.sort((x, y) => (y.mrp - y.price) - (x.mrp - x.price));
    return a;
  }, [category, maxPrice, filterType, filterBrand, minRating, minDiscount, search, sort]);
  const total = cart.reduce((n, i) => n + i.price * i.qty, 0),
    count = cart.reduce((n, i) => n + i.qty, 0);
  const startSearch = (e) => {
    e?.preventDefault();
    setSearch(query.trim());
    setCategory("All");
    setFilterType("All");
    go("search");
  };
  const card = (p) => (
    <article className="card" key={p.id} data-rating={p.rating || 0} data-discount={Math.round((1 - p.price / p.mrp) * 100)}>
      <div
        className="photo"
        onClick={() => {
          setSelected(p);
          setSize("");
          go("product");
        }}
      >
        <img
          src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=650&q=80`}
          alt={p.name}
        />
        {p.badge && <span className="badge">{p.badge}</span>}
        <button
          className={
            "heart " + (wish.some((x) => x.id === p.id) ? "active" : "")
          }
          aria-label={`Add ${p.name} to wishlist`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWish(p);
          }}
        >
          <Heart
            size={18}
            fill={wish.some((x) => x.id === p.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div
        className="card-info"
        onClick={() => {
          setSelected(p);
          setSize("");
          go("product");
        }}
      >
        <small>{p.brand}</small>
        <h3>{p.name}</h3>
        <strong>{money(p.price)}</strong> <del>{money(p.mrp)}</del>{" "}
        <em>{Math.round((1 - p.price / p.mrp) * 100)}% off</em>
      </div>
    </article>
  );
  const grid = (items = displayed) => (
    <div className="grid">
      {items.length ? (
        items.map(card)
      ) : (
        <div className="empty">No pieces found. Try another search.</div>
      )}
    </div>
  );
  return (
    <>
      <header className="header">
        <a className="logo" href="#home" onClick={() => go("home")} aria-label="Myntra home">
          <span className="logo-word">Myntra</span>
        </a>
        <nav className="mainnav" aria-label="Shop categories">
          {["Men", "Women", "Kids", "Accessories"].map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setFilterType("All");
                go("category");
              }}
            >
              {c}
            </button>
          ))}
        </nav>
        <form className="searchbar" onSubmit={startSearch}>
          <Search size={18} />
          <input
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            list="suggestions"
          />
          <datalist id="suggestions">
            {products
              .filter(
                (p) =>
                  query && p.name.toLowerCase().includes(query.toLowerCase()),
              )
              .slice(0, 5)
              .map((p) => (
                <option key={p.id} value={p.name} />
              ))}
          </datalist>
          <button aria-label="Submit search">
            <Search size={18} />
          </button>
        </form>
        <div className="head-actions">
          <button onClick={() => go("login")} aria-label="Profile">
            <User />
            <span>{user?.name || "Profile"}</span>
          </button>
          <button onClick={() => go("wishlist")} aria-label="Wishlist">
            <Heart />
            <span>Wishlist</span>
            {wish.length > 0 && <b>{wish.length}</b>}
          </button>
          <button onClick={() => go("cart")} aria-label="Shopping bag">
            <ShoppingBag />
            <span>Bag</span>
            {count > 0 && <b>{count}</b>}
          </button>
        </div>
        <button
          className="mobile-menu"
          aria-label="Open categories"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Menu />
        </button>
      </header>
      {mobileMenuOpen && (
        <nav className="mobile-category-menu" aria-label="Mobile categories">
          {["Men", "Women", "Kids", "Accessories"].map((name) => (
            <button key={name} onClick={() => {
              setCategory(name);
              setFilterType("All");
              setMobileMenuOpen(false);
              go("category");
            }}>{name}</button>
          ))}
        </nav>
      )}
      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">THE EVERYDAY EDIT · 2026</p>
                <h1>
                  Wear your
                  <br />
                  <i>own story.</i>
                </h1>
                <p>Thoughtful pieces for all the places life takes you.</p>
                <button
                  className="dark-btn"
                  onClick={() => {
                    setCategory("All");
                    go("category");
                  }}
                >
                  Explore the collection <ArrowRight size={17} />
                </button>
              </div>
              <div className="hero-image">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1250&q=85"
                  alt="Friends wearing contemporary fashion"
                />
                <div className="hero-tag">New season, new perspective</div>
              </div>
            </section>
            <section className="ticker">
              GOOD THINGS, MADE TO GO PLACES <span>✳</span> FREE SHIPPING OVER
              ₹1,999 <span>✳</span> EASY 14 DAY RETURNS <span>✳</span> GOOD
              THINGS, MADE TO GO PLACES
            </section>
            <section className="campaign-row" aria-label="Seasonal fashion campaigns">
              <button className="campaign campaign-men" onClick={() => { setCategory("Men"); go("category"); }}>
                <span className="campaign-kicker">THE NEW EVERYDAY</span>
                <strong>Made for<br />moving through it.</strong>
                <span className="campaign-link">Shop menswear <ArrowRight size={16} /></span>
              </button>
              <button className="campaign campaign-women" onClick={() => { setCategory("Women"); go("category"); }}>
                <span className="campaign-kicker">SOFT STRUCTURES</span>
                <strong>A little room<br />to be yourself.</strong>
                <span className="campaign-link">Shop womenswear <ArrowRight size={16} /></span>
              </button>
            </section>
            <section className="section">
              <div className="section-head">
                <div>
                  <p className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</p>
                  <h2>Shop by mood</h2>
                </div>
                <button className="text-btn" onClick={() => go("category")}>
                  View all <ArrowRight size={16} />
                </button>
              </div>
              <div className="category-tiles">
                {[
                  ["Women", "photo-1483985988355-763728e1935b"],
                  ["Men", "photo-1515886657613-9f3515b0c78f"],
                  ["Kids", "photo-1519238263530-99bdd11df2ea"],
                ].map(([c, img]) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      go("category");
                    }}
                  >
                    <img
                      src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=800&q=80`}
                      alt=""
                    />
                    <span>
                      {c}
                      <ArrowRight />
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <section className="brand-strip section" aria-label="Featured labels">
              <p className="eyebrow">GOOD COMPANY</p>
              <h2>Labels we'll wear on repeat</h2>
              <div>{[...new Set(products.map((p) => p.brand))].map((brand) => <button key={brand} onClick={() => { setQuery(brand); setSearch(brand); go("search"); }}>{brand}</button>)}</div>
            </section>
            <section className="section featured">
              <div className="section-head">
                <div>
                  <p className="eyebrow">YOUR NEW ROTATION</p>
                  <h2>Good things, lately</h2>
                </div>
                <button className="text-btn" onClick={() => go("category")}>
                  Shop all <ArrowRight size={16} />
                </button>
              </div>
              <div className="grid">{products.slice(0, 4).map(card)}</div>
            </section>
          </>
        )}
        {(page === "category" || page === "search") && (
          <section className="listing section">
            <div className="crumb">
              Home / {page === "search" ? "Search" : category}
            </div>
            <div className="section-head">
              <div>
                <p className="eyebrow">
                  {page === "search" ? "SEARCH RESULTS" : "THE MYNTRA EDIT"}
                </p>
                <h2>
                  {page === "search"
                    ? `Results for “${search}”`
                    : category === "All"
                      ? "All the good things"
                      : category}
                </h2>
                <p className="muted">
                  {displayed.length} pieces to make your own
                </p>
              </div>
            </div>
            <div className="filters">
              <label>
                <SlidersHorizontal size={17} /> Filters
              </label>
              <select
                aria-label="Type filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>All</option>
                {[
                  ...new Set(
                    products
                      .filter(
                        (p) => category === "All" || p.category === category,
                      )
                      .map((p) => p.type),
                  ),
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <select aria-label="Brand filter" value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                <option value="All">All brands</option>
                {[...new Set(products.filter((p) => category === "All" || p.category === category).map((p) => p.brand))].map((brand) => <option key={brand}>{brand}</option>)}
              </select>
              <select aria-label="Minimum rating" value={minRating} onChange={(e) => setMinRating(+e.target.value)}>
                <option value="0">Any rating</option><option value="4">4★ &amp; above</option><option value="4.5">4.5★ &amp; above</option>
              </select>
              <select aria-label="Minimum discount" value={minDiscount} onChange={(e) => setMinDiscount(+e.target.value)}>
                <option value="0">Any discount</option><option value="20">20% &amp; above</option><option value="40">40% &amp; above</option>
              </select>
              <label className="price-range">
                Price up to {money(maxPrice)}
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="500"
                  value={maxPrice}
                  aria-label="Maximum price"
                  onChange={(e) => setMaxPrice(+e.target.value)}
                />
              </label>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Customer rating</option>
                <option value="discount">Best discount</option>
              </select>
            </div>
            {grid()}
          </section>
        )}
        {page === "product" && (
          <section className="product-page section">
            <div className="crumb">
              Home / {selected.category} / {selected.type}
            </div>
            <div className="product-layout">
              <div className="product-photo">
                <img
                  src={`https://images.unsplash.com/${selected.image}?auto=format&fit=crop&w=1000&q=85`}
                  alt={selected.name}
                />
              </div>
              <div className="product-info">
                <p className="eyebrow">{selected.brand}</p>
                <h1>{selected.name}</h1>
                <p className="muted">
                  Easy comfort. Thoughtfully made for everyday.
                </p>
                <div className="price-line">
                  <strong>{money(selected.price)}</strong>
                  <del>{money(selected.mrp)}</del>
                  <em>
                    {Math.round((1 - selected.price / selected.mrp) * 100)}% off
                  </em>
                </div>
                <p className="tax">Inclusive of all taxes</p>
                <div className="rating">
                  4.6 <Star size={14} fill="currentColor" />{" "}
                  <span>· 128 thoughtful reviews</span>
                </div>
                <hr />
                <b>Select size</b>
                <div className="sizes">
                  {selected.sizes.map((s) => (
                    <button
                      className={size === s ? "chosen" : ""}
                      key={s}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="product-buttons">
                  <button className="dark-btn" onClick={() => add(selected)}>
                    <ShoppingBag size={17} /> Add to bag
                  </button>
                  <button
                    className="outline-btn"
                    onClick={() => toggleWish(selected)}
                  >
                    <Heart size={17} /> Wishlist
                  </button>
                </div>
                <p className="delivery">
                  ✳ Easy 14 day returns · Free delivery over ₹1,999
                </p>
                <p>{selected.description}</p>
              </div>
            </div>
          </section>
        )}
        {page === "cart" && (
          <section className="section narrow">
            <div className="crumb">Home / Shopping bag</div>
            <h2>
              Your bag <span className="muted">({count} items)</span>
            </h2>
            {cart.length === 0 ? (
              <div className="empty-state">
                <ShoppingBag size={42} />
                <h3>Your bag is taking a little breather.</h3>
                <button className="dark-btn" onClick={() => go("category")}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <div>
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id + item.size}>
                      <img
                        src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=75`}
                        alt={item.name}
                      />
                      <div className="cart-desc">
                        <small>{item.brand}</small>
                        <h3>{item.name}</h3>
                        <p>Size: {item.size}</p>
                        <strong>{money(item.price)}</strong>
                        <div className="qty">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              setCart((c) =>
                                c.map((i) =>
                                  i.id === item.id && i.size === item.size
                                    ? { ...i, qty: Math.max(1, i.qty - 1) }
                                    : i,
                                ),
                              )
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              setCart((c) =>
                                c.map((i) =>
                                  i.id === item.id && i.size === item.size
                                    ? { ...i, qty: i.qty + 1 }
                                    : i,
                                ),
                              )
                            }
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            className="remove"
                            onClick={() =>
                              setCart((c) =>
                                c.filter(
                                  (i) =>
                                    !(i.id === item.id && i.size === item.size),
                                ),
                              )
                            }
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                      <b>{money(item.price * item.qty)}</b>
                    </div>
                  ))}
                </div>
                <aside className="summary">
                  <h3>Price details</h3>
                  <p>
                    Subtotal <span>{money(total)}</span>
                  </p>
                  <p>
                    Delivery <span>{total >= 1999 ? "FREE" : money(99)}</span>
                  </p>
                  <hr />
                  <h3>
                    Total <span>{money(total + (total >= 1999 ? 0 : 99))}</span>
                  </h3>
                  <button
                    className="dark-btn full"
                    onClick={() => go("checkout")}
                  >
                    Continue to checkout <ArrowRight size={16} />
                  </button>
                </aside>
              </div>
            )}
          </section>
        )}
        {page === "wishlist" && (
          <section className="section">
            <div className="crumb">Home / Wishlist</div>
            <p className="eyebrow">SAVED FOR LATER</p>
            <h2>Your wishlist</h2>
            {wish.length ? (
              grid(wish)
            ) : (
              <div className="empty-state">
                <Heart size={42} />
                <h3>A little room for things you love.</h3>
                <button className="dark-btn" onClick={() => go("category")}>
                  Discover the collection
                </button>
              </div>
            )}
          </section>
        )}
        {page === "login" && (
          <section className="form-page">
            <div className="form-card">
              <p className="eyebrow">WELCOME TO MYNTRA</p>
                  <h2>{user ? "Your profile" : registering ? "Create your account." : "A good place to start."}</h2>
              {user ? (
                <>
                  <p>
                    Signed in as {user.name} · {user.email}
                  </p>
                  <button
                    className="outline-btn full"
                    onClick={() => {
                      setUser(null);
                      localStorage.removeItem("myntra-user");
                      notify("You are signed out");
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <p className="muted">
                    {registering ? "Join Myntra to keep your favourites close." : "Sign in or create an account to keep your favourites close."}
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      let d = new FormData(e.currentTarget),
                        email = d.get("email");
                      if (registering) {
                        const password = d.get("password");
                        if (password !== d.get("confirmPassword")) {
                          notify("Passwords do not match");
                          return;
                        }
                        const accounts = read("myntra-demo-accounts", [{ name: "Alex Morgan", email: "demo@myntra.com", password: "myntra123" }]);
                        if (accounts.some((account) => account.email.toLowerCase() === String(email).toLowerCase())) {
                          notify("An account with this email already exists");
                          return;
                        }
                        const u = { name: d.get("name"), email };
                        localStorage.setItem("myntra-demo-accounts", JSON.stringify([...accounts, { ...u, password }]));
                        setUser(u);
                        localStorage.setItem("myntra-user", JSON.stringify(u));
                        setRegistering(false);
                        notify("Your demo account is ready");
                      } else {
                        const accounts = read("myntra-demo-accounts", [{ name: "Alex Morgan", email: "demo@myntra.com", password: "myntra123" }]);
                        const account = accounts.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase() && entry.password === d.get("password"));
                        if (!account) {
                          notify("That email and password did not match the demo account");
                          return;
                        }
                        let u = { name: account.name, email: account.email };
                        setUser(u);
                        localStorage.setItem(
                          "myntra-user",
                          JSON.stringify(u),
                        );
                        notify(`Welcome back, ${account.name}`);
                      }
                    }}
                  >
                    {registering && <label>
                      Full name
                      <input name="name" required minLength="2" placeholder="Your name" />
                    </label>}
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      Password
                      <input
                        name="password"
                        type="password"
                        required
                        minLength="8"
                        placeholder="At least 8 characters"
                      />
                    </label>
                    {registering && <label>
                      Confirm password
                      <input name="confirmPassword" type="password" required minLength="8" placeholder="Re-enter your password" />
                    </label>}
                    {!registering && <p className="muted tiny">
                      Demo login: demo@myntra.com / myntra123
                    </p>}
                    <button className="dark-btn full">{registering ? "Create account" : "Continue"}</button>
                  </form>
                  <button className="text-btn auth-switch" onClick={() => setRegistering((value) => !value)}>
                    {registering ? "Already have an account? Sign in" : "New here? Create an account"}
                  </button>
                </>
              )}
            </div>
          </section>
        )}
        {page === "checkout" && (
          <section className="section narrow">
            <div className="crumb">Home / Bag / Checkout</div>
            {ordered ? (
              <div className="order-done">
                <div className="check">
                  <Check size={34} />
                </div>
                <p className="eyebrow">ORDER TL-2026-1042</p>
                <h1>
                  It’s official.
                  <br />
                  Good things are on their way.
                </h1>
                <p className="muted">
                  Your demo order is confirmed. No payment has been taken.
                </p>
                <h3>Order summary · {money(total)}</h3>
                <button
                  className="dark-btn"
                  onClick={() => {
                    setOrdered(false);
                    setCart([]);
                    go("home");
                  }}
                >
                  Back to home
                </button>
              </div>
            ) : (
              <div className="checkout-layout">
                <div>
                  <h2>Delivery details</h2>
                  <form
                    className="checkout-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOrdered(true);
                      notify("Order confirmed");
                    }}
                  >
                    <label>
                      Full name
                      <input name="name" required placeholder="Your name" />
                    </label>
                    <label>
                      Phone number
                      <input
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        title="Enter a 10 digit phone number"
                        placeholder="10 digit mobile number"
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      Address
                      <input
                        name="address"
                        required
                        minLength="10"
                        placeholder="House number, street, area"
                      />
                    </label>
                    <div className="two-col">
                      <label>
                        City
                        <input name="city" required placeholder="City" />
                      </label>
                      <label>
                        PIN code
                        <input
                          name="pin"
                          required
                          pattern="[0-9]{6}"
                          title="Enter a 6 digit PIN code"
                          placeholder="6 digit PIN"
                        />
                      </label>
                    </div>
                    <button className="dark-btn full">
                      Place demo order · {money(total)}
                    </button>
                  </form>
                </div>
                <aside className="summary">
                  <h3>Order summary</h3>
                  {cart.map((i) => (
                    <p key={i.id}>
                      {i.name} × {i.qty}
                      <span>{money(i.price * i.qty)}</span>
                    </p>
                  ))}
                  <hr />
                  <h3>
                    Total <span>{money(total)}</span>
                  </h3>
                  <p className="muted">Demo checkout · no real payment</p>
                </aside>
              </div>
            )}
          </section>
        )}
        {page === "about" && (
          <section className="section about">
            <p className="eyebrow">OUR LITTLE CORNER OF THE INTERNET</p>
            <h1>
              Good clothes.
              <br />
              <i>Good days.</i>
            </h1>
            <p>
              Myntra is a fictional fashion label for a local software
              testing demonstration. We believe getting dressed should feel
              easy, personal, and a little bit fun.
            </p>
            <button className="dark-btn" onClick={() => go("category")}>
              Meet the collection
            </button>
          </section>
        )}
      </main>
      <footer>
        <div className="footer-top">
          <a className="logo" href="#home" onClick={() => go("home")}>
            Myntra<span>®</span>
          </a>
          <p>
            Wear your own story.
            <br />A little more you, every day.
          </p>
          <button className="text-btn" onClick={() => go("about")}>
            Our story <ArrowRight size={16} />
          </button>
        </div>
        <div className="footer-links">
          <div>
            <b>Explore</b>
            {["Men", "Women", "Kids", "Accessories"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  go("category");
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <b>Need a hand?</b>
            <button onClick={() => go("about")}>About Myntra</button>
            <button onClick={() => go("about")}>Shipping & returns</button>
            <button onClick={() => go("about")}>FAQs</button>
          </div>
          <div>
            <b>Your account</b>
            <button onClick={() => go("login")}>Profile</button>
            <button onClick={() => go("wishlist")}>Wishlist</button>
            <button onClick={() => go("cart")}>Shopping bag</button>
          </div>
          <div className="newsletter">
            <b>Notes from us, occasionally.</b>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                notify("You’re on the list!");
              }}
            >
              <input
                type="email"
                required
                aria-label="Newsletter email"
                placeholder="Your email address"
              />
              <button aria-label="Subscribe">
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Myntra Demo <span>Made for learning · No real sales</span>
        </div>
      </footer>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}
