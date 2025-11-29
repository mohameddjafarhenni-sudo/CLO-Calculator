import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Upload, Plus, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { Assessment, GradeEntry, Question } from "@/types/course";

interface GradesTableProps {
  assessments: Assessment[];
  grades: GradeEntry[];
  onAssessmentsChange: (assessments: Assessment[]) => void;
  onGradesChange: (grades: GradeEntry[]) => void;
}

export default function GradesTable({
  assessments,
  grades,
  onAssessmentsChange,
  onGradesChange,
}: GradesTableProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const [isStructureDialogOpen, setIsStructureDialogOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const [assessmentForm, setAssessmentForm] = useState({ label: '' });
  const [questionForm, setQuestionForm] = useState({ label: '', outcomeCode: '' });

  const calculateTotal = (gradeEntry: GradeEntry) => {
    return Object.values(gradeEntry.grades).reduce((sum, val) => sum + val, 0);
  };

  const updateGrade = (studentId: string, field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    onGradesChange(grades.map(g => {
      if (g.studentId === studentId) {
        const updated = {
          ...g,
          grades: { ...g.grades, [field]: numValue }
        };
        updated.total = calculateTotal(updated);
        return updated;
      }
      return g;
    }));
  };

  // Assessment management
  const handleAddAssessment = () => {
    if (!assessmentForm.label.trim()) return;
    
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      label: assessmentForm.label,
      questions: []
    };
    
    onAssessmentsChange([...assessments, newAssessment]);
    setAssessmentForm({ label: '' });
    toast({
      title: "تمت الإضافة",
      description: "تم إضافة التقييم بنجاح",
    });
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    onAssessmentsChange(assessments.filter(a => a.id !== assessmentId));
    // Remove grades for this assessment
    onGradesChange(grades.map(g => {
      const newGrades = { ...g.grades };
      Object.keys(newGrades).forEach(key => {
        if (key.startsWith(assessmentId + '_')) {
          delete newGrades[key];
        }
      });
      return { ...g, grades: newGrades, total: calculateTotal({ ...g, grades: newGrades }) };
    }));
    toast({
      title: "تم الحذف",
      description: "تم حذف التقييم بنجاح",
    });
  };

  const handleEditAssessment = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setAssessmentForm({ label: assessment.label });
  };

  const handleSaveAssessmentEdit = () => {
    if (!editingAssessment) return;
    
    onAssessmentsChange(assessments.map(a =>
      a.id === editingAssessment.id ? { ...a, label: assessmentForm.label } : a
    ));
    setEditingAssessment(null);
    setAssessmentForm({ label: '' });
    toast({
      title: "تم التحديث",
      description: "تم تحديث التقييم بنجاح",
    });
  };

  const handleAddQuestion = (assessmentId: string) => {
    if (!questionForm.label.trim() || !questionForm.outcomeCode.trim()) return;

    const newQuestion: Question = {
      id: 'q' + Date.now(),
      label: questionForm.label,
      outcomeCode: questionForm.outcomeCode
    };

    onAssessmentsChange(assessments.map(a =>
      a.id === assessmentId
        ? { ...a, questions: [...a.questions, newQuestion] }
        : a
    ));

    // Add grade field for all students
      onGradesChange(grades.map(g => ({
      ...g,
      grades: { ...g.grades, [`${assessmentId}_${newQuestion.id}`]: 0 }
    })));

    setQuestionForm({ label: '', outcomeCode: '' });
    toast({
      title: "تمت الإضافة",
      description: "تم إضافة السؤال بنجاح",
    });
  };

  const handleDeleteQuestion = (assessmentId: string, questionId: string) => {
    onAssessmentsChange(assessments.map(a =>
      a.id === assessmentId
        ? { ...a, questions: a.questions.filter(q => q.id !== questionId) }
        : a
    ));

    // Remove grade field for all students
    const fieldKey = `${assessmentId}_${questionId}`;
      onGradesChange(grades.map(g => {
      const newGrades = { ...g.grades };
      delete newGrades[fieldKey];
      return { ...g, grades: newGrades, total: calculateTotal({ ...g, grades: newGrades }) };
    }));

    toast({
      title: "تم الحذف",
      description: "تم حذف السؤال بنجاح",
    });
  };

  const handleEditQuestion = (assessmentId: string, questionId: string, outcomeCode: string) => {
    onAssessmentsChange(assessments.map(a =>
      a.id === assessmentId
        ? {
            ...a,
            questions: a.questions.map(q =>
              q.id === questionId ? { ...q, outcomeCode } : q
            )
          }
        : a
    ));
  };

  // XLSX Import
  const handleImportGrades = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        if (jsonData.length < 4) {
          throw new Error('Invalid file format');
        }

        // Parse headers to understand structure
        const headers = jsonData[0];
        const importedGrades: GradeEntry[] = [];

        // Start from row 4 (after 3 header rows)
        for (let i = 3; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row[0]) continue; // Skip empty rows

          const gradeEntry: GradeEntry = {
            studentId: row[0]?.toString() || '',
            studentName: row[1]?.toString() || '',
            grades: {},
            total: 0
          };

          let colIndex = 2; // Start after studentId and studentName
          assessments.forEach(assessment => {
            assessment.questions.forEach(question => {
              const fieldKey = `${assessment.id}_${question.id}`;
              gradeEntry.grades[fieldKey] = parseFloat(row[colIndex]) || 0;
              colIndex++;
            });
          });

          gradeEntry.total = calculateTotal(gradeEntry);
          importedGrades.push(gradeEntry);
        }

  onGradesChange(importedGrades);
        toast({
          title: "تم الاستيراد",
          description: `تم استيراد ${importedGrades.length} درجات`,
        });
      } catch (error) {
        toast({
          title: "خطأ في الاستيراد",
          description: "تأكد من صحة تنسيق الملف",
          variant: "destructive",
        });
        console.error('Import error:', error);
      }
    };
    reader.readAsBinaryString(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-roboto font-medium text-xl text-foreground">جدول الدرجات</h2>
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImportGrades}
            className="hidden"
            data-testid="input-import-grades"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            data-testid="button-import-grades"
          >
            <Upload className="w-4 h-4 ml-2" />
          إستيراد من ملف
          </Button>
          <Button
            onClick={() => setIsStructureDialogOpen(true)}
            variant="outline"
            className="border-chart-3 text-chart-3 hover:bg-chart-3/10"
            data-testid="button-manage-structure"
          >
            <Settings className="w-4 h-4 ml-2" />
            إدارة هيكل الدرجات
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-sm text-center sticky right-0 bg-[#37474F] z-10">
                الدرجة الكلية
              </TableHead>
              {assessments.map(assessment => (
                <TableHead
                  key={assessment.id}
                  colSpan={assessment.questions.length}
                  className="text-white font-roboto font-medium text-sm text-center border-l border-white/20"
                >
                  {assessment.label}
                </TableHead>
              ))}
              <TableHead className="text-white font-roboto font-medium text-sm text-right sticky right-0 bg-[#37474F] z-10">اسم الطالب</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right sticky right-0 bg-[#37474F] z-10">الرقم الجامعي</TableHead>
            </TableRow>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-xs text-center sticky right-0 bg-[#37474F] z-10 border-t border-white/20"></TableHead>
              {assessments.map(assessment =>
                assessment.questions.map(question => (
                  <TableHead
                    key={`${assessment.id}_${question.id}`}
                    className="text-white font-roboto font-medium text-xs text-center border-t border-white/20"
                  >
                    {question.label}
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
              {assessments.map(assessment =>
                assessment.questions.map(question => (
                  <TableHead
                    key={`outcome-${assessment.id}_${question.id}`}
                    className="text-[#37474F] font-roboto font-medium text-xs text-center border-t border-border"
                  >
                    {question.outcomeCode}
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
                {assessments.map(assessment =>
                  assessment.questions.map(question => {
                    const fieldKey = `${assessment.id}_${question.id}`;
                    return (
                      <TableCell key={fieldKey} className="p-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={grade.grades[fieldKey] || 0}
                          onChange={(e) => updateGrade(grade.studentId, fieldKey, e.target.value)}
                          className="h-8 text-center text-sm"
                          min="0"
                          data-testid={`input-grade-${grade.studentId}-${fieldKey}`}
                          dir="ltr"
                        />
                      </TableCell>
                    );
                  })
                )}
                <TableCell className="p-3 text-sm font-medium sticky right-0 bg-inherit z-10">{grade.studentName}</TableCell>
                <TableCell className="p-3 text-sm sticky right-0 bg-inherit z-10" dir="ltr">{grade.studentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Structure Management Dialog */}
      <Dialog open={isStructureDialogOpen} onOpenChange={setIsStructureDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-roboto">إدارة هيكل جدول الدرجات</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Add new assessment */}
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-roboto font-medium mb-3">إضافة تقييم جديد</h3>
              <div className="flex gap-3">
                <Input
                  placeholder="اسم التقييم (مثال: اختبار فصلي 1)"
                  value={assessmentForm.label}
                  onChange={(e) => setAssessmentForm({ label: e.target.value })}
                  data-testid="input-assessment-name"
                />
                {editingAssessment ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveAssessmentEdit} data-testid="button-save-assessment-edit">
                      حفظ التعديل
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditingAssessment(null);
                      setAssessmentForm({ label: '' });
                    }}>
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleAddAssessment} data-testid="button-add-assessment">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة
                  </Button>
                )}
              </div>
            </div>

            {/* Assessments list */}
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-roboto font-medium text-lg">{assessment.label}</h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditAssessment(assessment)}
                        data-testid={`button-edit-assessment-${assessment.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteAssessment(assessment.id)}
                        data-testid={`button-delete-assessment-${assessment.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-2 mb-3">
                    {assessment.questions.map((question) => (
                      <div key={question.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                        <span className="font-medium min-w-[60px]">{question.label}</span>
                        <Input
                          className="max-w-[120px]"
                          value={question.outcomeCode}
                          onChange={(e) => handleEditQuestion(assessment.id, question.id, e.target.value)}
                          placeholder="رمز الناتج"
                          data-testid={`input-outcome-${assessment.id}-${question.id}`}
                          dir="ltr"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive ml-auto"
                          onClick={() => handleDeleteQuestion(assessment.id, question.id)}
                          data-testid={`button-delete-question-${assessment.id}-${question.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Add question */}
                  <div className="flex gap-3 pt-2 border-t">
                    <Input
                      placeholder="اسم السؤال (مثال: س5)"
                      value={questionForm.label}
                      onChange={(e) => setQuestionForm({ ...questionForm, label: e.target.value })}
                      data-testid={`input-question-label-${assessment.id}`}
                    />
                    <Input
                      placeholder="رمز الناتج"
                      value={questionForm.outcomeCode}
                      onChange={(e) => setQuestionForm({ ...questionForm, outcomeCode: e.target.value })}
                      data-testid={`input-question-outcome-${assessment.id}`}
                      dir="ltr"
                      className="max-w-[150px]"
                    />
                    <Button
                      onClick={() => handleAddQuestion(assessment.id)}
                      data-testid={`button-add-question-${assessment.id}`}
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة سؤال
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
