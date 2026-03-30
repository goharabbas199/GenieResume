export const sampleCVData = {
  photo: null,
  fullName: 'Ahmed Khan',
  jobTitle: 'Senior Software Engineer',
  email: 'ahmed.khan@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/ahmedkhan',
  summary:
    'Results-driven Senior Software Engineer with 8+ years of experience designing and delivering scalable, high-performance systems. Proven leader in cross-functional teams, passionate about clean architecture, developer experience, and building products that reach millions of users. Adept at driving technical strategy from concept to production.',
  experiences: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      startDate: '2020-03',
      endDate: '',
      currentlyWorking: true,
      description:
        'Led migration of monolithic application to microservices, reducing system latency by 40% and improving release cadence. Architected a real-time data pipeline processing 5M+ events per day. Mentored a team of 6 engineers and established coding standards adopted across the organisation.',
    },
    {
      id: '2',
      jobTitle: 'Software Engineer',
      company: 'StartupXYZ',
      startDate: '2017-06',
      endDate: '2020-02',
      currentlyWorking: false,
      description:
        'Built and maintained REST APIs serving 2M+ daily active users. Improved CI/CD pipeline, cutting average deployment time by 60%. Delivered 3 major product features ahead of schedule, directly contributing to a Series B funding round.',
    },
    {
      id: '3',
      jobTitle: 'Junior Developer',
      company: 'Digital Solutions Ltd.',
      startDate: '2015-09',
      endDate: '2017-05',
      currentlyWorking: false,
      description:
        'Developed and maintained client-facing web applications using React and Node.js. Collaborated with design and product teams to implement responsive UI components and improve page load performance by 30%.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.Sc. Computer Science',
      institution: 'University of California, Berkeley',
      startDate: '2011-09',
      endDate: '2015-05',
      currentlyStudying: false,
      description: 'Graduated with Distinction. Dean\'s List 2013–2015. Senior thesis on distributed consensus algorithms.',
    },
  ],
  skills: [
    'TypeScript', 'React', 'Node.js', 'PostgreSQL',
    'Docker', 'AWS', 'GraphQL', 'Python', 'Kubernetes', 'Redis',
  ],
  certifications: [
    { id: '1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2022-08' },
    { id: '2', name: 'Google Cloud Professional Developer', issuer: 'Google', date: '2021-04' },
  ],
  achievements: [
    'Speaker at NodeConf 2023 — "Building Resilient Microservices at Scale"',
    'Open-source library with 3,400+ GitHub stars, used by 200+ companies globally',
    'Reduced cloud infrastructure costs by $180K/year through architecture optimisation',
  ],
  projects: [
    {
      id: '1',
      name: 'OpenAPI Client Generator',
      description:
        'Built an open-source CLI tool that auto-generates type-safe API clients from OpenAPI specs. Over 3,400 GitHub stars and actively maintained.',
      link: 'github.com/ahmedkhan/openapi-gen',
    },
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'native' },
    { id: '2', name: 'Arabic', proficiency: 'native' },
    { id: '3', name: 'French', proficiency: 'intermediate' },
  ],
  interests: ['Open Source', 'System Design', 'Rock Climbing', 'Photography'],
  additionalInfo: '',
};

const ALL_SECTIONS = [
  'personal', 'summary', 'experience', 'education', 'skills',
  'certifications', 'achievements', 'projects', 'languages', 'interests',
];

function isDataEmpty(data: any): boolean {
  return !data.fullName && !data.email && data.experiences.length === 0;
}

export function getDisplayData(userData: any): { data: any; sections: string[] } {
  if (isDataEmpty(userData)) {
    return { data: sampleCVData, sections: ALL_SECTIONS };
  }

  const data = {
    ...userData,
    fullName:       userData.fullName      || sampleCVData.fullName,
    jobTitle:       userData.jobTitle      || sampleCVData.jobTitle,
    email:          userData.email         || sampleCVData.email,
    phone:          userData.phone         || sampleCVData.phone,
    location:       userData.location      || sampleCVData.location,
    website:        userData.website       || sampleCVData.website,
    summary:        userData.summary       || sampleCVData.summary,
    experiences:    userData.experiences.length  > 0 ? userData.experiences  : sampleCVData.experiences,
    education:      userData.education.length    > 0 ? userData.education     : sampleCVData.education,
    skills:         userData.skills.length       > 0 ? userData.skills        : sampleCVData.skills,
    certifications: userData.certifications.length > 0 ? userData.certifications : sampleCVData.certifications,
    achievements:   userData.achievements.length > 0 ? userData.achievements  : sampleCVData.achievements,
    projects:       userData.projects.length     > 0 ? userData.projects      : sampleCVData.projects,
    languages:      userData.languages.length    > 0 ? userData.languages     : sampleCVData.languages,
    interests:      userData.interests.length    > 0 ? userData.interests     : sampleCVData.interests,
  };

  return { data, sections: ALL_SECTIONS };
}
