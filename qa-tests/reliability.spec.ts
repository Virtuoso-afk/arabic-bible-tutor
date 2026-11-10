import { expect, test } from "@playwright/test";
import { pathA, pathB, startLesson } from "./helpers";

test("production routes remain free of console errors, external requests, and persistence", async ({ page }) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("request", (request) => { if (!request.url().startsWith("http://127.0.0.1:3000")) external.push(request.url()); });
  for (const route of ["/", "/learn", "/learn/courses", pathA, pathB, "/learn/progress", "/settings/learning"]) {
    await page.goto(route);
  }
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookies: document.cookie }))).toEqual({ local: 0, session: 0, cookies: "" });
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("rapid submit, answer changes, retries, and repeated restarts stay deterministic", async ({ page }) => {
  await page.goto(pathA);
  await startLesson(page);
  await page.getByRole("radio", { name: /ثمَّ/ }).check();
  const submit = page.getByRole("button", { name: "تحقّق من الإجابة" });
  await submit.evaluate((button: HTMLButtonElement) => { button.click(); button.click(); button.click(); });
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-evidence-count", "1");
  await page.getByRole("radio", { name: /عادَ/ }).check();
  await expect(page.getByTestId("feedback-panel")).toHaveCount(0);
  await submit.click();
  await expect(page.getByTestId("lesson-player")).toHaveAttribute("data-evidence-count", "2");
  await page.reload();
  for (let index = 0; index < 3; index += 1) {
    await startLesson(page);
    await page.reload();
    await expect(page.getByRole("button", { name: "ابدأ الدرس التجريبي" })).toBeVisible();
  }
});

test("back, forward, reload, offline, and recovery preserve only mounted state", async ({ page, context }) => {
  await page.goto(pathB);
  await startLesson(page);
  const answer = page.getByRole("radio", { name: /٢٥–٣٧/ });
  await answer.check();
  await context.setOffline(true);
  await expect(page.getByRole("status").filter({ hasText: "انقطاع الاتصال" })).toBeVisible();
  await expect(answer).toBeChecked();
  await context.setOffline(false);
  await expect(page.getByText("يشير المتصفح إلى انقطاع الاتصال")).toHaveCount(0);
  await expect(answer).toBeChecked();
  await page.goto("/learn/courses/context-and-evidence");
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${pathB}$`));
  await page.goForward();
  await expect(page).toHaveURL(/context-and-evidence$/);
  await page.goBack();
  await page.reload();
  await expect(page.getByRole("button", { name: "ابدأ الدرس التجريبي" })).toBeVisible();
});

test("unknown path, course, and lesson parameters return real 404 responses", async ({ page }) => {
  for (const route of ["/unknown", "/learn/paths/unknown", "/learn/courses/unknown", "/learn/courses/arabic-sequence/lessons/unknown"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
    await expect(page.getByRole("heading", { name: "لم نجد هذه الصفحة" })).toBeVisible();
  }
});
