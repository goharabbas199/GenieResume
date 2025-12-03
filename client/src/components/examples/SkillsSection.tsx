import { CVProvider } from '@/context/CVContext';
import SkillsSection from '../SkillsSection';

export default function SkillsSectionExample() {
  return (
    <CVProvider>
      <div className="max-w-2xl">
        <SkillsSection />
      </div>
    </CVProvider>
  );
}
