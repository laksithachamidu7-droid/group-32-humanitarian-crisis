import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SAMPLE_REQUESTS, URGENCY_LEVELS } from '../data/sampleData';
import { UrgencyChip, StatusChip } from '../components/Chips';

function getScoreStyle(score) {
  if (score >= 90) return { color: '#ef4444', glow: 'rgba(239,68,68,0.3)' };
  if (score >= 70) return { color: '#f97316', glow: 'rgba(249,115,22,0.3)' };
  if (score >= 50) return { color: '#eab308', glow: 'rgba(234,179,8,0.3)'  };
  return             { color: '#22c55e', glow: 'rgba(34,197,94,0.3)'  };
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function RequestDetails() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const request  = SAMPLE_REQUESTS.find(r => r.id === id);

  const [actionResult, setActionResult] = useState(null);

  if (!request) {
    return (
      <div className="dashboard-main page-enter" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p style={{ fontSize: '3rem' }} aria-hidden="true">🔍</p>
        <h2 style={{ marginBottom: '0.5rem', color: 'var(--navy)' }}>Request Not Found</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          No request with ID <strong>{id}</strong> exists in the demo data.
        </p>
        <button className="btn btn-teal" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const { aiRecommendation: ai } = request;
  const scoreStyle  = getScoreStyle(ai.priorityScore);
  const urgencyMeta = URGENCY_LEVELS.find(u => u.value === request.urgency);

  const actionMessages = {
    approved:  { icon: '✅', label: 'Approved',  msg: 'Resources have been allocated. (Demo — no real dispatch made.)' },
    rejected:  { icon: '❌', label: 'Declined',  msg: 'Request marked as declined. (Demo — no real action taken.)' },
    escalated: { icon: '⬆️', label: 'Escalated', msg: 'Escalated to senior coordinator. (Demo — no real escalation sent.)' },
  };

  return (
    <div className="dashboard-layout">
      {/* Thin sidebar just for back nav on desktop */}
      <aside className="sidebar" aria-label="Detail navigation">
        <div className="sidebar-section-label">Navigation</div>
        <a
          href="#"
          className="sidebar-link active"
          onClick={e => { e.preventDefault(); navigate('/dashboard'); }}
        >
          <span className="sidebar-icon">←</span> All Requests
        </a>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/'); }}>
          <span className="sidebar-icon">🏠</span> Home
        </a>
      </aside>

      {/* Main content */}
      <main className="dashboard-main page-enter">
        {/* Back button (visible on mobile too) */}
        <button
          id="back-to-dashboard"
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/dashboard')}
          style={{ marginBottom: '1.25rem' }}
          aria-label="Back to Coordinator Dashboard"
        >
          ← Dashboard
        </button>

        {/* Page header */}
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <h1 className="page-title" style={{ margin: 0 }}>
              {request.id} — {request.aidType}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <UrgencyChip urgency={request.urgency} />
            <StatusChip  status={request.status}  />
            <span className="text-muted text-sm">Submitted {formatDate(request.submittedAt)}</span>
          </div>
        </div>

        {/* Demo notice */}
        <div className="info-banner demo" role="note">
          <span aria-hidden="true">⚠️</span>
          <span>
            <strong>Demo Data Only.</strong> This request and its AI recommendation are fictional
            sample data for Group 32's prototype.
          </span>
        </div>

        {/* Detail grid */}
        <div className="detail-layout">

          {/* Citizen Information */}
          <div className="detail-card">
            <div className="detail-card-title">
              <span aria-hidden="true">👤</span> Citizen Information
            </div>
            <div className="detail-row">
              <div className="detail-key">Name</div>
              <div className="detail-value">{request.citizenName}</div>
            </div>
            {request.phone && (
              <div className="detail-row">
                <div className="detail-key">Phone</div>
                <div className="detail-value">{request.phone}</div>
              </div>
            )}
            <div className="detail-row">
              <div className="detail-key">Aid Type Requested</div>
              <div className="detail-value" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>
                {request.aidType}
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-key">Urgency</div>
              <div className="detail-value">
                <span style={{ color: urgencyMeta?.color, fontWeight: 600 }}>{urgencyMeta?.label}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-key">Status</div>
              <div className="detail-value"><StatusChip status={request.status} /></div>
            </div>
            {request.peopleAffected && (
              <div className="detail-row">
                <div className="detail-key">People Affected</div>
                <div className="detail-value" style={{ fontWeight: 700, color: 'var(--navy)' }}>
                  {request.peopleAffected}
                </div>
              </div>
            )}
          </div>

          {/* Situation Details */}
          <div className="detail-card">
            <div className="detail-card-title">
              <span aria-hidden="true">📍</span> Situation Details
            </div>
            <div className="detail-row">
              <div className="detail-key">Location / Landmark</div>
              <div className="detail-value">{request.location}</div>
            </div>
            {/* Show GPS coordinates if available */}
            {request.latitude && (
              <div className="detail-row">
                <div className="detail-key">GPS Coordinates</div>
                <div className="detail-value">
                  <span style={{
                    display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap',
                    background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)',
                    padding: '0.35rem 0.65rem', fontSize: '0.84rem', fontFamily: 'monospace',
                    border: '1px solid var(--border)', color: 'var(--navy)',
                  }}>
                    <span>Lat: <strong>{Number(request.latitude).toFixed(6)}</strong></span>
                    <span>Lng: <strong>{Number(request.longitude).toFixed(6)}</strong></span>
                  </span>
                </div>
              </div>
            )}
            <div className="detail-row">
              <div className="detail-key">Description</div>
              <div className="detail-value" style={{ lineHeight: 1.65 }}>{request.description}</div>
            </div>
            <div className="detail-row">
              <div className="detail-key">Submitted</div>
              <div className="detail-value">{formatDate(request.submittedAt)}</div>
            </div>
          </div>

          {/* AI Priority Recommendation — full width */}
          <div className="detail-card ai-card detail-ai-card" id="ai-recommendation-card">
            <div className="detail-card-title" style={{ color: '#8b5cf6' }}>
              <span aria-hidden="true">🤖</span> AI Priority Recommendation
              <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Demo · Static sample output — no live AI connected
              </span>
            </div>

            <div className="ai-score-row">
              <div
                className="ai-score-circle"
                role="img"
                aria-label={`AI priority score: ${ai.priorityScore} out of 100`}
                style={{ '--score-color': scoreStyle.color, '--score-glow': scoreStyle.glow }}
              >
                <span className="ai-score-num" style={{ color: scoreStyle.color }}>{ai.priorityScore}</span>
                <span className="ai-score-label">/ 100</span>
              </div>

              <div>
                <div className="ai-priority-label">{ai.priorityLabel}</div>
                <div className="ai-confidence">Confidence: {ai.confidenceLevel}</div>
                <div className="ai-confidence" style={{ marginTop: '0.25rem' }}>
                  ⏱ Est. Response: <strong style={{ color: 'var(--text-primary)' }}>{ai.estimatedResponseTime}</strong>
                </div>
              </div>
            </div>

            <div className="detail-key" style={{ marginBottom: '0.5rem' }}>AI Reasoning</div>
            <div className="ai-reasoning" role="note" aria-label="AI reasoning for priority score">
              {ai.reasoning}
            </div>

            <div className="detail-key" style={{ marginBottom: '0.5rem' }}>Suggested Resources</div>
            <div className="resource-list" role="list" aria-label="Suggested resources">
              {ai.suggestedResources.map((r, i) => (
                <span key={i} className="resource-chip" role="listitem">{r}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Coordinator Action Bar */}
        <div className="action-bar" id="coordinator-action-bar" role="region" aria-label="Coordinator review actions">
          <span className="action-bar-label">Coordinator Review</span>

          {actionResult ? (
            <div
              className="info-banner info"
              style={{ flex: 1, margin: 0, borderRadius: 'var(--radius-md)' }}
              role="status"
              aria-live="polite"
            >
              <span aria-hidden="true">{actionMessages[actionResult].icon}</span>
              <span>
                <strong>{actionMessages[actionResult].label}:</strong>{' '}
                {actionMessages[actionResult].msg}
              </span>
            </div>
          ) : (
            <>
              <button
                id="btn-approve"
                className="btn btn-success"
                onClick={() => setActionResult('approved')}
                aria-label="Approve and dispatch resources for this request"
              >
                ✅ Approve &amp; Dispatch
              </button>
              <button
                id="btn-escalate"
                className="btn btn-outline"
                onClick={() => setActionResult('escalated')}
                aria-label="Escalate this request to a senior coordinator"
              >
                ⬆️ Escalate
              </button>
              <button
                id="btn-decline"
                className="btn btn-danger"
                onClick={() => setActionResult('rejected')}
                aria-label="Decline this request"
              >
                ❌ Decline
              </button>
            </>
          )}
        </div>

        {actionResult && (
          <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setActionResult(null)}
              aria-label="Reset coordinator action (demo only)"
            >
              ↺ Reset (demo)
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
