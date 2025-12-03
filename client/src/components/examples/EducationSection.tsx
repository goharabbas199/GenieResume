import { CVProvider } from '@/context/CVContext';
import EducationSection from '../EducationSection';

export default function EducationSectionExample() {
  return (
    <CVProvider>
      <div className="max-w-2xl">
        <EducationSection />
      </div>
    </CVProvider>
  );
}
