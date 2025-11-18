import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GradeEntry {
  studentId: string;
  studentName: string;
  quiz1: number;
  quiz2: number;
  midterm: number;
  final: number;
  project: number;
  total: number;
}

export default function GradesTable() {
  const [grades, setGrades] = useState<GradeEntry[]>([
    { studentId: '202301001', studentName: 'أحمد محمد علي', quiz1: 8, quiz2: 9, midterm: 22, final: 38, project: 18, total: 95 },
    { studentId: '202301002', studentName: 'فاطمة سعيد', quiz1: 7, quiz2: 8, midterm: 20, final: 35, project: 17, total: 87 },
    { studentId: '202301003', studentName: 'محمد خالد', quiz1: 9, quiz2: 10, midterm: 24, final: 40, project: 19, total: 102 },
  ]);

  const updateGrade = (studentId: string, field: keyof GradeEntry, value: string) => {
    const numValue = parseFloat(value) || 0;
    setGrades(grades.map(g => {
      if (g.studentId === studentId) {
        const updated = { ...g, [field]: numValue };
        updated.total = updated.quiz1 + updated.quiz2 + updated.midterm + updated.final + updated.project;
        return updated;
      }
      return g;
    }));
  };

  const assessments = [
    { key: 'quiz1' as const, label: 'اختبار 1', max: 10 },
    { key: 'quiz2' as const, label: 'اختبار 2', max: 10 },
    { key: 'midterm' as const, label: 'منتصف الفصل', max: 25 },
    { key: 'final' as const, label: 'النهائي', max: 40 },
    { key: 'project' as const, label: 'المشروع', max: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-roboto font-medium text-xl text-foreground">جدول الدرجات</h2>
        <div className="text-sm text-muted-foreground">المجموع الكلي: 105 درجة</div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-sm text-center sticky right-0 bg-[#37474F]">المجموع</TableHead>
              {assessments.map(assessment => (
                <TableHead key={assessment.key} className="text-white font-roboto font-medium text-sm text-center">
                  {assessment.label}
                  <div className="text-xs text-white/70 font-normal">({assessment.max})</div>
                </TableHead>
              ))}
              <TableHead className="text-white font-roboto font-medium text-sm text-right sticky right-0 bg-[#37474F]">اسم الطالب</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right sticky right-0 bg-[#37474F]">الرقم الجامعي</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade, index) => (
              <TableRow 
                key={grade.studentId}
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                data-testid={`row-grade-${grade.studentId}`}
              >
                <TableCell className="p-2 text-center font-medium text-primary sticky right-0 bg-inherit">
                  {grade.total}
                </TableCell>
                {assessments.map(assessment => (
                  <TableCell key={assessment.key} className="p-2">
                    <Input
                      type="number"
                      value={grade[assessment.key]}
                      onChange={(e) => updateGrade(grade.studentId, assessment.key, e.target.value)}
                      className="h-9 text-center"
                      min="0"
                      max={assessment.max}
                      data-testid={`input-grade-${grade.studentId}-${assessment.key}`}
                      dir="ltr"
                    />
                  </TableCell>
                ))}
                <TableCell className="p-3 text-sm font-medium sticky right-0 bg-inherit">{grade.studentName}</TableCell>
                <TableCell className="p-3 text-sm sticky right-0 bg-inherit" dir="ltr">{grade.studentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
