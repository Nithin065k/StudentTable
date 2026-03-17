import { useState, useMemo, useRef, useEffect } from 'react'

const PAGE_SIZE      = 7
const STORAGE_KEY    = 'students_data'
const NEXT_ID_KEY    = 'students_next_id'

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function loadNextId() {
  try {
    const raw = localStorage.getItem(NEXT_ID_KEY)
    return raw ? parseInt(raw, 10) : 1
  } catch { return 1 }
}

export function useStudents() {
  const [students, setStudentsRaw] = useState(() => loadStudents())
  const [search, setSearch]        = useState('')
  const [deptFilter, setDeptFilter]= useState('All')
  const [sortKey, setSortKey]      = useState('name')
  const [sortDir, setSortDir]      = useState('asc')
  const [page, setPage]            = useState(1)
  const nextId                     = useRef(loadNextId())

  // Persist every time students change
  const setStudents = (updater) => {
    setStudentsRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const filtered = useMemo(() => {
    let r = [...students]
    const q = search.trim().toLowerCase()
    if (q) r = r.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.dept.toLowerCase().includes(q)
    )
    if (deptFilter !== 'All') r = r.filter(s => s.dept === deptFilter)
    r.sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase() }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ?  1 : -1
      return 0
    })
    return r
  }, [students, search, deptFilter, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const pageData   = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const addStudent = (data) => {
    const id = nextId.current++
    try { localStorage.setItem(NEXT_ID_KEY, String(nextId.current)) } catch {}
    const s = { ...data, id }
    setStudents(p => [s, ...p])
    setPage(1)
    return s
  }

  const updateStudent = (id, data) => {
    setStudents(p => p.map(s => s.id === id ? { ...data, id } : s))
  }

  const deleteStudent = (id) => {
    setStudents(p => p.filter(s => s.id !== id))
    if (pageData.length === 1 && safePage > 1) setPage(p => p - 1)
  }

  const clearSearch  = () => { setSearch('');        setPage(1) }
  const clearDept    = () => { setDeptFilter('All'); setPage(1) }
  const handleSearch = (v) => { setSearch(v);        setPage(1) }
  const handleDept   = (v) => { setDeptFilter(v);    setPage(1) }

  const stats = {
    total:   students.length,
    showing: filtered.length,
    avgGpa:  students.length
      ? (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(2)
      : '0.00',
    depts: [...new Set(students.map(s => s.dept))].length,
  }

  return {
    students, filtered, pageData,
    search, deptFilter, sortKey, sortDir,
    page: safePage, totalPages, PAGE_SIZE,
    toggleSort, setPage,
    addStudent, updateStudent, deleteStudent,
    handleSearch, handleDept, clearSearch, clearDept,
    stats,
  }
}
