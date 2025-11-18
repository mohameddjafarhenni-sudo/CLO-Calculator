import { useState } from "react";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import StudentsTable from "@/components/StudentsTable";
import GradesTable from "@/components/GradesTable";
import SyllabusTable from "@/components/SyllabusTable";
import SummaryCards from "@/components/SummaryCards";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'syllabus'>('students');

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <SummaryCards />
          
          {activeTab === 'students' && <StudentsTable />}
          {activeTab === 'grades' && <GradesTable />}
          {activeTab === 'syllabus' && <SyllabusTable />}
        </div>
      </main>
    </div>
  );
}
