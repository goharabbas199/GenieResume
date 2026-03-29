import { Check } from 'lucide-react';
import { useCV } from '@/context/CVContext';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type RendererType = 'classic' | 'sidebar-left' | 'sidebar-right' | 'band' | 'minimal' | 'elegant' | 'tech';

interface Template {
  id: string;
  name: string;
  category: string;
  primary: string;
  accent: string;
  renderer: RendererType;
}

const templates: Template[] = [
  { id: 'modern',       name: 'Modern',       category: 'Classic',      primary: '#2563EB', accent: '#EFF6FF', renderer: 'classic' },
  { id: 'corporate',    name: 'Corporate',    category: 'Sidebar',      primary: '#1E3A5F', accent: '#E8F0F7', renderer: 'sidebar-left' },
  { id: 'executive',    name: 'Executive',    category: 'Sidebar',      primary: '#4C1D95', accent: '#F5F3FF', renderer: 'sidebar-right' },
  { id: 'elegant',      name: 'Elegant',      category: 'Centered',     primary: '#92400E', accent: '#FFFBEB', renderer: 'elegant' },
  { id: 'tech',         name: 'Tech',         category: 'Developer',    primary: '#0284C7', accent: '#E0F2FE', renderer: 'tech' },
  { id: 'minimal',      name: 'Minimal',      category: 'Clean',        primary: '#374151', accent: '#F9FAFB', renderer: 'minimal' },
  { id: 'creative',     name: 'Creative',     category: 'Band',         primary: '#7C3AED', accent: '#EDE9FE', renderer: 'band' },
  { id: 'professional', name: 'Professional', category: 'Sidebar',      primary: '#111827', accent: '#F3F4F6', renderer: 'sidebar-right' },
  { id: 'fresh',        name: 'Fresh',        category: 'Sidebar',      primary: '#059669', accent: '#ECFDF5', renderer: 'sidebar-left' },
  { id: 'bold',         name: 'Bold',         category: 'Band',         primary: '#DC2626', accent: '#FEF2F2', renderer: 'band' },
  { id: 'navy',         name: 'Navy',         category: 'Sidebar',      primary: '#1E40AF', accent: '#DBEAFE', renderer: 'sidebar-left' },
  { id: 'slate',        name: 'Slate',        category: 'Clean',        primary: '#475569', accent: '#F1F5F9', renderer: 'minimal' },
  { id: 'rose',         name: 'Rose',         category: 'Centered',     primary: '#BE185D', accent: '#FCE7F3', renderer: 'elegant' },
  { id: 'forest',       name: 'Forest',       category: 'Classic',      primary: '#166534', accent: '#DCFCE7', renderer: 'classic' },
  { id: 'teal',         name: 'Teal',         category: 'Band',         primary: '#0F766E', accent: '#CCFBF1', renderer: 'band' },
  { id: 'midnight',     name: 'Midnight',     category: 'Sidebar',      primary: '#1E293B', accent: '#CBD5E1', renderer: 'sidebar-right' },
  { id: 'amber',        name: 'Amber',        category: 'Classic',      primary: '#B45309', accent: '#FEF3C7', renderer: 'classic' },
  { id: 'indigo',       name: 'Indigo',       category: 'Developer',    primary: '#4338CA', accent: '#E0E7FF', renderer: 'tech' },
  { id: 'ats-friendly', name: 'ATS Clean',    category: 'Simple',       primary: '#1F2937', accent: '#F9FAFB', renderer: 'minimal' },
  { id: 'compact',      name: 'Compact',      category: 'Classic',      primary: '#334155', accent: '#F1F5F9', renderer: 'classic' },
];

function Thumbnail({ t }: { t: Template }) {
  const { primary, accent, renderer } = t;

  if (renderer === 'sidebar-left') return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ width: '36%', background: primary, padding: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', marginTop: 4 }} />
        <div style={{ width: '80%', height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        <div style={{ width: '60%', height: 2, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginTop: 4 }} />
        <div style={{ width: '70%', height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: 5, background: '#fff', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '80%', height: 3, background: primary, borderRadius: 2, opacity: 0.7 }} />
        <div style={{ width: '60%', height: 2, background: '#ccc', borderRadius: 2 }} />
        <div style={{ width: '90%', height: 1.5, background: '#e0e0e0', borderRadius: 2, marginTop: 3 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
      </div>
    </div>
  );

  if (renderer === 'sidebar-right') return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ flex: 1, padding: 5, background: '#fff', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '80%', height: 4, background: primary, borderRadius: 2 }} />
        <div style={{ width: '55%', height: 2, background: '#bbb', borderRadius: 2 }} />
        <div style={{ width: '90%', height: 1.5, background: '#e5e5e5', borderRadius: 2, marginTop: 3 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e5e5e5', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e5e5e5', borderRadius: 2 }} />
      </div>
      <div style={{ width: '33%', background: accent, padding: 4, display: 'flex', flexDirection: 'column', gap: 3, borderLeft: `2px solid ${primary}20` }}>
        <div style={{ width: '70%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
        <div style={{ width: '90%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        <div style={{ width: '80%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        <div style={{ width: '60%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
      </div>
    </div>
  );

  if (renderer === 'band') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ height: '38%', background: primary, display: 'flex', alignItems: 'center', padding: '4px 6px', gap: 5 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '70%', height: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
          <div style={{ width: '50%', height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '90%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
        <div style={{ width: '35%', background: accent, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.5 }} />
          <div style={{ width: '70%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'elegant') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: primary, height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
        <div style={{ width: '55%', height: 2.5, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
        <div style={{ width: '40%', height: 1.5, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: 5, display: 'flex', gap: 4 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
          <div style={{ width: '90%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
          <div style={{ width: '75%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
        <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.4 }} />
          <div style={{ width: '80%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'tech') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: '#0f172a', height: '28%', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 16, height: 16, borderRadius: 2, background: `${primary}80`, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: '70%', height: 2.5, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
          <div style={{ width: '50%', height: 1.5, background: primary, borderRadius: 2, marginTop: 2 }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '85%', height: 4, background: '#f0f6ff', borderRadius: 2 }} />
          <div style={{ width: '75%', height: 4, background: '#f0f6ff', borderRadius: 2 }} />
        </div>
        <div style={{ width: '32%', background: '#f8faff', borderLeft: '1px solid #e2e8f0', padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.5 }} />
          <div style={{ width: '60%', height: 3, background: `${primary}20`, borderRadius: 2 }} />
          <div style={{ width: '75%', height: 3, background: `${primary}20`, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'minimal') return (
    <div style={{ padding: '8px 7px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ width: '70%', height: 5, background: '#111', borderRadius: 2 }} />
      <div style={{ width: '45%', height: 2, background: primary, borderRadius: 2 }} />
      <div style={{ width: '85%', height: 1, background: '#e0e0e0', borderRadius: 2, marginTop: 3 }} />
      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '60%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '80%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
        </div>
        <div style={{ width: 30, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  // classic (default)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: primary, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: '55%', height: 2.5, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
        <div style={{ width: '40%', height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '85%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
      </div>
    </div>
  );
}

export default function TemplateGallery() {
  const { selectedTemplate, setSelectedTemplate } = useCV();

  return (
    <div className="w-full" data-testid="template-gallery">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Choose a Template</h2>
        <span className="text-xs text-muted-foreground">{templates.length} designs</span>
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
                <Thumbnail t={t} />
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
