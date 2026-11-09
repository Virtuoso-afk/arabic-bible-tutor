import { expect, test } from "@playwright/test";

test("the shell exposes Arabic RTL navigation semantics and active state", async ({ page }, testInfo) => {
  await page.goto("/shell-preview");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page).toHaveTitle(/نَسَق — معاينة بنية التطبيق/);
  await expect(page.getByRole("heading", { level: 1, name: "بنية التطبيق المشتركة" })).toBeVisible();

  const rail = page.locator('[data-shell-navigation="rail"]');
  const mobile = page.locator('[data-shell-navigation="mobile"]');
  await expect(rail.locator('nav[aria-label="التنقل الرئيسي"]')).toHaveCount(1);
  await expect(mobile).toHaveAttribute("aria-label", "التنقل الرئيسي للهاتف");
  const visibleNavigation = testInfo.project.name === "mobile-chromium" ? mobile : rail;
  await expect(visibleNavigation.getByRole("link", { name: "الرئيسية" })).toHaveAttribute("aria-current", "page");
  await expect(rail.locator('[aria-disabled="true"]')).toHaveCount(0);
  await expect(visibleNavigation.getByRole("link", { name: "التقدّم" })).toHaveAttribute("href", "/learn/progress");
  await expect(visibleNavigation.getByRole("link", { name: "الملف والإعدادات" })).toHaveAttribute("href", "/settings/learning");
});

test("the shell switches among mobile navigation, tablet rail, and desktop sidebar without overflow", async ({ page }) => {
  const cases = [
    { width: 390, height: 844, rail: false, mobile: true, railWidth: 0 },
    { width: 768, height: 1024, rail: true, mobile: false, railWidth: 82 },
    { width: 1440, height: 1000, rail: true, mobile: false, railWidth: 238 },
  ];

  for (const item of cases) {
    await page.setViewportSize({ width: item.width, height: item.height });
    await page.goto("/shell-preview");

    const rail = page.locator('[data-shell-navigation="rail"]');
    const mobile = page.locator('[data-shell-navigation="mobile"]');
    if (item.rail) {
      await expect(rail).toBeVisible();
      const box = await rail.boundingBox();
      expect(Math.round(box?.width ?? 0)).toBe(item.railWidth);
    } else {
      await expect(rail).toBeHidden();
    }
    await expect(mobile)[item.mobile ? "toBeVisible" : "toBeHidden"]();
    if (item.mobile) {
      await expect(mobile.getByRole("link", { name: "الرئيسية" })).toHaveAttribute("aria-current", "page");
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `${item.width}px viewport`).toBe(false);
  }
});

test("keyboard focus reveals the skip link and moves to the main content", async ({ page }) => {
  await page.goto("/shell-preview");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "انتقل إلى المحتوى الرئيسي" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  const focusStyle = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  expect(focusStyle).toEqual({ outlineStyle: "solid", outlineWidth: "3px" });

  await page.keyboard.press("Enter");
  await expect(page.locator("#shell-content")).toBeFocused();
});

test("reduced motion removes meaningful shell transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/shell-preview");

  const duration = await page.locator('[data-shell-navigation="rail"] a').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.001);
});
