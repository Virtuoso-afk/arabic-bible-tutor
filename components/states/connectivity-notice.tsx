"use client";

import { useEffect, useState } from "react";
import styles from "./system-states.module.css";

export function ConnectivityNotice() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className={styles.connectivity} role="status">
      <strong>يشير المتصفح إلى انقطاع الاتصال</strong>
      <span>تبقى حالة الصفحة المركّبة مؤقتًا، لكن الانتقال أو التحديث قد يفشل ويمسح بيانات الجلسة. هذا المؤشر لا يثبت توفر الشبكة أو استعادتها.</span>
    </div>
  );
}
