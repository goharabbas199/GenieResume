import { useRef, useState } from 'react';
import { Download, Eye, EyeOff, Loader2, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { CVProvider, useCV } from '@/context/CVContext';
import Header from '@/components/Header';
import TemplateGallery from '@/components/TemplateGallery';
import PersonalDetails from '@/components/PersonalDetails';
import SummarySection from '@/components/SummarySection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import {
  CertificationsSection,
  AchievementsSection,
  ProjectsSection,
  LanguagesSection,
  InterestsSection,
  AdditionalInfoSection,
} from '@/components/AdditionalSections';
import CVPreview from '@/components/CVPreview';

function CVGeneratorContent() {
  const { activeSections } = useCV();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(0.85);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('cv-preview-content');
      if (!element) throw new Error('Preview not found');

      const opt = {
        margin: 0,
        filename: 'my-resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
      toast({ title: 'PDF Downloaded', description: 'Your resume has been saved successfully.' });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting your resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const zoomIn = () => setPreviewZoom(z => Math.min(z + 0.1, 1.3));
  const zoomOut = () => setPreviewZoom(z => Math.max(z - 0.1, 0.4));
  const zoomReset = () => setPreviewZoom(0.85);

  return (
    <div className="min-h-screen bg-muted/30" data-testid="cv-generator-page">
      <Header onExportPDF={handleExportPDF} />

      <div className="container px-4 py-5 md:px-6">
        <div className="mb-5">
          <TemplateGallery />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[44%] space-y-4 pb-28">
            <PersonalDetails />
            <SummarySection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            {activeSections.includes('certifications') && <CertificationsSection />}
            {activeSections.includes('achievements') && <AchievementsSection />}
            {activeSections.includes('projects') && <ProjectsSection />}
            {activeSections.includes('languages') && <LanguagesSection />}
            {activeSections.includes('interests') && <InterestsSection />}
            {activeSections.includes('additionalInfo') && <AdditionalInfoSection />}
          </div>

          <div className="hidden lg:flex lg:w-[56%] flex-col" ref={previewRef}>
            <div className="sticky top-[5.5rem] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={zoomOut} disabled={previewZoom <= 0.4} data-testid="button-zoom-out">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom out</TooltipContent>
                  </Tooltip>
                  <button
                    onClick={zoomReset}
                    className="text-xs font-mono text-muted-foreground w-12 text-center hover:text-foreground transition-colors"
                    data-testid="button-zoom-reset"
                  >
                    {Math.round(previewZoom * 100)}%
                  </button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={zoomIn} disabled={previewZoom >= 1.3} data-testid="button-zoom-in">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom in</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <CVPreview zoom={previewZoom} />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 flex items-center gap-2 z-50">
        <Button
          variant="outline"
          size="default"
          className="lg:hidden shadow-lg bg-background gap-2"
          onClick={() => setShowPreview(!showPreview)}
          data-testid="button-toggle-preview"
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? 'Hide' : 'Preview'}
        </Button>

        <Button
          size="default"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="shadow-lg gap-2"
          data-testid="button-download-pdf"
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur flex flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-background">
            <h2 className="text-sm font-semibold">CV Preview</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={zoomOut} disabled={previewZoom <= 0.4}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs font-mono text-muted-foreground w-10 text-center">{Math.round(previewZoom * 100)}%</span>
              <Button variant="ghost" size="icon" onClick={zoomIn} disabled={previewZoom >= 1.3}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>Close</Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <CVPreview zoom={previewZoom} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function CVGenerator() {
  return (
    <CVProvider>
      <CVGeneratorContent />
    </CVProvider>
  );
}
