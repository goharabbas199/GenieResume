import { Check } from 'lucide-react';
import { useCV } from '@/context/CVContext';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type LayoutType = 'classic' | 'sidebar-left' | 'sidebar-right' | 'creative' | 'compact' | 'timeline' | 'modern-split' | 'elegant-header';

interface Template {
  id: string;
  name: string;
  category: string;
  color: string;
  layout: LayoutType;
}

const templates: Template[] = [
  { id: 'modern', name: 'Modern', category: 'Professional', color: '#3B82F6', layout: 'classic' },
  { id: 'corporate', name: 'Corporate', category: 'Business', color: '#1E3A5F', layout: 'sidebar-left' },
  { id: 'executive', name: 'Executive', category: 'Premium', color: '#7C3AED', layout: 'sidebar-right' },
  { id: 'creative', name: 'Creative', category: 'Design', color: '#8B5CF6', layout: 'creative' },
  { id: 'timeline', name: 'Timeline', category: 'Creative', color: '#D97706', layout: 'timeline' },
  { id: 'tech', name: 'Tech', category: 'Developer', color: '#2563EB', layout: 'modern-split' },
  { id: 'elegant', name: 'Elegant', category: 'Classic', color: '#92400E', layout: 'elegant-header' },
  { id: 'compact', name: 'Compact', category: 'Dense', color: '#4B5563', layout: 'compact' },
  { id: 'sidebar', name: 'Sidebar', category: 'Modern', color: '#059669', layout: 'sidebar-left' },
  { id: 'professional', name: 'Professional', category: 'Standard', color: '#1F2937', layout: 'sidebar-right' },
  { id: 'minimal', name: 'Minimal', category: 'Clean', color: '#6B7280', layout: 'classic' },
  { id: 'two-column', name: 'Two Column', category: 'Layout', color: '#0891B2', layout: 'sidebar-left' },
  { id: 'fresh', name: 'Fresh', category: 'Contemporary', color: '#10B981', layout: 'sidebar-left' },
  { id: 'bold', name: 'Bold', category: 'Impact', color: '#DC2626', layout: 'creative' },
  { id: 'gradient', name: 'Gradient', category: 'Modern', color: '#6366F1', layout: 'modern-split' },
  { id: 'ats-friendly', name: 'ATS Friendly', category: 'Simple', color: '#374151', layout: 'classic' },
  { id: 'academic', name: 'Academic', category: 'Research', color: '#9333EA', layout: 'classic' },
  { id: 'clean', name: 'Clean', category: 'Minimal', color: '#64748B', layout: 'classic' },
  { id: 'classic', name: 'Classic', category: 'Traditional', color: '#1E293B', layout: 'classic' },
  { id: 'simple', name: 'Simple', category: 'Basic', color: '#78716C', layout: 'compact' },
];

