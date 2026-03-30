import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Check, Search, Sparkles, LayoutTemplate, ChevronRight, Home } from 'lucide-react';
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
  const [previewId, setPreviewId] = useState<string>(selectedTemplate || templates[0].id);

  const filtered = templates.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const previewTemplate = templates.find(t => t.id === previewId) ?? templates[0];

  const handleSelect = (t: Template) => {
    setSelectedTemplate(t.id);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
            data-testid="button-back-to-builder"
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
              data-testid="input-template-search"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: grid */}
        <div className="flex flex-col w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 border-r overflow-hidden">
          {/* Category filters */}
          <div className="px-4 pt-4 pb-3 border-b bg-muted/30">
            <div className="mb-2">
              <h1 className="text-base font-bold tracking-tight">Choose a Template</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {filtered.length} template{filtered.length !== 1 ? 's' : ''}{search || activeCategory !== 'All' ? ' match your filter' : ' available'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border',
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  )}
                  data-testid={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable grid */}
          <div className="flex-1 overflow-y-auto p-3">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                <Search className="h-8 w-8 opacity-30" />
                <p className="text-sm">No templates match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2.5">
                {filtered.map(t => (
                  <TemplateCard
                    key={t.id}
                    t={t}
                    isSelected={selectedTemplate === t.id}
                    isPreviewed={previewId === t.id}
                    onPreview={setPreviewId}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right panel: large preview — hidden on small screens */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden bg-muted/20">
          {/* Preview header */}
          <div className="flex items-center justify-between px-6 py-3 border-b bg-background/80">
            <div className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-full border border-white/20 shadow-sm ring-1 ring-black/10"
                style={{ backgroundColor: previewTemplate.primary }}
              />
              <div>
                <span className="font-semibold text-sm">{previewTemplate.name}</span>
                <span className="text-muted-foreground text-xs ml-2">{previewTemplate.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedTemplate === previewTemplate.id ? (
                <Badge className="gap-1 text-xs" variant="default">
                  <Check className="h-3 w-3" /> Currently Selected
                </Badge>
              ) : null}
              <Button
                size="sm"
                className="gap-1.5 h-8"
                onClick={() => handleSelect(previewTemplate)}
                data-testid={`button-use-template-${previewTemplate.id}`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Use This Template
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Document preview */}
          <div className="flex-1 overflow-auto flex items-start justify-center p-8">
            <div className="w-full max-w-2xl">
              {/* Paper shadow effect */}
              <div className="relative">
                <div className="absolute inset-0 translate-y-2 translate-x-1 bg-black/10 rounded-lg blur-sm" />
                <div
                  className="relative bg-white rounded-lg overflow-hidden border border-gray-200 shadow-2xl"
                  style={{ aspectRatio: '210/297' }}
                >
                  <TemplateLargePreview t={previewTemplate} />
                </div>
              </div>

              {/* Template info below preview */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {[
                  { label: 'Layout', value: previewTemplate.renderer.replace(/-/g, ' ') },
                  { label: 'Style', value: previewTemplate.category },
                  { label: 'Accent', value: previewTemplate.accent },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2 bg-background border rounded-full px-3 py-1.5">
                    <span className="text-xs text-muted-foreground">{label}:</span>
                    <span className="text-xs font-medium capitalize">{value}</span>
                    {label === 'Accent' && (
                      <div className="h-3 w-3 rounded-full border border-gray-200" style={{ backgroundColor: value }} />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button
                  size="default"
                  className="gap-2 px-8"
                  onClick={() => handleSelect(previewTemplate)}
                >
                  <Sparkles className="h-4 w-4" />
                  Use {previewTemplate.name} Template
                </Button>
                {selectedTemplate !== previewTemplate.id && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Hover a card to preview · Click to select
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  t,
  isSelected,
  isPreviewed,
  onPreview,
  onSelect,
}: {
  t: Template;
  isSelected: boolean;
  isPreviewed: boolean;
  onPreview: (id: string) => void;
  onSelect: (t: Template) => void;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-card',
        isSelected
          ? 'border-primary ring-2 ring-primary/20 shadow-lg'
          : isPreviewed
            ? 'border-primary/60 shadow-md'
            : 'border-border hover:border-primary/40 hover:shadow-sm'
      )}
      onMouseEnter={() => onPreview(t.id)}
      onClick={() => onSelect(t)}
      data-testid={`template-card-${t.id}`}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ height: 120 }}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <TemplateThumbnail t={t} />
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md z-10">
            <Check className="h-3 w-3" />
          </div>
        )}

        {/* Hover overlay */}
        <div className={cn(
          'absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-150',
          'opacity-0 group-hover:opacity-100'
        )}>
          <Button
            size="sm"
            className="gap-1 h-6 text-[10px] px-2.5 shadow-lg"
            onClick={e => { e.stopPropagation(); onSelect(t); }}
            data-testid={`button-use-template-${t.id}`}
          >
            <Sparkles className="h-2.5 w-2.5" />
            {isSelected ? 'Selected' : 'Use'}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-2 py-1.5 border-t bg-card">
        <p className="text-[11px] font-semibold truncate leading-tight">{t.name}</p>
        <p className="text-[9px] text-muted-foreground truncate">{t.category}</p>
      </div>

      {/* Colour dot */}
      <div
        className="absolute top-1.5 left-1.5 h-2.5 w-2.5 rounded-full border border-white/60 shadow-sm"
        style={{ backgroundColor: t.primary }}
      />
    </div>
  );
}
