import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const root = process.env.NEXT_BASE_URL || 'http://localhost:3000';

test('has title', async ({ page }) => {
  await page.goto(root);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Technology Blog/);
});

test('Language Select', async ({ page }) => {
  await page.goto(root);

  // Click the get started link.
  // await page.getByRole('button', { name: 'English' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', {
      name: "Hey there 👋, I'm Patrick Kelly a software Engineer from Canada",
    }),
  ).toBeVisible();
});
