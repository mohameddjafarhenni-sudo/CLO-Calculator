import { useState } from 'react';
import GradesTable from '../GradesTable';
import { Assessment, GradeEntry } from '@/types/course';

const sampleAssessments: Assessment[] = [
  {
    id: 'quiz1',
    label: 'اختبار فصلي 1',
    questions: [
      { id: 'q1', label: 'س1', outcomeCode: '1.1' },
      { id: 'q2', label: 'س2', outcomeCode: '1.2' },
    ],
  },
  {
    id: 'final',
    label: 'الاختبار النهائي',
    questions: [
      { id: 'q1', label: 'س1', outcomeCode: '2.2' },
      { id: 'q2', label: 'س2', outcomeCode: '2.3' },
    ],
  },
];

const sumGrades = (record: Record<string, number>) =>
  Object.values(record).reduce((sum, value) => sum + (value || 0), 0);

const sampleGrades: GradeEntry[] = [
  {
    studentId: '202301001',
    studentName: 'أحمد محمد علي',
    grades: {
      'quiz1_q1': 18,
      'quiz1_q2': 17,
      'final_q1': 35,
      'final_q2': 40,
    },
    total: 0,
  },
  {
    studentId: '202301002',
    studentName: 'فاطمة سعيد',
    grades: {
      'quiz1_q1': 16,
      'quiz1_q2': 18,
      'final_q1': 33,
      'final_q2': 39,
    },
    total: 0,
  },
].map((entry) => ({
  ...entry,
  total: sumGrades(entry.grades),
}));

export default function GradesTableExample() {
  const [assessments, setAssessments] = useState<Assessment[]>(sampleAssessments);
  const [grades, setGrades] = useState<GradeEntry[]>(sampleGrades);

  return (
    <div className="p-6 bg-background min-h-screen overflow-x-auto" dir="rtl">
      <GradesTable
        assessments={assessments}
        grades={grades}
        onAssessmentsChange={setAssessments}
        onGradesChange={setGrades}
      />
    </div>
  );
}
