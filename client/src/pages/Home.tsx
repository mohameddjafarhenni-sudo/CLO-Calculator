import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import TabNavigation, { TabId } from "@/components/TabNavigation";
import StudentsTable from "@/components/StudentsTable";
import GradesTable from "@/components/GradesTable";
import SyllabusTable from "@/components/SyllabusTable";
import SummaryCards, { SummaryStats } from "@/components/SummaryCards";
import ReportOverview, { type PassFailDatum, type GradeTotalDatum, type AssessmentPerformanceDatum } from "@/components/ReportOverview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { Assessment, GradeEntry, Student, CLOItem, CourseInfo } from "@/types/course";
import { setReportExportData } from "@/lib/reportExport";

const DEFAULT_STUDENTS: Student[] = [
  { id: '1', studentId: '202301001', name: 'أحمد محمد علي', email: 'ahmed@example.com', phone: '0501234567' },
  { id: '2', studentId: '202301002', name: 'فاطمة سعيد', email: 'fatima@example.com', phone: '0509876543' },
  { id: '3', studentId: '202301003', name: 'محمد خالد', email: 'mohammed@example.com', phone: '0555551234' },
];

const DEFAULT_ASSESSMENTS: Assessment[] = [
  {
    id: 'quiz1',
    label: 'اختبار فصلي 1',
    questions: [
      { id: 'q1', label: 'س1', outcomeCode: '1.1' },
      { id: 'q2', label: 'س2', outcomeCode: '1.2' },
      { id: 'q3', label: 'س3', outcomeCode: '2.2' },
      { id: 'q4', label: 'س4', outcomeCode: '2.3' },
    ],
  },
  {
    id: 'quiz2',
    label: 'اختبار فصلي 2',
    questions: [
      { id: 'q1', label: 'س1', outcomeCode: '1.2' },
      { id: 'q2', label: 'س2', outcomeCode: '1.3' },
      { id: 'q3', label: 'س3', outcomeCode: '2.1' },
      { id: 'q4', label: 'س4', outcomeCode: '1.3' },
    ],
  },
  {
    id: 'assignments',
    label: 'الواجبات',
    questions: [
      { id: 'q1', label: 'س1', outcomeCode: '1.2' },
      { id: 'q2', label: 'س2', outcomeCode: '1.3' },
      { id: 'q3', label: 'س3', outcomeCode: '2.2' },
      { id: 'q4', label: 'س4', outcomeCode: '2.3' },
    ],
  },
  {
    id: 'final',
    label: 'الاختبار النهائي',
    questions: [
      { id: 'q1', label: 'س1', outcomeCode: '1.2' },
      { id: 'q2', label: 'س2', outcomeCode: '2.2' },
      { id: 'q3', label: 'س3', outcomeCode: '1.2' },
      { id: 'q4', label: 'س4', outcomeCode: '2.3' },
    ],
  },
];

const DEFAULT_GRADE_ENTRIES: GradeEntry[] = [
  {
    studentId: '202301001',
    studentName: 'أحمد محمد علي',
    grades: {
      'quiz1_q1': 1.1, 'quiz1_q2': 1.2, 'quiz1_q3': 2.2, 'quiz1_q4': 2.3,
      'quiz2_q1': 1.2, 'quiz2_q2': 1.3, 'quiz2_q3': 2.1, 'quiz2_q4': 1.3,
      'assignments_q1': 1.2, 'assignments_q2': 1.3, 'assignments_q3': 2.2, 'assignments_q4': 2.3,
      'final_q1': 1.2, 'final_q2': 2.2, 'final_q3': 1.2, 'final_q4': 2.3,
    },
    total: 0,
  },
  {
    studentId: '202301002',
    studentName: 'فاطمة سعيد',
    grades: {
      'quiz1_q1': 1.0, 'quiz1_q2': 1.1, 'quiz1_q3': 2.0, 'quiz1_q4': 2.2,
      'quiz2_q1': 1.1, 'quiz2_q2': 1.2, 'quiz2_q3': 2.0, 'quiz2_q4': 1.2,
      'assignments_q1': 1.1, 'assignments_q2': 1.2, 'assignments_q3': 2.1, 'assignments_q4': 2.2,
      'final_q1': 1.1, 'final_q2': 2.1, 'final_q3': 1.1, 'final_q4': 2.2,
    },
    total: 0,
  },
  {
    studentId: '202301003',
    studentName: 'محمد خالد',
    grades: {},
    total: 0,
  },
];

const DEFAULT_CLO_ITEMS: CLOItem[] = [
  { id: '1', code: 'CLO-1', description: 'القدرة على فهم المفاهيم الأساسية للبرمجة', weight: 25 },
  { id: '2', code: 'CLO-2', description: 'تطبيق خوارزميات حل المشكلات البرمجية', weight: 30 },
  { id: '3', code: 'CLO-3', description: 'تحليل وتصميم البرامج البسيطة', weight: 25 },
  { id: '4', code: 'CLO-4', description: 'العمل الجماعي وإدارة المشاريع', weight: 20 },
];

