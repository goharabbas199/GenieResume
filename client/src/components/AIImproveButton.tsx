import { useState } from 'react';
import { Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export type ToneType = 'professional' | 'ats-friendly' | 'concise' | 'expanded' | 'creative';

const tones: { value: ToneType; label: string; description: string; emoji: string }[] = [
  { value: 'professional', label: 'Professional', description: 'Polished, formal tone', emoji: '👔' },
  { value: 'ats-friendly', label: 'ATS-Friendly', description: 'Keyword-optimized', emoji: '🤖' },
  { value: 'concise', label: 'Concise', description: 'Short and impactful', emoji: '⚡' },
  { value: 'expanded', label: 'Expanded', description: 'More detailed version', emoji: '📝' },
  { value: 'creative', label: 'Creative', description: 'Unique and memorable', emoji: '✨' },
];

interface AIImproveButtonProps {
  text: string;
  onImprove: (improvedText: string) => void;
  fieldName: string;
}

export default function AIImproveButton({ text, onImprove, fieldName }: AIImproveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTone, setLoadingTone] = useState<ToneType | null>(null);
  const { toast } = useToast();

  const handleImprove = async (tone: ToneType) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setLoadingTone(tone);

    try {
      const response = await apiRequest('POST', '/api/improve-text', {
        text,
        tone,
        fieldType: fieldName,
      });

      const data = await response.json();

      if (data.improvedText) {
        onImprove(data.improvedText);
        toast({
          title: 'Text improved',
          description: `Rewritten in ${tones.find(t => t.value === tone)?.label} tone.`,
        });
      } else {
        throw new Error(data.error || 'Failed to improve text');
      }
    } catch (error) {
      console.error('Error improving text:', error);
      toast({
        title: 'Improvement failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setLoadingTone(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 text-xs text-primary px-2"
          disabled={!text.trim() || isLoading}
          data-testid={`button-improve-${fieldName}`}
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          {isLoading ? 'Improving…' : 'Improve with AI'}
          {!isLoading && <ChevronDown className="h-3 w-3 opacity-60" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Select tone</div>
        <DropdownMenuSeparator />
        {tones.map((tone) => (
          <DropdownMenuItem
            key={tone.value}
            onClick={() => handleImprove(tone.value)}
            disabled={isLoading}
            className="gap-2 cursor-pointer"
            data-testid={`button-apply-improve-${fieldName}-${tone.value}`}
          >
            <span className="text-base leading-none">{tone.emoji}</span>
            <div>
              <div className="text-sm font-medium">{tone.label}</div>
              <div className="text-xs text-muted-foreground">{tone.description}</div>
            </div>
            {loadingTone === tone.value && (
              <Loader2 className="ml-auto h-3.5 w-3.5 animate-spin" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
