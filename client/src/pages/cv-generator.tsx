import { useRef, useState, useEffect } from 'react';
import { Download, Eye, EyeOff, Loader2, ZoomIn, ZoomOut, CheckCircle2, Save } from 'lucide-react';
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

function SectionProgress({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${done ? 'text-emerald-500' : 'text-muted-foreground/30'}`} />
      <span className={`text-xs transition-colors ${done ? 'text-foreground' : 'text-muted-foreground/60'}`}>{label}</span>
    </div>
  );
}

function CVGeneratorContent() {
  const { activeSections, cvData } = useCV();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(0.82);
  const [savedIndicator, setSavedIndicator] = useState(false);

  useEffect(() => {
    setSavedIndicator(true);
    const t = setTimeout(() => setSavedIndicator(false), 2000);
    return () => clearTimeout(t);
  }, [cvData]);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('cv-preview-content');
      if (!element) throw new Error('Preview element not found');

      const rect = element.getBoundingClientRect();
      const opt = {
        margin: 0,
        filename: `${cvData.fullName?.replace(/\s+/g, '_') || 'resume'}_CV.pdf`,
        image: { type: 'jpeg' as const, quality: 0.99 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          windowWidth: 794,
          width: 794,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          scrollX: 0,
          scrollY: 0,
          logging: false,
          imageTimeout: 0,
        },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(element).save();
      toast({ title: 'Resume Downloaded', description: 'Your professional CV has been saved as a PDF.' });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const zoomIn = () => setPreviewZoom(z => Math.min(+(z + 0.1).toFixed(1), 1.3));
  const zoomOut = () => setPreviewZoom(z => Math.max(+(z - 0.1).toFixed(1), 0.4));
  const zoomReset = () => setPreviewZoom(0.82);

  const hasName = !!cvData.fullName;
  const hasSummary = !!cvData.summary;
  const hasExp = cvData.experiences.length > 0 && !!cvData.experiences[0]?.jobTitle;
  const hasEdu = cvData.education.length > 0;
  const hasSkills = cvData.skills.length >= 3;

  return (
    <div className="min-h-screen bg-muted/30" data-testid="cv-generator-page">
      <Header onExportPDF={handleExportPDF} />

      <div className="container px-4 py-5 md:px-6">
        {/* Template gallery */}
        <div className="mb-5">
          <TemplateGallery />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Editor column ─────────────────────────────── */}
          <div className="w-full lg:w-[44%] space-y-4 pb-28">

            {/* Quick checklist */}
            <div className="rounded-xl border bg-card px-4 py-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wide">Resume Checklist</p>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                <SectionProgress label="Name & Contact" done={hasName} />
                <SectionProgress label="Professional Summary" done={hasSummary} />
                <SectionProgress label="Work Experience" done={hasExp} />
                <SectionProgress label="Education" done={hasEdu} />
                <SectionProgress label="5+ Skills" done={hasSkills} />
                <SectionProgress label="Photo (optional)" done={!!cvData.photo} />
              </div>
            </div>

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

          {/* ── Preview column ────────────────────────────── */}
          <div className="hidden lg:flex lg:w-[56%] flex-col">
            <div className="sticky top-[4.5rem] flex flex-col gap-2">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Live Preview</span>
                  {savedIndicator && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-500 animate-in fade-in duration-300">
                      <Save className="h-3 w-3" /> Saved
                    </span>
                  )}
                </div>
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

      {/* ── Floating action buttons ─────────────── */}
      <div className="fixed bottom-5 right-5 flex items-center gap-2 z-50">
        <Button
          variant="outline"
          size="default"
          className="lg:hidden shadow-lg bg-background gap-2"
          onClick={() => setShowPreview(!showPreview)}
          data-testid="button-toggle-preview"
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>

        <Button
          size="default"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="shadow-xl gap-2 px-5"
          data-testid="button-download-pdf"
        >
          {isExporting ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Exporting...</>
          ) : (
            <><Download className="h-4 w-4" />Download PDF</>
          )}
        </Button>
      </div>

      {/* ── Mobile preview overlay ─────────────── */}
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
