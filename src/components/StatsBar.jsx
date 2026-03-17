import styles from './StatsBar.module.css'

const CARDS = [
  {
    key: 'total',
    label: 'Total Students',
    icon: '👥',
    accent: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
    iconBg: '#ede9fe',
    trendColor: '#4f46e5', trendBg: '#ede9fe', trendBorder: '#c4b5fd',
    trend: 'Enrolled',
  },
  {
    key: 'showing',
    label: 'Currently Shown',
    icon: '🔎',
    accent: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
    iconBg: '#e0f2fe',
    trendColor: '#0369a1', trendBg: '#e0f2fe', trendBorder: '#7dd3fc',
    trend: 'Filtered',
  },
  {
    key: 'avgGpa',
    label: 'Average GPA',
    icon: '📈',
    accent: 'linear-gradient(90deg, #16a34a, #22c55e)',
    iconBg: '#dcfce7',
    trendColor: '#15803d', trendBg: '#dcfce7', trendBorder: '#86efac',
    trend: '/ 4.0',
  },
  {
    key: 'depts',
    label: 'Departments',
    icon: '🏛️',
    accent: 'linear-gradient(90deg, #9333ea, #a855f7)',
    iconBg: '#f3e8ff',
    trendColor: '#7e22ce', trendBg: '#f3e8ff', trendBorder: '#d8b4fe',
    trend: 'Active',
  },
]

export default function StatsBar({ stats }) {
  return (
    <div className={styles.grid}>
      {CARDS.map(c => (
        <div key={c.key} className={styles.card}>
          <div className={styles.accentBar} style={{ background: c.accent }} />
          <div className={styles.iconRow}>
            <div className={styles.iconBox} style={{ background: c.iconBg }}>
              {c.icon}
            </div>
            <span
              className={styles.trend}
              style={{ color: c.trendColor, background: c.trendBg, borderColor: c.trendBorder }}
            >
              {c.trend}
            </span>
          </div>
          <div className={styles.num}>{stats[c.key]}</div>
          <div className={styles.label}>{c.label}</div>
        </div>
      ))}
    </div>
  )
}
