import { useState } from "react";
import { Download, Printer } from "lucide-react";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getReportExportData, type ReportExportData } from "@/lib/reportExport";

const SECTION_TITLES: Record<string, string> = {
  hero: "مقدمة التقرير",
  "tab-navigation": "إدارة التبويبات",
  "summary-cards": "مؤشرات الأداء المختصرة",
  "report-overview": "نظرة عامة على التقدم",
  "overview-panel": "لوحة الملخص",
  "about-faculty": "نبذة تعريفية",
  "students-table": "بيانات الطلاب",
  "grades-table": "درجات الطلبة",
  "syllabus-table": "المنهج ونواتج التعلم",
  "data-tables": "الجداول",
};

const numberFormatter = new Intl.NumberFormat("ar-SA");
const STUDENT_EXPORT_LIMIT = 25;

type HeadingValue = (typeof HeadingLevel)[keyof typeof HeadingLevel];

const createParagraph = (text: string, heading?: HeadingValue) =>
  new Paragraph({
    text,
    heading,
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: { after: 120 },
  });

const extractTextLines = (element: HTMLElement) => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script,style").forEach((node) => node.remove());
  const text = clone.innerText.replace(/\u00A0/g, " ").trim();
  if (!text) return [];
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.filter((line, index) => line !== lines[index - 1]);
};

const convertTableToDocx = (tableElement: HTMLTableElement) => {
  const rows = Array.from(tableElement.rows).map(
    (row) =>
      new TableRow({
        children: Array.from(row.cells).map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell.innerText.trim() || " " })],
                  bidirectional: true,
                  alignment: AlignmentType.RIGHT,
                  spacing: { after: 80 },
                }),
              ],
            }),
        ),
      }),
  );

  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    alignment: AlignmentType.CENTER,
  });
};

const createTableCell = (text: string, options?: { bold?: boolean; shading?: string }) =>
  new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: options?.bold })],
        bidirectional: true,
        alignment: AlignmentType.RIGHT,
        spacing: { after: 80 },
      }),
    ],
    shading: options?.shading
      ? {
          fill: options.shading,
        }
      : undefined,
  });

const createDocTable = (headers: string[], rows: string[][]) => {
  if (!rows.length) return null;

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    alignment: AlignmentType.CENTER,
    rows: [
      new TableRow({
        children: headers.map((header) =>
          createTableCell(header, { bold: true, shading: "E8EAED" })
        ),
      }),
      ...rows.map((row) =>
        new TableRow({
          children: row.map((cell) => createTableCell(cell)),
        })
      ),
    ],
  });
};

const formatPercent = (value: number | string) => `${value}%`;

