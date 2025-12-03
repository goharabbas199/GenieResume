import { createContext, useContext, useState, ReactNode } from 'react';

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

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [activeSections, setActiveSections] = useState<string[]>(['personal', 'summary', 'experience', 'education', 'skills']);
  const [isImproving, setIsImproving] = useState(false);

  const updateCVData = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    setCVData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: string) => {
    setActiveSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
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
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
