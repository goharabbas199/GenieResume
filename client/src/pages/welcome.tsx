import { useLocation } from 'wouter';
import { FileText, Sparkles, Download, Palette, ChevronRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/App';
import { Moon, Sun } from 'lucide-react';
import { templates } from '@/lib/templates';
import TemplateThumbnail from '@/components/TemplateThumbnail';

const STEPS = [
  { step: '01', icon: Palette, title: 'Pick a Template', desc: 'Choose from 40 professionally designed layouts — classic, modern, creative, and more.' },
  { step: '02', icon: FileText, title: 'Fill Your Details', desc: 'Enter your experience, skills, and education. Our live preview updates as you type.' },
  { step: '03', icon: Download, title: 'Export Your CV', desc: 'Download a pixel-perfect PDF ready to send to any employer, ATS-optimised.' },
];

const FEATURES = [
  { icon: Zap, label: 'Instant Preview', desc: 'See your CV update in real time as you type.' },
  { icon: Sparkles, label: 'AI Improvements', desc: 'Smart suggestions to strengthen your wording.' },
  { icon: Shield, label: 'ATS Friendly', desc: 'Templates built to pass automated screening tools.' },
  { icon: Download, label: 'PDF Export', desc: 'One-click high-resolution PDF download.' },
];

const PREVIEW_IDS = ['modern', 'corporate', 'tech', 'elegant', 'creative', 'minimal'];

export default function WelcomePage() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const previewTemplates = PREVIEW_IDS.map(id => templates.find(t => t.id === id)).filter(Boolean) as typeof templates;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm">CV Builder</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/builder')} className="gap-1.5 h-8">
              Open Builder
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center">
        <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3 w-3" />
          40 Professional Templates · Free to Use
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mb-5">
          Build a resume that{' '}
          <span className="text-primary">gets you hired</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Create a polished, professional CV in minutes. Pick a template, fill in your details, and download a stunning PDF — no design skills needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button
            size="lg"
            className="gap-2 px-8 text-base h-12 shadow-lg"
            onClick={() => navigate('/templates')}
          >
            <Palette className="h-5 w-5" />
            Choose a Template
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-8 text-base h-12"
            onClick={() => navigate('/builder')}
          >
            <FileText className="h-5 w-5" />
            Start Building
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">No sign-up required · Completely free</p>
      </section>

      {/* Template preview strip */}
      <section className="bg-muted/40 border-y py-10 px-4 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          A few of our 40 templates
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {previewTemplates.map(t => (
            <button
              key={t.id}
              onClick={() => navigate('/templates')}
              className="group relative rounded-xl overflow-hidden border-2 border-border hover:border-primary/60 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
              style={{ width: 100, height: 140 }}
              title={t.name}
            >
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <TemplateThumbnail t={t} />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-150 flex items-end pb-2 justify-center">
                <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150">{t.name}</span>
              </div>
              <div
                className="absolute top-1.5 left-1.5 h-2.5 w-2.5 rounded-full border border-white/60"
                style={{ backgroundColor: t.primary }}
              />
            </button>
          ))}
          <button
            onClick={() => navigate('/templates')}
            className="rounded-xl overflow-hidden border-2 border-dashed border-border hover:border-primary/60 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary bg-background"
            style={{ width: 100, height: 140 }}
          >
            <span className="text-2xl font-bold">+34</span>
            <span className="text-[10px] font-medium">more</span>
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="container px-4 md:px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {STEPS.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-muted-foreground tracking-widest">STEP {step}</div>
              <div className="font-bold text-base">{title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 border-t py-14 px-4">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Everything you need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col gap-2 p-4 rounded-xl border bg-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-primary" />
                </div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container px-4 md:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to build your CV?</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Join thousands of job seekers who have created standout resumes with our builder.
        </p>
        <Button
          size="lg"
          className="gap-2 px-10 h-12 text-base shadow-lg"
          onClick={() => navigate('/templates')}
        >
          <Sparkles className="h-5 w-5" />
          Get Started — It's Free
        </Button>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          {['No account needed', 'Instant download', 'ATS optimised'].map((item, i) => (
            <span key={item} className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-5 text-center text-xs text-muted-foreground">
        <span>CV Builder · Built with care</span>
      </footer>
    </div>
  );
}
