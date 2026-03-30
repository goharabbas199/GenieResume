import { useCV } from '@/context/CVContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { getDisplayData } from '@/lib/sampleData';

/* ─── helpers ─────────────────────────────────────────────────── */
const fmt = (d: string) => {
  if (!d) return '';
  const dt = new Date(d + '-01');
  return dt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const px = (n: number) => `${n}px`;

/* ─── shared style primitives (inline-only = PDF-safe) ─────────── */
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'Courier New', monospace";

interface CVPreviewProps { className?: string; zoom?: number; }

/* ═══════════════════════════════════════════════════════════════════
   TEMPLATE IMPLEMENTATIONS
   Each renderer receives { cvData, activeSections } and returns JSX
   with 100 % inline styles so html2pdf captures them faithfully.
═══════════════════════════════════════════════════════════════════ */

function TemplateClassic({ d, active, primary, accent }: any) {
  const head: React.CSSProperties = { color: primary, fontFamily: FONT };
  const secTitle: React.CSSProperties = {
    fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: 1.2,
    textTransform: 'uppercase', color: primary, borderBottom: `2px solid ${accent}`,
    paddingBottom: 4, marginBottom: 10,
  };
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const pill: React.CSSProperties = {
    display: 'inline-block', background: accent, color: primary,
    fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4,
  };

  return (
    <div style={{ fontFamily: FONT, padding: '40px 48px', minHeight: 1054, backgroundColor: '#fff', color: '#1a1a1a' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${primary}`, paddingBottom: 20, marginBottom: 24 }}>
        {d.photo && (
          <img src={d.photo} alt="" style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, marginBottom: 10 }} />
        )}
        <div style={{ fontSize: 26, fontWeight: 800, ...head }}>{d.fullName || 'Your Name'}</div>
        {d.jobTitle && <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>{d.jobTitle}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 16px', marginTop: 10, fontSize: 10, color: '#555' }}>
          {d.email && <span>✉ {d.email}</span>}
          {d.phone && <span>✆ {d.phone}</span>}
          {d.location && <span>⊙ {d.location}</span>}
          {d.website && <span>⊕ {d.website}</span>}
          {d.linkedin && <span>in {d.linkedin}</span>}
        </div>
      </div>

      {d.summary && (
        <div style={{ marginBottom: 22 }}>
          <div style={secTitle}>Professional Summary</div>
          <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.65 }}>{d.summary}</div>
        </div>
      )}

      {d.experiences.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={secTitle}>Work Experience</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {d.experiences.map((e: any, i: number) => (
              <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div>
                    <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.company}</div>
                  </div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>
                    {fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}
                  </div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {d.education.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={secTitle}>Education</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.education.map((e: any, i: number) => (
              <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div>
                    <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.institution}</div>
                  </div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>
                    {fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}
                  </div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {d.skills.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <div style={secTitle}>Skills</div>
          <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
        </div>
      )}

      <AdditionalSectionsInline d={d} active={active} secTitle={secTitle} tiny={tiny} primary={primary} accent={accent} pill={pill} />
    </div>
  );
}

function TemplateSidebarLeft({ d, active, primary, accent }: any) {
  const sidebar: React.CSSProperties = {
    width: '33%', flexShrink: 0, backgroundColor: primary, color: '#fff',
    padding: '36px 20px', display: 'flex', flexDirection: 'column', gap: 20,
  };
  const sideHead: React.CSSProperties = { fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 8 };
  const sideTiny: React.CSSProperties = { fontSize: 9.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 };
  const secTitle: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: primary, borderBottom: `1.5px solid ${accent}`, paddingBottom: 4, marginBottom: 10 };
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const pill: React.CSSProperties = { display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 9, padding: '2px 7px', borderRadius: 10, marginRight: 4, marginBottom: 4 };
  const pillMain: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 };

  return (
    <div style={{ display: 'flex', minHeight: 1054, fontFamily: FONT, backgroundColor: '#fff' }}>
      <div style={sidebar}>
        {d.photo && (
          <div style={{ textAlign: 'center' }}>
            <img src={d.photo} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{d.fullName || 'Your Name'}</div>
          {d.jobTitle && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{d.jobTitle}</div>}
        </div>

        <div>
          <div style={sideHead}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {d.email && <div style={sideTiny}>✉ {d.email}</div>}
            {d.phone && <div style={sideTiny}>✆ {d.phone}</div>}
            {d.location && <div style={sideTiny}>⊙ {d.location}</div>}
            {d.website && <div style={{ ...sideTiny, wordBreak: 'break-all' }}>⊕ {d.website}</div>}
            {d.linkedin && <div style={{ ...sideTiny, wordBreak: 'break-all' }}>in {d.linkedin}</div>}
          </div>
        </div>

        {d.skills.length > 0 && (
          <div>
            <div style={sideHead}>Skills</div>
            <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
          </div>
        )}

        {active.includes('languages') && d.languages.length > 0 && (
          <div>
            <div style={sideHead}>Languages</div>
            {d.languages.map((l: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', ...sideTiny, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
                <span style={{ textTransform: 'capitalize', opacity: 0.75 }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}

        {active.includes('interests') && d.interests.length > 0 && (
          <div>
            <div style={sideHead}>Interests</div>
            <div>{d.interests.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {d.summary && (
          <div>
            <div style={secTitle}>Profile</div>
            <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.65 }}>{d.summary}</div>
          </div>
        )}
        {d.experiences.length > 0 && (
          <div>
            <div style={secTitle}>Experience</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {d.experiences.map((e: any, i: number) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div><div style={{ fontSize: 10, color: primary, fontWeight: 600 }}>{e.company}</div></div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {d.education.length > 0 && (
          <div>
            <div style={secTitle}>Education</div>
            {d.education.map((e: any, i: number) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{e.degree}</div><div style={{ fontSize: 10, color: primary, fontWeight: 600 }}>{e.institution}</div></div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        )}
        {active.includes('certifications') && d.certifications.length > 0 && (
          <div>
            <div style={secTitle}>Certifications</div>
            {d.certifications.map((c: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', ...tiny, marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                <span>{c.issuer} · {fmt(c.date)}</span>
              </div>
            ))}
          </div>
        )}
        {active.includes('projects') && d.projects.length > 0 && (
          <div>
            <div style={secTitle}>Projects</div>
            {d.projects.map((p: any, i: number) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{p.name}</div>
                {p.link && <div style={{ ...tiny, color: primary }}>{p.link}</div>}
                {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateSidebarRight({ d, active, primary, accent }: any) {
  const sidebarBg = accent;
  const sideHead: React.CSSProperties = { fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: primary, marginBottom: 8 };
  const sideTiny: React.CSSProperties = { fontSize: 9.5, color: '#444', lineHeight: 1.6 };
  const secTitle: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: primary, borderBottom: `1.5px solid ${accent}`, paddingBottom: 4, marginBottom: 10 };
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 };

  return (
    <div style={{ display: 'flex', minHeight: 1054, fontFamily: FONT, backgroundColor: '#fff' }}>
      <div style={{ flex: 1, padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ borderBottom: `3px solid ${primary}`, paddingBottom: 18, marginBottom: 4 }}>
          {d.photo && <img src={d.photo} alt="" style={{ width: 76, height: 76, borderRadius: 8, objectFit: 'cover', marginBottom: 10 }} />}
          <div style={{ fontSize: 26, fontWeight: 800, color: '#111', lineHeight: 1.2 }}>{d.fullName || 'Your Name'}</div>
          {d.jobTitle && <div style={{ fontSize: 13, color: primary, fontWeight: 600, marginTop: 4 }}>{d.jobTitle}</div>}
        </div>

        {d.summary && (
          <div>
            <div style={secTitle}>Summary</div>
            <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.65 }}>{d.summary}</div>
          </div>
        )}
        {d.experiences.length > 0 && (
          <div>
            <div style={secTitle}>Experience</div>
            {d.experiences.map((e: any, i: number) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div><div style={{ fontSize: 10.5, color: primary }}>{e.company}</div></div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        )}
        {d.education.length > 0 && (
          <div>
            <div style={secTitle}>Education</div>
            {d.education.map((e: any, i: number) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div><div style={{ fontSize: 10.5, color: primary }}>{e.institution}</div></div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        )}
        {active.includes('projects') && d.projects.length > 0 && (
          <div>
            <div style={secTitle}>Projects</div>
            {d.projects.map((p: any, i: number) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{p.name}</div>
                {p.link && <div style={{ ...tiny, color: primary }}>{p.link}</div>}
                {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ width: '30%', flexShrink: 0, backgroundColor: sidebarBg, padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={sideHead}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {d.email && <div style={sideTiny}>✉ {d.email}</div>}
            {d.phone && <div style={sideTiny}>✆ {d.phone}</div>}
            {d.location && <div style={sideTiny}>⊙ {d.location}</div>}
            {d.website && <div style={{ ...sideTiny, wordBreak: 'break-all' }}>⊕ {d.website}</div>}
            {d.linkedin && <div style={{ ...sideTiny, wordBreak: 'break-all' }}>in {d.linkedin}</div>}
          </div>
        </div>
        {d.skills.length > 0 && (
          <div>
            <div style={sideHead}>Skills</div>
            {d.skills.map((s: string, i: number) => <div key={i} style={{ fontSize: 9.5, color: '#333', padding: '3px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>{s}</div>)}
          </div>
        )}
        {active.includes('languages') && d.languages.length > 0 && (
          <div>
            <div style={sideHead}>Languages</div>
            {d.languages.map((l: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: '#333', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ textTransform: 'capitalize', color: '#666' }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
        {active.includes('certifications') && d.certifications.length > 0 && (
          <div>
            <div style={sideHead}>Certifications</div>
            {d.certifications.map((c: any, i: number) => (
              <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 6 }}>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={{ color: '#666' }}>{c.issuer} · {fmt(c.date)}</div>
              </div>
            ))}
          </div>
        )}
        {active.includes('interests') && d.interests.length > 0 && (
          <div>
            <div style={sideHead}>Interests</div>
            <div style={{ fontSize: 9.5, color: '#555', lineHeight: 1.8 }}>{d.interests.join(' · ')}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateModernBand({ d, active, primary, accent }: any) {
  /* Bold top band with photo */
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, letterSpacing: 1.3, textTransform: 'uppercase', color: primary, marginBottom: 8, paddingBottom: 3, borderBottom: `2px solid ${primary}` };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '3px 9px', borderRadius: 99, marginRight: 5, marginBottom: 5 };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a' }}>
      {/* Band */}
      <div style={{ backgroundColor: primary, padding: '32px 40px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {d.photo && (
          <img src={d.photo} alt="" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.35)', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{d.fullName || 'Your Name'}</div>
          {d.jobTitle && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 5, fontWeight: 500 }}>{d.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 12, fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
            {d.email && <span>✉ {d.email}</span>}
            {d.phone && <span>✆ {d.phone}</span>}
            {d.location && <span>⊙ {d.location}</span>}
            {d.website && <span>⊕ {d.website}</span>}
            {d.linkedin && <span>in {d.linkedin}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        <div style={{ flex: '1 1 62%', padding: '28px 32px 28px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.summary && (
            <div>
              <div style={secTitle}>About Me</div>
              <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.65 }}>{d.summary}</div>
            </div>
          )}
          {d.experiences.length > 0 && (
            <div>
              <div style={secTitle}>Work Experience</div>
              {d.experiences.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `3px solid ${accent}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div><div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.company}</div></div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.education.length > 0 && (
            <div>
              <div style={secTitle}>Education</div>
              {d.education.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `3px solid ${accent}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div><div style={{ fontSize: 10.5, color: primary }}>{e.institution}</div></div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {active.includes('projects') && d.projects.length > 0 && (
            <div>
              <div style={secTitle}>Projects</div>
              {d.projects.map((p: any, i: number) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{p.name}</div>
                  {p.link && <div style={{ ...tiny, color: primary }}>{p.link}</div>}
                  {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: '0 0 38%', backgroundColor: accent, padding: '28px 24px 28px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.skills.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderBottomColor: primary }}> Skills</div>
              <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
            </div>
          )}
          {active.includes('languages') && d.languages.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderBottomColor: primary }}>Languages</div>
              {d.languages.map((l: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#333', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ textTransform: 'capitalize', color: '#666' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
          {active.includes('certifications') && d.certifications.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderBottomColor: primary }}>Certifications</div>
              {d.certifications.map((c: any, i: number) => (
                <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ color: '#666' }}>{c.issuer} · {fmt(c.date)}</div>
                </div>
              ))}
            </div>
          )}
          {active.includes('interests') && d.interests.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderBottomColor: primary }}>Interests</div>
              <div style={{ fontSize: 9.5, color: '#444', lineHeight: 1.9 }}>{d.interests.join(' · ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplateMinimal({ d, active, primary }: any) {
  /* Ultra-clean, monochrome, strong typography */
  const rule: React.CSSProperties = { borderTop: '1px solid #e5e5e5', paddingTop: 14, marginBottom: 14 };
  const secTitle: React.CSSProperties = { fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 12 };
  const tiny: React.CSSProperties = { fontSize: 10, color: '#666', lineHeight: 1.6 };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, padding: '56px 60px', color: '#111' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -0.5, color: '#111' }}>{d.fullName || 'Your Name'}</div>
        {d.jobTitle && <div style={{ fontSize: 14, color: primary, fontWeight: 500, marginTop: 4 }}>{d.jobTitle}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', marginTop: 10, fontSize: 10, color: '#777' }}>
          {d.email && <span>{d.email}</span>}
          {d.phone && <span>{d.phone}</span>}
          {d.location && <span>{d.location}</span>}
          {d.website && <span>{d.website}</span>}
          {d.linkedin && <span>{d.linkedin}</span>}
        </div>
      </div>

      {d.summary && (
        <div style={{ ...rule, marginBottom: 24 }}>
          <div style={secTitle}>Profile</div>
          <div style={{ ...tiny, fontSize: 11, color: '#444', lineHeight: 1.7, maxWidth: 560 }}>{d.summary}</div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 48 }}>
        <div style={{ flex: 1 }}>
          {d.experiences.length > 0 && (
            <div style={rule}>
              <div style={secTitle}>Experience</div>
              {d.experiences.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11.5, fontWeight: 700 }}>{e.jobTitle}</div><div style={{ fontSize: 10, color: primary }}>{e.company}</div></div>
                    <div style={tiny}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 5 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.education.length > 0 && (
            <div style={rule}>
              <div style={secTitle}>Education</div>
              {d.education.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11.5, fontWeight: 700 }}>{e.degree}</div><div style={{ fontSize: 10, color: primary }}>{e.institution}</div></div>
                    <div style={tiny}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ width: 160, flexShrink: 0 }}>
          {d.skills.length > 0 && (
            <div style={rule}>
              <div style={secTitle}>Skills</div>
              {d.skills.map((s: string, i: number) => <div key={i} style={{ fontSize: 10, color: '#333', paddingBottom: 4, borderBottom: '1px solid #f0f0f0', marginBottom: 4 }}>{s}</div>)}
            </div>
          )}
          {active.includes('languages') && d.languages.length > 0 && (
            <div style={rule}>
              <div style={secTitle}>Languages</div>
              {d.languages.map((l: any, i: number) => (
                <div key={i} style={{ fontSize: 10, color: '#333', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <div style={{ color: '#888', fontSize: 9, textTransform: 'capitalize' }}>{l.proficiency}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AdditionalSectionsInline d={d} active={active} secTitle={secTitle} tiny={tiny} primary={primary} accent={'#f5f5f5'} pill={{ display: 'inline-block', background: '#f0f0f0', color: '#444', fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 }} />
    </div>
  );
}

function TemplateElegant({ d, active, primary, accent }: any) {
  /* Classy header strip, centered top, serif feel */
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: primary, marginBottom: 8, textAlign: 'center', paddingBottom: 6, borderBottom: `1px solid ${accent}` };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a' }}>
      <div style={{ backgroundColor: primary, padding: '0 0 0 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ padding: '36px 48px', position: 'relative', zIndex: 1 }}>
          {d.photo && (
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <img src={d.photo} alt="" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', display: 'inline-block' }} />
            </div>
          )}
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 1 }}>{d.fullName || 'Your Name'}</div>
            {d.jobTitle && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 4, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase' }}>{d.jobTitle}</div>}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 18px', marginTop: 12, fontSize: 9.5, color: 'rgba(255,255,255,0.8)' }}>
              {d.email && <span>✉ {d.email}</span>}
              {d.phone && <span>✆ {d.phone}</span>}
              {d.location && <span>⊙ {d.location}</span>}
              {d.website && <span>⊕ {d.website}</span>}
              {d.linkedin && <span>in {d.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {d.summary && (
          <div>
            <div style={secTitle}>Professional Profile</div>
            <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.7, textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>{d.summary}</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 36 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {d.experiences.length > 0 && (
              <div>
                <div style={secTitle}>Experience</div>
                {d.experiences.map((e: any, i: number) => (
                  <div key={i} style={{ marginBottom: 14, paddingBottom: 10, borderBottom: i < d.experiences.length - 1 ? '1px dashed #eee' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div><div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div><div style={{ fontSize: 10, color: primary, fontWeight: 600 }}>{e.company}</div></div>
                      <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                    </div>
                    {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
                  </div>
                ))}
              </div>
            )}
            {d.education.length > 0 && (
              <div>
                <div style={secTitle}>Education</div>
                {d.education.map((e: any, i: number) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div><div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div><div style={{ fontSize: 10, color: primary }}>{e.institution}</div></div>
                      <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                    </div>
                    {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ width: 170, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {d.skills.length > 0 && (
              <div>
                <div style={secTitle}>Skills</div>
                <div style={{ textAlign: 'center' }}>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
              </div>
            )}
            {active.includes('languages') && d.languages.length > 0 && (
              <div>
                <div style={secTitle}>Languages</div>
                {d.languages.map((l: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#333', marginBottom: 5 }}>
                    <span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ textTransform: 'capitalize', color: '#888' }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
            {active.includes('certifications') && d.certifications.length > 0 && (
              <div>
                <div style={secTitle}>Certifications</div>
                {d.certifications.map((c: any, i: number) => (
                  <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 6, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    <div style={{ color: '#888' }}>{c.issuer}</div>
                  </div>
                ))}
              </div>
            )}
            {active.includes('interests') && d.interests.length > 0 && (
              <div>
                <div style={secTitle}>Interests</div>
                <div style={{ fontSize: 9.5, color: '#555', textAlign: 'center', lineHeight: 1.8 }}>{d.interests.join(' · ')}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateTech({ d, active, primary, accent }: any) {
  /* Dark header, code-like accents, developer feel */
  const darkHead = '#0f172a';
  const tiny: React.CSSProperties = { fontSize: 10, color: '#444', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: primary, borderLeft: `4px solid ${primary}`, paddingLeft: 8, marginBottom: 12 };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9, padding: '2px 8px', borderRadius: 4, marginRight: 4, marginBottom: 4, fontFamily: FONT_MONO, border: `1px solid ${primary}20` };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a' }}>
      <div style={{ backgroundColor: darkHead, padding: '32px 40px', display: 'flex', alignItems: 'center', gap: 20 }}>
        {d.photo && (
          <img src={d.photo} alt="" style={{ width: 80, height: 80, borderRadius: 4, objectFit: 'cover', border: `3px solid ${primary}`, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: FONT_MONO }}>{d.fullName || 'Your Name'}</div>
          {d.jobTitle && <div style={{ fontSize: 12, color: primary, marginTop: 4, fontFamily: FONT_MONO }}>{'> '}{d.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 10, fontSize: 9.5, color: 'rgba(255,255,255,0.65)', fontFamily: FONT_MONO }}>
            {d.email && <span>{d.email}</span>}
            {d.phone && <span>{d.phone}</span>}
            {d.location && <span>{d.location}</span>}
            {d.website && <span>{d.website}</span>}
            {d.linkedin && <span>{d.linkedin}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '28px 32px 28px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.summary && (
            <div>
              <div style={secTitle}>About</div>
              <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.65 }}>{d.summary}</div>
            </div>
          )}
          {d.experiences.length > 0 && (
            <div>
              <div style={secTitle}>Experience</div>
              {d.experiences.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 14, backgroundColor: '#f8faff', borderRadius: 4, padding: '10px 12px', borderLeft: `3px solid ${primary}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div><div style={{ fontSize: 10, color: primary, fontFamily: FONT_MONO }}>{e.company}</div></div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8, fontFamily: FONT_MONO }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 6, lineHeight: 1.6 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.education.length > 0 && (
            <div>
              <div style={secTitle}>Education</div>
              {d.education.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{e.degree}</div><div style={{ fontSize: 10, color: primary }}>{e.institution}</div></div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {active.includes('projects') && d.projects.length > 0 && (
            <div>
              <div style={secTitle}>Projects</div>
              {d.projects.map((p: any, i: number) => (
                <div key={i} style={{ marginBottom: 10, backgroundColor: '#f8faff', borderRadius: 4, padding: '8px 12px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#111', fontFamily: FONT_MONO }}>{p.name}</div>
                  {p.link && <div style={{ ...tiny, color: primary, fontFamily: FONT_MONO }}>{p.link}</div>}
                  {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ width: 195, flexShrink: 0, backgroundColor: '#f8faff', padding: '28px 20px', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.skills.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderLeftColor: primary }}>Skills</div>
              <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
            </div>
          )}
          {active.includes('languages') && d.languages.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderLeftColor: primary }}>Languages</div>
              {d.languages.map((l: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#333', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ textTransform: 'capitalize', color: '#888' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
          {active.includes('certifications') && d.certifications.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderLeftColor: primary }}>Certs</div>
              {d.certifications.map((c: any, i: number) => (
                <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ color: '#888' }}>{c.issuer}</div>
                </div>
              ))}
            </div>
          )}
          {active.includes('interests') && d.interests.length > 0 && (
            <div>
              <div style={{ ...secTitle, borderLeftColor: primary }}>Interests</div>
              <div style={{ fontSize: 9.5, color: '#555', lineHeight: 1.9 }}>{d.interests.join(' · ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplateTimeline({ d, active, primary, accent }: any) {
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase', color: primary, marginBottom: 14 };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a' }}>
      <div style={{ backgroundColor: primary, padding: '36px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {d.photo && (
            <img src={d.photo} alt="" style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', flexShrink: 0 }} />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{d.fullName || 'Your Name'}</div>
            {d.jobTitle && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 5, fontWeight: 400, letterSpacing: 1 }}>{d.jobTitle}</div>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', fontSize: 9.5, color: 'rgba(255,255,255,0.8)' }}>
            {d.email && <span>✉ {d.email}</span>}
            {d.phone && <span>✆ {d.phone}</span>}
            {d.location && <span>⊙ {d.location}</span>}
            {d.website && <span>⊕ {d.website}</span>}
            {d.linkedin && <span>in {d.linkedin}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {d.summary && (
            <div>
              <div style={secTitle}>Profile</div>
              <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.7 }}>{d.summary}</div>
            </div>
          )}

          {d.experiences.length > 0 && (
            <div>
              <div style={secTitle}>Experience</div>
              <div style={{ position: 'relative', paddingLeft: 20, borderLeft: `2px solid ${accent}` }}>
                {d.experiences.map((e: any, i: number) => (
                  <div key={i} style={{ marginBottom: 18, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -26, top: 3, width: 10, height: 10, borderRadius: '50%', backgroundColor: primary, border: '2px solid #fff', boxShadow: `0 0 0 2px ${primary}` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div>
                        <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.company}</div>
                      </div>
                      <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8, backgroundColor: accent, borderRadius: 4, padding: '2px 7px', fontSize: 9.5 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                    </div>
                    {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.education.length > 0 && (
            <div>
              <div style={secTitle}>Education</div>
              <div style={{ position: 'relative', paddingLeft: 20, borderLeft: `2px solid ${accent}` }}>
                {d.education.map((e: any, i: number) => (
                  <div key={i} style={{ marginBottom: 14, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -26, top: 3, width: 10, height: 10, borderRadius: '50%', backgroundColor: primary, border: '2px solid #fff', boxShadow: `0 0 0 2px ${primary}` }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div>
                        <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.institution}</div>
                      </div>
                      <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, backgroundColor: accent, borderRadius: 4, padding: '2px 7px', fontSize: 9.5 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                    </div>
                    {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ width: 200, flexShrink: 0, backgroundColor: accent, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.skills.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9, letterSpacing: 1.5 }}>Skills</div>
              <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
            </div>
          )}
          {active.includes('certifications') && d.certifications.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9, letterSpacing: 1.5 }}>Certifications</div>
              {d.certifications.map((c: any, i: number) => (
                <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ color: '#666' }}>{c.issuer}</div>
                </div>
              ))}
            </div>
          )}
          {active.includes('languages') && d.languages.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9, letterSpacing: 1.5 }}>Languages</div>
              {d.languages.map((l: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#333', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <span style={{ textTransform: 'capitalize', color: '#666' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
          {active.includes('interests') && d.interests.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9, letterSpacing: 1.5 }}>Interests</div>
              <div style={{ fontSize: 9.5, color: '#555', lineHeight: 1.9 }}>{d.interests.join(' · ')}</div>
            </div>
          )}
          {active.includes('projects') && d.projects.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9, letterSpacing: 1.5 }}>Projects</div>
              {d.projects.map((p: any, i: number) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>{p.name}</div>
                  {p.link && <div style={{ fontSize: 9, color: primary }}>{p.link}</div>}
                  {p.description && <div style={{ fontSize: 9.5, color: '#555', marginTop: 2, lineHeight: 1.5 }}>{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplateInfographic({ d, active, primary, accent }: any) {
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#fff', marginBottom: 10 };
  const secTitleMain: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, letterSpacing: 1.3, textTransform: 'uppercase', color: primary, borderBottom: `2px solid ${accent}`, paddingBottom: 4, marginBottom: 12 };

  const SkillBar = ({ name, pct }: { name: string; pct: number }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'rgba(255,255,255,0.9)', marginBottom: 3 }}>
        <span>{name}</span>
      </div>
      <div style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
      </div>
    </div>
  );

  const skillPcts = [90, 82, 75, 68, 85, 72, 78, 65, 88, 70];

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a', display: 'flex' }}>
      <div style={{ width: '35%', flexShrink: 0, backgroundColor: primary, padding: '40px 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {d.photo && (
          <div style={{ textAlign: 'center' }}>
            <img src={d.photo} alt="" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.35)' }} />
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{d.fullName || 'Your Name'}</div>
          {d.jobTitle && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 5, fontWeight: 400 }}>{d.jobTitle}</div>}
        </div>
        <div>
          <div style={secTitle}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {d.email && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>✉ {d.email}</div>}
            {d.phone && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>✆ {d.phone}</div>}
            {d.location && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>⊙ {d.location}</div>}
            {d.website && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>⊕ {d.website}</div>}
            {d.linkedin && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', wordBreak: 'break-all' }}>in {d.linkedin}</div>}
          </div>
        </div>
        {d.skills.length > 0 && (
          <div>
            <div style={secTitle}>Skills</div>
            {d.skills.slice(0, 10).map((s: string, i: number) => (
              <SkillBar key={i} name={s} pct={skillPcts[i % skillPcts.length]} />
            ))}
          </div>
        )}
        {active.includes('languages') && d.languages.length > 0 && (
          <div>
            <div style={secTitle}>Languages</div>
            {d.languages.map((l: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'rgba(255,255,255,0.85)', marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
                <span style={{ textTransform: 'capitalize', opacity: 0.75 }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
        {active.includes('interests') && d.interests.length > 0 && (
          <div>
            <div style={secTitle}>Interests</div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>{d.interests.join(' · ')}</div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {d.summary && (
          <div>
            <div style={secTitleMain}>Profile</div>
            <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.7 }}>{d.summary}</div>
          </div>
        )}
        {d.experiences.length > 0 && (
          <div>
            <div style={secTitleMain}>Experience</div>
            {d.experiences.map((e: any, i: number) => (
              <div key={i} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: `3px solid ${primary}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div>
                    <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.company}</div>
                  </div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        )}
        {d.education.length > 0 && (
          <div>
            <div style={secTitleMain}>Education</div>
            {d.education.map((e: any, i: number) => (
              <div key={i} style={{ marginBottom: 12, paddingLeft: 14, borderLeft: `3px solid ${accent}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{e.degree}</div>
                    <div style={{ fontSize: 10, color: primary }}>{e.institution}</div>
                  </div>
                  <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                </div>
                {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
              </div>
            ))}
          </div>
        )}
        {active.includes('certifications') && d.certifications.length > 0 && (
          <div>
            <div style={secTitleMain}>Certifications</div>
            {d.certifications.map((c: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', ...tiny, marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{c.name}</span>
                <span>{c.issuer} · {fmt(c.date)}</span>
              </div>
            ))}
          </div>
        )}
        {active.includes('projects') && d.projects.length > 0 && (
          <div>
            <div style={secTitleMain}>Projects</div>
            {d.projects.map((p: any, i: number) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{p.name}</div>
                {p.link && <div style={{ ...tiny, color: primary }}>{p.link}</div>}
                {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateTwoColumn({ d, active, primary, accent }: any) {
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: primary, paddingBottom: 5, marginBottom: 12, borderBottom: `2px solid ${primary}` };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a' }}>
      <div style={{ backgroundColor: primary, padding: '36px 48px', textAlign: 'center' }}>
        {d.photo && (
          <div style={{ marginBottom: 12 }}>
            <img src={d.photo} alt="" style={{ width: 82, height: 82, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', display: 'inline-block' }} />
          </div>
        )}
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{d.fullName || 'Your Name'}</div>
        {d.jobTitle && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 5, letterSpacing: 1 }}>{d.jobTitle}</div>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px 18px', marginTop: 12, fontSize: 9.5, color: 'rgba(255,255,255,0.8)' }}>
          {d.email && <span>✉ {d.email}</span>}
          {d.phone && <span>✆ {d.phone}</span>}
          {d.location && <span>⊙ {d.location}</span>}
          {d.website && <span>⊕ {d.website}</span>}
          {d.linkedin && <span>in {d.linkedin}</span>}
        </div>
      </div>

      {d.summary && (
        <div style={{ padding: '22px 48px 0', borderBottom: `1px solid ${accent}` }}>
          <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.7, paddingBottom: 16 }}>{d.summary}</div>
        </div>
      )}

      <div style={{ display: 'flex', padding: '24px 48px', gap: 36 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {d.experiences.length > 0 && (
            <div>
              <div style={secTitle}>Work Experience</div>
              {d.experiences.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div>
                      <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.company}</div>
                    </div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.education.length > 0 && (
            <div>
              <div style={secTitle}>Education</div>
              {d.education.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div>
                      <div style={{ fontSize: 10.5, color: primary }}>{e.institution}</div>
                    </div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {active.includes('projects') && d.projects.length > 0 && (
            <div>
              <div style={secTitle}>Projects</div>
              {d.projects.map((p: any, i: number) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>{p.name}</div>
                  {p.link && <div style={{ ...tiny, color: primary }}>{p.link}</div>}
                  {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {d.skills.length > 0 && (
            <div>
              <div style={secTitle}>Skills</div>
              <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
            </div>
          )}
          {active.includes('languages') && d.languages.length > 0 && (
            <div>
              <div style={secTitle}>Languages</div>
              {d.languages.map((l: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#333', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <span style={{ textTransform: 'capitalize', color: '#888' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
          {active.includes('certifications') && d.certifications.length > 0 && (
            <div>
              <div style={secTitle}>Certifications</div>
              {d.certifications.map((c: any, i: number) => (
                <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ color: '#666' }}>{c.issuer} · {fmt(c.date)}</div>
                </div>
              ))}
            </div>
          )}
          {active.includes('achievements') && d.achievements.length > 0 && (
            <div>
              <div style={secTitle}>Achievements</div>
              {d.achievements.map((a: string, i: number) => (
                <div key={i} style={{ ...tiny, paddingLeft: 8, borderLeft: `3px solid ${accent}`, marginBottom: 5, lineHeight: 1.5 }}>— {a}</div>
              ))}
            </div>
          )}
          {active.includes('interests') && d.interests.length > 0 && (
            <div>
              <div style={secTitle}>Interests</div>
              <div style={{ fontSize: 9.5, color: '#555', lineHeight: 1.9 }}>{d.interests.join(' · ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplatePhotoCard({ d, active, primary, accent }: any) {
  const tiny: React.CSSProperties = { fontSize: 10, color: '#555', fontFamily: FONT };
  const secTitle: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: primary, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 };
  const pill: React.CSSProperties = { display: 'inline-block', background: accent, color: primary, fontSize: 9.5, padding: '2px 8px', borderRadius: 12, marginRight: 4, marginBottom: 4 };

  return (
    <div style={{ fontFamily: FONT, backgroundColor: '#fff', minHeight: 1054, color: '#1a1a1a' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: 200 }}>
        {d.photo ? (
          <div style={{ width: 180, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            <img src={d.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 60%, rgba(255,255,255,0.4))` }} />
          </div>
        ) : null}
        <div style={{ flex: 1, backgroundColor: primary, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{d.fullName || 'Your Name'}</div>
          {d.jobTitle && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6, fontWeight: 400 }}>{d.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 16px', marginTop: 14, fontSize: 9.5, color: 'rgba(255,255,255,0.8)' }}>
            {d.email && <span>✉ {d.email}</span>}
            {d.phone && <span>✆ {d.phone}</span>}
            {d.location && <span>⊙ {d.location}</span>}
            {d.website && <span>⊕ {d.website}</span>}
            {d.linkedin && <span>in {d.linkedin}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {d.summary && (
            <div>
              <div style={secTitle}><span style={{ display: 'inline-block', width: 24, height: 2, backgroundColor: primary, marginRight: 4 }} />Profile</div>
              <div style={{ fontSize: 10.5, color: '#333', lineHeight: 1.7 }}>{d.summary}</div>
            </div>
          )}
          {d.experiences.length > 0 && (
            <div>
              <div style={secTitle}><span style={{ display: 'inline-block', width: 24, height: 2, backgroundColor: primary, marginRight: 4 }} />Experience</div>
              {d.experiences.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 16, padding: '10px 14px', borderLeft: `3px solid ${primary}`, backgroundColor: accent }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.jobTitle}</div>
                      <div style={{ fontSize: 10.5, color: primary, fontWeight: 600 }}>{e.company}</div>
                    </div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyWorking ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 5, lineHeight: 1.6 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
          {d.education.length > 0 && (
            <div>
              <div style={secTitle}><span style={{ display: 'inline-block', width: 24, height: 2, backgroundColor: primary, marginRight: 4 }} />Education</div>
              {d.education.map((e: any, i: number) => (
                <div key={i} style={{ marginBottom: 12, padding: '8px 14px', borderLeft: `3px solid ${accent}`, backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#111' }}>{e.degree}</div>
                      <div style={{ fontSize: 10.5, color: primary }}>{e.institution}</div>
                    </div>
                    <div style={{ ...tiny, whiteSpace: 'nowrap', flexShrink: 0, paddingLeft: 8 }}>{fmt(e.startDate)} – {e.currentlyStudying ? 'Present' : fmt(e.endDate)}</div>
                  </div>
                  {e.description && <div style={{ ...tiny, marginTop: 4 }}>{e.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: 200, flexShrink: 0, backgroundColor: '#fafafa', borderLeft: `3px solid ${accent}`, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {d.skills.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9 }}>Skills</div>
              <div>{d.skills.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
            </div>
          )}
          {active.includes('certifications') && d.certifications.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9 }}>Certifications</div>
              {d.certifications.map((c: any, i: number) => (
                <div key={i} style={{ fontSize: 9.5, color: '#333', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ color: '#666' }}>{c.issuer}</div>
                </div>
              ))}
            </div>
          )}
          {active.includes('languages') && d.languages.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9 }}>Languages</div>
              {d.languages.map((l: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#333', marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>{l.name}</span>
                  <span style={{ textTransform: 'capitalize', color: '#888' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}
          {active.includes('projects') && d.projects.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9 }}>Projects</div>
              {d.projects.map((p: any, i: number) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#111' }}>{p.name}</div>
                  {p.link && <div style={{ fontSize: 9, color: primary }}>{p.link}</div>}
                </div>
              ))}
            </div>
          )}
          {active.includes('interests') && d.interests.length > 0 && (
            <div>
              <div style={{ ...secTitle, fontSize: 9 }}>Interests</div>
              <div style={{ fontSize: 9.5, color: '#555', lineHeight: 1.9 }}>{d.interests.join(' · ')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Shared additional sections renderer (inline-safe) ──────── */
function AdditionalSectionsInline({ d, active, secTitle, tiny, primary, accent, pill }: any) {
  return (
    <>
      {active.includes('certifications') && d.certifications.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={secTitle}>Certifications</div>
          {d.certifications.map((c: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', ...tiny, marginBottom: 5 }}>
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              <span>{c.issuer} · {fmt(c.date)}</span>
            </div>
          ))}
        </div>
      )}
      {active.includes('projects') && d.projects.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={secTitle}>Projects</div>
          {d.projects.map((p: any, i: number) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</div>
              {p.link && <div style={{ ...tiny, color: primary }}>{p.link}</div>}
              {p.description && <div style={{ ...tiny, marginTop: 3, lineHeight: 1.5 }}>{p.description}</div>}
            </div>
          ))}
        </div>
      )}
      {active.includes('achievements') && d.achievements.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={secTitle}>Achievements</div>
          {d.achievements.map((a: string, i: number) => (
            <div key={i} style={{ ...tiny, paddingLeft: 12, borderLeft: `3px solid ${accent}`, marginBottom: 5, lineHeight: 1.5 }}>— {a}</div>
          ))}
        </div>
      )}
      {active.includes('languages') && d.languages.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={secTitle}>Languages</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {d.languages.map((l: any, i: number) => (
              <div key={i} style={{ fontSize: 10, color: '#333' }}>
                <span style={{ fontWeight: 700 }}>{l.name}</span><span style={{ color: '#888', marginLeft: 4, textTransform: 'capitalize' }}>({l.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {active.includes('interests') && d.interests.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={secTitle}>Interests</div>
          <div>{d.interests.map((s: string, i: number) => <span key={i} style={pill}>{s}</span>)}</div>
        </div>
      )}
      {active.includes('additionalInfo') && d.additionalInfo && (
        <div style={{ marginBottom: 20 }}>
          <div style={secTitle}>Additional Information</div>
          <div style={{ ...tiny, lineHeight: 1.65 }}>{d.additionalInfo}</div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEMPLATE REGISTRY
═══════════════════════════════════════════════════════════════ */
type TConfig = { primary: string; accent: string; renderer: string };

const TEMPLATES: Record<string, TConfig> = {
  modern:         { primary: '#2563EB', accent: '#EFF6FF', renderer: 'classic' },
  corporate:      { primary: '#1E3A5F', accent: '#E8F0F7', renderer: 'sidebar-left' },
  executive:      { primary: '#4C1D95', accent: '#F5F3FF', renderer: 'sidebar-right' },
  elegant:        { primary: '#92400E', accent: '#FFFBEB', renderer: 'elegant' },
  tech:           { primary: '#0284C7', accent: '#E0F2FE', renderer: 'tech' },
  minimal:        { primary: '#374151', accent: '#F9FAFB', renderer: 'minimal' },
  creative:       { primary: '#7C3AED', accent: '#EDE9FE', renderer: 'band' },
  professional:   { primary: '#111827', accent: '#F3F4F6', renderer: 'sidebar-right' },
  fresh:          { primary: '#059669', accent: '#ECFDF5', renderer: 'sidebar-left' },
  bold:           { primary: '#DC2626', accent: '#FEF2F2', renderer: 'band' },
  navy:           { primary: '#1E40AF', accent: '#DBEAFE', renderer: 'sidebar-left' },
  slate:          { primary: '#475569', accent: '#F1F5F9', renderer: 'minimal' },
  rose:           { primary: '#BE185D', accent: '#FCE7F3', renderer: 'elegant' },
  forest:         { primary: '#166534', accent: '#DCFCE7', renderer: 'classic' },
  teal:           { primary: '#0F766E', accent: '#CCFBF1', renderer: 'band' },
  midnight:       { primary: '#1E293B', accent: '#CBD5E1', renderer: 'sidebar-right' },
  amber:          { primary: '#B45309', accent: '#FEF3C7', renderer: 'classic' },
  indigo:         { primary: '#4338CA', accent: '#E0E7FF', renderer: 'tech' },
  'ats-friendly': { primary: '#1F2937', accent: '#F9FAFB', renderer: 'minimal' },
  compact:        { primary: '#334155', accent: '#F1F5F9', renderer: 'classic' },
  crimson:        { primary: '#9B1C1C', accent: '#FEF2F2', renderer: 'timeline' },
  ocean:          { primary: '#0369A1', accent: '#E0F2FE', renderer: 'timeline' },
  violet:         { primary: '#6D28D9', accent: '#EDE9FE', renderer: 'timeline' },
  graphite:       { primary: '#374151', accent: '#F3F4F6', renderer: 'infographic' },
  emerald:        { primary: '#065F46', accent: '#D1FAE5', renderer: 'infographic' },
  cobalt:         { primary: '#1D4ED8', accent: '#DBEAFE', renderer: 'infographic' },
  sunset:         { primary: '#C2410C', accent: '#FFF7ED', renderer: 'two-column' },
  lavender:       { primary: '#5B21B6', accent: '#EDE9FE', renderer: 'two-column' },
  sage:           { primary: '#3F6212', accent: '#ECFCCB', renderer: 'two-column' },
  portrait:       { primary: '#1D4ED8', accent: '#EFF6FF', renderer: 'photo-card' },
  charcoal:       { primary: '#111827', accent: '#F3F4F6', renderer: 'photo-card' },
  berry:          { primary: '#831843', accent: '#FCE7F3', renderer: 'photo-card' },
  dusk:           { primary: '#713f12', accent: '#fef9c3', renderer: 'elegant' },
  copper:         { primary: '#7c2d12', accent: '#ffedd5', renderer: 'classic' },
  arctic:         { primary: '#0c4a6e', accent: '#e0f2fe', renderer: 'minimal' },
  plum:           { primary: '#581c87', accent: '#f5f3ff', renderer: 'sidebar-left' },
  steel:          { primary: '#1e3a5f', accent: '#dbeafe', renderer: 'tech' },
  coral:          { primary: '#be185d', accent: '#fce7f3', renderer: 'band' },
  pine:           { primary: '#14532d', accent: '#dcfce7', renderer: 'timeline' },
  brick:          { primary: '#991b1b', accent: '#fee2e2', renderer: 'infographic' },
};

function renderTemplate(renderer: string, props: any) {
  switch (renderer) {
    case 'sidebar-left':  return <TemplateSidebarLeft {...props} />;
    case 'sidebar-right': return <TemplateSidebarRight {...props} />;
    case 'band':          return <TemplateModernBand {...props} />;
    case 'minimal':       return <TemplateMinimal {...props} />;
    case 'elegant':       return <TemplateElegant {...props} />;
    case 'tech':          return <TemplateTech {...props} />;
    case 'timeline':      return <TemplateTimeline {...props} />;
    case 'infographic':   return <TemplateInfographic {...props} />;
    case 'two-column':    return <TemplateTwoColumn {...props} />;
    case 'photo-card':    return <TemplatePhotoCard {...props} />;
    default:              return <TemplateClassic {...props} />;
  }
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export default function CVPreview({ className, zoom = 0.82 }: CVPreviewProps) {
  const { cvData, selectedTemplate, activeSections } = useCV();
  const cfg = TEMPLATES[selectedTemplate] ?? TEMPLATES.modern;
  const { data: displayData, sections: displaySections } = getDisplayData(cvData);

  // When user has no data, show sample with all sections; otherwise respect the user's toggled sections
  const isDataEmpty = !cvData.fullName && !cvData.email && cvData.experiences.length === 0;
  const activeForPreview = isDataEmpty ? displaySections : activeSections;

  const props = { d: displayData, active: activeForPreview, primary: cfg.primary, accent: cfg.accent };

  const A4_W = 794;
  const A4_H = 1122;

  return (
    <div className={cn('rounded-2xl overflow-hidden border shadow-lg bg-card', className)} data-testid="cv-preview">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div style={{ background: '#d1d5db', padding: 16, display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
          {/* This outer div handles zoom but is NOT part of the PDF export */}
          <div style={{ width: A4_W, transformOrigin: 'top center', transform: `scale(${zoom})`, marginBottom: `${(zoom - 1) * A4_H}px` }}>
            {/* id="cv-preview-content" is what html2pdf grabs — pure inline styles inside */}
            <div
              id="cv-preview-content"
              style={{ width: A4_W, minHeight: A4_H, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', background: '#fff' }}
            >
              {renderTemplate(cfg.renderer, props)}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
