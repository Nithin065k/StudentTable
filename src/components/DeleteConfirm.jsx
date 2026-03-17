import styles from './DeleteConfirm.module.css'

export default function DeleteConfirm({ student, onConfirm, onClose }) {
  return (
    <div className={styles.backdrop} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </div>
        <div className={styles.tag}>// confirm deletion</div>
        <h3 className={styles.title}>Remove Student?</h3>
        <p className={styles.desc}>
          This will permanently delete <strong style={{ color: '#0f1124' }}>{student.name}</strong> from the academic records. This action cannot be undone.
        </p>
        <div className={styles.studentCard}>
          <div className={styles.cardEmail}>{student.email}</div>
          <div className={styles.cardMeta}>{student.dept} · Age {student.age} · GPA {student.gpa.toFixed(2)}</div>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnKeep} onClick={onClose}>Keep Student</button>
          <button className={styles.btnDelete} onClick={onConfirm}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  )
}
