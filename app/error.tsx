"use client";

import { SystemStatePage } from "@/components/states/system-state-page";
import { Button, ButtonLink } from "@/components/ui/button";

type ErrorPageProps = { error: Error & { digest?: string }; reset: () => void };

export default function ErrorPage({ reset }: ErrorPageProps) {
  return <SystemStatePage actions={<><Button onClick={reset}>حاول عرض الصفحة مجددًا</Button><ButtonLink href="/learn/courses" variant="secondary">ارجع إلى المقررات</ButtonLink></>} description="تعذر عرض هذه الصفحة بسبب خطأ غير متوقع. لا نعد بأن المحاولة المؤقتة ستبقى بعد الانتقال أو التحديث." detail="المحاولة مجددًا تعيد تقديم المسار الحالي فقط؛ لا توجد عملية حفظ أو مزامنة خلفية." eyebrow="خطأ قابل للمحاولة" marker="!" role="alert" title="تعذر إكمال العرض" />;
}
