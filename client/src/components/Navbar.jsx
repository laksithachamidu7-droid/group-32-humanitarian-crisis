import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="topbar" role="navigation" aria-label="Main navigation">
      <div className="topbar-inner">

        {/* Brand */}
        <NavLink to="/" className="topbar-brand" aria-label="RELIEF AI Home">
          <div className="brand-logo" aria-hidden="true">🛡️</div>
          <span className="brand-wordmark">
            RELIEF <span>AI</span>
          </span>
        </NavLink>

        {/* Desktop nav links */}
        <div className="topbar-nav" aria-label="Site sections">
          <NavLink
            to="/"
            end
            id="nav-home"
            className={({ isActive }) => `topbar-link${isActive ? ' active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/request"
            id="nav-request"
            className={({ isActive }) => `topbar-link${isActive ? ' active' : ''}`}
          >
            Request Help
          </NavLink>
          <NavLink
            to="/dashboard"
            id="nav-dashboard"
            className={({ isActive }) => `topbar-link${isActive ? ' active' : ''}`}
          >
            Coordinator
          </NavLink>
          <NavLink
            to="/citizen-dashboard"
            id="nav-citizen"
            className={({ isActive }) => `topbar-link${isActive ? ' active' : ''}`}
          >
            Citizen
          </NavLink>
          <NavLink
            to="/volunteer-dashboard"
            id="nav-volunteer"
            className={({ isActive }) => `topbar-link${isActive ? ' active' : ''}`}
          >
            Volunteer
          </NavLink>
        </div>

        {/* Right actions */}
        <div className="topbar-actions">
          <span className="demo-pill" title="Prototype demo data only — not a real service">
            Demo Data
          </span>
          <button
            className="btn btn-teal btn-sm"
            onClick={() => navigate('/sign-in')}
            aria-label="Sign in"
          >
            Sign In
          </button>
        </div>

      </div>

      {/* Mobile menu (shown below 540 px via CSS — links wrap in .topbar-nav) */}
    </nav>
  );
}
