import type { Template } from '@/lib/templates';

interface Props {
  t: Template;
}

const PLACEHOLDER = {
  name: 'Alex Johnson',
  title: 'Senior Software Engineer',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 012-3456',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/alexjohnson',
  summary: 'Results-driven engineer with 8+ years of experience building scalable systems and leading cross-functional teams. Passionate about clean code and user-centric design.',
  exp1: { role: 'Senior Engineer', company: 'TechCorp Inc.', date: '2020 – Present', bullets: ['Led migration to microservices, reducing latency by 40%', 'Mentored team of 6 junior developers', 'Shipped 3 major product features on schedule'] },
  exp2: { role: 'Software Engineer', company: 'StartupXYZ', date: '2017 – 2020', bullets: ['Built REST APIs serving 2M+ daily requests', 'Improved CI/CD pipeline, cutting deploy time by 60%'] },
  edu: { degree: 'B.Sc. Computer Science', school: 'University of California', date: '2013 – 2017' },
  skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
  langs: ['English (Native)', 'Spanish (B2)'],
};

function Line({ w, h = 6, color, opacity = 1, mt = 0, radius = 2 }: { w: string; h?: number; color: string; opacity?: number; mt?: number; radius?: number }) {
  return <div style={{ width: w, height: h, background: color, opacity, marginTop: mt, borderRadius: radius, flexShrink: 0 }} />;
}

function SectionTitle({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ marginTop: 12, marginBottom: 5 }}>
      <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color, fontFamily: 'Arial, sans-serif' }}>{label}</div>
      <div style={{ height: 1, background: color, opacity: 0.3, marginTop: 2 }} />
    </div>
  );
}

function TextLine({ text, size = 6.5, color = '#444', weight = 400, mt = 2 }: { text: string; size?: number; color?: string; weight?: number; mt?: number }) {
  return <div style={{ fontSize: size, color, fontWeight: weight, marginTop: mt, fontFamily: 'Arial, sans-serif', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</div>;
}

function Bullet({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 3, marginTop: 2 }}>
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity: 0.7, marginTop: 2.5, flexShrink: 0 }} />
      <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>{text}</div>
    </div>
  );
}

function SkillTag({ skill, primary }: { skill: string; primary: string }) {
  return (
    <div style={{ fontSize: 5.5, padding: '2px 5px', borderRadius: 3, background: `${primary}18`, color: primary, fontFamily: 'Arial, sans-serif', fontWeight: 600, border: `0.5px solid ${primary}30` }}>{skill}</div>
  );
}

function ExpBlock({ exp, primary }: { exp: typeof PLACEHOLDER.exp1; primary: string }) {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <TextLine text={exp.role} size={7} color='#222' weight={700} mt={0} />
        <TextLine text={exp.date} size={5.5} color='#888' mt={0} />
      </div>
      <TextLine text={exp.company} size={6} color={primary} weight={600} mt={1} />
      {exp.bullets.map((b, i) => <Bullet key={i} text={b} color={primary} />)}
    </div>
  );
}

