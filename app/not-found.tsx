import type { Metadata } from "next";
import { SystemStatePage } from "@/components/states/system-state-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "الصفحة غير موجودة — نَسَق", robots: { index: false, follow: false } };

export default function NotFound() {
  return <SystemStatePage actions={<><ButtonLink href="/learn/courses">استكشف المقررات المتاحة</ButtonLink><ButtonLink href="/" variant="secondary">الصفحة الرئيسية</ButtonLink></>} description="لا يطابق العنوان صفحة أو مقررًا أو درسًا موجودًا في بيانات العرض الحالية." detail="لم يُنشأ بديل وهمي ولم تُسجَّل محاولة. يمكنك العودة إلى المقررات المتاحة أو الصفحة الرئيسية." eyebrow="حالة مسار غير مدعوم" marker="404" title="لم نجد هذه الصفحة" />;
}
