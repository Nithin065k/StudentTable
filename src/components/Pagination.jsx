import styles from './Pagination.module.css'

export default function Pagination({ page, totalPages, filtered, PAGE_SIZE, onPage }) {
  const start = (page - 1) * PAGE_SIZE + 1
  const end   = Math.min(page * PAGE_SIZE, filtered)

  if (filtered === 0) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisible = 5
  let visiblePages = pages
  if (totalPages > maxVisible) {
    const half = Math.floor(maxVisible / 2)
    let s = Math.max(1, page - half)
    let e = s + maxVisible - 1
    if (e > totalPages) { e = totalPages; s = Math.max(1, e - maxVisible + 1) }
    visiblePages = pages.slice(s - 1, e)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.info}>
        <span className={styles.range}>{start}–{end}</span>
        <span className={styles.of}>of {filtered} students</span>
      </div>
      <div className={styles.controls}>
        <NavBtn onClick={() => onPage(1)} disabled={page === 1} label="«" />
        <NavBtn onClick={() => onPage(page - 1)} disabled={page === 1} label="‹" />
        {visiblePages[0] > 1 && <span className={styles.ellipsis}>…</span>}
        {visiblePages.map(p => (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
            onClick={() => onPage(p)}
          >
            {p}
          </button>
        ))}
        {visiblePages[visiblePages.length - 1] < totalPages && <span className={styles.ellipsis}>…</span>}
        <NavBtn onClick={() => onPage(page + 1)} disabled={page === totalPages} label="›" />
        <NavBtn onClick={() => onPage(totalPages)} disabled={page === totalPages} label="»" />
      </div>
    </div>
  )
}

function NavBtn({ onClick, disabled, label }) {
  return (
    <button
      className={styles.navBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
