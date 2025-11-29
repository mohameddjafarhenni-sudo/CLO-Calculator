import { useState, useRef } from "react";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/types/course";
import * as XLSX from "xlsx";

interface StudentsTableProps {
  students: Student[];
  onStudentsChange: (students: Student[]) => void;
}

const CSV_ENCODINGS = ["utf-8", "windows-1256", "iso-8859-6"] as const;

const hasEncodingArtifacts = (text: string) => /�|\?{3,}/.test(text);

async function decodeCsvFile(file: File) {
  const buffer = await file.arrayBuffer();

  for (const encoding of CSV_ENCODINGS) {
    try {
      const decoder = new TextDecoder(encoding, { fatal: false });
      const decoded = decoder.decode(buffer);
      if (!hasEncodingArtifacts(decoded)) {
        return decoded;
      }
    } catch (error) {
      console.warn(`فشل فك ترميز الملف بصيغة ${encoding}`, error);
    }
  }

  return new TextDecoder().decode(buffer);
}

export default function StudentsTable({ students, onStudentsChange }: StudentsTableProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '', phone: '' });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ studentId: '', name: '', email: '', phone: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ studentId: student.studentId, name: student.name, email: student.email, phone: student.phone });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    onStudentsChange(students.filter(s => s.id !== id));
    console.log('Delete student:', id);
  };

  const handleSave = () => {
    if (editingStudent) {
      onStudentsChange(students.map(s => 
        s.id === editingStudent.id 
          ? { ...s, ...formData }
          : s
      ));
      console.log('Updated student:', editingStudent.id);
    } else {
      const newStudent = {
        id: Date.now().toString(),
        ...formData
      };
  onStudentsChange([...students, newStudent]);
      console.log('Added new student:', newStudent);
    }
    setIsDialogOpen(false);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const isExcel = /\.xlsx?$/i.test(file.name);
      let importedStudents: Student[] = [];

      if (isExcel) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });

        const hasHeader =
          jsonData.length > 0 &&
          /الرقم الجامعي|studentId/i.test(String(jsonData[0][0] ?? ""));
        const dataRows = hasHeader ? jsonData.slice(1) : jsonData;

        importedStudents = dataRows
          .map((row, index) => ({
            id: Date.now().toString() + index,
            studentId: String(row[0] ?? "").trim(),
            name: String(row[1] ?? "").trim(),
            email: String(row[2] ?? "").trim(),
            phone: String(row[3] ?? "").trim(),
          }))
          .filter((student) => student.studentId);
      } else {
        const text = await decodeCsvFile(file);
        const lines = text
          .split(/\r?\n/)
          .map((line) => line.replace(/\ufeff/g, ""))
          .filter((line) => line.trim());

        if (!lines.length) {
          throw new Error("Empty file");
        }

        const hasHeader = /الرقم الجامعي|studentId/i.test(lines[0]);
        const dataLines = hasHeader ? lines.slice(1) : lines;

        importedStudents = dataLines
          .map((line, index) => {
            const columns = line.split(",").map((value) => value.trim());
            const [studentId, name, email, phone] = columns;
            return {
              id: Date.now().toString() + index,
              studentId: studentId || "",
              name: name || "",
              email: email || "",
              phone: phone || "",
            };
          })
          .filter((student) => student.studentId);
      }

      if (!importedStudents.length) {
        throw new Error("No rows detected");
      }

  onStudentsChange([...students, ...importedStudents]);
      toast({
        title: "تم استيراد البيانات",
        description: `تم إضافة ${importedStudents.length} طالبًا من الملف`,
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "خطأ في الاستيراد",
        description: "تعذر قراءة الملف بسبب الترميز أو التنسيق.",
        variant: "destructive",
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-roboto font-medium text-xl text-foreground">قائمة الطلاب</h2>
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt,.xlsx,.xls"
            onChange={handleImport}
            className="hidden"
            data-testid="input-import-file"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            data-testid="button-import-students"
          >
            <Upload className="w-4 h-4 ml-2" />
            استيراد من ملف
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleAdd}
                className="bg-chart-2 hover:bg-chart-2/90 text-white"
                data-testid="button-add-student"
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة طالب
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="font-roboto">
                {editingStudent ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="font-roboto font-medium text-sm">الرقم الجامعي</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="202301001"
                  data-testid="input-student-id"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="font-roboto font-medium text-sm">الاسم الكامل</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أحمد محمد علي"
                  data-testid="input-student-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-roboto font-medium text-sm">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  data-testid="input-student-email"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-roboto font-medium text-sm">رقم الجوال</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0501234567"
                  data-testid="input-student-phone"
                  dir="ltr"
                />
              </div>
              <Button 
                onClick={handleSave}
                className="w-full bg-chart-2 hover:bg-chart-2/90"
                data-testid="button-save-student"
              >
                حفظ
              </Button>
            </div>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-sm text-right">الإجراءات</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right">رقم الجوال</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right">البريد الإلكتروني</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right">اسم الطالب</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right">الرقم الجامعي</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow 
                key={student.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                data-testid={`row-student-${student.id}`}
              >
                <TableCell className="p-3">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-chart-3 hover:text-chart-3 hover:bg-chart-3/10"
                      onClick={() => handleEdit(student)}
                      data-testid={`button-edit-${student.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(student.id)}
                      data-testid={`button-delete-${student.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="p-3 text-sm" dir="ltr">{student.phone}</TableCell>
                <TableCell className="p-3 text-sm" dir="ltr">{student.email}</TableCell>
                <TableCell className="p-3 text-sm font-medium">{student.name}</TableCell>
                <TableCell className="p-3 text-sm" dir="ltr">{student.studentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
