import type { Template } from '@/lib/templates';

export default function TemplateThumbnail({ t }: { t: Template }) {
  const { primary, accent, renderer } = t;

  if (renderer === 'sidebar-left') return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ width: '36%', background: primary, padding: 4, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', marginTop: 4 }} />
        <div style={{ width: '80%', height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        <div style={{ width: '60%', height: 2, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginTop: 4 }} />
        <div style={{ width: '70%', height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: 5, background: '#fff', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '80%', height: 3, background: primary, borderRadius: 2, opacity: 0.7 }} />
        <div style={{ width: '60%', height: 2, background: '#ccc', borderRadius: 2 }} />
        <div style={{ width: '90%', height: 1.5, background: '#e0e0e0', borderRadius: 2, marginTop: 3 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '85%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
      </div>
    </div>
  );

  if (renderer === 'sidebar-right') return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ flex: 1, padding: 5, background: '#fff', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '80%', height: 4, background: primary, borderRadius: 2 }} />
        <div style={{ width: '55%', height: 2, background: '#bbb', borderRadius: 2 }} />
        <div style={{ width: '90%', height: 1.5, background: '#e5e5e5', borderRadius: 2, marginTop: 3 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e5e5e5', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e5e5e5', borderRadius: 2 }} />
        <div style={{ width: '85%', height: 1.5, background: '#e5e5e5', borderRadius: 2 }} />
      </div>
      <div style={{ width: '33%', background: accent, padding: 4, display: 'flex', flexDirection: 'column', gap: 3, borderLeft: `2px solid ${primary}20` }}>
        <div style={{ width: '70%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
        <div style={{ width: '90%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        <div style={{ width: '80%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        <div style={{ width: '60%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
      </div>
    </div>
  );

  if (renderer === 'band') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ height: '38%', background: primary, display: 'flex', alignItems: 'center', padding: '4px 6px', gap: 5 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '70%', height: 3, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
          <div style={{ width: '50%', height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '90%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
        <div style={{ width: '35%', background: accent, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.5 }} />
          <div style={{ width: '70%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'elegant') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: primary, height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
        <div style={{ width: '55%', height: 2.5, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
        <div style={{ width: '40%', height: 1.5, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: 5, display: 'flex', gap: 4 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
          <div style={{ width: '90%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
          <div style={{ width: '75%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
        <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.4 }} />
          <div style={{ width: '80%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'tech') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: '#0f172a', height: '28%', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 16, height: 16, borderRadius: 2, background: `${primary}80`, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: '70%', height: 2.5, background: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
          <div style={{ width: '50%', height: 1.5, background: primary, borderRadius: 2, marginTop: 2 }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '85%', height: 4, background: '#f0f6ff', borderRadius: 2 }} />
          <div style={{ width: '75%', height: 4, background: '#f0f6ff', borderRadius: 2 }} />
        </div>
        <div style={{ width: '32%', background: '#f8faff', borderLeft: '1px solid #e2e8f0', padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.5 }} />
          <div style={{ width: '60%', height: 3, background: `${primary}20`, borderRadius: 2 }} />
          <div style={{ width: '75%', height: 3, background: `${primary}20`, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'minimal') return (
    <div style={{ padding: '8px 7px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ width: '70%', height: 5, background: '#111', borderRadius: 2 }} />
      <div style={{ width: '45%', height: 2, background: primary, borderRadius: 2 }} />
      <div style={{ width: '85%', height: 1, background: '#e0e0e0', borderRadius: 2, marginTop: 3 }} />
      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '60%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '80%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
          <div style={{ width: '90%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
        </div>
        <div style={{ width: 30, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#e8e8e8', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'timeline') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: primary, height: 28, padding: '4px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: 40, height: 2.5, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
          <div style={{ width: 28, height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
          <div style={{ width: 22, height: 1.5, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
          <div style={{ width: 18, height: 1.5, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1, padding: '5px 5px 4px 12px', borderLeft: `2px solid ${accent}`, margin: '6px 0 4px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '65%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
          <div style={{ width: '75%', height: 1.5, background: '#ddd', borderRadius: 2 }} />
        </div>
        <div style={{ width: '32%', background: accent, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '70%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
          <div style={{ width: '85%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '60%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'infographic') return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ width: '38%', background: primary, padding: '6px 5px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', margin: '0 auto 4px' }} />
        <div style={{ width: '80%', height: 2, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        {[80, 65, 75].map((w, i) => (
          <div key={i} style={{ marginBottom: 2 }}>
            <div style={{ width: '90%', height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
              <div style={{ width: `${w}%`, height: '100%', background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '75%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
        <div style={{ width: '90%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '85%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
      </div>
    </div>
  );

  if (renderer === 'two-column') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: primary, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: '52%', height: 2.5, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
        <div style={{ width: '36%', height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 4, padding: 5 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '75%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '90%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
          <div style={{ width: '80%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
          <div style={{ width: '85%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        </div>
        <div style={{ width: 28, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.5 }} />
          <div style={{ width: '80%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  if (renderer === 'photo-card') return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', height: 38 }}>
        <div style={{ width: 28, background: '#ccc', flexShrink: 0 }} />
        <div style={{ flex: 1, background: primary, padding: '5px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <div style={{ width: '65%', height: 3, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
          <div style={{ width: '45%', height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ width: '80%', height: 2, background: primary, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ width: '90%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
          <div style={{ width: '75%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
          <div style={{ width: '85%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        </div>
        <div style={{ width: 24, background: '#f5f5f5', padding: 3, display: 'flex', flexDirection: 'column', gap: 2, borderLeft: `1px solid ${accent}` }}>
          <div style={{ width: '80%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
          <div style={{ width: '70%', height: 1.5, background: '#ccc', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );

  // classic (default)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ background: primary, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: '55%', height: 2.5, background: 'rgba(255,255,255,0.85)', borderRadius: 2 }} />
        <div style={{ width: '40%', height: 1.5, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ width: '90%', height: 2, background: primary, borderRadius: 2, opacity: 0.6 }} />
        <div style={{ width: '80%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '70%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
        <div style={{ width: '85%', height: 1.5, background: '#e0e0e0', borderRadius: 2 }} />
      </div>
    </div>
  );
}
