export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
}

export interface Question {
  id: string;
  label: string;
  outcomeCode: string;
}

export interface Assessment {
  id: string;
  label: string;
  questions: Question[];
}

export interface GradeEntry {
  studentId: string;
  studentName: string;
  grades: Record<string, number>;
  total: number;
}

export interface CLOItem {
  id: string;
  code: string;
  description: string;
  weight: number;
}

export interface CourseInfo {
  professorName: string;
  moduleName: string;
  moduleCode: string;
  updatedAt?: string;
}
