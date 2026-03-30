import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Check, Search, Sparkles, ChevronRight, Home, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCV } from '@/context/CVContext';
import { templates, categories, type Template } from '@/lib/templates';
import TemplateThumbnail from '@/components/TemplateThumbnail';
import TemplateLargePreview from '@/components/TemplateLargePreview';

export default function TemplatesPage() {
  const [, navigate] = useLocation();
  const { selectedTemplate, setSelectedTemplate } = useCV();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [modalTemplate, setModalTemplate] = useState<Template | null>(null);

  const filtered = templates.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleUseTemplate = (t: Template) => {
    setSelectedTemplate(t.id);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Button>
          <div className="h-4 w-px bg-border" />

          {/* Step indicator */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center font-bold text-[10px]">1</div>
              <span className="hidden sm:inline">Welcome</span>
            </div>
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px]">2</div>
              <span className="hidden sm:inline">Choose Template</span>
            </div>
            <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center font-bold text-[10px]">3</div>
              <span className="hidden sm:inline">Fill &amp; Export</span>
            </div>
          </div>

          <div className="ml-auto relative w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search templates…"
              className="pl-9 h-8 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Filter bar */}
        <div className="px-4 md:px-6 pt-6 pb-4">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Choose Your Template</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Click any template to see a full preview — then decide if you want to use it.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          {(search || activeCategory !== 'All') && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Showing {filtered.length} of {templates.length} templates
            </p>
          )}
        </div>

        {/* Template grid */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-10">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <Search className="h-10 w-10 opacity-30" />
              <p className="text-sm">No templates match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map(t => (
                <TemplateCard
                  key={t.id}
                  t={t}
                  isSelected={selectedTemplate === t.id}
                  onClick={() => setModalTemplate(t)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full-screen preview modal */}
      {modalTemplate && (
        <TemplateModal
          t={modalTemplate}
          isCurrentlySelected={selectedTemplate === modalTemplate.id}
          onClose={() => setModalTemplate(null)}
          onUse={() => handleUseTemplate(modalTemplate)}
          onPrev={() => {
            const idx = templates.findIndex(x => x.id === modalTemplate.id);
            const prev = templates[(idx - 1 + templates.length) % templates.length];
            setModalTemplate(prev);
          }}
          onNext={() => {
            const idx = templates.findIndex(x => x.id === modalTemplate.id);
            const next = templates[(idx + 1) % templates.length];
            setModalTemplate(next);
          }}
        />
      )}
    </div>
  );
}

function TemplateCard({
  t,
  isSelected,
  onClick,
}: {
  t: Template;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-card',
        isSelected
          ? 'border-primary ring-2 ring-primary/20 shadow-lg'
          : 'border-border hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5'
      )}
      onClick={onClick}
      data-testid={`template-card-${t.id}`}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ height: 148 }}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <TemplateThumbnail t={t} />
        </div>

        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md z-10">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Hover overlay — "Click to Preview" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex flex-col items-center justify-center gap-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col items-center gap-2">
            <div className="bg-white/95 text-gray-900 rounded-lg px-3 py-2 flex items-center gap-1.5 shadow-lg text-xs font-semibold">
              <Eye className="h-3.5 w-3.5 text-primary" />
              Click to Preview
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-2.5 py-2 border-t bg-card">
        <p className="text-xs font-semibold truncate leading-tight">{t.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{t.category}</p>
      </div>

      {/* Colour dot */}
      <div
        className="absolute top-2 left-2 h-3 w-3 rounded-full border border-white/60 shadow-sm"
        style={{ backgroundColor: t.primary }}
      />
    </div>
  );
}

function TemplateModal({
  t,
  isCurrentlySelected,
  onClose,
  onUse,
  onPrev,
  onNext,
}: {
  t: Template;
  isCurrentlySelected: boolean;
  onClose: () => void;
  onUse: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex flex-col lg:flex-row w-full h-full max-w-6xl max-h-[95vh] mx-4 my-4 bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/50">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-background/90 border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-all"
          aria-label="Close preview"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: Document preview */}
        <div className="flex-1 overflow-auto bg-muted/30 flex items-center justify-center p-6 lg:p-10 min-h-[50vh] lg:min-h-0">
          <div className="w-full max-w-lg">
            {/* Paper with shadow */}
            <div className="relative">
              <div className="absolute inset-0 translate-y-3 translate-x-2 bg-black/20 rounded-xl blur-md" />
              <div
                className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-2xl"
                style={{ aspectRatio: '210/297' }}
              >
                <TemplateLargePreview t={t} />
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs" onClick={onPrev}>
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </Button>
              <span className="text-xs text-muted-foreground">Browse templates</span>
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs" onClick={onNext}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Info panel */}
        <div className="lg:w-80 xl:w-96 flex flex-col border-t lg:border-t-0 lg:border-l bg-background">
          {/* Template identity */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-xl flex-shrink-0 shadow-md"
                style={{ backgroundColor: t.primary }}
              />
              <div>
                <h2 className="text-xl font-bold leading-tight">{t.name}</h2>
                <p className="text-sm text-muted-foreground">{t.category} style</p>
              </div>
              {isCurrentlySelected && (
                <Badge className="ml-auto gap-1 text-xs flex-shrink-0" variant="default">
                  <Check className="h-3 w-3" /> Selected
                </Badge>
              )}
            </div>

            {/* Colour swatches */}
            <div className="flex items-center gap-2 mt-3">
              <div className="h-7 w-7 rounded-full border-2 border-white shadow-md ring-1 ring-black/10" style={{ backgroundColor: t.primary }} title="Primary colour" />
              <div className="h-7 w-7 rounded-full border-2 border-white shadow-md ring-1 ring-black/10" style={{ backgroundColor: t.accent }} title="Accent colour" />
              <span className="text-xs text-muted-foreground ml-1">Colour palette</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 border-b space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Template details</h3>
            {[
              { label: 'Layout', value: t.renderer.replace(/-/g, ' ') },
              { label: 'Style category', value: t.category },
              { label: 'Best for', value: getBestFor(t.category) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium capitalize">{value}</span>
              </div>
            ))}
          </div>

          {/* What you'll see note */}
          <div className="p-6 border-b">
            <p className="text-xs text-muted-foreground leading-relaxed">
              The preview above shows example content — your real name, job title, experience, skills, and education will replace this once you fill in the builder.
            </p>
          </div>

          {/* Actions */}
          <div className="p-6 mt-auto flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full gap-2 h-12 text-base shadow-md"
              onClick={onUse}
            >
              <Sparkles className="h-5 w-5" />
              Use This Template
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 h-11"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBestFor(category: string): string {
  const map: Record<string, string> = {
    'Classic': 'All industries',
    'Sidebar': 'Corporate & finance',
    'Centered': 'Creative roles',
    'Clean': 'ATS & tech',
    'Developer': 'Engineers & tech',
    'Band': 'Creative & marketing',
    'Timeline': 'Career progression',
    'Infographic': 'Visual-first roles',
    'Two Column': 'Compact layouts',
    'Photo Card': 'Personal branding',
  };
  return map[category] ?? 'General use';
}
