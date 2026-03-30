export type RendererType = 'classic' | 'sidebar-left' | 'sidebar-right' | 'band' | 'minimal' | 'elegant' | 'tech' | 'timeline' | 'infographic' | 'two-column' | 'photo-card';

export interface Template {
  id: string;
  name: string;
  category: string;
  primary: string;
  accent: string;
  renderer: RendererType;
}

export const templates: Template[] = [
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
  { id: 'ats-friendly', name: 'ATS Clean',    category: 'Clean',        primary: '#1F2937', accent: '#F9FAFB', renderer: 'minimal' },
  { id: 'compact',      name: 'Compact',      category: 'Classic',      primary: '#334155', accent: '#F1F5F9', renderer: 'classic' },
  { id: 'crimson',      name: 'Crimson',      category: 'Timeline',     primary: '#9B1C1C', accent: '#FEF2F2', renderer: 'timeline' },
  { id: 'ocean',        name: 'Ocean',        category: 'Timeline',     primary: '#0369A1', accent: '#E0F2FE', renderer: 'timeline' },
  { id: 'violet',       name: 'Violet',       category: 'Timeline',     primary: '#6D28D9', accent: '#EDE9FE', renderer: 'timeline' },
  { id: 'graphite',     name: 'Graphite',     category: 'Infographic',  primary: '#374151', accent: '#F3F4F6', renderer: 'infographic' },
  { id: 'emerald',      name: 'Emerald',      category: 'Infographic',  primary: '#065F46', accent: '#D1FAE5', renderer: 'infographic' },
  { id: 'cobalt',       name: 'Cobalt',       category: 'Infographic',  primary: '#1D4ED8', accent: '#DBEAFE', renderer: 'infographic' },
  { id: 'sunset',       name: 'Sunset',       category: 'Two Column',   primary: '#C2410C', accent: '#FFF7ED', renderer: 'two-column' },
  { id: 'lavender',     name: 'Lavender',     category: 'Two Column',   primary: '#5B21B6', accent: '#EDE9FE', renderer: 'two-column' },
  { id: 'sage',         name: 'Sage',         category: 'Two Column',   primary: '#3F6212', accent: '#ECFCCB', renderer: 'two-column' },
  { id: 'portrait',     name: 'Portrait',     category: 'Photo Card',   primary: '#1D4ED8', accent: '#EFF6FF', renderer: 'photo-card' },
  { id: 'charcoal',     name: 'Charcoal',     category: 'Photo Card',   primary: '#111827', accent: '#F3F4F6', renderer: 'photo-card' },
  { id: 'berry',        name: 'Berry',        category: 'Photo Card',   primary: '#831843', accent: '#FCE7F3', renderer: 'photo-card' },
  { id: 'dusk',         name: 'Dusk',         category: 'Centered',     primary: '#713f12', accent: '#fef9c3', renderer: 'elegant' },
  { id: 'copper',       name: 'Copper',       category: 'Classic',      primary: '#7c2d12', accent: '#ffedd5', renderer: 'classic' },
  { id: 'arctic',       name: 'Arctic',       category: 'Clean',        primary: '#0c4a6e', accent: '#e0f2fe', renderer: 'minimal' },
  { id: 'plum',         name: 'Plum',         category: 'Sidebar',      primary: '#581c87', accent: '#f5f3ff', renderer: 'sidebar-left' },
  { id: 'steel',        name: 'Steel',        category: 'Developer',    primary: '#1e3a5f', accent: '#dbeafe', renderer: 'tech' },
  { id: 'coral',        name: 'Coral',        category: 'Band',         primary: '#be185d', accent: '#fce7f3', renderer: 'band' },
  { id: 'pine',         name: 'Pine',         category: 'Timeline',     primary: '#14532d', accent: '#dcfce7', renderer: 'timeline' },
  { id: 'brick',        name: 'Brick',        category: 'Infographic',  primary: '#991b1b', accent: '#fee2e2', renderer: 'infographic' },
];

export const categories = ['All', ...Array.from(new Set(templates.map(t => t.category))).sort()];
