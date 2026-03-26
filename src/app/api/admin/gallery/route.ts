import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { validateRequired, validateEnum, handlePrismaError } from '@/lib/validation'

const GALLERY_CATEGORIES = ['COURSES', 'CAMPUS', 'EVENTS', 'STUDENT_WORK']

export async function GET() {
  try {
    await requireAdminSession()
    const items = await prisma.galleryImage.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(items)
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession()
    const data = await req.json()

    // Validate required fields
    const errors = validateRequired(data, ['desktopUrl', 'mobileUrl'])
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    // Validate category if provided
    if (data.category && !GALLERY_CATEGORIES.includes(data.category)) {
      return NextResponse.json(
        { error: 'Validation failed', details: [{ field: 'category', message: `category must be one of: ${GALLERY_CATEGORIES.join(', ')}` }] },
        { status: 400 }
      )
    }

    const item = await prisma.galleryImage.create({ data })
    return NextResponse.json(item, { status: 201 })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

