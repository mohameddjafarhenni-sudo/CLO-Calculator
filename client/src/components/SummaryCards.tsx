import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type SummaryStats = {
  studentsCount: number;
  averageAchievement: number;
  successRate: number;
  successCount: number;
  outcomesCount: number;
  cloCoverage: Array<{
    code: string;
    label: string;
    percentage: number;
  }>;
};

interface SummaryCardsProps {
  stats: SummaryStats;
}

export default function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: 'عدد الطلاب',
      value: stats.studentsCount.toString(),
      icon: Users,
      highlight: 'طلاب مسجلون في المقرر',
      gradient: 'from-primary to-emerald-500'
    },
    {
      title: 'متوسط التحصيل',
      value: stats.averageAchievement.toFixed(1),
      suffix: '%',
      icon: TrendingUp,
      highlight: 'متوسط درجات البنود الحالية',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'نسبة النجاح',
      value: stats.successRate.toString(),
      suffix: '%',
      icon: Award,
      highlight: 'طلاب تجاوزوا حد الإنجاز',
      gradient: 'from-secondary to-amber-500'
    },
    {
      title: 'نواتج التعلم',
      value: stats.outcomesCount.toString(),
      icon: AlertCircle,
      highlight: 'محاور قياس فعّالة',
      gradient: 'from-slate-900 to-slate-700'
    },
  ];

  const cloAchievement = stats.cloCoverage.length
    ? stats.cloCoverage
    : [
        { code: 'CLO-1', label: 'المفاهيم الأساسية', percentage: 0 },
      ];

  return (
    <section className="iu-section p-6 space-y-6" data-report-section="summary-cards">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((stat, index) => {
          const Icon = stat.icon;
          const value = stat.suffix ? `${stat.value}${stat.suffix}` : stat.value;
          return (
            <article
              key={stat.title}
              className={`rounded-3xl p-5 text-white bg-gradient-to-br ${stat.gradient} shadow-lg shadow-black/10 border border-white/10`}
              data-testid={`card-stat-${index}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold" dir="ltr">{value}</p>
                </div>
                <span className="w-12 h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <p className="text-xs text-white/80 mt-3">{stat.highlight}</p>
            </article>
          );
        })}
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">نسب تحقيق نواتج التعلم</CardTitle>
          <p className="text-sm text-muted-foreground">تتبع أداء المكونات الرئيسية وربطه بمحاور الاعتماد</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {cloAchievement.map((clo, index) => (
            <div key={index} className="space-y-2" data-testid={`clo-achievement-${index}`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-semibold text-primary">{clo.code}</span>
                  <span className="text-sm text-muted-foreground mr-2">{clo.label}</span>
                </div>
                <span className="font-bold text-sm" dir="ltr">{clo.percentage}%</span>
              </div>
              <Progress value={clo.percentage} className="h-2 bg-muted" />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
