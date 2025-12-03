import { CVProvider, useCV } from '@/context/CVContext';
import CVPreview from '../CVPreview';
import { useEffect } from 'react';

function MockDataLoader({ children }: { children: React.ReactNode }) {
  const { updateCVData } = useCV();

  useEffect(() => {
    updateCVData('fullName', 'Sarah Johnson');
    updateCVData('jobTitle', 'Senior Product Designer');
    updateCVData('email', 'sarah.johnson@email.com');
    updateCVData('phone', '+1 (555) 123-4567');
    updateCVData('location', 'San Francisco, CA');
    updateCVData('website', 'linkedin.com/in/sarahjohnson');
    updateCVData('summary', 'Creative and detail-oriented Product Designer with 8+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through elegant design solutions.');
    updateCVData('experiences', [
      {
        id: '1',
        jobTitle: 'Senior Product Designer',
        company: 'Tech Innovations Inc.',
        startDate: '2021-03',
        endDate: '',
        currentlyWorking: true,
        description: 'Lead design for flagship products serving 2M+ users. Collaborate with cross-functional teams to deliver impactful user experiences.',
      },
      {
        id: '2',
        jobTitle: 'Product Designer',
        company: 'StartupXYZ',
        startDate: '2018-06',
        endDate: '2021-02',
        currentlyWorking: false,
        description: 'Designed and shipped 15+ product features. Established design system that improved team velocity by 40%.',
      },
    ]);
    updateCVData('education', [
      {
        id: '1',
        degree: 'Master of Design',
        institution: 'Stanford University',
        startDate: '2014-09',
        endDate: '2016-06',
        currentlyStudying: false,
        description: '',
      },
    ]);
    updateCVData('skills', ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS']);
  }, []);

  return <>{children}</>;
}

export default function CVPreviewExample() {
  return (
    <CVProvider>
      <MockDataLoader>
        <div className="h-[600px]">
          <CVPreview className="h-full" />
        </div>
      </MockDataLoader>
    </CVProvider>
  );
}
