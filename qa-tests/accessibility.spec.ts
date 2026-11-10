import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { completeLessonByKeyboard, lessonAnswers, pathA, pathB, startLesson } from "./helpers";

const routes = [
  "/", "/learn", "/learn/courses", "/learn/paths/arabic-language", "/learn/paths/bible-study",
  "/learn/courses/arabic-sequence", "/learn/courses/arabic-reading-foundations",
  "/learn/courses/context-and-evidence", "/learn/courses/themes-and-structure",
  pathA, pathB, "/learn/progress", "/settings/learning", "/route-that-does-not-exist",
];

async function expectNoAxeViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const summary = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.map((node) => node.target.join(" ")),
  }));
  expect(summary, `${label}: ${JSON.stringify(summary, null, 2)}`).toEqual([]);
}

test("all production routes pass automated WCAG 2.2 AA axe rules", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expectNoAxeViolations(page, route);
  }
});

test("interactive lesson, feedback, tutor, and completion states pass axe", async ({ page }) => {
  for (const route of [pathA, pathB] as const) {
    await page.goto(route);
    await startLesson(page);
    await expectNoAxeViolations(page, `${route}: active`);

    const wrongAnswer = page.getByRole("radio").nth(1);
    await wrongAnswer.check();
    await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
    await expect(page.getByTestId("feedback-panel")).toBeFocused();
    await expectNoAxeViolations(page, `${route}: feedback`);

    await page.getByRole("combobox", { name: "حالة المعلّم التجريبية" }).selectOption("tutor-unavailable");
    await expect(page.getByTestId("tutor-state-panel")).toBeFocused();
    await expectNoAxeViolations(page, `${route}: tutor unavailable`);

    await page.reload();
    await startLesson(page);
    await completeLessonByKeyboard(page, lessonAnswers[route]);
    await expect(page.getByTestId("completion-panel")).toBeFocused();
    await expectNoAxeViolations(page, `${route}: complete`);
  }
});

test("both lessons can be completed using keyboard input with managed focus", async ({ page }) => {
  for (const route of [pathA, pathB] as const) {
    await page.goto(route);
    const start = page.getByRole("button", { name: "ابدأ الدرس التجريبي" });
    await start.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#activity-title")).toBeFocused();
    await completeLessonByKeyboard(page, lessonAnswers[route]);
    await expect(page.getByTestId("completion-panel")).toBeFocused();
  }
});

test("focus is visible and follows feedback, activity, tutor, and reset changes", async ({ page }) => {
  await page.goto(pathA);
  await startLesson(page);
  await page.getByRole("radio", { name: /ثمَّ/ }).check();
  await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  await expect(page.getByTestId("feedback-panel")).toBeFocused();
  await page.getByRole("radio", { name: /عادَ/ }).check();
  await page.getByRole("button", { name: "تحقّق من الإجابة" }).click();
  await page.getByRole("button", { name: "النشاط التالي" }).click();
  await expect(page.locator("#activity-title")).toBeFocused();
  await page.getByRole("combobox", { name: "حالة المعلّم التجريبية" }).selectOption("educator-review");
  await expect(page.getByTestId("tutor-state-panel")).toBeFocused();
  const outline = await page.getByTestId("tutor-state-panel").evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
});
