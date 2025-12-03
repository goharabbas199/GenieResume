import { FileText, Plus, Award, Briefcase, Globe, Heart, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCV } from '@/context/CVContext';

const additionalSections = [
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'additionalInfo', label: 'Additional Information', icon: Info },
];

interface HeaderProps {
  onExportPDF?: () => void;
}

export default function Header({ onExportPDF }: HeaderProps) {
  const { activeSections, toggleSection } = useCV();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="header">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight" data-testid="text-title">AI CV Generator</h1>
            <p className="text-xs text-muted-foreground">Build a professional resume instantly</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-more-sections">
                <Plus className="mr-1 h-4 w-4" />
                More Sections
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {additionalSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSections.includes(section.id);
                return (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className="gap-2"
                    data-testid={`menu-item-${section.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{section.label}</span>
                    {isActive && (
                      <span className="ml-auto text-xs text-primary">Active</span>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {onExportPDF && (
            <Button onClick={onExportPDF} size="sm" data-testid="button-export-pdf">
              Export PDF
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