const buildStructuredSections = (data: ReportExportData) => {
  const sections: Array<Paragraph | Table> = [];
  const courseInfo = data.courseInfo;
  const issueDate = new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(data.generatedAt));

  sections.push(createParagraph("مقدمة التقرير", HeadingLevel.HEADING_1));
  sections.push(
    createParagraph(
      `تم إعداد هذا التقرير لمتابعة نواتج تعلم المقرر ${courseInfo?.moduleName ?? ""} (${courseInfo?.moduleCode ?? "—"}) بإشراف ${courseInfo?.professorName ?? "—"}.`
    )
  );

  const metaTable = createDocTable(
    ["البند", "القيمة"],
    [
      ["اسم المقرر", courseInfo?.moduleName ?? "—"],
      ["رمز المقرر", courseInfo?.moduleCode ?? "—"],
      ["عضو هيئة التدريس", courseInfo?.professorName ?? "—"],
      ["تاريخ الإصدار", issueDate],
    ]
  );
  if (metaTable) sections.push(metaTable);

  sections.push(createParagraph("ملخص الأداء", HeadingLevel.HEADING_2));
  const stats = data.summaryStats;
  const summaryTable = createDocTable(
    ["المؤشر", "القيمة"],
    [
      ["عدد الطلاب", numberFormatter.format(stats.studentsCount)],
      ["متوسط التحصيل", `${stats.averageAchievement.toFixed(1)}%`],
      ["نسبة النجاح", `${stats.successRate}% (${stats.successCount} طالب)`],
      ["نواتج التعلم المغطاة", numberFormatter.format(stats.outcomesCount)],
    ]
  );
  if (summaryTable) sections.push(summaryTable);

  if (stats.cloCoverage.length) {
    sections.push(createParagraph("تغطية نواتج التعلم", HeadingLevel.HEADING_3));
    const cloTable = createDocTable(
      ["الرمز", "الوصف", "نسبة التغطية"],
      stats.cloCoverage.map((clo) => [clo.code, clo.label, `${clo.percentage}%`])
    );
    if (cloTable) sections.push(cloTable);
  }

  sections.push(createParagraph("توزيع حالات النجاح والدعم", HeadingLevel.HEADING_2));
  const passFailTable = createDocTable(
    ["الحالة", "عدد الطلاب", "النسبة المئوية"],
    data.passFailData.map((item) => [
      item.label,
      numberFormatter.format(item.value),
      formatPercent(item.percentage),
    ])
  );
  if (passFailTable) sections.push(passFailTable);

  if (data.gradeTotalsData.length) {
    sections.push(createParagraph("أفضل الدرجات", HeadingLevel.HEADING_2));
    const topGrades = data.gradeTotalsData.slice(0, 10);
    const gradesTable = createDocTable(
      ["الطالب", "الدرجة المحققة", "النسبة"],
      topGrades.map((entry) => [
        entry.student,
        entry.total.toFixed(1),
        formatPercent(entry.percentage),
      ])
    );
    if (gradesTable) sections.push(gradesTable);
  }

  if (data.assessmentPerformanceData.length) {
    sections.push(createParagraph("تحليل التقييمات", HeadingLevel.HEADING_2));
    const assessmentTable = createDocTable(
      ["التقييم", "نسبة الإتقان"],
      data.assessmentPerformanceData.map((item) => [item.label, formatPercent(item.value)])
    );
    if (assessmentTable) sections.push(assessmentTable);
  }

  if (data.students.length) {
    sections.push(createParagraph("بيانات الطلاب", HeadingLevel.HEADING_2));
    const studentRows = data.students.slice(0, STUDENT_EXPORT_LIMIT).map((student) => [
      student.studentId,
      student.name,
      student.email ?? "—",
      student.phone ?? "—",
    ]);
    const studentsTable = createDocTable(
      ["الرقم الجامعي", "اسم الطالب", "البريد الإلكتروني", "رقم التواصل"],
      studentRows
    );
    if (studentsTable) sections.push(studentsTable);

    if (data.students.length > STUDENT_EXPORT_LIMIT) {
      sections.push(
        createParagraph(
          `تم إدراج ${STUDENT_EXPORT_LIMIT} من أصل ${data.students.length} طالب. يرجى الرجوع إلى المنصة للاطلاع على القائمة الكاملة.`
        )
      );
    }
  }

  if (data.assessments.length) {
    sections.push(createParagraph("هيكل التقييمات", HeadingLevel.HEADING_2));
    const assessmentRows = data.assessments.map((assessment) => [
      assessment.label,
      numberFormatter.format(assessment.questions.length),
      assessment.questions.map((q) => q.outcomeCode).join("، ") || "—",
    ]);
    const assessmentsTable = createDocTable(
      ["التقييم", "عدد الأسئلة", "رموز نواتج التعلم"],
      assessmentRows
    );
    if (assessmentsTable) sections.push(assessmentsTable);
  }

  if (data.cloItems.length) {
    sections.push(createParagraph("نواتج التعلم المعتمدة", HeadingLevel.HEADING_2));
    const cloRows = data.cloItems.map((item) => [
      item.code,
      item.description,
      formatPercent(item.weight),
    ]);
    const cloTable = createDocTable(["الرمز", "الوصف", "الوزن النسبي"], cloRows);
    if (cloTable) sections.push(cloTable);
  }

  sections.push(
    createParagraph(
      "تم استخراج هذه البيانات مباشرة من لوحة المتابعة، ويمكن تعديلها أو تحديثها من خلال النظام قبل إصدار تقارير جديدة."
    )
  );

  return sections;
};

