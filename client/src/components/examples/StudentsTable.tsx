import { useState } from 'react';
import StudentsTable from '../StudentsTable';
import { Student } from '@/types/course';

const mockStudents: Student[] = [
  { id: '1', studentId: '202301001', name: 'أحمد محمد علي', email: 'ahmed@example.com', phone: '0501234567' },
  { id: '2', studentId: '202301002', name: 'فاطمة سعيد', email: 'fatima@example.com', phone: '0509876543' },
];

export default function StudentsTableExample() {
  const [students, setStudents] = useState<Student[]>(mockStudents);

  return (
    <div className="p-6 bg-background min-h-screen" dir="rtl">
      <StudentsTable students={students} onStudentsChange={setStudents} />
    </div>
  );
}
