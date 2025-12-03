import { useCV } from '@/context/CVContext';
import { Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + '-01');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

interface CVPreviewProps {
  className?: string;
}

export default function CVPreview({ className }: CVPreviewProps) {
  const { cvData, selectedTemplate, activeSections } = useCV();

  const templateColors: Record<string, { primary: string; accent: string; bg: string }> = {
    'modern': { primary: '#3B82F6', accent: '#EFF6FF', bg: '#FFFFFF' },
    'minimal': { primary: '#6B7280', accent: '#F9FAFB', bg: '#FFFFFF' },
    'corporate': { primary: '#1E3A5F', accent: '#F0F4F8', bg: '#FFFFFF' },
    'creative': { primary: '#8B5CF6', accent: '#F5F3FF', bg: '#FFFFFF' },
    'elegant': { primary: '#92400E', accent: '#FFFBEB', bg: '#FFFFFF' },
    'sidebar': { primary: '#059669', accent: '#ECFDF5', bg: '#FFFFFF' },
    'ats-friendly': { primary: '#374151', accent: '#F3F4F6', bg: '#FFFFFF' },
    'executive': { primary: '#7C3AED', accent: '#F5F3FF', bg: '#FFFFFF' },
    'tech': { primary: '#2563EB', accent: '#EFF6FF', bg: '#FFFFFF' },
    'academic': { primary: '#9333EA', accent: '#FAF5FF', bg: '#FFFFFF' },
    'compact': { primary: '#4B5563', accent: '#F9FAFB', bg: '#FFFFFF' },
    'two-column': { primary: '#0891B2', accent: '#ECFEFF', bg: '#FFFFFF' },
    'timeline': { primary: '#D97706', accent: '#FFFBEB', bg: '#FFFFFF' },
    'professional': { primary: '#1F2937', accent: '#F9FAFB', bg: '#FFFFFF' },
    'bold': { primary: '#DC2626', accent: '#FEF2F2', bg: '#FFFFFF' },
    'clean': { primary: '#64748B', accent: '#F8FAFC', bg: '#FFFFFF' },
    'gradient': { primary: '#6366F1', accent: '#EEF2FF', bg: '#FFFFFF' },
    'classic': { primary: '#1E293B', accent: '#F1F5F9', bg: '#FFFFFF' },
    'fresh': { primary: '#10B981', accent: '#ECFDF5', bg: '#FFFFFF' },
    'simple': { primary: '#78716C', accent: '#FAFAF9', bg: '#FFFFFF' },
  };

  const colors = templateColors[selectedTemplate] || templateColors['modern'];
  const isSidebarTemplate = ['sidebar', 'two-column'].includes(selectedTemplate);

  return (
    <div className={cn("bg-card rounded-2xl shadow-lg overflow-hidden border", className)} data-testid="cv-preview">
      <div className="bg-muted/50 px-4 py-2 border-b">
        <p className="text-xs font-medium text-muted-foreground">Live Preview</p>
      </div>
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div 
          id="cv-preview-content"
          className="p-6"
          style={{ backgroundColor: colors.bg }}
        >
          <div 
            className={cn(
              "mx-auto bg-white shadow-sm border",
              isSidebarTemplate ? "max-w-[800px]" : "max-w-[700px]"
            )}
            style={{ minHeight: '900px', fontFamily: 'Inter, sans-serif' }}
          >
            {isSidebarTemplate ? (
              <div className="flex min-h-[900px]">
                <div 
                  className="w-1/3 p-6 text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {cvData.photo && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={cvData.photo}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-4 text-sm">
                    {cvData.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 opacity-80" />
                        <span className="text-xs break-all">{cvData.email}</span>
                      </div>
                    )}
                    {cvData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 opacity-80" />
                        <span className="text-xs">{cvData.phone}</span>
                      </div>
                    )}
                    {cvData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 opacity-80" />
                        <span className="text-xs">{cvData.location}</span>
                      </div>
                    )}
                    {cvData.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 opacity-80" />
                        <span className="text-xs break-all">{cvData.website}</span>
                      </div>
                    )}
                  </div>

                  {cvData.skills.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide opacity-80">Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {cvData.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white/20 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSections.includes('languages') && cvData.languages.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide opacity-80">Languages</h3>
                      <div className="space-y-1">
                        {cvData.languages.map((lang, i) => (
                          <div key={i} className="flex justify-between text-xs">
                            <span>{lang.name}</span>
                            <span className="opacity-80 capitalize">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-2/3 p-6">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
                      {cvData.fullName || 'Your Name'}
                    </h1>
                    {cvData.jobTitle && (
                      <p className="text-lg text-gray-600 mt-1">{cvData.jobTitle}</p>
                    )}
                  </div>

                  {cvData.summary && (
                    <div className="mb-6">
                      <h2 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: colors.primary }}>
                        Professional Summary
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">{cvData.summary}</p>
                    </div>
                  )}

                  {cvData.experiences.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: colors.primary }}>
                        Experience
                      </h2>
                      <div className="space-y-4">
                        {cvData.experiences.map((exp, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-sm">{exp.jobTitle || 'Job Title'}</h3>
                                <p className="text-sm text-gray-600">{exp.company}</p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                              </span>
                            </div>
                            {exp.description && (
                              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {cvData.education.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: colors.primary }}>
                        Education
                      </h2>
                      <div className="space-y-3">
                        {cvData.education.map((edu, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-sm">{edu.degree || 'Degree'}</h3>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div 
                  className="text-center pb-6 mb-6 border-b-2"
                  style={{ borderColor: colors.primary }}
                >
                  {cvData.photo && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={cvData.photo}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover ring-4"
                        style={{ outlineColor: colors.accent }}
                      />
                    </div>
                  )}
                  <h1 
                    className="text-3xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    {cvData.fullName || 'Your Name'}
                  </h1>
                  {cvData.jobTitle && (
                    <p className="text-lg text-gray-600 mt-1">{cvData.jobTitle}</p>
                  )}
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
                    {cvData.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" style={{ color: colors.primary }} />
                        <span>{cvData.email}</span>
                      </div>
                    )}
                    {cvData.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" style={{ color: colors.primary }} />
                        <span>{cvData.phone}</span>
                      </div>
                    )}
                    {cvData.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" style={{ color: colors.primary }} />
                        <span>{cvData.location}</span>
                      </div>
                    )}
                    {cvData.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" style={{ color: colors.primary }} />
                        <span>{cvData.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {cvData.summary && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-2 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Professional Summary
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{cvData.summary}</p>
                  </div>
                )}

                {cvData.experiences.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {cvData.experiences.map((exp, i) => (
                        <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: colors.accent }}>
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <h3 className="font-semibold">{exp.jobTitle || 'Job Title'}</h3>
                              <p className="text-sm" style={{ color: colors.primary }}>{exp.company}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                              </span>
                            </div>
                          </div>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.education.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Education
                    </h2>
                    <div className="space-y-3">
                      {cvData.education.map((edu, i) => (
                        <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: colors.accent }}>
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <h3 className="font-semibold">{edu.degree || 'Degree'}</h3>
                              <p className="text-sm" style={{ color: colors.primary }}>{edu.institution}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                              </span>
                            </div>
                          </div>
                          {edu.description && (
                            <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: colors.accent, color: colors.primary }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSections.includes('certifications') && cvData.certifications.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Certifications
                    </h2>
                    <div className="space-y-2">
                      {cvData.certifications.map((cert, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="font-medium">{cert.name}</span>
                          <span className="text-gray-500">{cert.issuer} - {formatDate(cert.date)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSections.includes('projects') && cvData.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Projects
                    </h2>
                    <div className="space-y-3">
                      {cvData.projects.map((project, i) => (
                        <div key={i}>
                          <h3 className="font-semibold text-sm">{project.name}</h3>
                          {project.link && (
                            <p className="text-xs" style={{ color: colors.primary }}>{project.link}</p>
                          )}
                          {project.description && (
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSections.includes('languages') && cvData.languages.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Languages
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      {cvData.languages.map((lang, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-gray-500 ml-2 capitalize">({lang.proficiency})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSections.includes('interests') && cvData.interests.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Interests
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {cvData.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: colors.accent, color: colors.primary }}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeSections.includes('additionalInfo') && cvData.additionalInfo && (
                  <div className="mb-6">
                    <h2 
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ color: colors.primary, borderColor: colors.accent }}
                    >
                      Additional Information
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{cvData.additionalInfo}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
