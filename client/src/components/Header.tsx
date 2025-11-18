import { FileText, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-[#37474F] text-white shadow-md sticky top-0 z-50">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6" />
          <h1 className="font-roboto font-bold text-xl">نظام قياس نواتج التعلم</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => console.log('Export PDF clicked')}
            data-testid="button-export-pdf"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => console.log('Print clicked')}
            data-testid="button-print"
          >
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
        </div>
      </div>
    </header>
  );
}
