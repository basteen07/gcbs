'use client'

import { useState } from 'react'
import { uploadBlob } from '@/lib/blob'
import { CloudUpload } from 'lucide-react'

type Props = {
  label: string
  value?: string | null
  onChange: (url: string) => void
  placeholder?: string
  required?: boolean
}

export default function ImageUploadField({ label, value, onChange, placeholder, required }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Validate file size on client
    const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds 500MB limit`)
      return
    }

    // Warn if file is large
    if (file.size > 50 * 1024 * 1024) { // 50MB
      console.warn(`Large file detected (${(file.size / 1024 / 1024).toFixed(2)}MB). Compression will be applied.`)
    }

    setUploading(true)

    try {
      const uploadedUrl = await uploadBlob(file)
      onChange(uploadedUrl)
      setError(null)
    } catch (err: any) {
      console.error(err)
      const errorMessage = err?.message || 'Upload failed'
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="form-label">
        {label}{required ? ' *' : ''}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || 'https://...'}
          className="form-input flex-1"
        />
        <label className="btn-secondary flex items-center gap-1" title="Upload from local file">
          <CloudUpload size={14} />
          <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
        </label>
      </div>
      {uploading && (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
          <p className="text-xs text-blue-600">Uploading image (compressing if needed)...</p>
        </div>
      )}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {value && (
        <img src={value} alt={label} className="mt-2 h-24 w-full object-cover rounded-lg border" />
      )}
    </div>
  )
}
