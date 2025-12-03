import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCV } from '@/context/CVContext';
import { cn } from '@/lib/utils';

export default function PhotoUpload() {
  const { cvData, updateCVData } = useCV();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateCVData('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [updateCVData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  const removePhoto = () => {
    updateCVData('photo', null);
  };

  return (
    <div className="flex flex-col items-center gap-3" data-testid="photo-upload">
      {cvData.photo ? (
        <div className="relative">
          <img
            src={cvData.photo}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover ring-4 ring-background shadow-lg"
            data-testid="img-profile-photo"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute -right-1 -top-1 h-7 w-7 rounded-full"
            onClick={removePhoto}
            data-testid="button-remove-photo"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-2 border-dashed transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
          )}
          data-testid="dropzone-photo"
        >
          <input {...getInputProps()} data-testid="input-photo" />
          <Camera className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Add Photo</span>
        </div>
      )}
    </div>
  );
}
