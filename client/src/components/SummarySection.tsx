import { FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCV } from '@/context/CVContext';
import AIImproveButton from './AIImproveButton';

export default function SummarySection() {
  const { cvData, updateCVData } = useCV();

  return (
    <Card data-testid="section-summary">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Professional Summary
          </CardTitle>
          <AIImproveButton
            text={cvData.summary}
            onImprove={(text) => updateCVData('summary', text)}
            fieldName="summary"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary" className="sr-only">Professional Summary</Label>
          <Textarea
            id="summary"
            placeholder="Write a compelling summary of your professional background, key achievements, and career objectives..."
            value={cvData.summary}
            onChange={(e) => updateCVData('summary', e.target.value)}
            className="min-h-[120px] resize-none"
            data-testid="textarea-summary"
          />
          <p className="text-xs text-muted-foreground">
            Tip: Keep your summary between 3-5 sentences highlighting your most relevant experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
