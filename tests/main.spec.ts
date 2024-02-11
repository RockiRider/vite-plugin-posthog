import { test, expect } from "@playwright/test";
import * as querystring from "querystring";

const POSTHOG_URL = "https://eu.posthog.com";
const DECIDE_ENDPOINT = "/decide/*";

test.skip("has title", async ({ page }) => {
  await page.goto("/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Vite + React");
});

test.skip("Check button text and click", async ({ page }) => {
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

test("posthog.identify is called", async ({ page }) => {
  let isPosthogIdentifyCalled = false;
  let analyticsEndpoint = "";

  await page.route(`${POSTHOG_URL}${DECIDE_ENDPOINT}`, async (route) => {
    // Continue the request and get the response
    route.continue();

    // Wait for the response
    const response = await page.waitForResponse(
      `${POSTHOG_URL}${DECIDE_ENDPOINT}`
    );

    // Get the analytics endpoint from the response payload
    const payload = await response.json();
    analyticsEndpoint = payload["analytics"].endpoint; // replace '...' with the actual path to the analytics endpoint in the payload
  });

  // Intercept network requests to the obtained analytics endpoint
  await page.route("**/*", (route, request) => {
    // Check if the request is a POST to the analytics endpoint
    if (
      request.method() === "POST" &&
      request.url().includes(`${POSTHOG_URL}${analyticsEndpoint}`)
    ) {
      isPosthogIdentifyCalled = true;

      const data = request.postData() || "";

      const decodedQuery = querystring.parse(data);
      const base64DecodedData = Buffer.from(
        decodedQuery.data as string,
        "base64"
      ).toString("utf8");
      const jsonData = JSON.parse(base64DecodedData);
      console.log(JSON.stringify(jsonData, null, 2));

      // // Decompress the payload
      // console.log("Decompressed payload: ", decompressed);
    }
    route.continue();
  });

  // Perform the actions that should trigger the posthog.identify call
  await page.goto("/");
  const button = page.getByTestId("btn_identify_test");
  await button.click();

  // Assert that posthog.identify was called
  expect(isPosthogIdentifyCalled).toBe(true);
});

test.skip("posthog.capture is called", async ({ page }) => {
  let isPosthogCaptureCalled = false;
  let analyticsEndpoint = "";

  await page.route(`${POSTHOG_URL}${DECIDE_ENDPOINT}`, async (route) => {
    // Continue the request and get the response
    route.continue();

    // Wait for the response
    const response = await page.waitForResponse(
      `${POSTHOG_URL}${DECIDE_ENDPOINT}`
    );

    // Get the analytics endpoint from the response payload
    const payload = await response.json();
    analyticsEndpoint = payload["analytics"].endpoint; // replace '...' with the actual path to the analytics endpoint in the payload
  });

  // Intercept network requests to the obtained analytics endpoint
  await page.route("**/*", (route, request) => {
    // Check if the request is a POST to the analytics endpoint
    if (
      request.method() === "POST" &&
      request.url().includes(`${POSTHOG_URL}${analyticsEndpoint}`)
    ) {
      isPosthogCaptureCalled = true;

      const data = request.postData() || "";
      console.log(data);

      const decodedQuery = querystring.parse(data);
      console.log(decodedQuery);
      const base64DecodedData = Buffer.from(
        decodedQuery.data as string,
        "base64"
      ).toString("utf8");
      const jsonData = JSON.parse(base64DecodedData);
      console.log(JSON.stringify(jsonData, null, 2));

      // // Decompress the payload
      // console.log("Decompressed payload: ", decompressed);
    }
    route.continue();
  });

  // Perform the actions that should trigger the posthog.capture call
  await page.goto("/");
  const button = page.getByTestId("main_count_btn");
  await button.click();

  // Assert that posthog.capture was called
  expect(isPosthogCaptureCalled).toBe(true);
  const buttonText = await button.innerText();
  expect(buttonText).toBe("count is 1");
});
