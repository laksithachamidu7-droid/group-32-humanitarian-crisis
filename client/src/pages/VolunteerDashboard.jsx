import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_REQUESTS, DEMO_VOLUNTEERS, URGENCY_LEVELS } from '../data/sampleData';
import { UrgencyChip, StatusChip } from '../components/Chips';

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const VOLUNTEER_ASSIGNMENTS = SAMPLE_REQUESTS.slice(0, 2).map((r, i) => ({
  requestId: r.id,
  aidType:   r.aidType,
  location:  r.location,
  urgency:   r.urgency,
  status:    i === 0 ? 'in-progress' : 'assigned',
  reportedAt: r.submittedAt,
  lat: r.latitude,
  lng: r.longitude,
}));

function VolunteerStatusBadge({ status }) {
  const map = { active: { color: '#22c55e', label: 'Active' }, standby: { color: '#f97316', label: 'Standby' } };
  const m = map[status] ?? { color: '#718096', label: status };
  return (
    <span style={{
      background: `${m.color}18`, border: `1px solid ${m.color}40`,
      color: m.color, borderRadius: '20px',
      padding: '0.2rem 0.65rem', fontSize: '0.72rem', fontWeight: 700,
    }}>{m.label}</span>
  );
}

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [actionResult, setActionResult] = useState({});
  const vol = DEMO_VOLUNTEERS[0]; // Ruwan Perera as logged-in volunteer

  const handleAction = (reqId, action) => {
    setActionResult(prev => ({ ...prev, [reqId]: action }));
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Volunteer navigation">
        <div className="sidebar-section-label">Volunteer Panel</div>
        <a href="#overview" className="sidebar-link active">
          <span className="sidebar-icon">🏠</span> Overview
        </a>
        <a href="#assignments" className="sidebar-link">
          <span className="sidebar-icon">📋</span> My Assignments
        </a>
        <a href="#team" className="sidebar-link">
          <span className="sidebar-icon">👥</span> Team
        </a>

        <div className="sidebar-section-label">System</div>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/sign-in'); }}>
          <span className="sidebar-icon">🔄</span> Switch Role
        </a>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/'); }}>
          <span className="sidebar-icon">🏠</span> Home
        </a>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{vol.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div className="sidebar-username">{vol.name}</div>
            <div className="sidebar-role">Volunteer · {vol.area}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main" id="overview">
        <div className="page-header">
          <div className="info-banner demo" role="note" style={{ marginBottom: '1rem' }}>
            <span aria-hidden="true">⚠️</span>
            <span><strong>Demo Volunteer Dashboard.</strong> Fictional data for Group 32 coursework. AI recommendations are static sample output.</span>
          </div>
          <h1 className="page-title">Volunteer Dashboard</h1>
          <p className="page-subtitle">Hello, {vol.name}! Here's your current status and assignments.</p>
        </div>

        {/* Profile card */}
        <div className="card card-padded" style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--teal), var(--navy))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.4rem', fontWeight: 800, flexShrink: 0,
          }}>
            {vol.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy)' }}>{vol.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>{vol.skill} · {vol.area}</div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--teal-dark)' }}>{vol.tasksCompleted}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tasks Done</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <VolunteerStatusBadge status={vol.status} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.3rem' }}>Status</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--teal-dark)' }}>{vol.tasksCompleted}</div>
            <div className="stat-label">Tasks Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#8b5cf6' }}>{VOLUNTEER_ASSIGNMENTS.filter(a => a.status === 'in-progress').length}</div>
            <div className="stat-label">Active Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f97316' }}>{VOLUNTEER_ASSIGNMENTS.filter(a => a.status === 'assigned').length}</div>
            <div className="stat-label">Assigned</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#22c55e' }}>4.8 ⭐</div>
            <div className="stat-label">Rating (Demo)</div>
          </div>
        </div>

        {/* Assignments */}
        <div id="assignments" style={{ marginBottom: '2rem' }}>
          <h2 className="page-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>My Assignments</h2>
          <div className="request-list" role="list">
            {VOLUNTEER_ASSIGNMENTS.map(asgn => {
              const urgMeta = URGENCY_LEVELS.find(u => u.value === asgn.urgency);
              const done = actionResult[asgn.requestId];
              return (
                <article
                  key={asgn.requestId}
                  className="request-card"
                  role="listitem"
                  style={{ '--urgency-color': urgMeta?.color ?? 'var(--teal)' }}
                >
                  <div className="request-card-header">
                    <div style={{ flex: 1 }}>
                      <div className="request-id">{asgn.requestId}</div>
                      <div className="request-name">{asgn.aidType}</div>
                      <div className="request-aidtype">{asgn.location}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                      <UrgencyChip urgency={asgn.urgency} />
                      <StatusChip  status={asgn.status} />
                    </div>
                  </div>

                  <div className="request-card-footer" style={{ marginBottom: '0.75rem' }}>
                    <span>🕐 {formatDate(asgn.reportedAt)}</span>
                    {asgn.lat && (
                      <>
                        <span className="dot">·</span>
                        <span>📍 {asgn.lat.toFixed(4)}, {asgn.lng.toFixed(4)}</span>
                      </>
                    )}
                  </div>

                  {done ? (
                    <div className="info-banner success" role="status" aria-live="polite" style={{ margin: 0 }}>
                      <span aria-hidden="true">✅</span>
                      <span><strong>Marked as {done}.</strong> (Demo — no real update sent.)</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button className="btn btn-success btn-sm" onClick={() => handleAction(asgn.requestId, 'completed')}>
                        ✅ Mark Complete
                      </button>
                      <button className="btn btn-outline btn-sm" onClick={() => handleAction(asgn.requestId, 'en route')}>
                        🚐 En Route
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleAction(asgn.requestId, 'needs escalation')}>
                        ⬆️ Escalate
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div id="team">
          <h2 className="page-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Volunteer Team</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }} role="table">
              <thead>
                <tr style={{ background: 'var(--bg-hover)', borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Skill', 'Area', 'Tasks Done', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_VOLUNTEERS.map((v, i) => (
                  <tr key={v.id} style={{ borderBottom: i < DEMO_VOLUNTEERS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--navy)' }}>{v.name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-body)' }}>{v.skill}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{v.area}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--teal-dark)' }}>{v.tasksCompleted}</td>
                    <td style={{ padding: '0.75rem 1rem' }}><VolunteerStatusBadge status={v.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
