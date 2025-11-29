import SummaryCards from '../SummaryCards';

const mockStats = {
  studentsCount: 3,
  averageAchievement: 92.5,
  successRate: 100,
  successCount: 3,
  outcomesCount: 4,
  cloCoverage: [
    { code: 'CLO-1', label: 'الاتجاهات المعرفية', percentage: 92 },
    { code: 'CLO-2', label: 'حل المشكلات', percentage: 88 },
    { code: 'CLO-3', label: 'التحليل الاقتصادي', percentage: 74 },
    { code: 'CLO-4', label: 'المهارات الرقمية', percentage: 66 },
  ],
};

export default function SummaryCardsExample() {
  return (
    <div className="p-6 bg-background min-h-screen" dir="rtl">
      <SummaryCards stats={mockStats} />
    </div>
  );
}
