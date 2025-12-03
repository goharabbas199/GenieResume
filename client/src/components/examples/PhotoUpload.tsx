import { CVProvider } from '@/context/CVContext';
import PhotoUpload from '../PhotoUpload';

export default function PhotoUploadExample() {
  return (
    <CVProvider>
      <div className="p-8 bg-card rounded-2xl flex justify-center">
        <PhotoUpload />
      </div>
    </CVProvider>
  );
}
