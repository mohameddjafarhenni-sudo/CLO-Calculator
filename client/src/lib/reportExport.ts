import type { SummaryStats } from "@/components/SummaryCards";
import type {
  PassFailDatum,
  GradeTotalDatum,
  AssessmentPerformanceDatum,
} from "@/components/ReportOverview";
import type { Assessment, GradeEntry, Student, CLOItem, CourseInfo } from "@/types/course";

export interface ReportExportData {
  generatedAt: string;
  courseInfo: CourseInfo | null;
  summaryStats: SummaryStats;
  passFailData: PassFailDatum[];
  gradeTotalsData: GradeTotalDatum[];
  assessmentPerformanceData: AssessmentPerformanceDatum[];
  students: Student[];
  grades: GradeEntry[];
  assessments: Assessment[];
  cloItems: CLOItem[];
}

let latestReportData: ReportExportData | null = null;

export function setReportExportData(data: ReportExportData) {
  latestReportData = data;
}

export function getReportExportData() {
  return latestReportData;
}
