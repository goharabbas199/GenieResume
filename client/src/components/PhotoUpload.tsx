import { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, X, ZoomIn, ZoomOut, RotateCcw, Check } from 'lucide-react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCV } from '@/context/CVContext';
import { cn } from '@/lib/utils';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 80,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function PhotoUpload() {
  const { cvData, updateCVData } = useCV();
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setShowCropDialog(true);
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerAspectCrop(width, height, 1);
    setCrop(newCrop);
  };

  const getCroppedImage = () => {
    if (!imgRef.current || !completedCrop || !canvasRef.current) return;

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio || 1;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    canvas.width = cropWidth * pixelRatio;
    canvas.height = cropHeight * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const base64Image = canvas.toDataURL('image/jpeg', 0.95);
    updateCVData('photo', base64Image);
    setShowCropDialog(false);
    setOriginalImage(null);
  };

  const removePhoto = () => {
    updateCVData('photo', null);
  };

  const handleEditPhoto = () => {
    if (cvData.photo) {
      setOriginalImage(cvData.photo);
      setShowCropDialog(true);
      setZoom(1);
    }
  };

  const resetCrop = () => {
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, 1));
      setZoom(1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3" data-testid="photo-upload">
      {cvData.photo ? (
        <div className="relative group">
          <img
            src={cvData.photo}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover ring-4 ring-background shadow-lg cursor-pointer transition-opacity group-hover:opacity-80"
            onClick={handleEditPhoto}
            data-testid="img-profile-photo"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full text-xs"
              onClick={handleEditPhoto}
              data-testid="button-edit-photo"
            >
              Edit
            </Button>
          </div>
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

      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Adjust Your Photo</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center bg-muted/50 rounded-lg p-4 max-h-[400px] overflow-hidden">
              {originalImage && (
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                  className="max-h-[350px]"
                >
                  <img
                    ref={imgRef}
                    src={originalImage}
                    alt="Crop preview"
                    onLoad={onImageLoad}
                    style={{ 
                      maxHeight: '350px',
                      transform: `scale(${zoom})`,
                      transformOrigin: 'center',
                      transition: 'transform 0.1s ease-out'
                    }}
                    className="rounded-lg"
                  />
                </ReactCrop>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ZoomOut className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Slider
                  value={[zoom]}
                  onValueChange={(value) => setZoom(value[0])}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="flex-1"
                  data-testid="slider-zoom"
                />
                <ZoomIn className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                Drag the selection to adjust which part of your photo appears in your CV
              </p>
            </div>

            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                onClick={resetCrop}
                className="gap-2"
                data-testid="button-reset-crop"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCropDialog(false)}
                  data-testid="button-cancel-crop"
                >
                  Cancel
                </Button>
                <Button
                  onClick={getCroppedImage}
                  className="gap-2"
                  data-testid="button-apply-crop"
                >
                  <Check className="h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
