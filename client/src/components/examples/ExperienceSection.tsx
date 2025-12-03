import { CVProvider } from '@/context/CVContext';
import ExperienceSection from '../ExperienceSection';

export default function ExperienceSectionExample() {
  return (
    <CVProvider>
      <div className="max-w-2xl">
        <ExperienceSection />
      </div>
    </CVProvider>
  );
}
