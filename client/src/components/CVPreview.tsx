import { useCV } from '@/context/CVContext';
import { Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap, Award, Code, Star, Languages, Heart, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

interface CVPreviewProps {
  className?: string;
  zoom?: number;
}

type TemplateConfig = {
  primary: string;
  accent: string;
  bg: string;
  layout: 'classic' | 'sidebar-left' | 'sidebar-right' | 'creative' | 'compact' | 'timeline' | 'modern-split' | 'elegant-header';
};

const templateConfigs: Record<string, TemplateConfig> = {
  'modern': { primary: '#3B82F6', accent: '#EFF6FF', bg: '#FFFFFF', layout: 'classic' },
  'minimal': { primary: '#6B7280', accent: '#F9FAFB', bg: '#FFFFFF', layout: 'classic' },
  'corporate': { primary: '#1E3A5F', accent: '#F0F4F8', bg: '#FFFFFF', layout: 'sidebar-left' },
  'creative': { primary: '#8B5CF6', accent: '#F5F3FF', bg: '#FFFFFF', layout: 'creative' },
  'elegant': { primary: '#92400E', accent: '#FFFBEB', bg: '#FFFFFF', layout: 'elegant-header' },
  'sidebar': { primary: '#059669', accent: '#ECFDF5', bg: '#FFFFFF', layout: 'sidebar-left' },
  'ats-friendly': { primary: '#374151', accent: '#F3F4F6', bg: '#FFFFFF', layout: 'classic' },
  'executive': { primary: '#7C3AED', accent: '#F5F3FF', bg: '#FFFFFF', layout: 'sidebar-right' },
  'tech': { primary: '#2563EB', accent: '#EFF6FF', bg: '#FFFFFF', layout: 'modern-split' },
  'academic': { primary: '#9333EA', accent: '#FAF5FF', bg: '#FFFFFF', layout: 'classic' },
  'compact': { primary: '#4B5563', accent: '#F9FAFB', bg: '#FFFFFF', layout: 'compact' },
  'two-column': { primary: '#0891B2', accent: '#ECFEFF', bg: '#FFFFFF', layout: 'sidebar-left' },
  'timeline': { primary: '#D97706', accent: '#FFFBEB', bg: '#FFFFFF', layout: 'timeline' },
  'professional': { primary: '#1F2937', accent: '#F9FAFB', bg: '#FFFFFF', layout: 'sidebar-right' },
  'bold': { primary: '#DC2626', accent: '#FEF2F2', bg: '#FFFFFF', layout: 'creative' },
  'clean': { primary: '#64748B', accent: '#F8FAFC', bg: '#FFFFFF', layout: 'classic' },
  'gradient': { primary: '#6366F1', accent: '#EEF2FF', bg: '#FFFFFF', layout: 'modern-split' },
  'classic': { primary: '#1E293B', accent: '#F1F5F9', bg: '#FFFFFF', layout: 'classic' },
  'fresh': { primary: '#10B981', accent: '#ECFDF5', bg: '#FFFFFF', layout: 'sidebar-left' },
  'simple': { primary: '#78716C', accent: '#FAFAF9', bg: '#FFFFFF', layout: 'compact' },
};

export default function CVPreview({ className, zoom = 0.85 }: CVPreviewProps) {
  const { cvData, selectedTemplate, activeSections } = useCV();
  const config = templateConfigs[selectedTemplate] || templateConfigs['modern'];
  const { primary, accent, layout } = config;

  const ContactInfo = ({ dark = false, vertical = false }: { dark?: boolean; vertical?: boolean }) => (
    <div className={cn("flex gap-3 text-xs", vertical ? "flex-col" : "flex-wrap")}>
      {cvData.email && (
        <div className="flex items-center gap-1.5">
          <Mail className="h-3 w-3 flex-shrink-0" style={{ color: dark ? 'rgba(255,255,255,0.8)' : primary }} />
          <span className={dark ? "text-white/90" : "text-gray-600"}>{cvData.email}</span>
        </div>
      )}
      {cvData.phone && (
        <div className="flex items-center gap-1.5">
          <Phone className="h-3 w-3 flex-shrink-0" style={{ color: dark ? 'rgba(255,255,255,0.8)' : primary }} />
          <span className={dark ? "text-white/90" : "text-gray-600"}>{cvData.phone}</span>
        </div>
      )}
      {cvData.location && (
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: dark ? 'rgba(255,255,255,0.8)' : primary }} />
          <span className={dark ? "text-white/90" : "text-gray-600"}>{cvData.location}</span>
        </div>
      )}
      {cvData.website && (
        <div className="flex items-center gap-1.5">
          <Globe className="h-3 w-3 flex-shrink-0" style={{ color: dark ? 'rgba(255,255,255,0.8)' : primary }} />
          <span className={cn("break-all", dark ? "text-white/90" : "text-gray-600")}>{cvData.website}</span>
        </div>
      )}
    </div>
  );

  const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
    <h2 className="text-sm font-semibold uppercase tracking-wide mb-2 pb-1 border-b flex items-center gap-2" style={{ color: primary, borderColor: accent }}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </h2>
  );

  const Skills = ({ dark = false }: { dark?: boolean }) => (
    cvData.skills.length > 0 ? (
      <div className="flex flex-wrap gap-1.5">
        {cvData.skills.map((skill, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded text-xs"
            style={{ 
              backgroundColor: dark ? 'rgba(255,255,255,0.2)' : accent, 
              color: dark ? 'white' : primary 
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    ) : null
  );

  const LanguagesList = ({ dark = false }: { dark?: boolean }) => (
    activeSections.includes('languages') && cvData.languages.length > 0 ? (
      <div className="space-y-1">
        {cvData.languages.map((lang, i) => (
          <div key={i} className={cn("flex justify-between text-xs", dark ? "text-white/90" : "text-gray-600")}>
            <span className="font-medium">{lang.name}</span>
            <span className="capitalize opacity-80">{lang.proficiency}</span>
          </div>
        ))}
      </div>
    ) : null
  );

  const Experiences = () => (
    cvData.experiences.length > 0 ? (
      <div className="space-y-3">
        {cvData.experiences.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between items-start flex-wrap gap-1">
              <div>
                <h3 className="font-semibold text-sm">{exp.jobTitle || 'Job Title'}</h3>
                <p className="text-xs" style={{ color: primary }}>{exp.company}</p>
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
              </span>
            </div>
            {exp.description && (
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    ) : null
  );

  const Education = () => (
    cvData.education.length > 0 ? (
      <div className="space-y-3">
        {cvData.education.map((edu, i) => (
          <div key={i}>
            <div className="flex justify-between items-start flex-wrap gap-1">
              <div>
                <h3 className="font-semibold text-sm">{edu.degree || 'Degree'}</h3>
                <p className="text-xs" style={{ color: primary }}>{edu.institution}</p>
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
              </span>
            </div>
            {edu.description && (
              <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    ) : null
  );

  const AdditionalSections = () => (
    <>
      {activeSections.includes('certifications') && cvData.certifications.length > 0 && (
        <div className="mb-4">
          <SectionTitle icon={Award}>Certifications</SectionTitle>
          <div className="space-y-1.5">
            {cvData.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="font-medium">{cert.name}</span>
                <span className="text-gray-500">{cert.issuer} - {formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeSections.includes('projects') && cvData.projects.length > 0 && (
        <div className="mb-4">
          <SectionTitle icon={Code}>Projects</SectionTitle>
          <div className="space-y-2">
            {cvData.projects.map((project, i) => (
              <div key={i}>
                <h3 className="font-semibold text-xs">{project.name}</h3>
                {project.link && <p className="text-xs" style={{ color: primary }}>{project.link}</p>}
                {project.description && <p className="text-xs text-gray-600 mt-0.5">{project.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      {activeSections.includes('interests') && cvData.interests.length > 0 && (
        <div className="mb-4">
          <SectionTitle icon={Heart}>Interests</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {cvData.interests.map((interest, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: accent, color: primary }}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      {activeSections.includes('additionalInfo') && cvData.additionalInfo && (
        <div className="mb-4">
          <SectionTitle icon={Info}>Additional Information</SectionTitle>
          <p className="text-xs text-gray-600 leading-relaxed">{cvData.additionalInfo}</p>
        </div>
      )}
    </>
  );

  const renderSidebarLayout = (sidebarPosition: 'left' | 'right') => {
    const sidebar = (
      <div className="w-[35%] p-5 text-white" style={{ backgroundColor: primary }}>
        {cvData.photo && (
          <div className="flex justify-center mb-4">
            <img src={cvData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/30" />
          </div>
        )}
        <h1 className="text-lg font-bold text-center mb-1">{cvData.fullName || 'Your Name'}</h1>
        {cvData.jobTitle && <p className="text-sm text-white/80 text-center mb-4">{cvData.jobTitle}</p>}
        
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-2">Contact</h3>
            <ContactInfo dark vertical />
          </div>
          
          {cvData.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-2">Skills</h3>
              <Skills dark />
            </div>
          )}
          
          {activeSections.includes('languages') && cvData.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-2">Languages</h3>
              <LanguagesList dark />
            </div>
          )}
        </div>
      </div>
    );

    const main = (
      <div className="w-[65%] p-6">
        {cvData.summary && (
          <div className="mb-5">
            <SectionTitle icon={Star}>Profile</SectionTitle>
            <p className="text-xs text-gray-600 leading-relaxed">{cvData.summary}</p>
          </div>
        )}
        {cvData.experiences.length > 0 && (
          <div className="mb-5">
            <SectionTitle icon={Briefcase}>Experience</SectionTitle>
            <Experiences />
          </div>
        )}
        {cvData.education.length > 0 && (
          <div className="mb-5">
            <SectionTitle icon={GraduationCap}>Education</SectionTitle>
            <Education />
          </div>
        )}
        <AdditionalSections />
      </div>
    );

    return sidebarPosition === 'left' ? (
      <div className="flex min-h-[900px]">{sidebar}{main}</div>
    ) : (
      <div className="flex min-h-[900px]">{main}{sidebar}</div>
    );
  };

  const renderCreativeLayout = () => (
    <div className="min-h-[900px]">
      <div className="relative" style={{ backgroundColor: primary }}>
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.2) 75%)`,
          backgroundSize: '20px 20px'
        }} />
        <div className="relative p-8 flex items-center gap-6">
          {cvData.photo && (
            <img src={cvData.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white/40 shadow-lg" />
          )}
          <div className="text-white flex-1">
            <h1 className="text-3xl font-bold mb-1">{cvData.fullName || 'Your Name'}</h1>
            {cvData.jobTitle && <p className="text-lg opacity-90 mb-3">{cvData.jobTitle}</p>}
            <ContactInfo dark />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {cvData.summary && (
          <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: accent }}>
            <p className="text-sm text-gray-700 leading-relaxed italic">"{cvData.summary}"</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            {cvData.experiences.length > 0 && (
              <div className="mb-5">
                <SectionTitle icon={Briefcase}>Experience</SectionTitle>
                <Experiences />
              </div>
            )}
            {cvData.education.length > 0 && (
              <div className="mb-5">
                <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                <Education />
              </div>
            )}
          </div>
          <div>
            {cvData.skills.length > 0 && (
              <div className="mb-5">
                <SectionTitle icon={Star}>Skills</SectionTitle>
                <Skills />
              </div>
            )}
            <AdditionalSections />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompactLayout = () => (
    <div className="p-5 min-h-[900px]" style={{ fontSize: '11px' }}>
      <div className="flex justify-between items-start border-b-2 pb-3 mb-4" style={{ borderColor: primary }}>
        <div className="flex items-center gap-4">
          {cvData.photo && (
            <img src={cvData.photo} alt="Profile" className="w-16 h-16 rounded-full object-cover" style={{ border: `2px solid ${primary}` }} />
          )}
          <div>
            <h1 className="text-xl font-bold" style={{ color: primary }}>{cvData.fullName || 'Your Name'}</h1>
            {cvData.jobTitle && <p className="text-gray-600">{cvData.jobTitle}</p>}
          </div>
        </div>
        <div className="text-right">
          <ContactInfo />
        </div>
      </div>
      
      {cvData.summary && (
        <div className="mb-3">
          <h2 className="font-bold uppercase text-xs mb-1" style={{ color: primary }}>Summary</h2>
          <p className="text-gray-600 leading-snug">{cvData.summary}</p>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-3">
          {cvData.experiences.length > 0 && (
            <div>
              <h2 className="font-bold uppercase text-xs mb-2" style={{ color: primary }}>Experience</h2>
              <div className="space-y-2">
                {cvData.experiences.map((exp, i) => (
                  <div key={i} className="border-l-2 pl-2" style={{ borderColor: accent }}>
                    <div className="flex justify-between">
                      <span className="font-semibold">{exp.jobTitle}</span>
                      <span className="text-gray-500">{formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    <p style={{ color: primary }}>{exp.company}</p>
                    {exp.description && <p className="text-gray-600 mt-0.5">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {cvData.education.length > 0 && (
            <div>
              <h2 className="font-bold uppercase text-xs mb-2" style={{ color: primary }}>Education</h2>
              <div className="space-y-2">
                {cvData.education.map((edu, i) => (
                  <div key={i} className="border-l-2 pl-2" style={{ borderColor: accent }}>
                    <div className="flex justify-between">
                      <span className="font-semibold">{edu.degree}</span>
                      <span className="text-gray-500">{formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}</span>
                    </div>
                    <p style={{ color: primary }}>{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {cvData.skills.length > 0 && (
            <div>
              <h2 className="font-bold uppercase text-xs mb-2" style={{ color: primary }}>Skills</h2>
              <Skills />
            </div>
          )}
          {activeSections.includes('languages') && cvData.languages.length > 0 && (
            <div>
              <h2 className="font-bold uppercase text-xs mb-2" style={{ color: primary }}>Languages</h2>
              <LanguagesList />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTimelineLayout = () => (
    <div className="min-h-[900px]">
      <div className="p-6 text-center" style={{ backgroundColor: accent }}>
        {cvData.photo && (
          <img src={cvData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-3" style={{ border: `3px solid ${primary}` }} />
        )}
        <h1 className="text-2xl font-bold" style={{ color: primary }}>{cvData.fullName || 'Your Name'}</h1>
        {cvData.jobTitle && <p className="text-gray-600 mt-1">{cvData.jobTitle}</p>}
        <div className="flex justify-center mt-3">
          <ContactInfo />
        </div>
      </div>
      
      <div className="p-6">
        {cvData.summary && (
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">{cvData.summary}</p>
          </div>
        )}
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ backgroundColor: primary }} />
          
          {cvData.experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-center font-bold uppercase text-sm mb-4 relative">
                <span className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: primary }}>Experience</span>
              </h2>
              <div className="space-y-4">
                {cvData.experiences.map((exp, i) => (
                  <div key={i} className={cn("flex gap-4", i % 2 === 0 ? "flex-row-reverse text-right" : "")}>
                    <div className="w-1/2 p-3 rounded-lg" style={{ backgroundColor: accent }}>
                      <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                      <p className="text-xs" style={{ color: primary }}>{exp.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}</p>
                      {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
                    </div>
                    <div className="w-3 h-3 rounded-full mt-4 flex-shrink-0" style={{ backgroundColor: primary }} />
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {cvData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-center font-bold uppercase text-sm mb-4 relative">
                <span className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: primary }}>Education</span>
              </h2>
              <div className="space-y-4">
                {cvData.education.map((edu, i) => (
                  <div key={i} className={cn("flex gap-4", i % 2 === 0 ? "" : "flex-row-reverse text-right")}>
                    <div className="w-1/2 p-3 rounded-lg" style={{ backgroundColor: accent }}>
                      <h3 className="font-semibold text-sm">{edu.degree}</h3>
                      <p className="text-xs" style={{ color: primary }}>{edu.institution}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}</p>
                    </div>
                    <div className="w-3 h-3 rounded-full mt-4 flex-shrink-0" style={{ backgroundColor: primary }} />
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {cvData.skills.length > 0 && (
          <div className="mt-6 text-center">
            <h2 className="font-bold uppercase text-sm mb-3" style={{ color: primary }}>Skills</h2>
            <div className="flex flex-wrap justify-center gap-2">
              <Skills />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderModernSplitLayout = () => (
    <div className="min-h-[900px] flex">
      <div className="w-[38%] p-5" style={{ backgroundColor: accent }}>
        <div className="sticky top-5">
          {cvData.photo && (
            <img src={cvData.photo} alt="Profile" className="w-28 h-28 rounded-2xl object-cover mx-auto mb-4 shadow-md" />
          )}
          <h1 className="text-xl font-bold text-center" style={{ color: primary }}>{cvData.fullName || 'Your Name'}</h1>
          {cvData.jobTitle && <p className="text-sm text-gray-600 text-center mt-1">{cvData.jobTitle}</p>}
          
          <div className="mt-6 space-y-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <h3 className="text-xs font-semibold uppercase mb-2" style={{ color: primary }}>Contact</h3>
              <ContactInfo vertical />
            </div>
            
            {cvData.skills.length > 0 && (
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="text-xs font-semibold uppercase mb-2" style={{ color: primary }}>Skills</h3>
                <Skills />
              </div>
            )}
            
            {activeSections.includes('languages') && cvData.languages.length > 0 && (
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="text-xs font-semibold uppercase mb-2" style={{ color: primary }}>Languages</h3>
                <LanguagesList />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="w-[62%] p-6">
        {cvData.summary && (
          <div className="mb-5">
            <SectionTitle icon={Star}>About Me</SectionTitle>
            <p className="text-sm text-gray-600 leading-relaxed">{cvData.summary}</p>
          </div>
        )}
        {cvData.experiences.length > 0 && (
          <div className="mb-5">
            <SectionTitle icon={Briefcase}>Work Experience</SectionTitle>
            <Experiences />
          </div>
        )}
        {cvData.education.length > 0 && (
          <div className="mb-5">
            <SectionTitle icon={GraduationCap}>Education</SectionTitle>
            <Education />
          </div>
        )}
        <AdditionalSections />
      </div>
    </div>
  );

  const renderElegantHeaderLayout = () => (
    <div className="min-h-[900px]">
      <div className="relative h-32" style={{ backgroundColor: primary }}>
        <div className="absolute -bottom-12 left-6 flex items-end gap-4">
          {cvData.photo && (
            <img src={cvData.photo} alt="Profile" className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg" />
          )}
          <div className="pb-2">
            <h1 className="text-2xl font-bold text-white drop-shadow">{cvData.fullName || 'Your Name'}</h1>
            {cvData.jobTitle && <p className="text-white/90">{cvData.jobTitle}</p>}
          </div>
        </div>
      </div>
      
      <div className="pt-16 px-6 pb-6">
        <div className="flex justify-end mb-4">
          <ContactInfo />
        </div>
        
        {cvData.summary && (
          <div className="mb-5 border-l-4 pl-4" style={{ borderColor: primary }}>
            <p className="text-sm text-gray-600 leading-relaxed italic">{cvData.summary}</p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-5">
            {cvData.experiences.length > 0 && (
              <div>
                <SectionTitle icon={Briefcase}>Professional Experience</SectionTitle>
                <Experiences />
              </div>
            )}
            {cvData.education.length > 0 && (
              <div>
                <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                <Education />
              </div>
            )}
            <AdditionalSections />
          </div>
          <div className="space-y-4">
            {cvData.skills.length > 0 && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: accent }}>
                <h3 className="text-xs font-semibold uppercase mb-2" style={{ color: primary }}>Core Skills</h3>
                <Skills />
              </div>
            )}
            {activeSections.includes('languages') && cvData.languages.length > 0 && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: accent }}>
                <h3 className="text-xs font-semibold uppercase mb-2" style={{ color: primary }}>Languages</h3>
                <LanguagesList />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassicLayout = () => (
    <div className="p-8 min-h-[900px]">
      <div className="text-center pb-6 mb-6 border-b-2" style={{ borderColor: primary }}>
        {cvData.photo && (
          <img src={cvData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4" style={{ outlineColor: accent }} />
        )}
        <h1 className="text-3xl font-bold" style={{ color: primary }}>{cvData.fullName || 'Your Name'}</h1>
        {cvData.jobTitle && <p className="text-lg text-gray-600 mt-1">{cvData.jobTitle}</p>}
        <div className="flex justify-center mt-4">
          <ContactInfo />
        </div>
      </div>

      {cvData.summary && (
        <div className="mb-6">
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-sm text-gray-600 leading-relaxed">{cvData.summary}</p>
        </div>
      )}

      {cvData.experiences.length > 0 && (
        <div className="mb-6">
          <SectionTitle icon={Briefcase}>Work Experience</SectionTitle>
          <div className="space-y-4">
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: accent }}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold">{exp.jobTitle || 'Job Title'}</h3>
                    <p className="text-sm" style={{ color: primary }}>{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                </div>
                {exp.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {cvData.education.length > 0 && (
        <div className="mb-6">
          <SectionTitle icon={GraduationCap}>Education</SectionTitle>
          <div className="space-y-3">
            {cvData.education.map((edu, i) => (
              <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: accent }}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold">{edu.degree || 'Degree'}</h3>
                    <p className="text-sm" style={{ color: primary }}>{edu.institution}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}</span>
                  </div>
                </div>
                {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {cvData.skills.length > 0 && (
        <div className="mb-6">
          <SectionTitle icon={Star}>Skills</SectionTitle>
          <Skills />
        </div>
      )}

      <AdditionalSections />
    </div>
  );

  const renderLayout = () => {
    switch (layout) {
      case 'sidebar-left': return renderSidebarLayout('left');
      case 'sidebar-right': return renderSidebarLayout('right');
      case 'creative': return renderCreativeLayout();
      case 'compact': return renderCompactLayout();
      case 'timeline': return renderTimelineLayout();
      case 'modern-split': return renderModernSplitLayout();
      case 'elegant-header': return renderElegantHeaderLayout();
      case 'classic':
      default: return renderClassicLayout();
    }
  };

  return (
    <div className={cn("bg-card rounded-2xl shadow-lg overflow-hidden border", className)} data-testid="cv-preview">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 flex justify-center" style={{ backgroundColor: '#e5e7eb' }}>
          <div
            id="cv-preview-content"
            className="bg-white shadow-xl origin-top"
            style={{
              width: '794px',
              minHeight: '1122px',
              fontFamily: 'Inter, sans-serif',
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              marginBottom: `${(zoom - 1) * 1122}px`,
            }}
          >
            {renderLayout()}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
