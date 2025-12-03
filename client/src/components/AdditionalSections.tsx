import { Award, FolderKanban, Globe, Heart, Info, Plus, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCV, type Certification, type Project, type Language } from '@/context/CVContext';
import AIImproveButton from './AIImproveButton';
import { useState } from 'react';

export function CertificationsSection() {
  const { cvData, updateCVData } = useCV();

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
    };
    updateCVData('certifications', [...cvData.certifications, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    updateCVData('certifications', cvData.certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    updateCVData('certifications', cvData.certifications.filter(cert => cert.id !== id));
  };

  return (
    <Card data-testid="section-certifications">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Certifications
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addCertification} data-testid="button-add-certification">
            <Plus className="mr-1 h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.certifications.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <Award className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No certifications added yet</p>
          </div>
        ) : (
          cvData.certifications.map((cert, index) => (
            <div key={cert.id} className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="flex-1 grid gap-3 sm:grid-cols-3">
                <Input
                  placeholder="Certification name"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  data-testid={`input-cert-name-${index}`}
                />
                <Input
                  placeholder="Issuing organization"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  data-testid={`input-cert-issuer-${index}`}
                />
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  data-testid={`input-cert-date-${index}`}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive shrink-0"
                onClick={() => removeCertification(cert.id)}
                data-testid={`button-remove-cert-${index}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function AchievementsSection() {
  const { cvData, updateCVData } = useCV();
  const [inputValue, setInputValue] = useState('');

  const addAchievement = () => {
    if (inputValue.trim()) {
      updateCVData('achievements', [...cvData.achievements, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeAchievement = (index: number) => {
    updateCVData('achievements', cvData.achievements.filter((_, i) => i !== index));
  };

  return (
    <Card data-testid="section-achievements">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add an achievement"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAchievement()}
            data-testid="input-achievement"
          />
          <Button variant="outline" onClick={addAchievement} data-testid="button-add-achievement">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {cvData.achievements.length > 0 ? (
          <ul className="space-y-2">
            {cvData.achievements.map((achievement, index) => (
              <li key={index} className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
                <span className="flex-1 text-sm">{achievement}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive shrink-0"
                  onClick={() => removeAchievement(index)}
                  data-testid={`button-remove-achievement-${index}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <Award className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No achievements added yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const { cvData, updateCVData } = useCV();

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      link: '',
    };
    updateCVData('projects', [...cvData.projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    updateCVData('projects', cvData.projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const removeProject = (id: string) => {
    updateCVData('projects', cvData.projects.filter(proj => proj.id !== id));
  };

  return (
    <Card data-testid="section-projects">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FolderKanban className="h-5 w-5 text-primary" />
            Projects
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addProject} data-testid="button-add-project">
            <Plus className="mr-1 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.projects.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <FolderKanban className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No projects added yet</p>
          </div>
        ) : (
          cvData.projects.map((project, index) => (
            <div key={project.id} className="rounded-xl border bg-muted/30 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      placeholder="Project name"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      data-testid={`input-project-name-${index}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link (optional)</Label>
                    <Input
                      placeholder="https://..."
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      data-testid={`input-project-link-${index}`}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive shrink-0"
                  onClick={() => removeProject(project.id)}
                  data-testid={`button-remove-project-${index}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label>Description</Label>
                  <AIImproveButton
                    text={project.description}
                    onImprove={(text) => updateProject(project.id, 'description', text)}
                    fieldName={`project-${index}`}
                  />
                </div>
                <Textarea
                  placeholder="Describe your project..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="min-h-[80px] resize-none"
                  data-testid={`textarea-project-description-${index}`}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function LanguagesSection() {
  const { cvData, updateCVData } = useCV();

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'intermediate',
    };
    updateCVData('languages', [...cvData.languages, newLang]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    updateCVData('languages', cvData.languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: string) => {
    updateCVData('languages', cvData.languages.filter(lang => lang.id !== id));
  };

  return (
    <Card data-testid="section-languages">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5 text-primary" />
            Languages
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addLanguage} data-testid="button-add-language">
            <Plus className="mr-1 h-4 w-4" />
            Add Language
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.languages.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <Globe className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No languages added yet</p>
          </div>
        ) : (
          cvData.languages.map((lang, index) => (
            <div key={lang.id} className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
              <Input
                placeholder="Language"
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                className="flex-1"
                data-testid={`input-language-name-${index}`}
              />
              <Select
                value={lang.proficiency}
                onValueChange={(value) => updateLanguage(lang.id, 'proficiency', value)}
              >
                <SelectTrigger className="w-40" data-testid={`select-language-proficiency-${index}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="fluent">Fluent</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive shrink-0"
                onClick={() => removeLanguage(lang.id)}
                data-testid={`button-remove-language-${index}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function InterestsSection() {
  const { cvData, updateCVData } = useCV();
  const [inputValue, setInputValue] = useState('');

  const addInterest = (interest: string) => {
    const trimmed = interest.trim();
    if (trimmed && !cvData.interests.includes(trimmed)) {
      updateCVData('interests', [...cvData.interests, trimmed]);
    }
  };

  const removeInterest = (interestToRemove: string) => {
    updateCVData('interests', cvData.interests.filter(i => i !== interestToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const interests = inputValue.split(',').map(s => s.trim()).filter(Boolean);
      interests.forEach(addInterest);
      setInputValue('');
    }
  };

  return (
    <Card data-testid="section-interests">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-primary" />
          Interests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add interests (comma-separated)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            data-testid="input-interests"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const interests = inputValue.split(',').map(s => s.trim()).filter(Boolean);
              interests.forEach(addInterest);
              setInputValue('');
            }}
            disabled={!inputValue.trim()}
            data-testid="button-add-interest"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {cvData.interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {cvData.interests.map((interest, index) => (
              <Badge
                key={interest}
                variant="secondary"
                className="gap-1 pr-1"
                data-testid={`badge-interest-${index}`}
              >
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-1 rounded-full p-0.5 hover:bg-destructive/20"
                  data-testid={`button-remove-interest-${index}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <Heart className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No interests added yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AdditionalInfoSection() {
  const { cvData, updateCVData } = useCV();

  return (
    <Card data-testid="section-additional-info">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-primary" />
            Additional Information
          </CardTitle>
          <AIImproveButton
            text={cvData.additionalInfo}
            onImprove={(text) => updateCVData('additionalInfo', text)}
            fieldName="additional-info"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Add any additional information you'd like to include in your CV..."
          value={cvData.additionalInfo}
          onChange={(e) => updateCVData('additionalInfo', e.target.value)}
          className="min-h-[100px] resize-none"
          data-testid="textarea-additional-info"
        />
      </CardContent>
    </Card>
  );
}
