import { useNavigate } from 'react-router-dom';

const STATS = [
  { num: '2,400+', label: 'People Helped' },
  { num: '340',    label: 'Active Volunteers' },
  { num: '18',     label: 'Districts Covered' },
  { num: '94%',    label: 'Response Rate' },
];

const HOW_IT_WORKS = [
  {
    num: '1',
    title: 'Submit a Request',
    desc: 'Describe your situation, pin your location on the map, and send your request in under two minutes.',
  },
  {
    num: '2',
    title: 'AI Prioritisation',
    desc: 'Our AI engine scores each request by urgency, affected population, and available resources nearby.',
  },
  {
    num: '3',
    title: 'Coordinated Response',
    desc: 'Verified coordinators dispatch the right volunteers and supplies to your exact location.',
  },
  {
    num: '4',
    title: 'Real-Time Updates',
    desc: 'Track your request status as responders are assigned and resources delivered.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="page-full" style={{ background: 'var(--bg-page)' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(0,191,165,0.18)', border: '1px solid rgba(0,191,165,0.35)',
            borderRadius: '20px', padding: '0.3rem 0.9rem',
            fontSize: '0.78rem', fontWeight: 600, color: 'var(--teal)', marginBottom: '1.5rem',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
            Sri Lanka Response Network Online
          </div>

          <h1>
            Together, We Can{' '}
            <span className="accent">Make a Difference</span>
          </h1>
          <p>
            RELIEF AI connects people in crisis with verified volunteers and
            coordinated aid — faster, smarter, and closer to you.
          </p>

          {/* Demo notice */}
          <div style={{
            background: 'rgba(237,137,54,0.15)', border: '1px solid rgba(237,137,54,0.3)',
            borderRadius: '10px', padding: '0.6rem 1rem', marginBottom: '1.5rem',
            fontSize: '0.78rem', color: '#FBD38D', display: 'inline-block',
          }}>
            ⚠️ <strong>Demo Data Only</strong> — Group 32 coursework prototype. No real data or services connected.
          </div>

          <div className="hero-ctas">
            <button
              id="home-request-btn"
              className="btn btn-teal btn-xl"
              onClick={() => navigate('/request')}
            >
              🆘 Request Help
            </button>
            <button
              id="home-volunteer-btn"
              className="btn btn-outline-navy btn-xl"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              onClick={() => navigate('/volunteer-register')}
            >
              🤝 Become a Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="stats-strip" aria-label="Impact statistics">
        <div className="stats-strip-inner">
          {STATS.map(s => (
            <div key={s.label} className="strip-stat">
              <div className="strip-num">{s.num}</div>
              <div className="strip-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="hiw-section" aria-labelledby="hiw-title">
        <div className="hiw-title">
          <h2 id="hiw-title">How RELIEF AI Works</h2>
          <p>Four simple steps from crisis to coordinated response.</p>
        </div>
        <div className="hiw-cards">
          {HOW_IT_WORKS.map(c => (
            <div key={c.num} className="hiw-card">
              <div className="hiw-num">{c.num}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA row ──────────────────────────────────────────── */}
      <section style={{
        background: 'var(--navy)',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,191,165,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.6rem' }}>
            Ready to make a difference?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '1.75rem', fontSize: '0.95rem', lineHeight: 1.65 }}>
            Join our network of verified volunteers across Sri Lanka and help
            those who need it most when disaster strikes.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-teal btn-lg" onClick={() => navigate('/sign-in')}>
              Sign In
            </button>
            <button
              className="btn btn-outline btn-lg"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              onClick={() => navigate('/volunteer-register')}
            >
              Register as Volunteer
            </button>
            <button
              className="btn btn-ghost btn-lg"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', background: 'transparent' }}
              onClick={() => navigate('/dashboard')}
            >
              Coordinator Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