function ContactItem({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
      <div style={{ fontSize: 6, color, flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</div>
    </div>
  );
}

function ClassicLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '14px 16px 12px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.02em' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', marginTop: 2, fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.title}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
          {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)' }}>{icon}</span>
              <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px 16px', overflowY: 'hidden' }}>
        <SectionTitle label="Professional Summary" color={t.primary} />
        <div style={{ fontSize: 6.5, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Work Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={7} color='#222' weight={700} mt={4} />
        <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
        <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
        <SectionTitle label="Skills" color={t.primary} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
          {PLACEHOLDER.skills.map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
        </div>
      </div>
    </div>
  );
}

function SidebarLeftLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ width: '36%', background: t.primary, padding: '14px 8px 10px', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif', textAlign: 'center', lineHeight: 1.3 }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{PLACEHOLDER.title}</div>
        <div style={{ height: 0.5, background: 'rgba(255,255,255,0.2)', margin: '8px 0' }} />
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>CONTACT</div>
        {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 3, alignItems: 'flex-start', marginBottom: 3 }}>
            <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>{icon}</span>
            <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>{text}</span>
          </div>
        ))}
        <div style={{ height: 0.5, background: 'rgba(255,255,255,0.2)', margin: '8px 0' }} />
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>SKILLS</div>
        {PLACEHOLDER.skills.slice(0, 5).map(s => (
          <div key={s} style={{ marginBottom: 3 }}>
            <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif', marginBottom: 1.5 }}>{s}</div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${60 + Math.random() * 30}%`, background: 'rgba(255,255,255,0.55)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 0.5, background: 'rgba(255,255,255,0.2)', margin: '8px 0' }} />
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>LANGUAGES</div>
        {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginBottom: 2 }}>{l}</div>)}
      </div>
      <div style={{ flex: 1, padding: '14px 12px', overflowY: 'hidden' }}>
        <SectionTitle label="Summary" color={t.primary} />
        <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={7} color='#222' weight={700} mt={4} />
        <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
        <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
      </div>
    </div>
  );
}

function SidebarRightLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ flex: 1, padding: '14px 12px', overflowY: 'hidden' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#111', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.02em' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 7.5, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 600, marginTop: 2 }}>{PLACEHOLDER.title}</div>
        <div style={{ height: 1.5, background: t.primary, opacity: 0.3, marginTop: 6, marginBottom: 6 }} />
        <SectionTitle label="Summary" color={t.primary} />
        <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={7} color='#222' weight={700} mt={4} />
        <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
      </div>
      <div style={{ width: '34%', background: t.accent, padding: '14px 8px', borderLeft: `2px solid ${t.primary}20`, overflowY: 'hidden' }}>
        <div style={{ fontSize: 7, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 6 }}>CONTACT</div>
        {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 3, alignItems: 'flex-start', marginBottom: 4 }}>
            <span style={{ fontSize: 6.5, color: t.primary, marginTop: 0.5 }}>{icon}</span>
            <span style={{ fontSize: 5.5, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.4, wordBreak: 'break-all' }}>{text}</span>
          </div>
        ))}
        <div style={{ height: 0.5, background: t.primary, opacity: 0.15, margin: '8px 0' }} />
        <div style={{ fontSize: 7, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 6 }}>SKILLS</div>
        {PLACEHOLDER.skills.map(s => (
          <div key={s} style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 6, color: '#444', fontFamily: 'Arial, sans-serif', marginBottom: 2 }}>{s}</div>
            <div style={{ height: 3, background: `${t.primary}25`, borderRadius: 2 }}>
              <div style={{ height: '100%', width: '75%', background: t.primary, borderRadius: 2, opacity: 0.6 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 0.5, background: t.primary, opacity: 0.15, margin: '8px 0' }} />
        <div style={{ fontSize: 7, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 6 }}>LANGUAGES</div>
        {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 5.5, color: '#555', fontFamily: 'Arial, sans-serif', marginBottom: 2 }}>{l}</div>)}
      </div>
    </div>
  );
}

function BandLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{PLACEHOLDER.title}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone]].map(([icon, text]) => (
              <div key={text as string} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.6)' }}>{icon}</span>
                <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflowY: 'hidden' }}>
        <div style={{ flex: 1, padding: '10px 12px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '34%', background: t.accent, padding: '10px 8px', borderLeft: `1px solid ${t.primary}15`, overflowY: 'hidden' }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={6.5} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
          <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
          <SectionTitle label="Skills" color={t.primary} />
          {PLACEHOLDER.skills.map(s => <div key={s} style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>• {s}</div>)}
        </div>
      </div>
    </div>
  );
}

function ElegantLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '16px', textAlign: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', marginTop: 3, fontStyle: 'italic' }}>{PLACEHOLDER.title}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 6 }}>
          {['✉ ' + PLACEHOLDER.email, '☎ ' + PLACEHOLDER.phone].map(t => (
            <span key={t} style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif' }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 0, overflowY: 'hidden' }}>
        <div style={{ flex: 1, padding: '10px 12px' }}>
          <SectionTitle label="Profile" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'Georgia, serif', lineHeight: 1.5, fontStyle: 'italic' }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '36%', padding: '10px 8px', borderLeft: `1px solid ${t.primary}20` }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={6.5} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
          <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
          <SectionTitle label="Skills" color={t.primary} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
            {PLACEHOLDER.skills.slice(0, 5).map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
          </div>
          <SectionTitle label="Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function TechLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: '#0f172a', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 32, background: t.primary, borderRadius: 2, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 7, color: t.primary, fontFamily: 'monospace', marginTop: 2 }}>{PLACEHOLDER.title}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
              <span key={v} style={{ fontSize: 5.5, color: '#94a3b8', fontFamily: 'monospace' }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflowY: 'hidden' }}>
        <div style={{ flex: 1, padding: '10px 12px' }}>
          <SectionTitle label="// Summary" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'monospace', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="// Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
          <SectionTitle label="// Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={7} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
        </div>
        <div style={{ width: '32%', background: '#f8faff', borderLeft: '1px solid #e2e8f0', padding: '10px 8px', overflowY: 'hidden' }}>
          <SectionTitle label="// Skills" color={t.primary} />
          {PLACEHOLDER.skills.map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <div style={{ width: 4, height: 4, background: t.primary, borderRadius: 1, flexShrink: 0 }} />
              <div style={{ fontSize: 6, color: '#444', fontFamily: 'monospace' }}>{s}</div>
            </div>
          ))}
          <SectionTitle label="// Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 5.5, color: '#666', fontFamily: 'monospace', marginTop: 3 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function MinimalLayout({ t }: { t: Template }) {
  return (
    <div style={{ padding: '16px 18px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: '#111', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.03em' }}>{PLACEHOLDER.name}</div>
      <div style={{ fontSize: 8, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 600, marginTop: 2 }}>{PLACEHOLDER.title}</div>
      <div style={{ display: 'flex', gap: 10, marginTop: 5, flexWrap: 'wrap' }}>
        {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
          <span key={v} style={{ fontSize: 6, color: '#888', fontFamily: 'Arial, sans-serif' }}>{v}</span>
        ))}
      </div>
      <div style={{ height: 1, background: '#e0e0e0', margin: '8px 0' }} />
      <div style={{ flex: 1, display: 'flex', gap: 16, overflowY: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: 80 }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={6} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={5.5} color={t.primary} weight={600} mt={1} />
          <TextLine text={PLACEHOLDER.edu.date} size={5} color='#999' mt={1} />
          <SectionTitle label="Skills" color={t.primary} />
          {PLACEHOLDER.skills.map(s => <div key={s} style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{s}</div>)}
        </div>
      </div>
    </div>
  );
}

function TimelineLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{PLACEHOLDER.title}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
            <div key={v} style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflowY: 'hidden' }}>
        <div style={{ flex: 1, padding: '10px 10px 10px 16px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <div style={{ borderLeft: `2px solid ${t.accent}`, paddingLeft: 8, marginTop: 6 }}>
            {[PLACEHOLDER.exp1, PLACEHOLDER.exp2].map((exp, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.primary, position: 'absolute', left: -11, top: 2 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <TextLine text={exp.role} size={7} color='#222' weight={700} mt={0} />
                  <TextLine text={exp.date} size={5.5} color='#888' mt={0} />
                </div>
                <TextLine text={exp.company} size={6} color={t.primary} weight={600} mt={1} />
                {exp.bullets.slice(0, 2).map((b, j) => <Bullet key={j} text={b} color={t.primary} />)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '34%', background: t.accent, padding: '10px 8px', overflowY: 'hidden' }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={6.5} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
          <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
          <SectionTitle label="Skills" color={t.primary} />
          {PLACEHOLDER.skills.slice(0, 5).map(s => <div key={s} style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>· {s}</div>)}
          <SectionTitle label="Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function InfographicLayout({ t }: { t: Template }) {
  const bars = [85, 70, 78, 65, 90, 55, 72];
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ width: '38%', background: t.primary, padding: '14px 8px', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div style={{ fontSize: 8.5, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{PLACEHOLDER.title}</div>
        <div style={{ height: 0.5, background: 'rgba(255,255,255,0.2)', margin: '8px 0' }} />
        <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 5, letterSpacing: '0.06em' }}>SKILLS</div>
        {PLACEHOLDER.skills.map((s, i) => (
          <div key={s} style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.5 }}>
              <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif' }}>{s}</span>
              <span style={{ fontSize: 5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>{bars[i]}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${bars[i]}%`, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 0.5, background: 'rgba(255,255,255,0.2)', margin: '8px 0' }} />
        <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>CONTACT</div>
        {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
            <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)' }}>{icon}</span>
            <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif' }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '14px 12px', overflowY: 'hidden' }}>
        <SectionTitle label="Summary" color={t.primary} />
        <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={7} color='#222' weight={700} mt={4} />
        <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
        <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
      </div>
    </div>
  );
}

function TwoColumnLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '12px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{PLACEHOLDER.title}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 5 }}>
          {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
            <span key={v} style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif' }}>{v}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 0, overflowY: 'hidden' }}>
        <div style={{ flex: 1, padding: '10px 12px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '38%', padding: '10px 8px', background: t.accent, borderLeft: `2px solid ${t.primary}15` }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={6.5} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={6} color={t.primary} weight={600} mt={1} />
          <TextLine text={PLACEHOLDER.edu.date} size={5.5} color='#888' mt={1} />
          <SectionTitle label="Skills" color={t.primary} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
            {PLACEHOLDER.skills.map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
          </div>
          <SectionTitle label="Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function PhotoCardLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ display: 'flex', height: 70 }}>
        <div style={{ width: 56, background: '#d1d5db', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color: '#9ca3af' }}>👤</div>
        </div>
        <div style={{ flex: 1, background: t.primary, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{PLACEHOLDER.title}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
            {[PLACEHOLDER.email, PLACEHOLDER.phone].map(v => (
              <span key={v} style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif' }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflowY: 'hidden' }}>
        <div style={{ flex: 1, padding: '10px 12px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 6, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '34%', background: '#f8f8f8', borderLeft: `2px solid ${t.accent}`, padding: '10px 8px', overflowY: 'hidden' }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={6} color='#222' weight={700} mt={4} />
          <TextLine text={PLACEHOLDER.edu.school} size={5.5} color={t.primary} weight={600} mt={1} />
          <SectionTitle label="Skills" color={t.primary} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
            {PLACEHOLDER.skills.slice(0, 5).map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
          </div>
          <SectionTitle label="Contact" color={t.primary} />
          <div style={{ fontSize: 5.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{PLACEHOLDER.location}</div>
        </div>
      </div>
    </div>
  );
}

export default function TemplateLargePreview({ t }: Props) {
  const renderers: Record<string, React.ComponentType<{ t: Template }>> = {
    'classic': ClassicLayout,
    'sidebar-left': SidebarLeftLayout,
    'sidebar-right': SidebarRightLayout,
    'band': BandLayout,
    'elegant': ElegantLayout,
    'tech': TechLayout,
    'minimal': MinimalLayout,
    'timeline': TimelineLayout,
    'infographic': InfographicLayout,
    'two-column': TwoColumnLayout,
    'photo-card': PhotoCardLayout,
  };

  const Layout = renderers[t.renderer] ?? ClassicLayout;

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 4 }}>
      <Layout t={t} />
    </div>
  );
}
