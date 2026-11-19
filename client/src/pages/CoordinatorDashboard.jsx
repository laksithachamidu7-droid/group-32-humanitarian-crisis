import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_REQUESTS, URGENCY_LEVELS, STATUS_META } from '../data/sampleData';
import { UrgencyChip, StatusChip } from '../components/Chips';

const ALL_FILTER = 'all';

function formatRelativeTime(isoString) {
  const diff  = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  if (hours > 0) return `${hours}h ago`;
  if (mins  > 0) return `${mins}m ago`;
  return 'Just now';
}

function ScoreBar({ score }) {
  const color =
    score >= 90 ? '#ef4444' :
    score >= 70 ? '#f97316' :
    score >= 50 ? '#eab308' : '#22c55e';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      fontSize: '0.72rem', color, fontWeight: 700,
    }}>
      <span aria-hidden="true">🤖</span> AI {score}
    </span>
  );
}

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(ALL_FILTER);

  const counts = {
    total:      SAMPLE_REQUESTS.length,
    critical:   SAMPLE_REQUESTS.filter(r => r.urgency === 'critical').length,
    pending:    SAMPLE_REQUESTS.filter(r => r.status  === 'pending').length,
    inProgress: SAMPLE_REQUESTS.filter(r => r.status  === 'in-progress').length,
  };

  const filters = [
    { id: ALL_FILTER,    label: 'All Requests' },
    { id: 'critical',    label: '🔴 Critical'   },
    { id: 'high',        label: '🟠 High'        },
    { id: 'medium',      label: '🟡 Medium'      },
    { id: 'low',         label: '🟢 Low'         },
    { id: 'pending',     label: 'Pending'        },
    { id: 'in-progress', label: 'In Progress'    },
    { id: 'resolved',    label: 'Resolved'       },
  ];

  const getUrgencyColor = (urgency) =>
    URGENCY_LEVELS.find(u => u.value === urgency)?.color ?? 'var(--teal)';

  const filtered =
    filter === ALL_FILTER
      ? SAMPLE_REQUESTS
      : SAMPLE_REQUESTS.filter(r => r.urgency === filter || r.status === filter);

  const sorted = [...filtered].sort(
    (a, b) => b.aiRecommendation.priorityScore - a.aiRecommendation.priorityScore
  );

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="sidebar" aria-label="Coordinator navigation">
        <div className="sidebar-section-label">Coordinator</div>
        <a href="#overview"  className="sidebar-link active">
          <span className="sidebar-icon">📊</span> Overview
        </a>
        <a href="#requests"  className="sidebar-link">
          <span className="sidebar-icon">📋</span> All Requests
        </a>

        <div className="sidebar-section-label">System</div>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/sign-in'); }}>
          <span className="sidebar-icon">🔄</span> Switch Role
        </a>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/'); }}>
          <span className="sidebar-icon">🏠</span> Home
        </a>

        <div className="sidebar-user">
          <div className="sidebar-avatar">KC</div>
          <div>
            <div className="sidebar-username">K. Coordinator</div>
            <div className="sidebar-role">Coordinator · Demo</div>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────── */}
      <main className="dashboard-main" id="overview">
        {/* Header */}
        <div className="page-header">
          <div className="info-banner demo" role="note" style={{ marginBottom: '1rem' }}>
            <span aria-hidden="true">⚠️</span>
            <span>
              <strong>Demo Data Only.</strong> These are fictional sample requests for the Group 32 prototype.
              AI scores are pre-computed static values — no live AI service is connected.
            </span>
          </div>
          <h1 className="page-title">Coordinator Dashboard</h1>
          <p className="page-subtitle">
            Review and manage incoming humanitarian aid requests.
            Click any card to see full details and AI priority recommendations.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid" role="region" aria-label="Summary statistics" id="overview-stats">
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--teal-dark)' }}>{counts.total}</div>
            <div className="stat-label">Total Requests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ef4444' }}>{counts.critical}</div>
            <div className="stat-label">Critical</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f97316' }}>{counts.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#8b5cf6' }}>{counts.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        {/* Filter pills */}
        <div id="requests">
          <div className="filter-row" role="group" aria-label="Filter requests">
            {filters.map(f => (
              <button
                key={f.id}
                id={`filter-${f.id}`}
                className={`filter-pill${filter === f.id ? ' active' : ''}`}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="text-muted text-sm mb-2" aria-live="polite" style={{ marginBottom: '0.75rem' }}>
            Showing {sorted.length} of {SAMPLE_REQUESTS.length} requests (sorted by AI priority score)
          </p>

          {/* Request list */}
          <div className="request-list" role="list">
            {sorted.length === 0 && (
              <p className="text-muted" style={{ padding: '2rem', textAlign: 'center' }}>
                No requests match this filter.
              </p>
            )}

            {sorted.map(req => (
              <article
                key={req.id}
                className="request-card"
                id={`request-card-${req.id}`}
                role="listitem"
                onClick={() => navigate(`/request/${req.id}`)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/request/${req.id}`); }}
                tabIndex={0}
                aria-label={`${req.id} — ${req.citizenName} — ${req.aidType} — ${req.urgency} urgency`}
                style={{ '--urgency-color': getUrgencyColor(req.urgency), cursor: 'pointer' }}
              >
                <div className="request-card-header">
                  <div style={{ flex: 1 }}>
                    <div className="request-id">{req.id}</div>
                    <div className="request-name">{req.citizenName}</div>
                    <div className="request-aidtype">{req.aidType}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <UrgencyChip urgency={req.urgency} />
                    <StatusChip  status={req.status}  />
                  </div>
                </div>

                <p className="request-desc">{req.description}</p>

                <div className="request-card-footer">
                  <span>📍 {req.location}</span>
                  <span className="dot">·</span>
                  <span>🕐 {formatRelativeTime(req.submittedAt)}</span>
                  {req.peopleAffected && (
                    <>
                      <span className="dot">·</span>
                      <span>👥 {req.peopleAffected}</span>
                    </>
                  )}
                  <span className="dot">·</span>
                  <ScoreBar score={req.aiRecommendation.priorityScore} />
                  <span className="arrow-icon" aria-hidden="true">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
