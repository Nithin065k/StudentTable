import styles from './UI.module.css'

export function Button({ children, variant = 'ghost', size = 'md', onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const colors = [
    ['#ede9fe', '#4f46e5'],
    ['#dcfce7', '#16a34a'],
    ['#fee2e2', '#dc2626'],
    ['#fef3c7', '#b45309'],
    ['#dbeafe', '#2563eb'],
    ['#f3e8ff', '#9333ea'],
  ]
  const idx = name.charCodeAt(0) % colors.length
  const [bg, fg] = colors[idx]
  return (
    <div className={styles.avatar} style={{ background: bg, color: fg, borderColor: fg + '44' }}>
      {initials}
    </div>
  )
}

export function GpaBadge({ gpa }) {
  let color, bg, bdr
  if (gpa >= 3.7) { color = 'var(--green)'; bg = 'var(--green-bg)'; bdr = 'var(--green-bdr)' }
  else if (gpa >= 3.0) { color = 'var(--amber)'; bg = 'var(--amber-bg)'; bdr = 'var(--amber-bdr)' }
  else { color = 'var(--red)'; bg = 'var(--red-bg)'; bdr = 'var(--red-bdr)' }
  return (
    <span className={styles.gpaBadge} style={{ color, background: bg, borderColor: bdr }}>
      {gpa.toFixed(2)}
    </span>
  )
}

export function AgeBadge({ age }) {
  return <span className={styles.ageBadge}>{age}</span>
}

export function Spinner() {
  return <div className={styles.spinner} />
}

export function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

export function IconDelete() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  )
}

export function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

export function IconDownload() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

export function IconPlus() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

export function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

export function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 13l4 4L19 7"/>
    </svg>
  )
}

export function IconSort({ active, dir }) {
  if (!active) return <span style={{ color: 'var(--text3)', marginLeft: 4, fontSize: 11 }}>↕</span>
  return <span style={{ color: 'var(--accent-lt)', marginLeft: 4, fontSize: 11 }}>{dir === 'asc' ? '↑' : '↓'}</span>
}
