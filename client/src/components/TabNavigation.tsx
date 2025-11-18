import { GraduationCap, FileSpreadsheet, BookOpen } from "lucide-react";

interface TabNavigationProps {
  activeTab: 'students' | 'grades' | 'syllabus';
  onTabChange: (tab: 'students' | 'grades' | 'syllabus') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'students' as const, label: 'بيانات الطلاب', icon: GraduationCap },
    { id: 'grades' as const, label: 'الدرجات', icon: FileSpreadsheet },
    { id: 'syllabus' as const, label: 'المنهج', icon: BookOpen },
  ];

  return (
    <div className="bg-white border-b border-border">
      <div className="flex gap-1 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`
                flex items-center gap-2 px-6 py-4 font-roboto font-medium text-base
                border-b-2 transition-colors
                ${isActive 
                  ? 'border-primary text-primary bg-primary/5' 
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
