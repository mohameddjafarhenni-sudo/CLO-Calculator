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
  quiz1_q1: number;
  quiz1_q2: number;
  quiz1_q3: number;
  quiz1_q4: number;
  quiz2_q1: number;
  quiz2_q2: number;
  quiz2_q3: number;
  quiz2_q4: number;
  assignments_q1: number;
  assignments_q2: number;
  assignments_q3: number;
  assignments_q4: number;
  final_q1: number;
  final_q2: number;
  final_q3: number;
  final_q4: number;
  total: number;
}

export default function GradesTable() {
  const [grades, setGrades] = useState<GradeEntry[]>([
    { 
      studentId: '202301001', 
      studentName: 'أحمد محمد علي',
      quiz1_q1: 1.1, quiz1_q2: 1.2, quiz1_q3: 2.2, quiz1_q4: 2.3,
      quiz2_q1: 1.2, quiz2_q2: 1.3, quiz2_q3: 2.1, quiz2_q4: 1.3,
      assignments_q1: 1.2, assignments_q2: 1.3, assignments_q3: 2.2, assignments_q4: 2.3,
      final_q1: 1.2, final_q2: 2.2, final_q3: 1.2, final_q4: 2.3,
      total: 0
    },
    { 
      studentId: '202301002', 
      studentName: 'فاطمة سعيد',
      quiz1_q1: 1.0, quiz1_q2: 1.1, quiz1_q3: 2.0, quiz1_q4: 2.2,
      quiz2_q1: 1.1, quiz2_q2: 1.2, quiz2_q3: 2.0, quiz2_q4: 1.2,
      assignments_q1: 1.1, assignments_q2: 1.2, assignments_q3: 2.1, assignments_q4: 2.2,
      final_q1: 1.1, final_q2: 2.1, final_q3: 1.1, final_q4: 2.2,
      total: 0
    },
    { 
      studentId: '202301003', 
      studentName: 'محمد خالد',
      quiz1_q1: 1.2, quiz1_q2: 1.3, quiz1_q3: 2.3, quiz1_q4: 2.4,
      quiz2_q1: 1.3, quiz2_q2: 1.4, quiz2_q3: 2.2, quiz2_q4: 1.4,
      assignments_q1: 1.3, assignments_q2: 1.4, assignments_q3: 2.3, assignments_q4: 2.4,
      final_q1: 1.3, final_q2: 2.3, final_q3: 1.3, final_q4: 2.4,
      total: 0
    },
  ]);

  const calculateTotal = (grade: GradeEntry) => {
    const fields: (keyof GradeEntry)[] = [
      'quiz1_q1', 'quiz1_q2', 'quiz1_q3', 'quiz1_q4',
      'quiz2_q1', 'quiz2_q2', 'quiz2_q3', 'quiz2_q4',
      'assignments_q1', 'assignments_q2', 'assignments_q3', 'assignments_q4',
      'final_q1', 'final_q2', 'final_q3', 'final_q4'
    ];
    return fields.reduce((sum, field) => sum + (grade[field] as number), 0);
  };

  const updateGrade = (studentId: string, field: keyof GradeEntry, value: string) => {
    const numValue = parseFloat(value) || 0;
    setGrades(grades.map(g => {
      if (g.studentId === studentId) {
        const updated = { ...g, [field]: numValue };
        updated.total = calculateTotal(updated);
        return updated;
      }
      return g;
    }));
  };

  const assessmentGroups = [
    {
      label: 'اختبار فصلي 1',
      fields: [
        { key: 'quiz1_q1' as const, label: 'س1', outcomeCode: '1.1' },
        { key: 'quiz1_q2' as const, label: 'س2', outcomeCode: '1.2' },
        { key: 'quiz1_q3' as const, label: 'س3', outcomeCode: '2.2' },
        { key: 'quiz1_q4' as const, label: 'س4', outcomeCode: '2.3' },
      ]
    },
    {
      label: 'اختبار فصلي 2',
      fields: [
        { key: 'quiz2_q1' as const, label: 'س1', outcomeCode: '1.2' },
        { key: 'quiz2_q2' as const, label: 'س2', outcomeCode: '1.3' },
        { key: 'quiz2_q3' as const, label: 'س3', outcomeCode: '2.1' },
        { key: 'quiz2_q4' as const, label: 'س4', outcomeCode: '1.3' },
      ]
    },
    {
      label: 'الواجبات',
      fields: [
        { key: 'assignments_q1' as const, label: 'س1', outcomeCode: '1.2' },
        { key: 'assignments_q2' as const, label: 'س2', outcomeCode: '1.3' },
        { key: 'assignments_q3' as const, label: 'س3', outcomeCode: '2.2' },
        { key: 'assignments_q4' as const, label: 'س4', outcomeCode: '2.3' },
      ]
    },
    {
      label: 'الاختبار النهائي',
      fields: [
        { key: 'final_q1' as const, label: 'س1', outcomeCode: '1.2' },
        { key: 'final_q2' as const, label: 'س2', outcomeCode: '2.2' },
        { key: 'final_q3' as const, label: 'س3', outcomeCode: '1.2' },
        { key: 'final_q4' as const, label: 'س4', outcomeCode: '2.3' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-roboto font-medium text-xl text-foreground">جدول الدرجات</h2>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-sm text-center sticky right-0 bg-[#37474F] z-10">
                الدرجة الكلية
              </TableHead>
              {assessmentGroups.map(group => (
                <TableHead 
                  key={group.label} 
                  colSpan={group.fields.length}
                  className="text-white font-roboto font-medium text-sm text-center border-l border-white/20"
                >
                  {group.label}
                </TableHead>
              ))}
              <TableHead className="text-white font-roboto font-medium text-sm text-right sticky right-0 bg-[#37474F] z-10">اسم الطالب</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right sticky right-0 bg-[#37474F] z-10">الرقم الجامعي</TableHead>
            </TableRow>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-xs text-center sticky right-0 bg-[#37474F] z-10 border-t border-white/20"></TableHead>
              {assessmentGroups.map(group => 
                group.fields.map(field => (
                  <TableHead 
                    key={field.key}
                    className="text-white font-roboto font-medium text-xs text-center border-t border-white/20"
                  >
                    {field.label}
                  </TableHead>
                ))
              )}
              <TableHead className="text-white font-roboto font-medium text-xs text-center sticky right-0 bg-[#37474F] z-10 border-t border-white/20"></TableHead>
              <TableHead className="text-white font-roboto font-medium text-xs text-center sticky right-0 bg-[#37474F] z-10 border-t border-white/20"></TableHead>
            </TableRow>
            <TableRow className="bg-[#FFD54F] hover:bg-[#FFD54F]">
              <TableHead className="text-[#37474F] font-roboto font-medium text-xs text-center sticky right-0 bg-[#FFD54F] z-10 border-t border-border">
                رمز الناتج
              </TableHead>
              {assessmentGroups.map(group => 
                group.fields.map(field => (
                  <TableHead 
                    key={`outcome-${field.key}`}
                    className="text-[#37474F] font-roboto font-medium text-xs text-center border-t border-border"
                  >
                    {field.outcomeCode}
                  </TableHead>
                ))
              )}
              <TableHead className="text-[#37474F] font-roboto font-medium text-xs text-center sticky right-0 bg-[#FFD54F] z-10 border-t border-border"></TableHead>
              <TableHead className="text-[#37474F] font-roboto font-medium text-xs text-center sticky right-0 bg-[#FFD54F] z-10 border-t border-border"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade, index) => (
              <TableRow 
                key={grade.studentId}
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                data-testid={`row-grade-${grade.studentId}`}
              >
                <TableCell className="p-2 text-center font-medium text-primary sticky right-0 bg-inherit z-10" dir="ltr">
                  {grade.total.toFixed(1)}
                </TableCell>
                {assessmentGroups.map(group => 
                  group.fields.map(field => (
                    <TableCell key={field.key} className="p-1">
                      <Input
                        type="number"
                        step="0.1"
                        value={grade[field.key]}
                        onChange={(e) => updateGrade(grade.studentId, field.key, e.target.value)}
                        className="h-8 text-center text-sm"
                        min="0"
                        data-testid={`input-grade-${grade.studentId}-${field.key}`}
                        dir="ltr"
                      />
                    </TableCell>
                  ))
                )}
                <TableCell className="p-3 text-sm font-medium sticky right-0 bg-inherit z-10">{grade.studentName}</TableCell>
                <TableCell className="p-3 text-sm sticky right-0 bg-inherit z-10" dir="ltr">{grade.studentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
