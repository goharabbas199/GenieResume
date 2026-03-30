import { Check, LayoutTemplate } from 'lucide-react';
import { useLocation } from 'wouter';
import { useCV } from '@/context/CVContext';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { templates } from '@/lib/templates';
import TemplateThumbnail from '@/components/TemplateThumbnail';

export default function TemplateGallery() {
  const { selectedTemplate, setSelectedTemplate } = useCV();
  const [, navigate] = useLocation();

  return (
    <div className="w-full" data-testid="template-gallery">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Choose a Template</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-7 text-xs"
          onClick={() => navigate('/templates')}
          data-testid="button-browse-templates"
        >
          <LayoutTemplate className="h-3.5 w-3.5" />
          Browse All {templates.length}
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={cn(
                "group relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200",
                selectedTemplate === t.id
                  ? "border-primary ring-2 ring-primary/25 shadow-md"
                  : "border-muted hover:border-muted-foreground/40 hover-elevate"
              )}
              style={{ width: 76, height: 104 }}
              data-testid={`template-${t.id}`}
            >
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <TemplateThumbnail t={t} />
              </div>

              {selectedTemplate === t.id && (
                <div className="absolute top-1 right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-1.5 pb-1 pt-3 text-left">
                <p className="text-[9.5px] font-semibold text-white leading-tight truncate">{t.name}</p>
                <p className="text-[8px] text-white/60 truncate">{t.category}</p>
              </div>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
