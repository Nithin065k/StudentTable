import { useState, useEffect } from 'react'
import { useStudents }    from './hooks/useStudents'
import { useToast }       from './hooks/useToast'
import StatsBar           from './components/StatsBar'
import Toolbar            from './components/Toolbar'
import StudentsTable      from './components/StudentsTable'
import Pagination         from './components/Pagination'
import StudentForm        from './components/StudentForm'
import DeleteConfirm      from './components/DeleteConfirm'
import ToastContainer     from './components/Toast'
import styles             from './App.module.css'

export default function App() {
  const [loading, setLoading]       = useState(true)
  const [showAdd, setShowAdd]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [delTarget, setDelTarget]   = useState(null)

  const { toasts, show, dismiss } = useToast()

  const {
    students, filtered, pageData,
    search, deptFilter, sortKey, sortDir,
    page, totalPages, PAGE_SIZE,
    toggleSort, setPage,
    addStudent, updateStudent, deleteStudent,
    handleSearch, handleDept, clearSearch, clearDept,
    stats,
  } = useStudents()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(t)
  }, [])

  const handleAdd = (data) => {
    const s = addStudent(data)
    setShowAdd(false)
    show(`${s.name} enrolled successfully`, 'success')
  }

  const handleEdit = (data) => {
    updateStudent(editTarget.id, data)
    setEditTarget(null)
    show(`${data.name} updated`, 'info')
  }

  const handleDelete = () => {
    const name = delTarget.name
    deleteStudent(delTarget.id)
    setDelTarget(null)
    show(`${name} removed from records`, 'error')
  }

  const handleExport = () => {
    const header = ['Name', 'Email', 'Age', 'Department', 'GPA']
    const rows   = filtered.map(s => [s.name, s.email, s.age, s.dept, s.gpa.toFixed(2)])
    const csv    = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob   = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url    = URL.createObjectURL(blob)
    const a      = document.createElement('a')
    a.href = url
    a.download = `students_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    show(`Exported ${filtered.length} student${filtered.length !== 1 ? 's' : ''} to CSV`, 'success')
  }

  return (
    <div className={styles.app}>

      <div className={styles.headerWrap}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <div className={styles.headerEyebrow}>
              <span className={styles.headerDot} />
              <span className={styles.mono}>Academic Records System</span>
            </div>
            <h1 className={styles.brand}>Student Management</h1>
            <p className={styles.brandSub}>
              Manage enrollments, track performance &amp; export reports
            </p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerBadge}>
              <div className={styles.headerBadgeIcon}>🎓</div>
              <div>
                <div className={styles.headerBadgeText}>{stats.total} Students</div>
                <div className={styles.headerBadgeLabel}>Avg GPA {stats.avgGpa}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.inner}>

        <StatsBar stats={stats} />

        <Toolbar
          search={search}
          deptFilter={deptFilter}
          onSearch={handleSearch}
          onDept={handleDept}
          onClearSearch={clearSearch}
          onClearDept={clearDept}
          onAdd={() => setShowAdd(true)}
          onExport={handleExport}
          resultCount={filtered.length}
        />

        <StudentsTable
          pageData={pageData}
          loading={loading}
          sortKey={sortKey}
          sortDir={sortDir}
          totalStudents={students.length}
          onSort={toggleSort}
          onEdit={setEditTarget}
          onDelete={setDelTarget}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          filtered={filtered.length}
          PAGE_SIZE={PAGE_SIZE}
          onPage={setPage}
        />

      </div>

      {showAdd && (
        <StudentForm
          title="Enroll New Student"
          onSave={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editTarget && (
        <StudentForm
          title="Edit Student"
          initial={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
      {delTarget && (
        <DeleteConfirm
          student={delTarget}
          onConfirm={handleDelete}
          onClose={() => setDelTarget(null)}
        />
      )}

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  )
}
