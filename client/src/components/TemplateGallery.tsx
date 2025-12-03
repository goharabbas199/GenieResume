import { Check } from 'lucide-react';
import { useCV } from '@/context/CVContext';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const templates = [
  { id: 'modern', name: 'Modern', category: 'Professional', color: '#3B82F6' },
  { id: 'minimal', name: 'Minimal', category: 'Clean', color: '#6B7280' },
  { id: 'corporate', name: 'Corporate', category: 'Business', color: '#1E3A5F' },
  { id: 'creative', name: 'Creative', category: 'Design', color: '#8B5CF6' },
  { id: 'elegant', name: 'Elegant', category: 'Classic', color: '#92400E' },
  { id: 'sidebar', name: 'Sidebar', category: 'Modern', color: '#059669' },
  { id: 'ats-friendly', name: 'ATS Friendly', category: 'Simple', color: '#374151' },
  { id: 'executive', name: 'Executive', category: 'Premium', color: '#7C3AED' },
  { id: 'tech', name: 'Tech', category: 'Developer', color: '#2563EB' },
  { id: 'academic', name: 'Academic', category: 'Research', color: '#9333EA' },
  { id: 'compact', name: 'Compact', category: 'Dense', color: '#4B5563' },
  { id: 'two-column', name: 'Two Column', category: 'Layout', color: '#0891B2' },
  { id: 'timeline', name: 'Timeline', category: 'Creative', color: '#D97706' },
  { id: 'professional', name: 'Professional', category: 'Standard', color: '#1F2937' },
  { id: 'bold', name: 'Bold', category: 'Impact', color: '#DC2626' },
  { id: 'clean', name: 'Clean', category: 'Minimal', color: '#64748B' },
  { id: 'gradient', name: 'Gradient', category: 'Modern', color: '#6366F1' },
  { id: 'classic', name: 'Classic', category: 'Traditional', color: '#1E293B' },
  { id: 'fresh', name: 'Fresh', category: 'Contemporary', color: '#10B981' },
  { id: 'simple', name: 'Simple', category: 'Basic', color: '#78716C' },
];

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
                  : "border-transparent hover-elevate"
              )}
              data-testid={`template-${template.id}`}
            >
              <div
                className="h-28 w-20 rounded-lg"
                style={{ backgroundColor: template.color + '15' }}
              >
                <div
                  className="h-8 w-full rounded-t-lg"
                  style={{ backgroundColor: template.color }}
                />
                <div className="space-y-1.5 p-2">
                  <div className="h-1.5 w-full rounded bg-foreground/20" />
                  <div className="h-1 w-3/4 rounded bg-foreground/10" />
                  <div className="h-1 w-2/3 rounded bg-foreground/10" />
                  <div className="h-1 w-1/2 rounded bg-foreground/10" />
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 pb-1.5 pt-4">
                <p className="text-[10px] font-medium text-white">{template.name}</p>
              </div>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