const buildDomSections = (targets: HTMLElement[]) => {
  const docChildren: Array<Paragraph | Table> = [];

  targets.forEach((element, index) => {
    const sectionKey = element.dataset.reportSection || "";
    const title =
      SECTION_TITLES[sectionKey] ||
      element.querySelector("h1, h2, h3, h4")?.textContent?.trim() ||
      `قسم ${index + 1}`;

    docChildren.push(createParagraph(title, HeadingLevel.HEADING_2));

    const lines = extractTextLines(element);
    lines.forEach((line) => {
      docChildren.push(createParagraph(line));
    });

    const htmlTables = Array.from(element.querySelectorAll("table"));
    htmlTables.forEach((table) => {
      docChildren.push(convertTableToDocx(table));
    });

    if (index < targets.length - 1) {
      docChildren.push(createParagraph(" "));
    }
  });

  return docChildren;
};

const createDocFromSections = (children: Array<Paragraph | Table>) =>
  new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children,
      },
    ],
  });

const downloadDocxBlob = async (doc: Document, filename: string) => {
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};

export default function Header() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const getReportElement = () =>
    typeof document !== "undefined"
      ? document.getElementById("report-content")
      : null;

  const getReportSections = () => {
    const container = getReportElement();
    if (!container) return [];
    return Array.from(
      container.querySelectorAll<HTMLElement>("[data-report-section]")
    );
  };

  const handlePrint = () => {
    if (!getReportElement()) {
      toast({
        title: "لا يمكن الطباعة",
        description: "تأكد من تحميل محتوى التقرير قبل محاولة الطباعة.",
        variant: "destructive",
      });
      return;
    }
    window.print();
  };

  const handleExportDocx = async () => {
    const target = getReportElement();
    if (!target) {
      toast({
        title: "لم يتم العثور على التقرير",
        description: "قم بتحميل الصفحة بالكامل ثم أعد المحاولة.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const structuredData = getReportExportData();
      const domSections = getReportSections();
      const targets = domSections.length ? domSections : [target];
      const docChildren = structuredData
        ? buildStructuredSections(structuredData)
        : buildDomSections(targets);

      if (!docChildren.length) {
        throw new Error("لا توجد بيانات متاحة لإنشاء التقرير.");
      }

      const filenameBase = structuredData?.courseInfo?.moduleCode
        ? `CLO-report-${structuredData.courseInfo.moduleCode}`
        : "CLO-report";
      const filename = `${filenameBase}-${new Date().toISOString().slice(0, 10)}.docx`;

      const doc = createDocFromSections(docChildren);
      await downloadDocxBlob(doc, filename);

      toast({
        title: "تم إنشاء ملف Word",
        description: structuredData
          ? "يشمل الملف أحدث الجداول والإحصاءات من لوحة التحكم."
          : "تم استخدام محتوى الصفحة الحالي في التقرير.",
      });
    } catch (error) {
      console.error("DOCX export error", error);
      toast({
        title: "تعذر إنشاء ملف Word",
        description:
          error instanceof Error
            ? error.message
            : "حدث خطأ أثناء تصدير الملف. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 xl:px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Quality Dashboard</p>
          <h1 className="text-2xl font-semibold text-primary">لوحة قياس نواتج التعلم</h1>
          <p className="text-sm text-muted-foreground mt-1">
            متابعة الأداء وإعداد تقارير المقررات
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2" role="group" aria-label="إجراءات التقرير">
          <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-muted text-primary hover:bg-muted"
                data-testid="button-about"
              >
                نبذة عن المطور
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>نبذة عن المطور</DialogTitle>
              </DialogHeader>
              <p className="text-sm leading-7 text-muted-foreground">
                الدكتور محمد جعفر هني عضو هيئة التدريس ورئيس لجنة الجودة بقسم الاقتصاد بكلية الأعمال بالجامعة الإسلامية بالمدينة المنورة.
              للتواصل: mhenni@iu.edu.sa
              </p>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            className="border-muted text-primary hover:bg-muted"
            onClick={handlePrint}
            data-testid="button-print"
          >
            <Printer className="w-4 h-4 ml-2" />
            طباعة التقرير
          </Button>
          <Button
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-white"
            onClick={handleExportDocx}
            disabled={isExporting}
            data-testid="button-export-docx"
          >
            <Download className="w-4 h-4 ml-2" />
            {isExporting ? "جارٍ التصدير..." : "تصدير Word"}
          </Button>
        </div>
      </div>
    </header>
  );
}


