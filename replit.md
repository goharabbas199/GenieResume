# AI CV Generator

## Overview

AI CV Generator is a web application that helps users create professional resumes with AI-powered text improvements. Users can input their personal information, work experience, education, skills, and additional sections, choose from 20+ professional templates, and export their resume as a PDF. The application provides real-time preview and AI-assisted content enhancement with multiple tone options (professional, ATS-friendly, concise, expanded, creative).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. The design follows a "new-york" style variant with custom theming using CSS variables for consistent color schemes across light/dark modes.

**State Management**: React Context API (`CVContext`) manages the entire CV data state including personal details, experiences, education, skills, and optional sections (certifications, achievements, projects, languages, interests). This centralized state allows real-time synchronization between form inputs and the live preview.

**Routing**: wouter for lightweight client-side routing with a simple single-page application structure (main CV generator page + 404 fallback).

**Design System**:
- Typography: Poppins font family for UI elements, Inter for document authenticity in templates
- Spacing: Tailwind utility classes with consistent units (2, 4, 6, 8, 12, 16, 20)
- Layout: Responsive two-column layout (40% editor / 60% preview on desktop), stacked single-column on mobile
- Templates: 20 different resume templates with distinct color schemes and layouts (modern, minimal, corporate, creative, elegant, sidebar, ATS-friendly, etc.)

**Key Features**:
- Photo upload with drag-and-drop using react-dropzone
- Dynamic form sections that can be added/removed
- Real-time CV preview that updates as user types
- PDF export functionality using html2pdf.js
- Template gallery with horizontal scrolling

### Backend Architecture

**Framework**: Express.js server with TypeScript

**API Structure**: RESTful API with a single primary endpoint:
- `POST /api/improve-text`: Accepts text content, tone preference, and field type, returns AI-improved text

**Development Setup**: 
- Vite dev server with HMR (Hot Module Replacement) integrated into Express middleware
- Development-only plugins for runtime error overlay and debugging tools (@replit/vite-plugin-runtime-error-modal, cartographer, dev-banner)

**Build Process**: 
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles server code to `dist/index.cjs` with selective dependency bundling (allowlist for commonly used packages to reduce cold start times)
- Static serving: Express serves built client files with SPA fallback to index.html

**Storage**: In-memory storage implementation (`MemStorage` class) for user management. Database schema defined using Drizzle ORM with PostgreSQL dialect, though currently using memory storage. The schema includes a users table with username/password authentication support.

### External Dependencies

**AI Service**: 
- OpenAI API integration using the official `openai` SDK
- Model: GPT-5 (as specified in server/openai.ts)
- Purpose: Text improvement with five tone variations (professional, ATS-friendly, concise, expanded, creative)
- Prompt engineering: Custom system prompts tailored for resume writing with field-specific optimization

**Database**: 
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Database URL expected via `DATABASE_URL` environment variable
- Migration files stored in `./migrations` directory
- Schema location: `./shared/schema.ts`

**UI Components**: 
- Radix UI primitives (@radix-ui/react-*) for accessible, unstyled components
- shadcn/ui configuration for component styling and theming
- Tailwind CSS for utility-first styling

**Form Management**:
- react-hook-form with @hookform/resolvers for validation
- Zod for schema validation (drizzle-zod for database schema validation)

**PDF Generation**:
- html2pdf.js for client-side PDF export from HTML content

**State & Data Fetching**:
- @tanstack/react-query for server state management and caching

**Session Management**:
- express-session with connect-pg-simple for PostgreSQL-backed sessions (configured but using in-memory store currently)

**Additional Libraries**:
- date-fns for date formatting and manipulation
- nanoid for generating unique IDs
- clsx and class-variance-authority for conditional class name composition
- embla-carousel-react for carousel/slider functionality in template gallery

**Development Tools**:
- Replit-specific plugins for enhanced development experience
- TypeScript with strict mode enabled
- Path aliases configured (@/, @shared/, @assets/) for cleaner imports