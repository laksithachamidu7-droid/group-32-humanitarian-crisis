import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { HELP_TYPES, URGENCY_LEVELS } from '../data/sampleData';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon path broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Sri Lanka approximate centre
const SL_CENTER = [7.8731, 80.7718];
const SL_ZOOM   = 7;

/** Inner map click handler — sets pin on click */
function MapClickHandler({ onMapClick }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
}

export default function CitizenRequestForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    helpType: '',
    urgency: '',
    landmark: '',
    peopleAffected: '',
    description: '',
  });

  const [pin, setPin]       = useState(null); // { lat, lng } or null
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError]     = useState('');
  const [errors, setErrors]         = useState({});
  const [submitted, setSubmitted]   = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const mapRef = useRef();

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleMapClick = useCallback((latlng) => {
    setPin({ lat: latlng.lat, lng: latlng.lng });
    if (errors.pin) setErrors(e => ({ ...e, pin: undefined }));
  }, [errors.pin]);

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser. Please place a pin manually.');
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setPin({ lat, lng });
        setGeoLoading(false);
        const map = mapRef.current;
        if (map) map.flyTo([lat, lng], 14);
      },
      (err) => {
        setGeoLoading(false);
        const msgs = {
          1: 'Location permission denied. Place a pin on the map or type your location below.',
          2: 'Location unavailable. Place a pin on the map or type your location below.',
          3: 'Location request timed out. Place a pin on the map.',
        };
        setGeoError(msgs[err.code] ?? 'Could not get location. Place a pin manually.');
      },
      { timeout: 10000 }
    );
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = 'Please enter your name.';
    if (!form.phone.trim())       e.phone       = 'Please enter a phone number.';
    if (!form.helpType)           e.helpType    = 'Please select the type of help needed.';
    if (!form.urgency)            e.urgency     = 'Please select an urgency level.';
    if (!form.description.trim()) e.description = 'Please describe your situation.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Demo only — no real API call
    setSubmittedData({
      ...form,
      latitude:  pin ? pin.lat.toFixed(6) : null,
      longitude: pin ? pin.lng.toFixed(6) : null,
      landmark:  form.landmark || (pin ? `Pinned location (${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)})` : 'Not provided'),
      id: `REQ-${String(Math.floor(Math.random() * 900) + 100)}`,
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setForm({ name: '', phone: '', helpType: '', urgency: '', landmark: '', peopleAffected: '', description: '' });
    setPin(null);
    navigate('/citizen-dashboard');
  };

  return (
    <div className="page-full" style={{ background: 'var(--bg-page)' }}>

      {/* ── Banner ──────────────────────────────────────────── */}
      <div className="request-banner">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(0,191,165,0.18)', border: '1px solid rgba(0,191,165,0.35)',
            borderRadius: '20px', padding: '0.25rem 0.8rem',
            fontSize: '0.75rem', fontWeight: 600, color: 'var(--teal)', marginBottom: '0.75rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
            Sri Lanka Response Network Online
          </div>
          <h1>Tell us how we can help.</h1>
          <p>
            Pin your exact location and include every person who needs assistance.
            Verified volunteer teams will be notified immediately.
          </p>
        </div>
      </div>

      {/* ── Form wrap ───────────────────────────────────────── */}
      <div className="request-form-wrap" style={{ padding: '2rem 1.5rem 4rem' }}>

        {/* Demo notice */}
        <div className="info-banner demo" role="note" style={{ marginBottom: '1.5rem' }}>
          <span aria-hidden="true">⚠️</span>
          <span>
            <strong>Demo Data Only.</strong> This form is a prototype for Group 32's coursework.
            Submissions are not saved to any database and no real service is contacted.
          </span>
        </div>

        <form
          id="citizen-request-form"
          className="card card-padded"
          style={{ padding: '2rem' }}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Citizen assistance request form"
        >

          {/* Row 1: Name + Phone */}
          <div className="form-row" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="req-name">
                Your name <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="req-name"
                className={`form-input${errors.name ? ' input-error' : ''}`}
                type="text"
                placeholder="e.g. Saouni Perera"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="req-phone">
                Phone number <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="req-phone"
                className={`form-input${errors.phone ? ' input-error' : ''}`}
                type="tel"
                placeholder="+94 7XX XXX XXX"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                autoComplete="tel"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="form-error" role="alert">{errors.phone}</span>}
            </div>
          </div>

          {/* Help Type */}
          <div className="form-group">
            <label className="form-label">
              What help do you need? <span className="req" aria-hidden="true">*</span>
            </label>
            <div className="help-type-group" role="group" aria-label="Help type">
              {HELP_TYPES.map(ht => (
                <button
                  key={ht.value}
                  type="button"
                  className={`help-type-btn${form.helpType === ht.value ? ' selected' : ''}`}
                  onClick={() => set('helpType', ht.value)}
                  aria-pressed={form.helpType === ht.value}
                >
                  {ht.icon} {ht.label}
                </button>
              ))}
            </div>
            {errors.helpType && <span className="form-error" role="alert">{errors.helpType}</span>}
          </div>

          {/* Urgency */}
          <div className="form-group">
            <label className="form-label">
              Urgency <span className="req" aria-hidden="true">*</span>
            </label>
            <div className="help-type-group" role="group" aria-label="Urgency level">
              {URGENCY_LEVELS.map(u => (
                <button
                  key={u.value}
                  type="button"
                  className={`help-type-btn${form.urgency === u.value ? ' selected' : ''}`}
                  style={form.urgency === u.value ? { borderColor: u.color, background: `${u.color}18`, color: u.color } : {}}
                  onClick={() => set('urgency', u.value)}
                  aria-pressed={form.urgency === u.value}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.color, display: 'inline-block', marginRight: 4 }} />
                  {u.value.charAt(0).toUpperCase() + u.value.slice(1)}
                </button>
              ))}
            </div>
            {errors.urgency && <span className="form-error" role="alert">{errors.urgency}</span>}
          </div>

          {/* Row: Landmark + People affected */}
          <div className="form-row" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="req-landmark">Current location or landmark</label>
              <input
                id="req-landmark"
                className="form-input"
                type="text"
                placeholder="Type a Sri Lankan city or address"
                value={form.landmark}
                onChange={e => set('landmark', e.target.value)}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="req-people">People affected</label>
              <input
                id="req-people"
                className="form-input"
                type="number"
                min="1"
                placeholder="e.g. 4"
                value={form.peopleAffected}
                onChange={e => set('peopleAffected', e.target.value)}
              />
            </div>
          </div>

          {/* ── Interactive Leaflet map ────────────────────────── */}
          <div className="form-group">
            <label className="form-label">Pin your location on the map</label>
            <span className="form-hint" style={{ marginBottom: '0.5rem' }}>
              Click / tap anywhere on the map to place or move your pin.
            </span>

            <div className="map-wrapper">
              {/* Toolbar */}
              <div className="map-toolbar">
                <span>
                  <strong>Sri Lanka</strong> — click the map to drop a pin
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={handleGeolocate}
                    disabled={geoLoading}
                    aria-label="Use my current location"
                  >
                    {geoLoading ? '⏳ Locating…' : '📍 Use my location'}
                  </button>
                  {pin && (
                    <button
                      type="button"
                      className="btn btn-sm btn-ghost"
                      onClick={() => setPin(null)}
                      aria-label="Clear map pin"
                    >
                      ✕ Clear pin
                    </button>
                  )}
                </div>
              </div>

              {/* Map */}
              <MapContainer
                center={SL_CENTER}
                zoom={SL_ZOOM}
                style={{ width: '100%', height: 320 }}
                ref={mapRef}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler onMapClick={handleMapClick} />
                {pin && <Marker position={[pin.lat, pin.lng]} />}
              </MapContainer>

              {/* Coordinates display */}
              <div className="map-coords" aria-live="polite">
                {pin ? (
                  <>
                    <span className="coords-label">Latitude:</span>
                    <span className="coords-val">{pin.lat.toFixed(6)}</span>
                    <span className="coords-label" style={{ marginLeft: '0.5rem' }}>Longitude:</span>
                    <span className="coords-val">{pin.lng.toFixed(6)}</span>
                  </>
                ) : (
                  <span className="coords-label">No pin placed — click the map above</span>
                )}
              </div>
            </div>

            {geoError && (
              <div className="info-banner demo" role="alert" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                <span aria-hidden="true">⚠️</span>
                <span>{geoError}</span>
              </div>
            )}

            {/* Hidden numeric lat/lng fields for payload */}
            <input type="hidden" name="latitude"  value={pin ? pin.lat : ''} readOnly />
            <input type="hidden" name="longitude" value={pin ? pin.lng : ''} readOnly />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="req-desc">
              Describe what is happening <span className="req" aria-hidden="true">*</span>
            </label>
            <textarea
              id="req-desc"
              className={`form-textarea${errors.description ? ' input-error' : ''}`}
              placeholder="Include immediate risks, accessibility needs, and useful landmarks."
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              maxLength={1000}
              aria-invalid={!!errors.description}
            />
            <span className="form-hint">{form.description.length}/1000 characters</span>
            {errors.description && <span className="form-error" role="alert">{errors.description}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="submit-request-btn"
            className="btn btn-teal btn-lg btn-full"
            style={{ marginTop: '0.5rem' }}
          >
            🚨 Send Assistance Request
          </button>
        </form>
      </div>

      {/* ── Success modal ───────────────────────────────────── */}
      {submitted && submittedData && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <div className="modal-box">
            <span className="modal-icon" aria-hidden="true">✅</span>
            <h2 id="modal-title">Request Submitted!</h2>
            <p id="modal-desc">
              Your assistance request <strong>{submittedData.id}</strong> has been registered.{' '}
              <strong>(Demo only — no data was saved or sent to real responders.)</strong>
            </p>

            <div className="modal-location-box">
              <strong>📍 Location Selected</strong>
              {submittedData.latitude ? (
                <>
                  <div>Latitude: <strong>{submittedData.latitude}</strong></div>
                  <div>Longitude: <strong>{submittedData.longitude}</strong></div>
                  <div style={{ marginTop: '0.3rem', color: 'var(--text-muted)' }}>
                    {submittedData.landmark}
                  </div>
                </>
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>
                  {submittedData.landmark || 'No pin placed — text description used.'}
                </div>
              )}
            </div>

            <div className="modal-location-box" style={{ marginBottom: '1.5rem' }}>
              <strong>📋 Request Summary</strong>
              <div>Name: <strong>{submittedData.name}</strong></div>
              <div>Help Type: <strong>{submittedData.helpType}</strong></div>
              <div>Urgency: <strong>{submittedData.urgency}</strong></div>
              {submittedData.peopleAffected && (
                <div>People Affected: <strong>{submittedData.peopleAffected}</strong></div>
              )}
            </div>

            <button
              id="success-close-btn"
              className="btn btn-teal btn-full"
              onClick={handleClose}
            >
              View My Requests →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
