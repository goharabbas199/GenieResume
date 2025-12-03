# AI CV Generator - Design Guidelines

## Design Approach
**Reference-Based Approach**: Draw inspiration from premium productivity tools (Canva, Figma, Notion) combined with professional document editors. Focus on clean, professional aesthetics that inspire confidence while maintaining approachability through modern UI patterns.

## Core Design Principles
- **Premium & Professional**: Convey trust and credibility through polished, sophisticated design
- **Clarity & Efficiency**: Streamlined workflow from input to final PDF export
- **Real-time Feedback**: Every action provides immediate visual confirmation

## Typography
**Font Family**: Poppins (Google Fonts)
- Headings: Poppins SemiBold (600) - 24px to 32px for main titles
- Subheadings: Poppins Medium (500) - 16px to 20px
- Body Text: Poppins Regular (400) - 14px to 16px
- Labels: Poppins Medium (500) - 13px to 14px
- Template Preview Text: Inter Regular (400) for document authenticity

**Hierarchy**:
- Page Title (H1): 32px, SemiBold
- Section Headers (H2): 20px, Medium
- Field Labels: 14px, Medium
- Input Text: 15px, Regular
- Helper Text: 13px, Regular

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Container padding: p-6 (mobile), p-8 (tablet), p-12 (desktop)
- Section margins: mb-8 to mb-12
- Card padding: p-6 to p-8
- Input groups: space-y-4
- Button spacing: px-6 py-3

**Grid Structure**:
- Two-column layout (desktop): 40% form editor / 60% live preview
- Single column (mobile/tablet): stacked with sticky preview toggle
- Template gallery: grid-cols-2 (mobile), grid-cols-3 (tablet), grid-cols-4 (desktop)

## Component Library

### Header
- Full-width with gradient or solid professional background
- Left: "AI CV Generator" logo/title with tagline
- Right: "More" dropdown menu (Certifications, Achievements, Projects, Languages, Interests)
- Height: h-16, with subtle shadow

### Template Selection Gallery
- Horizontal scrollable cards or grid layout
- Each template: rounded card with border-radius 16px, hover lift effect
- Template preview thumbnails with overlay label
- Active template: highlighted border (3px accent color)
- Spacing: gap-4 between cards

### Form Sections
- Rounded containers (rounded-2xl) with soft shadows
- White/light background cards on subtle gray page background
- Each section expandable/collapsible with smooth transitions
- AI "Improve" buttons: small, pill-shaped, positioned inline with fields
- Dynamic add/remove buttons: outlined style with "+" icon

### Input Fields
- Rounded inputs (rounded-lg) with subtle borders
- Focus state: accent color border, subtle shadow
- Floating labels or clear top-aligned labels
- Helper text below in muted color
- Consistent height: h-12 for text inputs

### Profile Photo Upload
- Circular or square preview (128px x 128px)
- Dashed border upload area when empty
- Upload button centered with icon
- Instant preview after selection

### Skills Badges
- Pill-shaped badges (rounded-full)
- Soft background color with readable text
- Remove "×" button on hover
- Flexbox wrap layout with gap-2

### AI Improvement Modal/Dropdown
- Tone selector: radio buttons or segmented control
- Options: Professional, ATS-Friendly, Concise, Expanded, Creative
- Loading animation: subtle spinner or pulsing effect
- Apply button: primary CTA style

### Live CV Preview Panel
- Sticky on desktop, toggle drawer on mobile
- Zoom controls for better preview
- Template styles rendered with high fidelity
- Smooth scrolling synchronized with form sections
- Shadow container to distinguish from editor

### PDF Export Button
- Fixed bottom-right on desktop (floating action button style)
- Full-width sticky bottom on mobile
- Primary accent color with download icon
- Prominent size: px-8 py-4 with rounded-xl

## Visual Treatment
**Color Palette** (to be defined in implementation):
- Use professional neutrals with one accent color
- Soft shadows: shadow-sm, shadow-md, shadow-lg
- Subtle background: very light gray or off-white (#FAFBFC)

**Animations**:
- Smooth transitions: transition-all duration-300
- Hover effects: scale-105 on template cards, lift on buttons
- Loading states: subtle pulse or fade animations
- Page transitions: slide-in for sections

**Borders & Shadows**:
- Border radius: rounded-lg (8px), rounded-xl (12px), rounded-2xl (16px)
- Card shadows: shadow-md with hover shadow-lg
- Subtle borders: 1px solid with light gray

## Responsive Behavior
**Desktop (lg+)**: Side-by-side editor and preview, visible template gallery
**Tablet (md)**: Stacked with floating preview button, 3-column template grid
**Mobile (base)**: Full-width cards, bottom sheet preview, 2-column template grid

## Images
No large hero image required. Focus on functional interface with template thumbnails and user-uploaded profile photos as primary visual elements.