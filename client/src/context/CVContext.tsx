import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface CVData {
  photo: string | null;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  achievements: string[];
  projects: Project[];
  languages: Language[];
  interests: string[];
  additionalInfo: string;
}

export type ToneType = 'professional' | 'ats-friendly' | 'concise' | 'expanded' | 'creative';

interface CVContextType {
  cvData: CVData;
  updateCVData: <K extends keyof CVData>(field: K, value: CVData[K]) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  activeSections: string[];
  toggleSection: (section: string) => void;
  isImproving: boolean;
  setIsImproving: (value: boolean) => void;
  completionScore: number;
  resetCV: () => void;
  loadSampleData: () => void;
}

const defaultCVData: CVData = {
  photo: null,
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  achievements: [],
  projects: [],
  languages: [],
  interests: [],
  additionalInfo: '',
};

const sampleCVData: CVData = {
  photo: null,
  fullName: 'Alexandra Chen',
  jobTitle: 'Senior Product Designer',
  email: 'alex.chen@example.com',
  phone: '+1 (555) 987-6543',
  location: 'San Francisco, CA',
  website: 'alexandrachen.design',
  summary: 'Creative and strategic product designer with 7+ years of experience crafting intuitive digital experiences for leading SaaS and consumer products. Proven track record of leading design systems, conducting user research, and collaborating cross-functionally to deliver products loved by millions of users. Passionate about accessible design and data-driven decision making.',
  experiences: [
    {
      id: '1',
      jobTitle: 'Senior Product Designer',
      company: 'Figma Inc.',
      startDate: '2021-06',
      endDate: '',
      currentlyWorking: true,
      description: 'Led end-to-end design for 3 major product launches, increasing user engagement by 40%. Established and maintained a company-wide design system adopted by 50+ engineers. Conducted 200+ user interviews to inform product strategy. Mentored 3 junior designers and championed accessibility standards across all product surfaces.',
    },
    {
      id: '2',
      jobTitle: 'Product Designer',
      company: 'Airbnb',
      startDate: '2018-03',
      endDate: '2021-05',
      currentlyWorking: false,
      description: 'Redesigned the host onboarding flow, reducing drop-off by 35% and increasing host sign-ups by 22%. Collaborated with the data science team to establish design metrics and KPIs. Shipped 12 A/B tests resulting in a combined revenue uplift of $4.2M annually.',
    },
    {
      id: '3',
      jobTitle: 'UX Designer',
      company: 'IDEO',
      startDate: '2016-07',
      endDate: '2018-02',
      currentlyWorking: false,
      description: 'Worked on design sprints for Fortune 500 clients including healthcare, fintech, and retail. Delivered human-centered design solutions under tight deadlines. Facilitated 40+ co-creation workshops with end users and stakeholders.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.F.A. in Interaction Design',
      institution: 'California College of the Arts',
      startDate: '2012-09',
      endDate: '2016-05',
      currentlyStudying: false,
      description: 'Graduated with Honors. Senior thesis on accessible design patterns for visually impaired users.',
    },
  ],
  skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Adobe XD', 'Usability Testing', 'HTML/CSS', 'Data Analysis', 'Agile', 'Wireframing'],
  certifications: [
    { id: '1', name: 'Google UX Design Certificate', issuer: 'Google', date: '2022-03' },
    { id: '2', name: 'Certified Usability Analyst (CUA)', issuer: 'Human Factors International', date: '2020-09' },
  ],
  achievements: [
    'Speaker at Config 2023 — "Building Inclusive Design Systems at Scale"',
    'Winner, Fast Company Innovation by Design Award 2022',
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source Design System',
      description: 'Built and maintain an open-source React component library with 1,200+ GitHub stars. Used by 80+ startups globally.',
      link: 'github.com/alexandrachen/ds-kit',
    },
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'native' },
    { id: '2', name: 'Mandarin', proficiency: 'fluent' },
    { id: '3', name: 'Spanish', proficiency: 'intermediate' },
  ],
  interests: ['Design Research', 'Typography', 'Hiking', 'Photography'],
  additionalInfo: '',
};

function computeScore(data: CVData): number {
  let score = 0;
  if (data.fullName) score += 10;
  if (data.jobTitle) score += 10;
  if (data.email) score += 10;
  if (data.phone) score += 5;
  if (data.location) score += 5;
  if (data.summary && data.summary.length > 50) score += 15;
  if (data.experiences.length >= 1) score += 20;
  if (data.education.length >= 1) score += 15;
  if (data.skills.length >= 3) score += 10;
  return Math.min(score, 100);
}

const STORAGE_KEY = 'ai-cv-generator-data';

function loadFromStorage(): { cvData: CVData; selectedTemplate: string; activeSections: string[] } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const saved = loadFromStorage();

  const [cvData, setCVData] = useState<CVData>(saved?.cvData ?? defaultCVData);
  const [selectedTemplate, setSelectedTemplateState] = useState(saved?.selectedTemplate ?? 'modern');
  const [activeSections, setActiveSections] = useState<string[]>(
    saved?.activeSections ?? ['personal', 'summary', 'experience', 'education', 'skills']
  );
  const [isImproving, setIsImproving] = useState(false);

  const completionScore = computeScore(cvData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cvData, selectedTemplate, activeSections }));
    } catch {}
  }, [cvData, selectedTemplate, activeSections]);

  const updateCVData = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    setCVData(prev => ({ ...prev, [field]: value }));
  };

  const setSelectedTemplate = (template: string) => {
    setSelectedTemplateState(template);
  };

  const toggleSection = (section: string) => {
    setActiveSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const resetCV = () => {
    setCVData(defaultCVData);
    setSelectedTemplateState('modern');
    setActiveSections(['personal', 'summary', 'experience', 'education', 'skills']);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loadSampleData = () => {
    setCVData(sampleCVData);
    setActiveSections([
      'personal', 'summary', 'experience', 'education', 'skills',
      'certifications', 'achievements', 'projects', 'languages', 'interests',
    ]);
  };

  return (
    <CVContext.Provider value={{
      cvData,
      updateCVData,
      selectedTemplate,
      setSelectedTemplate,
      activeSections,
      toggleSection,
      isImproving,
      setIsImproving,
      completionScore,
      resetCV,
      loadSampleData,
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV must be used within a CVProvider');
  return context;
}
