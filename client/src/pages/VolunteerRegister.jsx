import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SKILLS = ['Medical First Aid', 'Search & Rescue', 'Logistics & Transport', 'Counselling', 'Water & Sanitation', 'Shelter Construction', 'Communication & IT', 'Community Outreach'];
const DISTRICTS = ['Colombo','Gampaha','Kalutara','Kandy','Matale','Nuwara Eliya','Galle', 'Matara', 'Hambantota','Jaffna', 'Kilinochchi', 'Mannar',  'Mullaitivu','Vavuniya', 'Trincomalee','Batticaloa', 'Ampara', 'Kurunegala', 'Puttalam', 'Anuradhapura','Polonnaruwa','Badulla', 'Monaragala','Ratnapura','Kegalle'];

export default function VolunteerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', nic: '',
    district: '', skill: '', experience: '', availability: '',
    agreeTerms: false,
  });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName  = 'Full name is required.';
    if (!form.email.trim())     e.email     = 'Email is required.';
    if (!form.phone.trim())     e.phone     = 'Phone number is required.';
    if (!form.district)         e.district  = 'Please select your district.';
    if (!form.skill)            e.skill     = 'Please select your primary skill.';
    if (!form.agreeTerms)       e.agreeTerms = 'You must agree to the volunteer terms.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.4rem' }}>
            Application Received!
          </h2>
          <p className="text-muted text-sm" style={{ marginBottom: '1.25rem', lineHeight: 1.65 }}>
            Thank you, <strong>{form.fullName}</strong>! Your volunteer application has been submitted
            for review. <strong>(Demo only — no data was saved.)</strong>
          </p>
          <div className="info-banner info" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
            <span aria-hidden="true">ℹ️</span>
            <span>In a real system you would receive a confirmation email at <strong>{form.email}</strong> within 24 hours.</span>
          </div>
          <button className="btn btn-teal btn-full" onClick={() => navigate('/sign-in')}>
            Sign In →
          </button>
          <button className="btn btn-ghost btn-full" style={{ marginTop: '0.6rem' }} onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div className="auth-card" style={{ maxWidth: 520 }}>
        <div className="auth-logo">
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--teal), var(--navy))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.4rem', margin: '0 auto 0.75rem',
          }}>🤝</div>
          <div className="auth-title">Become a Volunteer</div>
          <div className="auth-sub">Join Sri Lanka's crisis response network</div>
        </div>

        <div className="info-banner demo" role="note">
          <span aria-hidden="true">⚠️</span>
          <span><strong>Demo Registration Only.</strong> No data is saved or transmitted.</span>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Volunteer registration form">

          <div className="form-row">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="vol-name">Full name <span className="req">*</span></label>
              <input id="vol-name" className={`form-input${errors.fullName ? ' input-error' : ''}`} type="text"
                placeholder="Nimal Perera" value={form.fullName} onChange={e => set('fullName', e.target.value)} autoComplete="name" />
              {errors.fullName && <span className="form-error" role="alert">{errors.fullName}</span>}
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="vol-nic">NIC / Passport</label>
              <input id="vol-nic" className="form-input" type="text"
                placeholder="981234567V" value={form.nic} onChange={e => set('nic', e.target.value)} />
            </div>
          </div>

          <div className="form-row" style={{ marginTop: '0.1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="vol-email">Email <span className="req">*</span></label>
              <input id="vol-email" className={`form-input${errors.email ? ' input-error' : ''}`} type="email"
                placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} autoComplete="email" />
              {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="vol-phone">Phone <span className="req">*</span></label>
              <input id="vol-phone" className={`form-input${errors.phone ? ' input-error' : ''}`} type="tel"
                placeholder="+94 7XX XXX XXX" value={form.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />
              {errors.phone && <span className="form-error" role="alert">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row" style={{ marginTop: '0.1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="vol-district">District <span className="req">*</span></label>
              <select id="vol-district" className={`form-select${errors.district ? ' input-error' : ''}`}
                value={form.district} onChange={e => set('district', e.target.value)}>
                <option value="" disabled>Select district…</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.district && <span className="form-error" role="alert">{errors.district}</span>}
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="vol-skill">Primary skill <span className="req">*</span></label>
              <select id="vol-skill" className={`form-select${errors.skill ? ' input-error' : ''}`}
                value={form.skill} onChange={e => set('skill', e.target.value)}>
                <option value="" disabled>Select skill…</option>
                {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.skill && <span className="form-error" role="alert">{errors.skill}</span>}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '0.1rem' }}>
            <label className="form-label" htmlFor="vol-exp">Experience / Notes</label>
            <textarea id="vol-exp" className="form-textarea" rows={3}
              placeholder="Briefly describe relevant experience, certifications, or languages spoken."
              value={form.experience} onChange={e => set('experience', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="vol-avail">Availability</label>
            <select id="vol-avail" className="form-select"
              value={form.availability} onChange={e => set('availability', e.target.value)}>
              <option value="">Select availability…</option>
              <option value="full-time">Full-time (crisis period)</option>
              <option value="weekends">Weekends only</option>
              <option value="on-call">On-call</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <input id="vol-terms" type="checkbox" checked={form.agreeTerms}
              onChange={e => set('agreeTerms', e.target.checked)}
              style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--teal)' }} />
            <label htmlFor="vol-terms" className="form-hint" style={{ color: 'var(--text-body)', cursor: 'pointer' }}>
              I agree to the RELIEF AI volunteer code of conduct and understand that my information
              will only be used for disaster response coordination. <strong>(Demo — no data stored.)</strong>
            </label>
          </div>
          {errors.agreeTerms && <span className="form-error" role="alert" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>{errors.agreeTerms}</span>}

          <button type="submit" className="btn btn-teal btn-full btn-lg">
            🤝 Submit Application
          </button>
        </form>

        <hr className="divider" />
        <p className="text-center text-sm text-muted">
          Already registered?{' '}
          <Link to="/sign-in" className="text-teal font-bold" style={{ textDecoration: 'underline' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
