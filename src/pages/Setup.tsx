import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";

export default function Setup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    professorName: '',
    moduleName: '',
    moduleCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store data in localStorage for now
    localStorage.setItem('courseInfo', JSON.stringify(formData));
    console.log('Course info saved:', formData);
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6" dir="rtl">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-12 h-12 text-primary" />
            </div>
          </div>
          <CardTitle className="font-roboto text-2xl">إعداد نظام قياس نواتج التعلم</CardTitle>
          <CardDescription className="text-base">
            يرجى إدخال بيانات المقرر الدراسي والأستاذ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="professorName" className="font-roboto font-medium text-sm">
                اسم الأستاذ الكامل
              </Label>
              <Input
                id="professorName"
                value={formData.professorName}
                onChange={(e) => setFormData({ ...formData, professorName: e.target.value })}
                placeholder="د. محمد أحمد العلي"
                required
                data-testid="input-professor-name"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moduleName" className="font-roboto font-medium text-sm">
                اسم المقرر
              </Label>
              <Input
                id="moduleName"
                value={formData.moduleName}
                onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
                placeholder="مقدمة في البرمجة"
                required
                data-testid="input-module-name"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moduleCode" className="font-roboto font-medium text-sm">
                رمز المقرر
              </Label>
              <Input
                id="moduleCode"
                value={formData.moduleCode}
                onChange={(e) => setFormData({ ...formData, moduleCode: e.target.value })}
                placeholder="CS101"
                required
                data-testid="input-module-code"
                dir="ltr"
                className="text-base"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                data-testid="button-save-setup"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                حفظ والمتابعة
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
