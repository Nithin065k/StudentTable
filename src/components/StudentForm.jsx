import { useState } from 'react'
import { DEPARTMENTS } from '../data/students'
import styles from './StudentForm.module.css'

const EMPTY = { name: '', email: '', age: '', dept: 'Computer Science', gpa: '' }

function validate(form) {
  const e = {}
  if (!form.name.trim()) e.name = 'Full name is required'
  if (!form.email.trim()) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
  if (!form.age) e.age = 'Age is required'
  else if (isNaN(form.age) || +form.age < 16 || +form.age > 60) e.age = 'Age must be 16–60'
  if (!form.dept) e.dept = 'Department is required'
  if (!form.gpa) e.gpa = 'GPA is required'
  else if (isNaN(form.gpa) || +form.gpa < 0 || +form.gpa > 4) e.gpa = 'GPA must be 0.0–4.0'
  return e
}

export default function StudentForm({ initial, onSave, onClose, title }) {
  const [form, setForm]     = useState(initial ? { ...initial, age: String(initial.age), gpa: String(initial.gpa) } : EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const set = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    if (touched[field]) {
      const e = validate({ ...form, [field]: value })
      setErrors(p => ({ ...p, [field]: e[field] }))
    }
  }
  const blur = (field) => {
    setTouched(p => ({ ...p, [field]: true }))
    setErrors(p => ({ ...p, [field]: validate(form)[field] }))
  }
  const submit = () => {
    setTouched({ name:true, email:true, age:true, dept:true, gpa:true })
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length === 0)
      onSave({ ...form, age: +form.age, gpa: +parseFloat(form.gpa).toFixed(2) })
  }

  return (
    <div className={styles.backdrop} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <div className={styles.headerTag}>// student record</div>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className={styles.body}>
          <F label="Full Name" error={errors.name}>
            <input type="text" className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="e.g. Arjun Sharma" value={form.name}
              onChange={e => set('name', e.target.value)} onBlur={() => blur('name')} autoFocus />
          </F>
          <F label="Email Address" error={errors.email}>
            <input type="email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="student@university.edu" value={form.email}
              onChange={e => set('email', e.target.value)} onBlur={() => blur('email')} />
          </F>
          <div className={styles.row}>
            <F label="Age" error={errors.age}>
              <input type="number" className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
                placeholder="e.g. 21" value={form.age} min={16} max={60}
                onChange={e => set('age', e.target.value)} onBlur={() => blur('age')} />
            </F>
            <F label="GPA" error={errors.gpa}>
              <input type="number" className={`${styles.input} ${errors.gpa ? styles.inputError : ''}`}
                placeholder="e.g. 3.7" value={form.gpa} min={0} max={4} step={0.01}
                onChange={e => set('gpa', e.target.value)} onBlur={() => blur('gpa')} />
            </F>
          </div>
          <F label="Department" error={errors.dept}>
            <div className={styles.selectWrap}>
              <select className={`${styles.input} ${styles.select} ${errors.dept ? styles.inputError : ''}`}
                value={form.dept} onChange={e => set('dept', e.target.value)}>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <span className={styles.selectArrow}>▾</span>
            </div>
          </F>
        </div>

        <div className={styles.footer}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button className={styles.btnSave} onClick={submit}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
            Save Student
          </button>
        </div>
      </div>
    </div>
  )
}

function F({ label, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <div className={styles.fieldError}>⚠ {error}</div>}
    </div>
  )
}
