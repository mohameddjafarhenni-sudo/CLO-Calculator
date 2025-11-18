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
import { Textarea } from "@/components/ui/textarea";

interface CLOItem {
  id: string;
  code: string;
  description: string;
  weight: number;
}

export default function SyllabusTable() {
  const [cloItems, setCloItems] = useState<CLOItem[]>([
    { id: '1', code: 'CLO-1', description: 'القدرة على فهم المفاهيم الأساسية للبرمجة', weight: 25 },
    { id: '2', code: 'CLO-2', description: 'تطبيق خوارزميات حل المشكلات البرمجية', weight: 30 },
    { id: '3', code: 'CLO-3', description: 'تحليل وتصميم البرامج البسيطة', weight: 25 },
    { id: '4', code: 'CLO-4', description: 'العمل الجماعي وإدارة المشاريع', weight: 20 },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CLOItem | null>(null);
  const [formData, setFormData] = useState({ code: '', description: '', weight: 0 });

  const totalWeight = cloItems.reduce((sum, item) => sum + item.weight, 0);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ code: '', description: '', weight: 0 });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: CLOItem) => {
    setEditingItem(item);
    setFormData({ code: item.code, description: item.description, weight: item.weight });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCloItems(cloItems.filter(item => item.id !== id));
    console.log('Delete CLO:', id);
  };

  const handleSave = () => {
    if (editingItem) {
      setCloItems(cloItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
      console.log('Updated CLO:', editingItem.id);
    } else {
      const newItem = {
        id: Date.now().toString(),
        ...formData
      };
      setCloItems([...cloItems, newItem]);
      console.log('Added new CLO:', newItem);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-roboto font-medium text-xl text-foreground">نواتج التعلم للمقرر</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={handleAdd}
              className="bg-chart-2 hover:bg-chart-2/90 text-white"
              data-testid="button-add-clo"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة ناتج تعلم
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg" dir="rtl">
            <DialogHeader>
              <DialogTitle className="font-roboto">
                {editingItem ? 'تعديل ناتج التعلم' : 'إضافة ناتج تعلم جديد'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="font-roboto font-medium text-sm">رمز الناتج</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="CLO-1"
                  data-testid="input-clo-code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-roboto font-medium text-sm">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="وصف ناتج التعلم..."
                  rows={3}
                  data-testid="input-clo-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="font-roboto font-medium text-sm">الوزن النسبي (%)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                  placeholder="25"
                  data-testid="input-clo-weight"
                  dir="ltr"
                  min="0"
                  max="100"
                />
              </div>
              <Button 
                onClick={handleSave}
                className="w-full bg-chart-2 hover:bg-chart-2/90"
                data-testid="button-save-clo"
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
              <TableHead className="text-white font-roboto font-medium text-sm text-center">الوزن النسبي (%)</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right">الوصف</TableHead>
              <TableHead className="text-white font-roboto font-medium text-sm text-right">رمز الناتج</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cloItems.map((item, index) => (
              <TableRow 
                key={item.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                data-testid={`row-clo-${item.id}`}
              >
                <TableCell className="p-3">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-chart-3 hover:text-chart-3 hover:bg-chart-3/10"
                      onClick={() => handleEdit(item)}
                      data-testid={`button-edit-clo-${item.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(item.id)}
                      data-testid={`button-delete-clo-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="p-3 text-center font-medium" dir="ltr">{item.weight}%</TableCell>
                <TableCell className="p-3 text-sm">{item.description}</TableCell>
                <TableCell className="p-3 text-sm font-medium">{item.code}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-primary/10 font-medium">
              <TableCell className="p-3 text-right" colSpan={2}>
                <span className={totalWeight === 100 ? 'text-chart-2' : 'text-destructive'}>
                  المجموع: {totalWeight}%
                </span>
              </TableCell>
              <TableCell className="p-3" colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
