import { URGENCY_LEVELS, STATUS_META } from '../data/sampleData';

/**
 * Urgency chip — coloured pill based on urgency value
 */
export function UrgencyChip({ urgency }) {
  const meta = URGENCY_LEVELS.find(u => u.value === urgency);
  if (!meta) return null;
  return (
    <span
      className="chip"
      style={{
        color: meta.color,
        background: `${meta.color}1a`,
        border: `1px solid ${meta.color}40`,
      }}
      title={meta.label}
    >
      <span className="chip-dot" style={{ background: meta.color }} />
      {meta.value.charAt(0).toUpperCase() + meta.value.slice(1)}
    </span>
  );
}

/**
 * Status chip — coloured pill based on request status
 */
export function StatusChip({ status }) {
  const meta = STATUS_META[status];
  if (!meta) return null;
  return (
    <span
      className="chip"
      style={{
        color: meta.color,
        background: meta.bg,
        border: `1px solid ${meta.color}40`,
      }}
    >
      {meta.label}
    </span>
  );
}
