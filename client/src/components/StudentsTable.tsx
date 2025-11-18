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

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
}

export default function StudentsTable() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', studentId: '202301001', name: 'أحمد محمد علي', email: 'ahmed@example.com', phone: '0501234567' },
    { id: '2', studentId: '202301002', name: 'فاطمة سعيد', email: 'fatima@example.com', phone: '0509876543' },
    { id: '3', studentId: '202301003', name: 'محمد خالد', email: 'mohammed@example.com', phone: '0555551234' },
  ]);
  
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
    setStudents(students.filter(s => s.id !== id));
    console.log('Delete student:', id);
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(students.map(s => 
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
      setStudents([...students, newStudent]);
      console.log('Added new student:', newStudent);
    }
    setIsDialogOpen(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        // Skip header row if present
        const dataLines = lines[0].includes('الرقم الجامعي') || lines[0].includes('studentId') 
          ? lines.slice(1) 
          : lines;
        
        const importedStudents: Student[] = dataLines.map((line, index) => {
          const [studentId, name, email, phone] = line.split(',').map(s => s.trim());
          return {
            id: Date.now().toString() + index,
            studentId: studentId || '',
            name: name || '',
            email: email || '',
            phone: phone || ''
          };
        }).filter(s => s.studentId); // Only include rows with student ID

        setStudents([...students, ...importedStudents]);
        toast({
          title: "تم استيراد البيانات",
          description: `تم إضافة ${importedStudents.length} طالب`,
        });
        console.log('Imported students:', importedStudents);
      } catch (error) {
        toast({
          title: "خطأ في الاستيراد",
          description: "تأكد من صحة تنسيق الملف",
          variant: "destructive",
        });
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
            accept=".csv,.txt"
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
