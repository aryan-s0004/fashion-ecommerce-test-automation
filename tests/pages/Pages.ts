import { Page, Locator, expect } from "@playwright/test";
export class HomePage {
  constructor(readonly page: Page) {}
  async open() {
    await this.page.goto("/#home");
  }
  async category(name: string) {
    await this.page.getByRole("button", { name, exact: true }).first().click();
  }
  async search(q: string) {
    await this.page.getByLabel("Search products").fill(q);
    await this.page.getByRole("button", { name: "Submit search" }).click();
  }
}
export class SearchPage {
  constructor(readonly page: Page) {}
  get results() {
    return this.page.locator(".grid");
  }
  async search(q: string) {
    await this.page.getByLabel("Search products").fill(q);
    await this.page.getByRole("button", { name: "Submit search" }).click();
  }
}
export class CategoryPage {
  constructor(readonly page: Page) {}
  async open(name = "Men") {
    await this.page.getByRole("button", { name, exact: true }).first().click();
  }
  get cards() {
    return this.page.locator(".card");
  }
  async sort(value: string) {
    await this.page.getByLabel("Sort products").selectOption(value);
  }
}
export class ProductPage {
  constructor(readonly page: Page) {}
  async openFirst() {
    await this.page.locator(".card .card-info").first().click();
  }
  async selectSize(size = "M") {
    await this.page.getByRole("button", { name: size, exact: true }).click();
  }
  async addToBag() {
    await this.page.getByRole("button", { name: /Add to bag/ }).click();
  }
}
export class CartPage {
  constructor(readonly page: Page) {}
  async open() {
    await this.page.getByRole("banner").getByRole("button", { name: "Shopping bag", exact: true }).click();
  }
  get items() {
    return this.page.locator(".cart-item");
  }
  async checkout() {
    await this.page
      .getByRole("button", { name: /Continue to checkout/ })
      .click();
  }
}
export class WishlistPage {
  constructor(readonly page: Page) {}
  async open() {
    await this.page.getByRole("banner").getByRole("button", { name: "Wishlist", exact: true }).click();
  }
  get cards() {
    return this.page.locator(".card");
  }
}
export class LoginPage {
  constructor(readonly page: Page) {}
  async open() {
    await this.page.getByRole("banner").getByRole("button", { name: "Profile", exact: true }).click();
  }
  async login(email = "demo@myntra.com", password = "myntra123") {
    await this.page.getByLabel("Email address").fill(email);
    await this.page.getByLabel("Password", { exact: true }).fill(password);
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
}
export class RegistrationPage {
  constructor(readonly page: Page) {}
  async open() {
    await this.page.getByRole("banner").getByRole("button", { name: "Profile", exact: true }).click();
    await this.page.getByRole("button", { name: /Create an account/ }).click();
  }
  async register(
    name: string,
    email: string,
    password: string,
    confirm = password,
  ) {
    await this.page.getByLabel("Full name").fill(name);
    await this.page.getByLabel("Email address").fill(email);
    await this.page.getByLabel("Password", { exact: true }).fill(password);
    await this.page.getByLabel("Confirm password", { exact: true }).fill(confirm);
    await this.page.getByRole("button", { name: "Create account" }).click();
  }
}
export class CheckoutPage {
  constructor(readonly page: Page) {}
  async fill() {
    await this.page.getByLabel("Full name").fill("Alex Morgan");
    await this.page.getByLabel("Phone number").fill("9876543210");
    await this.page.getByLabel("Email address").fill("alex@example.com");
    await this.page
      .getByLabel("Address", { exact: true })
      .fill("14 Park Street, Central District");
    await this.page.getByLabel("City").fill("Pune");
    await this.page.getByLabel("PIN code").fill("411001");
  }
  async place() {
    await this.page.getByRole("button", { name: /Place demo order/ }).click();
  }
}
