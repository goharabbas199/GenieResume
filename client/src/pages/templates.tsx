import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Check, Search, Sparkles, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCV } from '@/context/CVContext';
import { templates, categories, type Template } from '@/lib/templates';
import TemplateThumbnail from '@/components/TemplateThumbnail';

export default function TemplatesPage() {
  const [, navigate] = useLocation();
  const { selectedTemplate, setSelectedTemplate } = useCV();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = templates.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSelect = (t: Template) => {
    setSelectedTemplate(t.id);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4 md:px-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2 -ml-2" data-testid="button-back-to-builder">
            <ArrowLeft className="h-4 w-4" />
            Back to Builder
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <div className="h-7 w-px bg-border" />
            <LayoutTemplate className="h-4 w-4 text-primary ml-2" />
            <span className="font-semibold text-sm">Resume Templates</span>
            <Badge variant="secondary" className="text-xs">{templates.length}</Badge>
          </div>
          <div className="ml-auto relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search templates…"
              className="pl-9 h-9 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
              data-testid="input-template-search"
            />
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Choose Your Template</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {templates.length} professionally designed templates. Pick one, fill in your details, and download in seconds.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border',
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

        {/* Results count */}
        {filtered.length !== templates.length && (
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Showing {filtered.length} of {templates.length} templates
          </p>
        )}

        {/* Template grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
            <Search className="h-10 w-10 opacity-30" />
            <p className="text-sm">No templates match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filtered.map(t => (
              <TemplateCard
                key={t.id}
                t={t}
                isSelected={selectedTemplate === t.id}
                isHovered={hovered === t.id}
                onHover={setHovered}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateCard({
  t,
  isSelected,
  isHovered,
  onHover,
  onSelect,
}: {
  t: Template;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (t: Template) => void;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-card',
        isSelected
          ? 'border-primary ring-2 ring-primary/20 shadow-lg'
          : 'border-border hover:border-primary/50 hover:shadow-md'
      )}
      onMouseEnter={() => onHover(t.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(t)}
      data-testid={`template-card-${t.id}`}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ height: 148 }}>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <TemplateThumbnail t={t} />
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md z-10">
            <Check className="h-3.5 w-3.5" />
          </div>
        )}

        {/* Hover overlay */}
        <div className={cn(
          'absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-150',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          <Button size="sm" className="gap-1.5 shadow-lg" data-testid={`button-use-template-${t.id}`}>
            <Sparkles className="h-3 w-3" />
            {isSelected ? 'Selected' : 'Use Template'}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-card">
        <p className="text-xs font-semibold truncate">{t.name}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{t.category}</p>
      </div>

      {/* Colour dot */}
      <div
        className="absolute top-2 left-2 h-3 w-3 rounded-full border border-white/60 shadow-sm"
        style={{ backgroundColor: t.primary }}
      />
    </div>
  );
}
