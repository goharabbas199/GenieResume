import { useRef, useEffect, useState } from 'react';
import type { Template } from '@/lib/templates';

interface Props {
  t: Template;
}

const CV_WIDTH = 595;
const CV_HEIGHT = 842;

const PLACEHOLDER = {
  name: 'Ahmed Khan',
  title: 'Senior Software Engineer',
  email: 'ahmed.khan@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  website: 'linkedin.com/in/ahmedkhan',
  summary: 'Results-driven Senior Software Engineer with 8+ years of experience designing scalable, high-performance systems. Proven leader in cross-functional teams, passionate about clean architecture and building products that reach millions of users.',
  exp1: { role: 'Senior Software Engineer', company: 'TechCorp Inc.', date: '2020 – Present', bullets: ['Led migration to microservices, reducing latency by 40%', 'Architected a real-time data pipeline processing 5M+ events/day', 'Mentored a team of 6 engineers across two time zones'] },
  exp2: { role: 'Software Engineer', company: 'StartupXYZ', date: '2017 – 2020', bullets: ['Built REST APIs serving 2M+ daily active users', 'Improved CI/CD pipeline, cutting deploy time by 60%'] },
  edu: { degree: 'B.Sc. Computer Science', school: 'University of California, Berkeley', date: '2011 – 2015' },
  skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Kubernetes'],
  langs: ['English (Native)', 'Arabic (Native)', 'French (Intermediate)'],
};

function SectionTitle({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ marginTop: 18, marginBottom: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, fontFamily: 'Arial, sans-serif' }}>{label}</div>
      <div style={{ height: 1.5, background: color, opacity: 0.3, marginTop: 3 }} />
    </div>
  );
}

function TextLine({ text, size = 9, color = '#444', weight = 400, mt = 3 }: { text: string; size?: number; color?: string; weight?: number; mt?: number }) {
  return <div style={{ fontSize: size, color, fontWeight: weight, marginTop: mt, fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>{text}</div>;
}

function Bullet({ text, color }: { text: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginTop: 3 }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, opacity: 0.7, marginTop: 4, flexShrink: 0 }} />
      <div style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

function SkillTag({ skill, primary }: { skill: string; primary: string }) {
  return (
    <div style={{ fontSize: 8, padding: '3px 8px', borderRadius: 4, background: `${primary}18`, color: primary, fontFamily: 'Arial, sans-serif', fontWeight: 600, border: `1px solid ${primary}30` }}>{skill}</div>
  );
}

function ExpBlock({ exp, primary }: { exp: typeof PLACEHOLDER.exp1; primary: string }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#222', fontFamily: 'Arial, sans-serif' }}>{exp.role}</div>
        <div style={{ fontSize: 8, color: '#888', fontFamily: 'Arial, sans-serif' }}>{exp.date}</div>
      </div>
      <div style={{ fontSize: 9, color: primary, fontWeight: 600, fontFamily: 'Arial, sans-serif', marginTop: 1 }}>{exp.company}</div>
      {exp.bullets.map((b, i) => <Bullet key={i} text={b} color={primary} />)}
    </div>
  );
}

function ClassicLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '22px 28px 18px' }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.02em' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4, fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.title}</div>
        <div style={{ display: 'flex', gap: 18, marginTop: 10, flexWrap: 'wrap' }}>
          {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{icon}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '14px 28px', overflow: 'hidden' }}>
        <SectionTitle label="Professional Summary" color={t.primary} />
        <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Work Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={10} color='#222' weight={700} mt={6} />
        <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
        <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
        <SectionTitle label="Skills" color={t.primary} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          {PLACEHOLDER.skills.map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
        </div>
      </div>
    </div>
  );
}

function SidebarLeftLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ width: '36%', background: t.primary, padding: '22px 12px 16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif', textAlign: 'center', lineHeight: 1.3 }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{PLACEHOLDER.title}</div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '12px 0' }} />
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 6, letterSpacing: '0.06em' }}>CONTACT</div>
        {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 5, alignItems: 'flex-start', marginBottom: 5 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>{icon}</span>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>{text}</span>
          </div>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '12px 0' }} />
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 6, letterSpacing: '0.06em' }}>SKILLS</div>
        {PLACEHOLDER.skills.slice(0, 5).map(s => (
          <div key={s} style={{ marginBottom: 5 }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif', marginBottom: 2 }}>{s}</div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${65 + (s.length * 3) % 30}%`, background: 'rgba(255,255,255,0.55)', borderRadius: 3 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '12px 0' }} />
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 6, letterSpacing: '0.06em' }}>LANGUAGES</div>
        {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginBottom: 3 }}>{l}</div>)}
      </div>
      <div style={{ flex: 1, padding: '22px 18px', overflow: 'hidden' }}>
        <SectionTitle label="Summary" color={t.primary} />
        <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={10} color='#222' weight={700} mt={6} />
        <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
        <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
      </div>
    </div>
  );
}

function SidebarRightLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ flex: 1, padding: '22px 18px', overflow: 'hidden' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#111', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.02em' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 11, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 600, marginTop: 3 }}>{PLACEHOLDER.title}</div>
        <div style={{ height: 2, background: t.primary, opacity: 0.3, marginTop: 8, marginBottom: 8 }} />
        <SectionTitle label="Summary" color={t.primary} />
        <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={10} color='#222' weight={700} mt={6} />
        <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
      </div>
      <div style={{ width: '34%', background: t.accent, padding: '22px 12px', borderLeft: `2px solid ${t.primary}20`, overflow: 'hidden' }}>
        <div style={{ fontSize: 9, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>CONTACT</div>
        {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 5, alignItems: 'flex-start', marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: t.primary, marginTop: 0.5 }}>{icon}</span>
            <span style={{ fontSize: 8, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>{text}</span>
          </div>
        ))}
        <div style={{ height: 1, background: t.primary, opacity: 0.15, margin: '12px 0' }} />
        <div style={{ fontSize: 9, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>SKILLS</div>
        {PLACEHOLDER.skills.map(s => (
          <div key={s} style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 8.5, color: '#444', fontFamily: 'Arial, sans-serif', marginBottom: 2 }}>{s}</div>
            <div style={{ height: 4, background: `${t.primary}25`, borderRadius: 3 }}>
              <div style={{ height: '100%', width: '75%', background: t.primary, borderRadius: 3, opacity: 0.6 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 1, background: t.primary, opacity: 0.15, margin: '12px 0' }} />
        <div style={{ fontSize: 9, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>LANGUAGES</div>
        {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 8, color: '#555', fontFamily: 'Arial, sans-serif', marginBottom: 3 }}>{l}</div>)}
      </div>
    </div>
  );
}

function BandLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '18px 24px', display: 'flex', gap: 18, alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{PLACEHOLDER.title}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone]].map(([icon, text]) => (
              <div key={text as string} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>{icon}</span>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '14px 18px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '34%', background: t.accent, padding: '14px 12px', borderLeft: `1px solid ${t.primary}15`, overflow: 'hidden' }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={9.5} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
          <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
          <SectionTitle label="Skills" color={t.primary} />
          {PLACEHOLDER.skills.map(s => <div key={s} style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>• {s}</div>)}
        </div>
      </div>
    </div>
  );
}

function ElegantLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '24px', textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', marginTop: 4, fontStyle: 'italic' }}>{PLACEHOLDER.title}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
          {['✉ ' + PLACEHOLDER.email, '☎ ' + PLACEHOLDER.phone].map(v => (
            <span key={v} style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif' }}>{v}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '14px 18px' }}>
          <SectionTitle label="Profile" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'Georgia, serif', lineHeight: 1.6, fontStyle: 'italic' }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '36%', padding: '14px 12px', borderLeft: `1px solid ${t.primary}20` }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={9.5} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
          <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
          <SectionTitle label="Skills" color={t.primary} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
            {PLACEHOLDER.skills.slice(0, 5).map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
          </div>
          <SectionTitle label="Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function TechLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: '#0f172a', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 14, height: 48, background: t.primary, borderRadius: 3, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 10, color: t.primary, fontFamily: 'monospace', marginTop: 3 }}>{PLACEHOLDER.title}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
              <span key={v} style={{ fontSize: 8, color: '#94a3b8', fontFamily: 'monospace' }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '14px 18px' }}>
          <SectionTitle label="// Summary" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'monospace', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="// Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
          <SectionTitle label="// Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={10} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
        </div>
        <div style={{ width: '32%', background: '#f8faff', borderLeft: '1px solid #e2e8f0', padding: '14px 12px', overflow: 'hidden' }}>
          <SectionTitle label="// Skills" color={t.primary} />
          {PLACEHOLDER.skills.map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <div style={{ width: 6, height: 6, background: t.primary, borderRadius: 1, flexShrink: 0 }} />
              <div style={{ fontSize: 8.5, color: '#444', fontFamily: 'monospace' }}>{s}</div>
            </div>
          ))}
          <SectionTitle label="// Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 8, color: '#666', fontFamily: 'monospace', marginTop: 4 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function MinimalLayout({ t }: { t: Template }) {
  return (
    <div style={{ padding: '24px 28px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#111', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.03em' }}>{PLACEHOLDER.name}</div>
      <div style={{ fontSize: 11, color: t.primary, fontFamily: 'Arial, sans-serif', fontWeight: 600, marginTop: 3 }}>{PLACEHOLDER.title}</div>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
        {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
          <span key={v} style={{ fontSize: 8.5, color: '#888', fontFamily: 'Arial, sans-serif' }}>{v}</span>
        ))}
      </div>
      <div style={{ height: 1.5, background: '#e0e0e0', margin: '12px 0' }} />
      <div style={{ flex: 1, display: 'flex', gap: 24, overflow: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: 120 }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={9} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={8.5} color={t.primary} weight={600} mt={2} />
          <TextLine text={PLACEHOLDER.edu.date} size={7.5} color='#999' mt={2} />
          <SectionTitle label="Skills" color={t.primary} />
          {PLACEHOLDER.skills.map(s => <div key={s} style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{s}</div>)}
        </div>
      </div>
    </div>
  );
}

function TimelineLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{PLACEHOLDER.title}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
            <div key={v} style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{v}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '14px 14px 14px 22px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <div style={{ borderLeft: `2px solid ${t.accent}`, paddingLeft: 12, marginTop: 8 }}>
            {[PLACEHOLDER.exp1, PLACEHOLDER.exp2].map((exp, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: 12 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: t.primary, position: 'absolute', left: -16, top: 3 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#222', fontFamily: 'Arial, sans-serif' }}>{exp.role}</div>
                  <div style={{ fontSize: 8, color: '#888', fontFamily: 'Arial, sans-serif' }}>{exp.date}</div>
                </div>
                <div style={{ fontSize: 9, color: t.primary, fontWeight: 600, fontFamily: 'Arial, sans-serif', marginTop: 2 }}>{exp.company}</div>
                {exp.bullets.slice(0, 2).map((b, j) => <Bullet key={j} text={b} color={t.primary} />)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '34%', background: t.accent, padding: '14px 12px', overflow: 'hidden' }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={9.5} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
          <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
          <SectionTitle label="Skills" color={t.primary} />
          {PLACEHOLDER.skills.slice(0, 5).map(s => <div key={s} style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>· {s}</div>)}
          <SectionTitle label="Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function InfographicLayout({ t }: { t: Template }) {
  const bars = [85, 70, 78, 65, 90, 55, 72];
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ width: '38%', background: t.primary, padding: '22px 12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>👤</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{PLACEHOLDER.title}</div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '12px 0' }} />
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 7, letterSpacing: '0.06em' }}>SKILLS</div>
        {PLACEHOLDER.skills.map((s, i) => (
          <div key={s} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif' }}>{s}</span>
              <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Arial, sans-serif' }}>{bars[i]}%</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${bars[i]}%`, background: 'rgba(255,255,255,0.6)', borderRadius: 3 }} />
            </div>
          </div>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '10px 0' }} />
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginBottom: 6, letterSpacing: '0.06em' }}>CONTACT</div>
        {[['✉', PLACEHOLDER.email], ['☎', PLACEHOLDER.phone], ['⌖', PLACEHOLDER.location]].map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 5, marginBottom: 4 }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{icon}</span>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif' }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '22px 18px', overflow: 'hidden' }}>
        <SectionTitle label="Summary" color={t.primary} />
        <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
        <SectionTitle label="Experience" color={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
        <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        <SectionTitle label="Education" color={t.primary} />
        <TextLine text={PLACEHOLDER.edu.degree} size={10} color='#222' weight={700} mt={6} />
        <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
        <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
      </div>
    </div>
  );
}

function TwoColumnLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ background: t.primary, padding: '18px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 3 }}>{PLACEHOLDER.title}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
          {[PLACEHOLDER.email, PLACEHOLDER.phone, PLACEHOLDER.location].map(v => (
            <span key={v} style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif' }}>{v}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '14px 18px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '38%', padding: '14px 12px', background: t.accent, borderLeft: `2px solid ${t.primary}15` }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={9.5} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={9} color={t.primary} weight={600} mt={2} />
          <TextLine text={PLACEHOLDER.edu.date} size={8} color='#888' mt={2} />
          <SectionTitle label="Skills" color={t.primary} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
            {PLACEHOLDER.skills.map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
          </div>
          <SectionTitle label="Languages" color={t.primary} />
          {PLACEHOLDER.langs.map(l => <div key={l} style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function PhotoCardLayout({ t }: { t: Template }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#fff' }}>
      <div style={{ display: 'flex', height: 100 }}>
        <div style={{ width: 80, background: '#d1d5db', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 36, color: '#9ca3af' }}>👤</div>
        </div>
        <div style={{ flex: 1, background: t.primary, padding: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Arial, sans-serif' }}>{PLACEHOLDER.name}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{PLACEHOLDER.title}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 7 }}>
            {[PLACEHOLDER.email, PLACEHOLDER.phone].map(v => (
              <span key={v} style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif' }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '14px 18px' }}>
          <SectionTitle label="Summary" color={t.primary} />
          <div style={{ fontSize: 9, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{PLACEHOLDER.summary}</div>
          <SectionTitle label="Experience" color={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp1} primary={t.primary} />
          <ExpBlock exp={PLACEHOLDER.exp2} primary={t.primary} />
        </div>
        <div style={{ width: '34%', background: '#f8f8f8', borderLeft: `2px solid ${t.accent}`, padding: '14px 12px', overflow: 'hidden' }}>
          <SectionTitle label="Education" color={t.primary} />
          <TextLine text={PLACEHOLDER.edu.degree} size={9} color='#222' weight={700} mt={6} />
          <TextLine text={PLACEHOLDER.edu.school} size={8.5} color={t.primary} weight={600} mt={2} />
          <SectionTitle label="Skills" color={t.primary} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
            {PLACEHOLDER.skills.slice(0, 5).map(s => <SkillTag key={s} skill={s} primary={t.primary} />)}
          </div>
          <SectionTitle label="Contact" color={t.primary} />
          <div style={{ fontSize: 8.5, color: '#555', fontFamily: 'Arial, sans-serif', marginTop: 6 }}>{PLACEHOLDER.location}</div>
        </div>
      </div>
    </div>
  );
}

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

export function ScaledTemplatePreview({ t }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setScale(w / CV_WIDTH);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Layout = renderers[t.renderer] ?? ClassicLayout;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: Math.round(CV_HEIGHT * scale),
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: CV_WIDTH,
          height: CV_HEIGHT,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
        }}
      >
        <Layout t={t} />
      </div>
    </div>
  );
}

export default function TemplateLargePreview({ t }: Props) {
  const Layout = renderers[t.renderer] ?? ClassicLayout;
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Layout t={t} />
    </div>
  );
}
