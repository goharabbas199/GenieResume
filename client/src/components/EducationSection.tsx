import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useCV, type Education } from '@/context/CVContext';
import AIImproveButton from './AIImproveButton';

export default function EducationSection() {
  const { cvData, updateCVData } = useCV();

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      description: '',
    };
    updateCVData('education', [...cvData.education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    updateCVData('education', cvData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    updateCVData('education', cvData.education.filter(edu => edu.id !== id));
  };

  return (
    <Card data-testid="section-education">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addEducation} data-testid="button-add-education">
            <Plus className="mr-1 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.education.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed p-8 text-center">
            <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No education added yet</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={addEducation}>
              <Plus className="mr-1 h-4 w-4" />
              Add Your First Education
            </Button>
          </div>
        ) : (
          cvData.education.map((edu, index) => (
            <div
              key={edu.id}
              className="relative rounded-xl border bg-muted/30 p-4 space-y-4"
              data-testid={`education-block-${index}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeEducation(edu.id)}
                  data-testid={`button-remove-education-${index}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree / Qualification</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    placeholder="Bachelor of Science in Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    data-testid={`input-education-degree-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    placeholder="Stanford University"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    data-testid={`input-education-institution-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`eduStartDate-${edu.id}`}>Start Date</Label>
                  <Input
                    id={`eduStartDate-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    data-testid={`input-education-start-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`eduEndDate-${edu.id}`}>End Date</Label>
                  <Input
                    id={`eduEndDate-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    disabled={edu.currentlyStudying}
                    data-testid={`input-education-end-${index}`}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`currentlyStudying-${edu.id}`}
                      checked={edu.currentlyStudying}
                      onCheckedChange={(checked) => updateEducation(edu.id, 'currentlyStudying', !!checked)}
                      data-testid={`checkbox-currently-studying-${index}`}
                    />
                    <Label htmlFor={`currentlyStudying-${edu.id}`} className="text-sm font-normal cursor-pointer">
                      Currently studying here
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor={`eduDescription-${edu.id}`}>Description (optional)</Label>
                  <AIImproveButton
                    text={edu.description}
                    onImprove={(text) => updateEducation(edu.id, 'description', text)}
                    fieldName={`education-${index}`}
                  />
                </div>
                <Textarea
                  id={`eduDescription-${edu.id}`}
                  placeholder="Notable achievements, GPA, relevant coursework..."
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  className="min-h-[80px] resize-none"
                  data-testid={`textarea-education-description-${index}`}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
