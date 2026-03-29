# AI CV Generator

## Overview

AI CV Generator is a premium web application that helps users create professional resumes with AI-powered text improvements. Users can input personal information, work experience, education, skills, and optional sections, choose from 20+ professional templates with distinct layouts, and export their resume as a PDF. The application provides real-time preview with zoom controls, dark mode, AI-assisted content enhancement, photo upload with cropping, CV completion tracking, and localStorage persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. The design follows a "new-york" style variant with custom theming using CSS variables for consistent color schemes across light/dark modes.

**State Management**: React Context API (`CVContext`) manages the entire CV data state including personal details, experiences, education, skills, and optional sections. State is persisted to localStorage automatically, so user progress is never lost on refresh.

**Routing**: wouter for lightweight client-side routing (main CV generator page + 404 fallback).

**Dark Mode**: ThemeContext in App.tsx toggles dark class on documentElement, synced to localStorage and system preference.

**Design System**:
- Typography: Poppins font family for UI elements, Inter for document templates
- Layout: Responsive two-column layout (44% editor / 56% preview on desktop)
- Templates: 20 different resume templates with 8 distinct layout types (classic, sidebar-left, sidebar-right, creative, compact, timeline, modern-split, elegant-header)

**Key Features**:
- Photo upload with drag-and-drop (react-dropzone) + interactive cropping (react-image-crop)
- CV completion score (0–100%) shown as a progress bar in the header
- Sample data quick-start button to instantly preview templates
- Reset CV with confirmation dialog
- Dark mode toggle with system-preference detection
- Live preview panel with zoom in/out controls (40%–130%)
- AI text improvement via OpenAI with 5 tone options, now as a dropdown for speed
- Skill suggestions panel with one-click adding
- PDF export using html2pdf.js
- localStorage persistence (key: 'ai-cv-generator-data')

### Backend Architecture

**Framework**: Express.js server with TypeScript

**API Structure**:
- `POST /api/improve-text`: Accepts text, tone, fieldType → returns AI-improved text

**AI Service**: OpenAI API (GPT-4o) for text improvement with field-specific system prompts.

**Storage**: In-memory storage (MemStorage). Drizzle ORM + PostgreSQL schema defined but using memory store.

### Key Files

- `client/src/context/CVContext.tsx` — central state, localStorage persistence, completion score, sample data
- `client/src/App.tsx` — ThemeProvider for dark mode
- `client/src/components/Header.tsx` — nav, dark mode toggle, completion progress, sample data, reset
- `client/src/pages/cv-generator.tsx` — main layout, zoom controls, mobile preview overlay
- `client/src/components/CVPreview.tsx` — 8 distinct template layouts rendered from CV state
- `client/src/components/TemplateGallery.tsx` — visual thumbnails showing layout type
- `client/src/components/PhotoUpload.tsx` — react-image-crop integration
- `client/src/components/AIImproveButton.tsx` — dropdown tone selector, instant improve
- `client/src/components/SkillsSection.tsx` — tag-based skills with suggestions
- `server/routes.ts` — Express API routes
- `server/openai.ts` — OpenAI integration
