import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SummaryStats } from "@/components/SummaryCards";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

export interface PassFailDatum {
  status: "pass" | "fail";
  label: string;
  value: number;
  percentage: number;
}

export interface GradeTotalDatum {
  student: string;
  total: number;
  percentage: number;
}

export interface AssessmentPerformanceDatum {
  label: string;
  value: number;
}

interface ReportOverviewProps {
  summary: SummaryStats;
  passFailData: PassFailDatum[];
  gradeTotals: GradeTotalDatum[];
  assessmentPerformance: AssessmentPerformanceDatum[];
  maxScore: number;
}

const passFailConfig = {
  pass: { label: "طلاب ناجحون", color: "hsl(var(--chart-2))" },
  fail: { label: "بحاجة للدعم", color: "hsl(var(--chart-3))" },
};

const gradeTotalsConfig = {
  total: { label: "الدرجة المحققة", color: "hsl(var(--chart-1))" },
};

const assessmentConfig = {
  value: { label: "نسبة الإتقان", color: "hsl(var(--chart-4))" },
};

const numberFormatter = new Intl.NumberFormat("ar-SA");

export default function ReportOverview({
  summary,
  passFailData,
  gradeTotals,
  assessmentPerformance,
  maxScore,
}: ReportOverviewProps) {
  const failRate = Math.max(0, 100 - summary.successRate);
  const safeMaxScore = maxScore || 100;
  const topGrades = gradeTotals.slice(0, 6);

  return (
    <section
      className="iu-section p-6 space-y-6 print:break-inside-avoid"
      aria-labelledby="report-overview"
      data-report-section="report-overview"
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-primary/70">
          Standard report
        </p>
        <h3 id="report-overview" className="text-2xl font-semibold text-primary">
          نظرة عامة على التقدم
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          تم إعداد هذا التقرير لعرض مؤشرات الأداء الرئيسية للمقرر، بما في ذلك حجم الطلاب، نسب النجاح،
          وتوزيع الدرجات ومستوى تحقيق التقييمات المختلفة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="عدد الطلاب" value={summary.studentsCount.toString()} helper="مسجلون في النظام" />
        <MetricCard
          label="متوسط التقدم"
          value={`${summary.averageAchievement.toFixed(1)}%`}
          helper="لكل عناصر التقييم"
        />
        <MetricCard
          label="نسبة النجاح"
          value={`${summary.successRate}%`}
          helper={`${summary.successCount} طالب ناجح`}
        />
        <MetricCard
          label="نسبة الرسوب"
          value={`${failRate}%`}
          helper={`${Math.max(0, summary.studentsCount - summary.successCount)} طالب بحاجة لدعم`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">نسبة النجاح مقابل الدعم</CardTitle>
            <p className="text-sm text-muted-foreground">
              توزيع الطلاب حسب حالتي النجاح والتعثر خلال الفترة الحالية.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ChartContainer config={passFailConfig} className="h-64">
              <PieChart>
                <Pie
                  data={passFailData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  paddingAngle={2}
                  labelLine={false}
                >
                  {passFailData.map((item) => (
                    <Cell
                      key={item.status}
                      fill={`var(--color-${item.status})`}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator nameKey="status" />}
                />
              </PieChart>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {passFailData.map((item) => (
                <div key={item.status} className="rounded-2xl border border-border/60 p-3">
                  <p className="text-muted-foreground text-xs">{item.label}</p>
                  <p className="text-xl font-semibold mt-1">{numberFormatter.format(item.value)}</p>
                  <p className="text-xs text-muted-foreground">{item.percentage}% من إجمالي الطلاب</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">توزيع الدرجات حسب الطالب</CardTitle>
            <p className="text-sm text-muted-foreground">
              أعلى ستة طلاب وفق الدرجة التراكمية (أقصى درجة ممكنة {safeMaxScore}).
            </p>
          </CardHeader>
          <CardContent>
            {topGrades.length ? (
              <ChartContainer config={gradeTotalsConfig} className="h-64">
                <BarChart data={topGrades} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="student" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]} fill="var(--color-total)" />
                </BarChart>
              </ChartContainer>
            ) : (
              <EmptyState message="لا توجد درجات متاحة حتى الآن" />
            )}
            {topGrades.length ? (
              <div className="mt-4 space-y-2 text-sm">
                {topGrades.map((entry) => (
                  <div
                    key={entry.student}
                    className="flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2"
                  >
                    <span className="font-medium text-foreground">{entry.student}</span>
                    <span className="text-sm text-primary" dir="ltr">
                      {entry.total} / {safeMaxScore} ({entry.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">تحليل التقييمات ونواتج التعلم</CardTitle>
          <p className="text-sm text-muted-foreground">
            متوسط الإتقان لكل تقييم بالإضافة إلى أبرز نواتج التعلم المرتبطة به.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {assessmentPerformance.length ? (
            <ChartContainer config={assessmentConfig} className="h-72">
              <BarChart data={assessmentPerformance} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="var(--color-value)" />
              </BarChart>
            </ChartContainer>
          ) : (
            <EmptyState message="لم يتم إدخال بيانات تقييم بعد" />
          )}

          <div className="grid gap-3 md:grid-cols-2">
            {summary.cloCoverage.map((clo) => (
              <div key={clo.code} className="rounded-2xl border border-border/60 p-4">
                <p className="text-sm font-semibold text-primary">{clo.code}</p>
                <p className="text-sm text-muted-foreground mt-1">{clo.label}</p>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${clo.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">نسبة التغطية {clo.percentage}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/80 to-white p-4 text-primary shadow-sm">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-2" dir="ltr">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{helper}</p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-border/80 text-sm text-muted-foreground">
      {message}
    </div>
  );
}
