import { expect, test } from "@playwright/test";

test("renders the Arabic-first landing page without deceptive actions", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(
    page.getByRole("heading", { name: /مساحة تعلّم عربية/ }),
  ).toBeVisible();
  await expect(page.getByText("معاينة فقط")).toHaveCount(2);
  await expect(page.getByText("متاح في مرحلة لاحقة")).toHaveCount(2);
  await expect(page.locator("main").getByRole("button")).toHaveCount(0);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
  expect(runtimeErrors).toEqual([]);
});

test("the exploratory navigation moves to real page sections", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "شاهد كيف تعمل الفكرة" }).click();
  await expect(page.locator("#experience")).toBeInViewport();
});
