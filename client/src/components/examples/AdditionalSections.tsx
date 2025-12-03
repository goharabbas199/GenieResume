import { CVProvider } from '@/context/CVContext';
import { CertificationsSection, AchievementsSection, ProjectsSection, LanguagesSection, InterestsSection, AdditionalInfoSection } from '../AdditionalSections';

export default function AdditionalSectionsExample() {
  return (
    <CVProvider>
      <div className="max-w-2xl space-y-4">
        <CertificationsSection />
        <LanguagesSection />
        <InterestsSection />
      </div>
    </CVProvider>
  );
}
