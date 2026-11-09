import { SystemStatePage } from "@/components/states/system-state-page";

export default function Loading() {
  return <SystemStatePage description="يجهّز التطبيق الواجهة المحلية المطلوبة. لا يجري حفظًا أو مزامنة أو اتصالًا بمعلّم ذكي." eyebrow="حالة انتقال" marker="…" role="status" title="جارٍ تجهيز الصفحة" />;
}
