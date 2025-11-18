import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
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

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
}

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', studentId: '202301001', name: 'أحمد محمد علي', email: 'ahmed@example.com' },
    { id: '2', studentId: '202301002', name: 'فاطمة سعيد', email: 'fatima@example.com' },
    { id: '3', studentId: '202301003', name: 'محمد خالد', email: 'mohammed@example.com' },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ studentId: '', name: '', email: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ studentId: student.studentId, name: student.name, email: student.email });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-roboto font-medium text-xl text-foreground">قائمة الطلاب</h2>
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

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#37474F] hover:bg-[#37474F]">
              <TableHead className="text-white font-roboto font-medium text-sm text-right">الإجراءات</TableHead>
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