function TemplateThumbnail({ template }: { template: Template }) {
  const { layout, color } = template;
  
  const renderLayout = () => {
    switch (layout) {
      case 'sidebar-left':
        return (
          <>
            <div className="w-1/3 h-full rounded-l-md" style={{ backgroundColor: color }}>
              <div className="w-4 h-4 mx-auto mt-2 rounded-full bg-white/40" />
              <div className="space-y-1 mt-2 px-1">
                <div className="h-0.5 w-full bg-white/30 rounded" />
                <div className="h-0.5 w-3/4 bg-white/20 rounded" />
              </div>
            </div>
            <div className="w-2/3 p-1.5 space-y-1">
              <div className="h-1.5 w-full rounded bg-foreground/15" />
              <div className="h-1 w-2/3 rounded bg-foreground/10" />
              <div className="h-1 w-3/4 rounded bg-foreground/10" />
            </div>
          </>
        );
      case 'sidebar-right':
        return (
          <>
            <div className="w-2/3 p-1.5 space-y-1">
              <div className="h-1.5 w-full rounded bg-foreground/15" />
              <div className="h-1 w-2/3 rounded bg-foreground/10" />
              <div className="h-1 w-3/4 rounded bg-foreground/10" />
            </div>
            <div className="w-1/3 h-full rounded-r-md" style={{ backgroundColor: color }}>
              <div className="w-4 h-4 mx-auto mt-2 rounded-full bg-white/40" />
              <div className="space-y-1 mt-2 px-1">
                <div className="h-0.5 w-full bg-white/30 rounded" />
                <div className="h-0.5 w-3/4 bg-white/20 rounded" />
              </div>
            </div>
          </>
        );
      case 'creative':
        return (
          <>
            <div className="w-full h-10 rounded-t-md flex items-center gap-1.5 px-2" style={{ backgroundColor: color }}>
              <div className="w-5 h-5 rounded-full bg-white/40 flex-shrink-0" />
              <div className="space-y-0.5 flex-1">
                <div className="h-1 w-full bg-white/40 rounded" />
                <div className="h-0.5 w-2/3 bg-white/30 rounded" />
              </div>
            </div>
            <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
              <div className="space-y-1">
                <div className="h-1 w-full rounded bg-foreground/15" />
                <div className="h-0.5 w-3/4 rounded bg-foreground/10" />
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full rounded bg-foreground/15" />
                <div className="h-0.5 w-3/4 rounded bg-foreground/10" />
              </div>
            </div>
          </>
        );
      case 'compact':
        return (
          <>
            <div className="w-full flex items-center gap-1 p-1.5 border-b" style={{ borderColor: color }}>
              <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: color + '40' }} />
              <div className="flex-1 space-y-0.5">
                <div className="h-1 w-3/4 rounded" style={{ backgroundColor: color }} />
                <div className="h-0.5 w-1/2 rounded bg-foreground/10" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1 p-1">
              <div className="col-span-2 space-y-0.5">
                <div className="h-0.5 w-full rounded bg-foreground/15" />
                <div className="h-0.5 w-3/4 rounded bg-foreground/10" />
                <div className="h-0.5 w-full rounded bg-foreground/15" />
              </div>
              <div className="space-y-0.5">
                <div className="h-0.5 w-full rounded bg-foreground/15" />
                <div className="h-0.5 w-3/4 rounded bg-foreground/10" />
              </div>
            </div>
          </>
        );
      case 'timeline':
        return (
          <>
            <div className="w-full p-1.5 text-center" style={{ backgroundColor: color + '20' }}>
              <div className="w-4 h-4 mx-auto rounded-full" style={{ backgroundColor: color + '60' }} />
              <div className="h-1 w-1/2 mx-auto mt-1 rounded" style={{ backgroundColor: color }} />
            </div>
            <div className="flex-1 relative px-1.5 py-1">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ backgroundColor: color }} />
              <div className="flex justify-end mb-1">
                <div className="w-2/5 h-2 rounded" style={{ backgroundColor: color + '20' }} />
              </div>
              <div className="flex justify-start">
                <div className="w-2/5 h-2 rounded" style={{ backgroundColor: color + '20' }} />
              </div>
            </div>
          </>
        );
      case 'modern-split':
        return (
          <>
            <div className="w-2/5 h-full p-1.5" style={{ backgroundColor: color + '15' }}>
              <div className="w-5 h-5 mx-auto rounded-lg" style={{ backgroundColor: color + '40' }} />
              <div className="mt-1.5 space-y-1">
                <div className="h-1 w-full rounded bg-white" />
                <div className="h-0.5 w-3/4 mx-auto rounded bg-foreground/10" />
              </div>
            </div>
            <div className="w-3/5 p-1.5 space-y-1">
              <div className="h-1.5 w-full rounded bg-foreground/15" />
              <div className="h-1 w-2/3 rounded bg-foreground/10" />
              <div className="h-1 w-3/4 rounded bg-foreground/10" />
            </div>
          </>
        );
      case 'elegant-header':
        return (
          <>
            <div className="w-full h-6 relative" style={{ backgroundColor: color }}>
              <div className="absolute -bottom-1.5 left-1.5 flex items-end gap-1">
                <div className="w-4 h-4 rounded bg-white shadow" />
                <div className="h-1 w-8 rounded bg-white/80 mb-0.5" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-1 p-1.5 pt-3">
              <div className="col-span-2 space-y-1">
                <div className="h-1 w-full rounded bg-foreground/15" />
                <div className="h-0.5 w-3/4 rounded bg-foreground/10" />
              </div>
              <div className="space-y-1 p-1 rounded" style={{ backgroundColor: color + '10' }}>
                <div className="h-0.5 w-full rounded bg-foreground/15" />
                <div className="h-0.5 w-3/4 rounded bg-foreground/10" />
              </div>
            </div>
          </>
        );
      case 'classic':
      default:
        return (
          <>
            <div className="h-8 w-full rounded-t-md" style={{ backgroundColor: color }} />
            <div className="flex-1 p-1.5 space-y-1">
              <div className="h-1.5 w-full rounded bg-foreground/20" />
              <div className="h-1 w-3/4 rounded bg-foreground/10" />
              <div className="h-1 w-2/3 rounded bg-foreground/10" />
              <div className="h-1 w-1/2 rounded bg-foreground/10" />
            </div>
          </>
        );
    }
  };

  return (
    <div
      className="h-28 w-20 rounded-lg bg-white flex flex-col overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {renderLayout()}
    </div>
  );
}

export default function TemplateGallery() {
  const { selectedTemplate, setSelectedTemplate } = useCV();

  return (
    <div className="w-full" data-testid="template-gallery">
      <h2 className="mb-3 text-sm font-medium text-muted-foreground">Choose Template</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex gap-3 pb-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                "group relative flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                selectedTemplate === template.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-muted hover-elevate"
              )}
              data-testid={`template-${template.id}`}
            >
              <TemplateThumbnail template={template} />
              {selectedTemplate === template.id && (
                <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 pb-1.5 pt-4">
                <p className="text-[10px] font-medium text-white truncate">{template.name}</p>
                <p className="text-[8px] text-white/70 truncate">{template.category}</p>
              </div>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
