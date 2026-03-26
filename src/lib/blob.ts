export type BlobUploadResult = {
  id: string
  size: number
  url: string
  createdAt?: string
  updatedAt?: string
}

// Compress image before upload if it exceeds 5MB
async function compressImage(file: File): Promise<File> {
  if (file.size <= 5 * 1024 * 1024) return file // Return as-is if under 5MB

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Scale down if larger than 2000px on longest side
        const maxDimension = 2000
        if (width > height) {
          if (width > maxDimension) {
            height = (height * maxDimension) / width
            width = maxDimension
          }
        } else {
          if (height > maxDimension) {
            width = (width * maxDimension) / height
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() })
              resolve(compressedFile)
            } else {
              resolve(file)
            }
          },
          'image/jpeg',
          0.85 // 85% quality
        )
      }
    }
  })
}

export async function uploadBlob(file: File): Promise<string> {
  // Validate file size
  const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum of 500MB`)
  }

  // Compress image if needed
  let uploadFile = file
  if (file.type.startsWith('image/')) {
    uploadFile = await compressImage(file)
  }

  const formData = new FormData()
  formData.append('file', uploadFile)

  const res = await fetch('/api/admin/blob', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    // Read response body once (can only be read once)
    const responseText = await res.text()
    
    try {
      const errorData = JSON.parse(responseText)
      throw new Error(errorData.error || `Upload failed (${res.status})`)
    } catch {
      throw new Error(responseText || `Upload failed (${res.status})`)
    }
  }

  const data = (await res.json()) as BlobUploadResult
  if (!data?.url) throw new Error('Invalid blob upload response')
  return data.url
}
