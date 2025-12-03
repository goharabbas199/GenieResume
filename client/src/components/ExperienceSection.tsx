import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCV, type Experience } from '@/context/CVContext';
import AIImproveButton from './AIImproveButton';

export default function ExperienceSection() {
  const { cvData, updateCVData } = useCV();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    };
    updateCVData('experiences', [...cvData.experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    updateCVData('experiences', cvData.experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    updateCVData('experiences', cvData.experiences.filter(exp => exp.id !== id));
  };

  return (
    <Card data-testid="section-experience">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="h-5 w-5 text-primary" />
            Work Experience
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addExperience} data-testid="button-add-experience">
            <Plus className="mr-1 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.experiences.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed p-8 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No work experience added yet</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={addExperience}>
              <Plus className="mr-1 h-4 w-4" />
              Add Your First Experience
            </Button>
          </div>
        ) : (
          cvData.experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative rounded-xl border bg-muted/30 p-4 space-y-4"
              data-testid={`experience-block-${index}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeExperience(exp.id)}
                  data-testid={`button-remove-experience-${index}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
                  <Input
                    id={`jobTitle-${exp.id}`}
                    placeholder="Senior Software Engineer"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    data-testid={`input-experience-title-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    placeholder="Tech Company Inc."
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    data-testid={`input-experience-company-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    data-testid={`input-experience-start-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${exp.id}`}
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.currentlyWorking}
                    data-testid={`input-experience-end-${index}`}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`currentlyWorking-${exp.id}`}
                      checked={exp.currentlyWorking}
                      onCheckedChange={(checked) => updateExperience(exp.id, 'currentlyWorking', !!checked)}
                      data-testid={`checkbox-currently-working-${index}`}
                    />
                    <Label htmlFor={`currentlyWorking-${exp.id}`} className="text-sm font-normal cursor-pointer">
                      Currently working here
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                  <AIImproveButton
                    text={exp.description}
                    onImprove={(text) => updateExperience(exp.id, 'description', text)}
                    fieldName={`experience-${index}`}
                  />
                </div>
                <Textarea
                  id={`description-${exp.id}`}
                  placeholder="Describe your responsibilities, achievements, and key contributions..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="min-h-[100px] resize-none"
                  data-testid={`textarea-experience-description-${index}`}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
