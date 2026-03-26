import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    await requireAdminSession()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not configured. Contact your administrator.' },
      { status: 500 }
    )
  }

  const formData = await req.formData()
  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Validate file size before uploading
  const MAX_UPLOAD_SIZE = 500 * 1024 * 1024 // 500MB
  if (buffer.length > MAX_UPLOAD_SIZE) {
    return NextResponse.json(
      { error: `File size (${(buffer.length / 1024 / 1024).toFixed(2)}MB) exceeds maximum of 500MB` },
      { status: 413 }
    )
  }

  try {
    // Create FormData for Vercel Blob
    const blobFormData = new FormData()
    const blobFile = new File([buffer], file.name, { type: file.type })
    blobFormData.append('file', blobFile)

    // Upload to Vercel Blob using the correct API
    const uploadRes = await fetch('https://blob.vercel-storage.com/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: blobFormData,
    })

    if (!uploadRes.ok) {
      const responseText = await uploadRes.text()
      console.error('Vercel blob error (status: ' + uploadRes.status + '):', responseText)

      // Handle specific errors
      if (responseText.includes('Body exceeds') || responseText.includes('exceeds max')) {
        return NextResponse.json(
          { error: 'File is too large. Please optimize and try again.' },
          { status: 413 }
        )
      }

      if (uploadRes.status === 405) {
        return NextResponse.json(
          {
            error: 'Blob storage misconfigured',
            details: 'Invalid BLOB_READ_WRITE_TOKEN or wrong endpoint. Check your Vercel project settings.',
          },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { error: 'Blob upload failed', details: responseText },
        { status: Math.min(uploadRes.status, 500) }
      )
    }

    let result
    try {
      result = await uploadRes.json()
    } catch {
      const responseText = await uploadRes.text()
      console.error('Failed to parse blob response as JSON:', responseText)
      return NextResponse.json(
        { error: 'Invalid response from blob storage', details: responseText },
        { status: 502 }
      )
    }
    
    // Extract URL from response (Vercel Blob returns it in different ways)
    const url = result.url || result.blob?.url || result
    
    return NextResponse.json({
      url,
      size: buffer.length,
      type: file.type,
      name: file.name,
    })
  } catch (error: any) {
    console.error('Blob upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Upload failed', details: error?.stack },
      { status: 500 }
    )
  }
}