const MAX_SCORE_PER_ITEM = 3;
const SUCCESS_THRESHOLD = 0.65;

function calculateGradeTotal(grades: Record<string, number>) {
  return Object.values(grades).reduce((sum, value) => sum + (value || 0), 0);
}

function ensureGradeStructure(
  students: Student[],
  assessments: Assessment[],
  currentGrades: GradeEntry[],
): GradeEntry[] {
  const gradeMap = new Map(currentGrades.map((entry) => [entry.studentId, entry]));
  const gradeKeys = assessments.flatMap((assessment) =>
    assessment.questions.map((question) => `${assessment.id}_${question.id}`)
  );

  return students.map((student) => {
    const existing = gradeMap.get(student.studentId);
    const gradesRecord: Record<string, number> = {};
    gradeKeys.forEach((key) => {
      gradesRecord[key] = existing?.grades[key] ?? 0;
    });

    return {
      studentId: student.studentId,
      studentName: student.name,
      grades: gradesRecord,
      total: calculateGradeTotal(gradesRecord),
    };
  });
}

function computeSummaryStats(
  students: Student[],
  grades: GradeEntry[],
  assessments: Assessment[],
): SummaryStats {
  const gradeValues = grades.flatMap((entry) => Object.values(entry.grades));
  const gradeAverageRaw = gradeValues.length
    ? gradeValues.reduce((sum, value) => sum + (value || 0), 0) / gradeValues.length
    : 0;
  const averageAchievement = Math.min(
    100,
    Math.max(0, (gradeAverageRaw / MAX_SCORE_PER_ITEM) * 100),
  );

  const successCount = grades.filter((entry) => {
    const values = Object.values(entry.grades);
    if (!values.length) return false;
    const avg = values.reduce((sum, value) => sum + (value || 0), 0) / values.length;
    return avg >= MAX_SCORE_PER_ITEM * SUCCESS_THRESHOLD;
  }).length;
  const successRate = students.length
    ? Math.round((successCount / students.length) * 100)
    : 0;

  const outcomeCounts = new Map<string, number>();
  assessments.forEach((assessment) => {
    assessment.questions.forEach((question) => {
      outcomeCounts.set(
        question.outcomeCode,
        (outcomeCounts.get(question.outcomeCode) || 0) + 1,
      );
    });
  });

  const totalQuestions = Array.from(outcomeCounts.values()).reduce(
    (sum, count) => sum + count,
    0,
  );
  const cloCoverage = Array.from(outcomeCounts.entries())
    .map(([code, count]) => ({
      code: `CLO-${code}`,
      label: `ناتج تعلم ${code}`,
      percentage: totalQuestions ? Math.round((count / totalQuestions) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  return {
    studentsCount: students.length,
    averageAchievement,
    successRate,
    successCount,
    outcomesCount: outcomeCounts.size,
    cloCoverage,
  };
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('students');
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
  const [students, setStudents] = useState<Student[]>(DEFAULT_STUDENTS);
  const [assessments, setAssessments] = useState<Assessment[]>(DEFAULT_ASSESSMENTS);
  const [grades, setGrades] = useState<GradeEntry[]>(() =>
    ensureGradeStructure(DEFAULT_STUDENTS, DEFAULT_ASSESSMENTS, DEFAULT_GRADE_ENTRIES)
  );
  const [cloItems, setCloItems] = useState<CLOItem[]>(DEFAULT_CLO_ITEMS);

  useEffect(() => {
    const stored = localStorage.getItem('courseInfo');
    if (!stored) {
      setLocation('/setup');
    } else {
      setCourseInfo(JSON.parse(stored));
    }
  }, [setLocation]);

  useEffect(() => {
    setGrades((prev) => ensureGradeStructure(students, assessments, prev));
  }, [students, assessments]);

  const maxScorePerStudent = useMemo(() => {
    const totalQuestions = assessments.reduce((sum, assessment) => sum + assessment.questions.length, 0);
    return totalQuestions * MAX_SCORE_PER_ITEM;
  }, [assessments]);

  const summaryStats = useMemo(
    () => computeSummaryStats(students, grades, assessments),
    [students, grades, assessments]
  );

  const passFailData = useMemo<PassFailDatum[]>(() => {
    const passCount = summaryStats.successCount;
    const failCount = Math.max(summaryStats.studentsCount - passCount, 0);
    const total = summaryStats.studentsCount || 1;
    const passPercentage = Math.round((passCount / total) * 100);
    const failPercentage = Math.max(0, 100 - passPercentage);

    return [
      { status: 'pass', label: 'طلاب ناجحون', value: passCount, percentage: passPercentage },
      { status: 'fail', label: 'بحاجة للدعم', value: failCount, percentage: failPercentage },
    ];
  }, [summaryStats]);

  const gradeTotalsData = useMemo<GradeTotalDatum[]>(() => {
    const maxScore = maxScorePerStudent || 100;
    return grades
      .map((entry) => {
        const total = calculateGradeTotal(entry.grades);
        const percentage = maxScore ? Math.round((total / maxScore) * 100) : 0;
        return {
          student: entry.studentName || entry.studentId,
          total: Number(total.toFixed(1)),
          percentage: Math.max(0, Math.min(100, percentage)),
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [grades, maxScorePerStudent]);

  const assessmentPerformanceData = useMemo<AssessmentPerformanceDatum[]>(() => {
    return assessments.map((assessment) => {
      const questionKeys = assessment.questions.map((question) => `${assessment.id}_${question.id}`);
      const { total, count } = grades.reduce(
        (acc, entry) => {
          questionKeys.forEach((key) => {
            if (entry.grades[key] !== undefined) {
              acc.total += entry.grades[key] || 0;
              acc.count += 1;
            }
          });
          return acc;
        },
        { total: 0, count: 0 }
      );

      const average = count ? total / count : 0;
      const percentage = Math.max(0, Math.min(100, Math.round((average / MAX_SCORE_PER_ITEM) * 100)));

      return {
        label: assessment.label,
        value: percentage,
      };
    });
  }, [assessments, grades]);

  useEffect(() => {
    setReportExportData({
      generatedAt: new Date().toISOString(),
      courseInfo,
      summaryStats,
      passFailData,
      gradeTotalsData,
      assessmentPerformanceData,
      students,
      grades,
      assessments,
      cloItems,
    });
  }, [
    courseInfo,
    summaryStats,
    passFailData,
    gradeTotalsData,
    assessmentPerformanceData,
    students,
    grades,
    assessments,
    cloItems,
  ]);

  if (!courseInfo) return null;

  const heroMetrics = [
    { label: 'عدد الطلاب', value: summaryStats.studentsCount.toString(), accent: 'منتمين للمقرر' },
    { label: 'متوسط التقدم', value: `${summaryStats.averageAchievement.toFixed(1)}%`, accent: 'حسب آخر تحديث للدرجات' },
    { label: 'نواتج التعلم', value: summaryStats.outcomesCount.toString(), accent: 'ضمن الخطة الحالية' },
    { label: 'آخر تحديث', value: dateText(courseInfo), accent: 'سجل القياس' },
  ];

  return (
    <div id="report-content" className="min-h-screen" dir="rtl">
      <Header />

  <section className="iu-hero text-white" data-report-section="hero">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm text-white/70">نظام قياس نواتج التعلم</p>
              <h2 className="text-3xl lg:text-4xl font-bold leading-snug">
                {courseInfo.moduleName}
              </h2>
              <p className="text-base text-white/80">
                رمز المقرر <span className="font-semibold text-white">{courseInfo.moduleCode}</span> — بإشراف
                <span className="font-semibold text-white"> {courseInfo.professorName}</span>
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => setLocation('/setup')}
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/30"
                  data-testid="link-edit-course-info"
                >
                  <ArrowLeftCircle className="w-4 h-4 ml-2" />
                  تعديل بيانات المقرر
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-primary border-none hover:bg-secondary/90 hover:text-white"
                  onClick={() => setActiveTab('grades')}
                >
                  استعراض الدرجات
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {heroMetrics.map((item) => (
                <Card key={item.label} className="p-4 bg-white/5 border-white/20 text-white">
                  <p className="text-xs text-white/70">{item.label}</p>
                  <p className="text-2xl font-semibold mt-1">{item.value}</p>
                  <p className="text-xs text-white/60 mt-1">{item.accent}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-12 -mt-12 space-y-6">
        <div className="iu-section overflow-hidden" data-report-section="tab-navigation">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-6" data-report-section="overview-panel">
            <SummaryCards stats={summaryStats} />
            <ReportOverview
              summary={summaryStats}
              passFailData={passFailData}
              gradeTotals={gradeTotalsData}
              assessmentPerformance={assessmentPerformanceData}
              maxScore={maxScorePerStudent}
            />
          </div>
        ) : (
          <section
            className="iu-section p-6"
            data-report-section={
              activeTab === 'students'
                ? 'students-table'
                : activeTab === 'grades'
                  ? 'grades-table'
                  : 'syllabus-table'
            }
          >
            {activeTab === 'students' && (
              <StudentsTable
                students={students}
                onStudentsChange={setStudents}
              />
            )}
            {activeTab === 'grades' && (
              <GradesTable
                assessments={assessments}
                grades={grades}
                onAssessmentsChange={setAssessments}
                onGradesChange={setGrades}
              />
            )}
            {activeTab === 'syllabus' && (
              <SyllabusTable items={cloItems} onItemsChange={setCloItems} />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function dateText(courseInfo: CourseInfo | null) {
  if (!courseInfo?.updatedAt) return 'اليوم';
  try {
    return new Intl.DateTimeFormat('ar-SA', { dateStyle: 'medium' }).format(new Date(courseInfo.updatedAt));
  } catch {
    return 'اليوم';
  }
}
