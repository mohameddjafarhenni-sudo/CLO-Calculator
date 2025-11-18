import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import StudentsTable from "@/components/StudentsTable";
import GradesTable from "@/components/GradesTable";
import SyllabusTable from "@/components/SyllabusTable";
import SummaryCards from "@/components/SummaryCards";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'syllabus'>('students');
  const [courseInfo, setCourseInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('courseInfo');
    if (!stored) {
      setLocation('/setup');
    } else {
      setCourseInfo(JSON.parse(stored));
    }
  }, [setLocation]);

  if (!courseInfo) return null;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-roboto font-medium text-lg">{courseInfo.moduleName}</h3>
                <p className="text-sm text-muted-foreground">
                  {courseInfo.moduleCode} - {courseInfo.professorName}
                </p>
              </div>
              <button
                onClick={() => setLocation('/setup')}
                className="text-sm text-primary hover:underline"
                data-testid="link-edit-course-info"
              >
                تعديل البيانات
              </button>
            </div>
          </Card>
          
          <SummaryCards />
          
          {activeTab === 'students' && <StudentsTable />}
          {activeTab === 'grades' && <GradesTable />}
          {activeTab === 'syllabus' && <SyllabusTable />}
        </div>
      </main>
    </div>
  );
}
