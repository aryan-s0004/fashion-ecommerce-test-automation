import { test as base, expect } from '@playwright/test';
import {
  HomePage, SearchPage, CategoryPage, ProductPage, CartPage,
  WishlistPage, LoginPage, CheckoutPage,
} from './pages/Pages';

type Pages = {
  home: HomePage; search: SearchPage; category: CategoryPage;
  product: ProductPage; cart: CartPage; wishlist: WishlistPage;
  login: LoginPage; checkout: CheckoutPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      home: new HomePage(page), search: new SearchPage(page),
      category: new CategoryPage(page), product: new ProductPage(page),
      cart: new CartPage(page), wishlist: new WishlistPage(page),
      login: new LoginPage(page), checkout: new CheckoutPage(page),
    });
  },
});
export { expect };
