import { expect, test } from "@playwright/test";

test("dashboard renders honest fixture data and distinct path dimensions", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/learn");

  await expect(page.getByRole("heading", { level: 1, name: "مرحبًا، مريم" })).toBeVisible();
  await expect(page.getByText("بيانات عرض ثابتة · لا تُحفظ")).toBeVisible();
  await expect(page.getByText(/شخصية تجريبية ثابتة/)).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "تعلّم العربية" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "دراسة الكتاب" })).toBeVisible();
  await expect(page.getByText(/المفردات: 2 من 4 أدلة نموذجية/)).toBeVisible();
  await expect(page.getByText(/تمييز المصدر: 1 من 4 أدلة نموذجية/)).toBeVisible();
  await expect(page.getByText(/الإكمال يقيس الدروس في العرض فقط/)).toHaveCount(2);
  await expect(page.locator("main").getByRole("button")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("journey, review, and achievement are traceable to fixtures", async ({ page }) => {
  await page.goto("/learn");

  await expect(page.locator('[data-journey-state="complete"]')).toHaveCount(2);
  await expect(page.locator('[data-journey-state="current"]')).toHaveCount(1);
  await expect(page.locator('[data-journey-state="review"]')).toHaveCount(1);
  await expect(page.locator('[data-journey-state="future"]')).toHaveCount(1);
  await expect(page.getByText(/يمكن تأجيلها دون عقوبة/)).toBeVisible();
  const achievement = page.getByRole("heading", { name: "قارئ متأنٍ" }).locator("..");
  await expect(achievement).toHaveAttribute("data-evidence-ids", /study-source-1/);
  await expect(achievement).toHaveAttribute("data-evidence-ids", /study-context-1/);
  await expect(page.getByRole("progressbar", { name: /إكمال المقرر التجريبي: 2 من 5 دروس/ })).toHaveAttribute("value", "2");
});

test("course discovery exposes both paths and honest availability", async ({ page }) => {
  await page.goto("/learn/courses");

  await expect(page.getByRole("heading", { level: 1, name: "استكشف المقررات" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "مقررات اكتساب اللغة العربية" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "مقررات دراسة الكتاب بالعربية" })).toBeVisible();
  await expect(page.getByText("محتوى عرض قابل للاستكشاف")).toHaveCount(2);
  await expect(page.getByText("تصور غير متاح")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "لا توجد موضوعات مستقبلية معتمدة بعد" })).toBeVisible();
  await expect(page.locator("main").getByRole("button")).toHaveCount(0);
});

test("course details support back navigation and switching educational paths", async ({ page }) => {
  await page.goto("/learn/courses");
  await page.getByRole("link", { name: "عرض تفاصيل مقرر من الفهم إلى التعبير" }).click();
  await expect(page).toHaveURL(/\/learn\/courses\/arabic-sequence$/);
  await expect(page.getByRole("heading", { level: 1, name: "من الفهم إلى التعبير" })).toBeVisible();
  await expect(page.getByText(/لا تسجيل أو حفظ تقدّم أو إكمال إنتاجي/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "معاينة الدروس" })).toBeVisible();

  await page.getByRole("link", { name: "انتقل إلى مقررات المسار الآخر" }).click();
  await expect(page).toHaveURL(/\/learn\/courses#path-b$/);
  await expect(page.locator("#path-b")).toBeInViewport();
  await page.getByRole("link", { name: "عرض تفاصيل مقرر السياق والدليل" }).click();
  await expect(page).toHaveURL(/\/learn\/courses\/context-and-evidence$/);
  await expect(page.getByText(/لا يعرض هذا النموذج ترجمة كتابية/)).toBeVisible();

  await page.getByRole("navigation", { name: "مسار التنقل" }).getByRole("link", { name: "المقررات" }).click();
  await expect(page).toHaveURL(/\/learn\/courses$/);
});

test("learner routes use the correct responsive navigation without overflow", async ({ page }) => {
  const viewports = [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }];
  const routes = [{ route: "/learn", active: "الرئيسية" }, { route: "/learn/courses", active: "المقررات" }, { route: "/learn/courses/arabic-sequence", active: "المقررات" }];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const item of routes) {
      await page.goto(item.route);
      const rail = page.locator('[data-shell-navigation="rail"]');
      const mobile = page.locator('[data-shell-navigation="mobile"]');
      const navigation = viewport.width < 768 ? mobile : rail;
      await expect(navigation.getByRole("link", { name: item.active })).toHaveAttribute("aria-current", "page");
      await expect(viewport.width < 768 ? mobile : rail).toBeVisible();
      await expect(viewport.width < 768 ? rail : mobile).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${item.route} at ${viewport.width}px`).toBe(false);
    }
  }
});

test("dashboard keyboard navigation exposes the skip link and real destinations", async ({ page }) => {
  await page.goto("/learn");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "انتقل إلى المحتوى الرئيسي" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#shell-content")).toBeFocused();
  await expect(page.getByRole("link", { name: /ابدأ الدرس التفاعلي/ })).toHaveAttribute("href", "/learn/courses/arabic-sequence/lessons/apply-sequence");
  await expect(page.getByRole("link", { name: "افتح تمرين المراجعة" })).toHaveAttribute("href", "/learn/courses/arabic-sequence/lessons/apply-sequence");
});
