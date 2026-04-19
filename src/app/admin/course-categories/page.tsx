'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  description?: string | null
  iconUrl?: string | null
  sortOrder: number
}

export default function CourseCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    iconUrl: '',
    sortOrder: 0,
  })
  const [error, setError] = useState('')

  const fetch_ = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/course-categories')
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch {
      setCategories([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetch_()
  }, [])

  const openEdit = (c: Category) => {
    setEditing(c)
    setForm({ name: c.name, slug: c.slug, description: c.description || '', iconUrl: c.iconUrl || '', sortOrder: c.sortOrder })
    setShowForm(true)
    setError('')
  }

  const handleSave = async () => {
    setError('')
    if (!form.name.trim() || !form.slug.trim()) {
      setError('Name and slug are required')
      return
    }

    const url = editing ? `/api/admin/course-categories/${editing.id}` : '/api/admin/course-categories'
    const method = editing ? 'PATCH' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setShowForm(false)
      setEditing(null)
      setForm({ name: '', slug: '', description: '', iconUrl: '', sortOrder: 0 })
      fetch_()
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to save category')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return
    const res = await fetch(`/api/admin/course-categories/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetch_()
    } else {
      alert('Failed to delete category')
    }
  }

  const F = (k: string) => (e: any) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  // Auto-generate slug from name
  const handleNameChange = (e: any) => {
    const name = e.target.value
    setForm((f) => ({
      ...f,
      name,
      slug: f.slug === f.name.toLowerCase().replace(/\s+/g, '-') || f.slug === '' 
        ? name.toLowerCase().replace(/\s+/g, '-') 
        : f.slug,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            Course Categories
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage course categories and subcategories</p>
        </div>
        <button
          onClick={() => {
            setEditing(null)
            setForm({ name: '', slug: '', description: '', iconUrl: '', sortOrder: 0 })
            setShowForm(true)
            setError('')
          }}
          className="btn-primary text-sm py-2.5 px-5"
        >
          <Plus size={15} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Name', 'Slug', 'Description', 'Sort Order', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No categories yet.
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">{c.name}</td>
                    <td className="px-5 py-4 text-gray-600">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">{c.slug}</code>
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-sm">{c.description || '—'}</td>
                    <td className="px-5 py-4 text-gray-600">{c.sortOrder}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit' : 'Add'} Category</h2>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
              <div>
                <label className="form-label">Category Name *</label>
                <input 
                  value={form.name} 
                  onChange={handleNameChange} 
                  className="form-input" 
                  placeholder="e.g., Cafe Brewing"
                />
              </div>
              <div>
                <label className="form-label">URL Slug *</label>
                <input 
                  value={form.slug} 
                  onChange={F('slug')} 
                  className="form-input" 
                  placeholder="e.g., coffee-brewing"
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea 
                  value={form.description} 
                  onChange={F('description')} 
                  rows={3} 
                  className="form-input resize-none" 
                  placeholder="Brief description of the category"
                />
              </div>
              <div>
                <label className="form-label">Icon URL (optional)</label>
                <input 
                  value={form.iconUrl} 
                  onChange={F('iconUrl')} 
                  className="form-input" 
                  placeholder="https://example.com/icon.png"
                />
              </div>
              <div>
                <label className="form-label">Sort Order</label>
                <input 
                  type="number" 
                  value={form.sortOrder} 
                  onChange={F('sortOrder')} 
                  className="form-input" 
                />
              </div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-ghost">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                {editing ? 'Save' : 'Add'} Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
