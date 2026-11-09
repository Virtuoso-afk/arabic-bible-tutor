import { expect, test } from "@playwright/test";

test("the landing page presents both paths and honest demonstration status", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page).toHaveTitle("نَسَق — تعلّم عربي منظّم");
  await expect(page.getByRole("heading", { level: 1, name: /تقدّمٌ له معنى/ })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "أتعلّم العربية من خلال مراجع كتابية" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "أدرس الكتاب بالعربية مع معلّم سياقي" })).toBeVisible();
  await expect(page.getByText(/لا حسابات أو تسجيل أو ذكاء اصطناعي فعّال/)).toBeVisible();
  await expect(page.getByRole("link", { name: "استكشف تعلّم العربية" })).toHaveAttribute("href", "/learn/paths/arabic-language");
  await expect(page.getByRole("link", { name: "استكشف دراسة الكتاب" })).toHaveAttribute("href", "/learn/paths/bible-study");
  await expect(page.locator("main").getByRole("button")).toHaveCount(0);
  expect(runtimeErrors).toEqual([]);
});

test("Path A entry explains language outcomes and can switch to Path B", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "استكشف تعلّم العربية" }).click();

  await expect(page).toHaveURL(/\/learn\/paths\/arabic-language$/);
  await expect(page.getByRole("heading", { level: 1, name: "أتعلّم العربية من خلال مراجع كتابية" })).toBeVisible();
  await expect(page.getByText("تطوير مهارات العربية هو الهدف الأساسي، وأي مراجع كتابية مستقبلية تتطلب ترخيصًا موثقًا ومراجعة قبل استخدامها.")).toBeVisible();
  await expect(page.getByText("فهم مفردات وتراكيب عربية ضمن سياقها.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "الكلمة في سياقها" })).toBeVisible();
  await expect(page.getByText("لا يوجد تسجيل أو حفظ تقدّم أو معلّم ذكي فعّال.")).toBeVisible();
  await expect(page.locator("main").getByRole("button")).toHaveCount(0);

  await page.getByRole("link", { name: "انتقل إلى دراسة الكتاب" }).click();
  await expect(page).toHaveURL(/\/learn\/paths\/bible-study$/);
  await expect(page.getByRole("heading", { level: 1, name: "أدرس الكتاب بالعربية مع معلّم سياقي" })).toBeVisible();
});

test("Path B entry remains separate and supports back navigation", async ({ page }) => {
  await page.goto("/learn/paths/bible-study");

  await expect(page.getByText("فهم محتوى الكتاب وسياقه هو الهدف الأساسي، ويعرض النموذج أنشطة عربية ومساندة سياقية مؤلَّفة داخل منهج معلن.")).toBeVisible();
  await expect(page.getByText("التمييز بين معلومة المصدر والتفسير والشرح التعليمي.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "السياق قبل الاستنتاج" })).toBeVisible();
  await expect(page.getByRole("link", { name: "انتقل إلى تعلّم العربية" })).toHaveAttribute("href", "/learn/paths/arabic-language");

  await page.getByRole("navigation", { name: "مسار التنقل" }).getByRole("link", { name: "الرئيسية" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 2, name: "اختر النتيجة التي تريدها" })).toBeVisible();
});

test("landing and path entries reflow without horizontal overflow", async ({ page }) => {
  const cases = [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 1000 },
  ];
  const routes = ["/", "/learn/paths/arabic-language", "/learn/paths/bible-study"];

  for (const viewport of cases) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, `${route} at ${viewport.width}px`).toBe(false);
      const brandBox = await page.getByRole("link", { name: "نَسَق، الصفحة الرئيسية" }).boundingBox();
      expect(brandBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  }
});

test("public navigation has a visible keyboard focus state", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const brand = page.getByRole("link", { name: "نَسَق، الصفحة الرئيسية" });
  await expect(brand).toBeFocused();
  const focus = await brand.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  expect(focus).toEqual({ outlineStyle: "solid", outlineWidth: "3px" });
});
