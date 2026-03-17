import styles from './StudentsTable.module.css'

function GpaDisplay({ gpa }) {
  const cls = gpa >= 3.7 ? styles.gpaHigh : gpa >= 3.0 ? styles.gpaMid : styles.gpaLow
  return <span className={`${styles.gpaBadge} ${cls}`}>{gpa.toFixed(2)}</span>
}

function Avatar({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const palettes = [
    { bg: '#ede9fe', color: '#4f46e5', border: '#c4b5fd' },
    { bg: '#dcfce7', color: '#16a34a', border: '#86efac' },
    { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' },
    { bg: '#fef3c7', color: '#b45309', border: '#fcd34d' },
    { bg: '#dbeafe', color: '#2563eb', border: '#93c5fd' },
    { bg: '#f3e8ff', color: '#9333ea', border: '#d8b4fe' },
  ]
  const p = palettes[name.charCodeAt(0) % palettes.length]
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: p.bg, color: p.color,
      border: `2px solid ${p.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, flexShrink: 0, letterSpacing: '0.3px'
    }}>
      {initials}
    </div>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  )
}

function SortIcon({ active, dir }) {
  if (!active) return <span style={{ color: '#c8cee6', marginLeft: 4, fontSize: 11 }}>↕</span>
  return <span style={{ color: '#4f46e5', marginLeft: 4, fontSize: 11 }}>{dir === 'asc' ? '↑' : '↓'}</span>
}

export default function StudentsTable({ pageData, totalStudents, loading, sortKey, sortDir, onSort, onEdit, onDelete }) {
  const cols = [
    { key: 'name',  label: 'Student',    width: undefined },
    { key: 'email', label: 'Email',       width: undefined },
    { key: 'age',   label: 'Age',         width: 90 },
    { key: 'dept',  label: 'Department',  width: undefined },
    { key: 'gpa',   label: 'GPA',         width: 100 },
  ]

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.thead}>
            {cols.map(c => (
              <th
                key={c.key}
                className={`${styles.th} ${sortKey === c.key ? styles.sorted : ''}`}
                style={c.width ? { width: c.width } : undefined}
                onClick={() => onSort(c.key)}
              >
                {c.label}
                <SortIcon active={sortKey === c.key} dir={sortDir} />
              </th>
            ))}
            <th className={styles.th} style={{ width: 100, cursor: 'default' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className={styles.loadingCell}>
                <div className={styles.spinner} />
                <div className={styles.loadingText}>Loading student records…</div>
              </td>
            </tr>
          ) : pageData.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyCell}>
                {totalStudents === 0 ? (
                  <>
                    <div className={styles.emptyEmoji}>🎓</div>
                    <div className={styles.emptyTitle}>No students yet</div>
                    <div className={styles.emptySub}>Click "Add Student" above to enroll your first student</div>
                  </>
                ) : (
                  <>
                    <div className={styles.emptyEmoji}>🔍</div>
                    <div className={styles.emptyTitle}>No results found</div>
                    <div className={styles.emptySub}>Try adjusting your search or department filter</div>
                  </>
                )}
              </td>
            </tr>
          ) : pageData.map((s, i) => (
            <tr
              key={s.id}
              className={styles.row}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <td className={styles.td}>
                <div className={styles.nameCell}>
                  <Avatar name={s.name} />
                  <div>
                    <div className={styles.studentName}>{s.name}</div>
                    <div className={styles.studentId}>ID-{String(s.id).padStart(4, '0')}</div>
                  </div>
                </div>
              </td>
              <td className={styles.td}>
                <span className={styles.monoText}>{s.email}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.ageBadge}>{s.age}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.deptPill}>{s.dept}</span>
              </td>
              <td className={styles.td}>
                <GpaDisplay gpa={s.gpa} />
              </td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button className={styles.editBtn} title="Edit" onClick={() => onEdit(s)}>
                    <EditIcon />
                  </button>
                  <button className={styles.deleteBtn} title="Delete" onClick={() => onDelete(s)}>
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
