import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React");
});

test("Check button text and click", async ({ page }) => {
  // Get the button
  await page.goto("/");
  const button = page.getByTestId("main_count_btn");

  // Check that its text is "count is 0"
  let buttonText = await button.innerText();
  expect(buttonText).toBe("count is 0");

  // Click it
  await button.click();

  // Check that the text changes to "count is 1"
  buttonText = await button.innerText();
  expect(buttonText).toBe("count is 1");
});
