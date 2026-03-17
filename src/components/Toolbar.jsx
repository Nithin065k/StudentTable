import { DEPARTMENTS } from '../data/students'
import styles from './Toolbar.module.css'

function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function CloseIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}
function DownloadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}
function PlusIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

export default function Toolbar({ search, deptFilter, onSearch, onDept, onClearSearch, onClearDept, onAdd, onExport, resultCount }) {
  const hasFilters = search || deptFilter !== 'All'

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            className={styles.search}
            placeholder="Search by name, email, or department…"
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={onClearSearch}><CloseIcon /></button>
          )}
        </div>

        <div className={styles.selectWrap}>
          <select
            className={`${styles.select} ${deptFilter !== 'All' ? styles.selectActive : ''}`}
            value={deptFilter}
            onChange={e => onDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <span className={styles.selectArrow}>▾</span>
        </div>

        <div className={styles.btnGroup}>
          <button className={styles.btnGhost} onClick={onExport}>
            <DownloadIcon /> Export CSV
          </button>
          <button className={styles.btnPrimary} onClick={onAdd}>
            <PlusIcon /> Add Student
          </button>
        </div>
      </div>

      {hasFilters && (
        <div className={styles.chips}>
          <span className={styles.chipsLabel}>Filters:</span>
          {search && (
            <span className={styles.chip}>
              "{search}"
              <button className={styles.chipX} onClick={onClearSearch}><CloseIcon /></button>
            </span>
          )}
          {deptFilter !== 'All' && (
            <span className={styles.chip}>
              {deptFilter}
              <button className={styles.chipX} onClick={onClearDept}><CloseIcon /></button>
            </span>
          )}
          <span className={styles.resultCount}>{resultCount} result{resultCount !== 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  )
}
