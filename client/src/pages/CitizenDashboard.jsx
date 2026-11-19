import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_CITIZEN_REQUESTS, STATUS_META, URGENCY_LEVELS } from '../data/sampleData';
import { UrgencyChip, StatusChip } from '../components/Chips';

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function CitizenDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Citizen navigation">
        <div className="sidebar-section-label">My Account</div>
        <a href="#overview"  className="sidebar-link active">
          <span className="sidebar-icon">🏠</span> Overview
        </a>
        <a href="#requests" className="sidebar-link">
          <span className="sidebar-icon">📋</span> My Requests
        </a>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/request'); }}>
          <span className="sidebar-icon">🆘</span> New Request
        </a>

        <div className="sidebar-section-label">System</div>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/sign-in'); }}>
          <span className="sidebar-icon">🔄</span> Switch Role
        </a>
        <a href="#" className="sidebar-link" onClick={e => { e.preventDefault(); navigate('/'); }}>
          <span className="sidebar-icon">🏠</span> Home
        </a>

        <div className="sidebar-user">
          <div className="sidebar-avatar">SC</div>
          <div>
            <div className="sidebar-username">Saouni Citizen</div>
            <div className="sidebar-role">Citizen · Demo</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main" id="overview">
        <div className="page-header">
          <div className="info-banner demo" role="note" style={{ marginBottom: '1rem' }}>
            <span aria-hidden="true">⚠️</span>
            <span><strong>Demo Citizen Dashboard.</strong> All data is fictional for Group 32 coursework prototype.</span>
          </div>
          <h1 className="page-title">My Dashboard</h1>
          <p className="page-subtitle">Track your assistance requests and account status.</p>
        </div>

        {/* Quick action */}
        <div style={{ marginBottom: '2rem' }}>
          <button className="btn btn-teal btn-lg" onClick={() => navigate('/request')}>
            🚨 Submit New Request
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--teal-dark)' }}>{DEMO_CITIZEN_REQUESTS.length}</div>
            <div className="stat-label">Total Requests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#8b5cf6' }}>
              {DEMO_CITIZEN_REQUESTS.filter(r => r.status === 'in-progress').length}
            </div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#22c55e' }}>
              {DEMO_CITIZEN_REQUESTS.filter(r => r.status === 'resolved').length}
            </div>
            <div className="stat-label">Resolved</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f97316' }}>
              {DEMO_CITIZEN_REQUESTS.filter(r => r.status === 'pending').length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        {/* Request list */}
        <div id="requests">
          <h2 className="page-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>My Requests</h2>
          <div className="request-list" role="list">
            {DEMO_CITIZEN_REQUESTS.map(req => {
              const urgMeta = URGENCY_LEVELS.find(u => u.value === req.urgency);
              return (
                <article
                  key={req.id}
                  className="request-card"
                  role="listitem"
                  style={{ '--urgency-color': urgMeta?.color ?? 'var(--teal)' }}
                >
                  <div className="request-card-header">
                    <div style={{ flex: 1 }}>
                      <div className="request-id">{req.id}</div>
                      <div className="request-name">{req.aidType}</div>
                      <div className="request-aidtype">{req.location}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                      <UrgencyChip urgency={req.urgency} />
                      <StatusChip  status={req.status} />
                    </div>
                  </div>
                  <p className="request-desc">{req.description}</p>
                  <div className="request-card-footer">
                    <span>🕐 {formatDate(req.submittedAt)}</span>
                    {req.latitude && (
                      <>
                        <span className="dot">·</span>
                        <span>📍 {Number(req.latitude).toFixed(4)}, {Number(req.longitude).toFixed(4)}</span>
                      </>
                    )}
                    {req.peopleAffected && (
                      <>
                        <span className="dot">·</span>
                        <span>👥 {req.peopleAffected} affected</span>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
