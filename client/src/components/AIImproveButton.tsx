import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export type ToneType = 'professional' | 'ats-friendly' | 'concise' | 'expanded' | 'creative';

const tones: { value: ToneType; label: string; description: string }[] = [
  { value: 'professional', label: 'Professional', description: 'Formal business tone' },
  { value: 'ats-friendly', label: 'ATS-Friendly', description: 'Optimized for tracking systems' },
  { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
  { value: 'expanded', label: 'Expanded', description: 'More detailed version' },
  { value: 'creative', label: 'Creative', description: 'Unique and memorable' },
];

interface AIImproveButtonProps {
  text: string;
  onImprove: (improvedText: string) => void;
  fieldName: string;
}

export default function AIImproveButton({ text, onImprove, fieldName }: AIImproveButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImprove = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', '/api/improve-text', {
        text,
        tone: selectedTone,
        fieldType: fieldName,
      });
      
      const data = await response.json();
      
      if (data.improvedText) {
        onImprove(data.improvedText);
        toast({
          title: 'Text Improved',
          description: 'Your text has been enhanced with AI.',
        });
      } else {
        throw new Error(data.error || 'Failed to improve text');
      }
    } catch (error) {
      console.error('Error improving text:', error);
      toast({
        title: 'Improvement Failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 text-xs text-primary"
          disabled={!text.trim()}
          data-testid={`button-improve-${fieldName}`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Improve with AI
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm">Select Tone</h4>
            <p className="text-xs text-muted-foreground">Choose how to improve this text</p>
          </div>
          
          <RadioGroup
            value={selectedTone}
            onValueChange={(value) => setSelectedTone(value as ToneType)}
            className="space-y-2"
          >
            {tones.map((tone) => (
              <div key={tone.value} className="flex items-start gap-2">
                <RadioGroupItem value={tone.value} id={tone.value} className="mt-0.5" />
                <Label htmlFor={tone.value} className="cursor-pointer">
                  <span className="text-sm font-medium">{tone.label}</span>
                  <p className="text-xs text-muted-foreground">{tone.description}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            onClick={handleImprove}
            disabled={isLoading}
            className="w-full"
            size="sm"
            data-testid={`button-apply-improve-${fieldName}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Apply Improvement
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
