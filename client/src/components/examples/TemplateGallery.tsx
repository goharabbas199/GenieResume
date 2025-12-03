import { CVProvider } from '@/context/CVContext';
import TemplateGallery from '../TemplateGallery';

export default function TemplateGalleryExample() {
  return (
    <CVProvider>
      <div className="p-4 bg-background">
        <TemplateGallery />
      </div>
    </CVProvider>
  );
}
