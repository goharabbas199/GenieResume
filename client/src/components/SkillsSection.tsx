import { useState } from 'react';
import { Wrench, X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCV } from '@/context/CVContext';

export default function SkillsSection() {
  const { cvData, updateCVData } = useCV();
  const [inputValue, setInputValue] = useState('');

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

  return (
    <Card data-testid="section-skills">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wrench className="h-5 w-5 text-primary" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add skills (comma-separated)"
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

        <p className="text-xs text-muted-foreground">
          Press Enter or use commas to add multiple skills at once
        </p>

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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
