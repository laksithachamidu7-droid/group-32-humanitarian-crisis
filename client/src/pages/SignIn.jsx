import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/** Demo sign-in — no real auth. Label clearly. */
export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '', role: 'citizen' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const DEMO_ACCOUNTS = [
    { email: 'citizen@demo.lk',     password: 'demo1234', role: 'citizen',     dest: '/citizen-dashboard' },
    { email: 'volunteer@demo.lk',   password: 'demo1234', role: 'volunteer',   dest: '/volunteer-dashboard' },
    { email: 'coordinator@demo.lk', password: 'demo1234', role: 'coordinator', dest: '/dashboard' },
  ];

  const validate = () => {
    const e = {};
    if (!form.email.trim())    e.email    = 'Please enter your email.';
    if (!form.password.trim()) e.password = 'Please enter a password.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const account = DEMO_ACCOUNTS.find(
        a => a.email === form.email && a.password === form.password
      );
      if (account) {
        navigate(account.dest);
      } else {
        // Any credentials → route by selected role
        const dest = form.role === 'coordinator' ? '/dashboard'
                   : form.role === 'volunteer'   ? '/volunteer-dashboard'
                   : '/citizen-dashboard';
        navigate(dest);
      }
    }, 700);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--teal), var(--navy))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.5rem', margin: '0 auto 0.75rem',
          }}>🛡️</div>
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in to your RELIEF AI account</div>
        </div>

        {/* Demo notice */}
        <div className="info-banner demo" role="note" style={{ marginBottom: '1.25rem' }}>
          <span aria-hidden="true">⚠️</span>
          <span><strong>Demo Authentication Only.</strong> Any email/password will work. Use the quick-fill buttons below.</span>
        </div>

        {/* Quick-fill buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Citizen', email: 'citizen@demo.lk' },
            { label: 'Volunteer', email: 'volunteer@demo.lk' },
            { label: 'Coordinator', email: 'coordinator@demo.lk' },
          ].map(a => (
            <button
              key={a.label}
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setForm(f => ({ ...f, email: a.email, password: 'demo1234', role: a.label.toLowerCase() }))}
            >
              {a.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Sign in form">
          {/* Role selector */}
          <div className="form-group">
            <label className="form-label" htmlFor="signin-role">I am a</label>
            <select
              id="signin-role"
              className="form-select"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            >
              <option value="citizen">Citizen in need of help</option>
              <option value="volunteer">Volunteer</option>
              <option value="coordinator">Coordinator / Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signin-email">Email address</label>
            <input
              id="signin-email"
              className={`form-input${errors.email ? ' input-error' : ''}`}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(x => ({ ...x, email: undefined })); }}
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signin-pw">Password</label>
            <input
              id="signin-pw"
              className={`form-input${errors.password ? ' input-error' : ''}`}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(x => ({ ...x, password: undefined })); }}
              autoComplete="current-password"
              aria-invalid={!!errors.password}
            />
            {errors.password && <span className="form-error" role="alert">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-teal btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? '⏳ Signing in…' : 'Sign In →'}
          </button>
        </form>

        <hr className="divider" />
        <p className="text-center text-sm text-muted">
          New volunteer?{' '}
          <Link to="/volunteer-register" className="text-teal font-bold" style={{ textDecoration: 'underline' }}>
            Register here
          </Link>
        </p>
        <p className="text-center text-sm text-muted mt-1">
          Need help?{' '}
          <Link to="/request" className="text-teal font-bold" style={{ textDecoration: 'underline' }}>
            Submit an assistance request
          </Link>
        </p>
      </div>
    </div>
  );
}
