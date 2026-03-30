import { useState } from 'react';
import { FileText, Plus, Award, Briefcase, Globe, Heart, Info, ChevronDown, Moon, Sun, Trash2, FlaskConical, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCV } from '@/context/CVContext';
import { useTheme } from '@/App';
import { cn } from '@/lib/utils';

const additionalSections = [
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'additionalInfo', label: 'Additional Info', icon: Info },
];

interface HeaderProps {
  onExportPDF?: () => void;
}

export default function Header({ onExportPDF }: HeaderProps) {
  const { activeSections, toggleSection, completionScore, resetCV, loadSampleData } = useCV();
  const { theme, toggleTheme } = useTheme();
  const [showResetDialog, setShowResetDialog] = useState(false);

  const scoreColor =
    completionScore < 40 ? 'text-destructive' :
    completionScore < 70 ? 'text-amber-500' :
    'text-emerald-500';

  const progressColor =
    completionScore < 40 ? '[&>div]:bg-destructive' :
    completionScore < 70 ? '[&>div]:bg-amber-500' :
    '[&>div]:bg-emerald-500';

  const scoreLabel =
    completionScore < 40 ? 'Getting started' :
    completionScore < 70 ? 'Looking good' :
    completionScore < 100 ? 'Almost complete' : 'Complete!';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="header">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">

        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground flex-shrink-0 shadow-sm">
            <FileText className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold leading-tight tracking-tight" data-testid="text-title">AI CV Generator</h1>
            <p className="text-[11px] text-muted-foreground hidden sm:block">Build a professional resume instantly</p>
          </div>
        </div>

        {/* Completion bar — desktop */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs mx-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">CV Completion</span>
              <span className={cn("text-xs font-bold tabular-nums", scoreColor)}>
                {completionScore}%
                <span className="hidden lg:inline font-normal text-muted-foreground"> · {scoreLabel}</span>
              </span>
            </div>
            <Progress value={completionScore} className={cn("h-1.5", progressColor)} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={loadSampleData}
                className="hidden sm:flex gap-1.5 h-8"
                data-testid="button-sample-data"
              >
                <FlaskConical className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Sample Data</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fill with sample data to preview templates</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8" data-testid="button-more-sections">
                <Plus className="mr-1 h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sections</span>
                <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Optional Sections</div>
              <DropdownMenuSeparator />
              {additionalSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSections.includes(section.id);
                return (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className="gap-2 cursor-pointer"
                    data-testid={`menu-item-${section.id}`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{section.label}</span>
                    {isActive && (
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">ON</span>
                    )}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowResetDialog(true)}
                className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                data-testid="button-reset-cv"
              >
                <Trash2 className="h-4 w-4" />
                Reset CV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset your CV?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear all your data and start fresh. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetCV} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</TooltipContent>
          </Tooltip>

          {onExportPDF && (
            <Button onClick={onExportPDF} size="sm" className="gap-1.5 h-8 shadow-sm" data-testid="button-export-pdf">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          )}
        </div>
      </div>

      {/* Completion bar — mobile */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">CV Completion</span>
          <span className={cn("text-xs font-bold tabular-nums", scoreColor)}>{completionScore}% · {scoreLabel}</span>
        </div>
        <Progress value={completionScore} className={cn("h-1.5", progressColor)} />
      </div>
    </header>
  );
}
