import { useState } from "react";
import SyllabusTable from "../SyllabusTable";
import type { CLOItem } from "@/types/course";

const demoItems: CLOItem[] = [
  { id: "1", code: "CLO-1", description: "شرح المفاهيم الأساسية للمقرر", weight: 25 },
  { id: "2", code: "CLO-2", description: "تطبيق المهارات العملية في التقييمات", weight: 30 },
  { id: "3", code: "CLO-3", description: "تحليل البيانات واستخلاص الاستنتاجات", weight: 20 },
  { id: "4", code: "CLO-4", description: "تطوير مشاريع جماعية فعالة", weight: 25 },
];

export default function SyllabusTableExample() {
  const [items, setItems] = useState<CLOItem[]>(demoItems);

  return (
    <div className="p-6 bg-background min-h-screen" dir="rtl">
      <SyllabusTable items={items} onItemsChange={setItems} />
    </div>
  );
}
