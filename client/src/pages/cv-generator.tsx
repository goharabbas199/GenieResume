import { useRef, useState } from 'react';
import { Download, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const [showPreview, setShowPreview] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('cv-preview-content');
      
      if (!element) {
        throw new Error('Preview not found');
      }

      const opt = {
        margin: 0,
        filename: 'my-resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: 'PDF Downloaded',
        description: 'Your resume has been saved successfully.',
      });
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

  return (
    <div className="min-h-screen bg-muted/30" data-testid="cv-generator-page">
      <Header onExportPDF={handleExportPDF} />
      
      <div className="container px-4 py-6 md:px-6">
        <div className="mb-6">
          <TemplateGallery />
        </div>

        <div className="flex gap-6">
          <div className={`flex-1 space-y-6 ${showPreview ? 'lg:w-[45%]' : 'w-full'}`}>
            <ScrollArea className="h-[calc(100vh-240px)] pr-4">
              <div className="space-y-6 pb-20">
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
            </ScrollArea>
          </div>

          {showPreview && (
            <div className="hidden lg:block lg:w-[55%]" ref={previewRef}>
              <CVPreview className="sticky top-24" />
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex gap-2 z-50">
        <Button
          variant="outline"
          size="lg"
          className="lg:hidden shadow-lg"
          onClick={() => setShowPreview(!showPreview)}
          data-testid="button-toggle-preview"
        >
          {showPreview ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Show Preview
            </>
          )}
        </Button>

        <Button
          size="lg"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="shadow-lg"
          data-testid="button-download-pdf"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      {!showPreview && (
        <div className="fixed inset-x-0 bottom-0 lg:hidden bg-background/95 backdrop-blur border-t p-4 z-40">
          <CVPreview className="h-[300px]" />
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
