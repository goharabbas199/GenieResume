import { useState } from 'react';
import { Wrench, X, Plus, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCV } from '@/context/CVContext';
import { cn } from '@/lib/utils';

const suggestedSkills = [
  'Microsoft Office', 'Project Management', 'Leadership', 'Communication', 'Problem Solving',
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Data Analysis', 'Excel',
  'Customer Service', 'Sales', 'Marketing', 'SEO', 'Social Media', 'Photoshop',
  'Agile', 'Scrum', 'Team Collaboration', 'Critical Thinking', 'Time Management',
];

export default function SkillsSection() {
  const { cvData, updateCVData } = useCV();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !cvData.skills.includes(trimmed)) {
      updateCVData('skills', [...cvData.skills, trimmed]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateCVData('skills', cvData.skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const skills = inputValue.split(',').map(s => s.trim()).filter(Boolean);
      skills.forEach(addSkill);
      setInputValue('');
    }
  };

  const handleAddClick = () => {
    const skills = inputValue.split(',').map(s => s.trim()).filter(Boolean);
    skills.forEach(addSkill);
    setInputValue('');
  };

  const availableSuggestions = suggestedSkills.filter(s => !cvData.skills.includes(s));

  return (
    <Card data-testid="section-skills">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wrench className="h-5 w-5 text-primary" />
            Skills
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs h-7"
            onClick={() => setShowSuggestions(!showSuggestions)}
            data-testid="button-toggle-suggestions"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {showSuggestions ? 'Hide' : 'Suggestions'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a skill, press Enter or comma to add"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            data-testid="input-skills"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddClick}
            disabled={!inputValue.trim()}
            data-testid="button-add-skill"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showSuggestions && availableSuggestions.length > 0 && (
          <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Click to add:</p>
            <div className="flex flex-wrap gap-1.5">
              {availableSuggestions.slice(0, 15).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-2 py-0.5 rounded-full text-xs border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                  data-testid={`suggestion-${skill}`}
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {cvData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1 pr-1 text-sm"
                data-testid={`badge-skill-${index}`}
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-1 rounded-full p-0.5 hover:bg-destructive/20"
                  data-testid={`button-remove-skill-${index}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <Wrench className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No skills added yet</p>
            <p className="text-xs text-muted-foreground mt-1">Type above or use suggestions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
