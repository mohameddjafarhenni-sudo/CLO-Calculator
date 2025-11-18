import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function SummaryCards() {
  const stats = [
    {
      title: 'عدد الطلاب',
      value: '3',
      icon: Users,
      color: 'border-r-primary',
      bgColor: 'bg-primary/5',
    },
    {
      title: 'متوسط الدرجات',
      value: '94.7',
      suffix: '%',
      icon: TrendingUp,
      color: 'border-r-chart-2',
      bgColor: 'bg-chart-2/5',
    },
    {
      title: 'نسبة النجاح',
      value: '100',
      suffix: '%',
      icon: Award,
      color: 'border-r-chart-2',
      bgColor: 'bg-chart-2/5',
    },
    {
      title: 'نواتج التعلم',
      value: '4',
      icon: AlertCircle,
      color: 'border-r-chart-3',
      bgColor: 'bg-chart-3/5',
    },
  ];

  const cloAchievement = [
    { code: 'CLO-1', label: 'المفاهيم الأساسية', percentage: 92, color: 'bg-chart-2' },
    { code: 'CLO-2', label: 'حل المشكلات', percentage: 95, color: 'bg-chart-2' },
    { code: 'CLO-3', label: 'التحليل والتصميم', percentage: 88, color: 'bg-chart-2' },
    { code: 'CLO-4', label: 'العمل الجماعي', percentage: 90, color: 'bg-chart-2' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className={`border-r-4 ${stat.color} ${stat.bgColor}`}
              data-testid={`card-stat-${index}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-roboto text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-roboto text-3xl font-bold" dir="ltr">
                  {stat.value}{stat.suffix || ''}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-roboto text-lg">نسب تحقيق نواتج التعلم</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cloAchievement.map((clo, index) => (
            <div key={index} className="space-y-2" data-testid={`clo-achievement-${index}`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-roboto font-medium text-sm">{clo.code}</span>
                  <span className="text-sm text-muted-foreground mr-2">- {clo.label}</span>
                </div>
                <span className="font-roboto font-bold text-sm" dir="ltr">{clo.percentage}%</span>
              </div>
              <Progress 
                value={clo.percentage} 
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
