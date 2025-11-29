import { GraduationCap, FileSpreadsheet, BookOpen, LayoutDashboard } from "lucide-react";

export type TabId = 'students' | 'grades' | 'syllabus' | 'overview';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'students' as const, label: 'بيانات الطلاب', icon: GraduationCap },
    { id: 'grades' as const, label: 'الدرجات', icon: FileSpreadsheet },
    { id: 'syllabus' as const, label: 'المنهج', icon: BookOpen },
    { id: 'overview' as const, label: 'نظرة عامة', icon: LayoutDashboard },
  ];

  return (
    <div className="px-4 py-4">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-2xl px-5 py-3 transition-all border ${
                isActive
                  ? 'bg-gradient-to-l from-primary to-emerald-600 text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
              }`}
            >
              <span className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isActive ? 'bg-white/15 text-white border-white/40' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-4 h-4" />
              </span>
              <div className="text-right">
                <p className="text-sm font-semibold leading-tight">{tab.label}</p>
                <p className={`text-xs ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {tab.id === 'students' && 'إدارة قوائم الطلاب'}
                  {tab.id === 'grades' && 'قياس وتقارير الأداء'}
                  {tab.id === 'syllabus' && 'ربط نواتج التعلم'}
                  {tab.id === 'overview' && 'بطاقات المؤشرات والتقارير'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
