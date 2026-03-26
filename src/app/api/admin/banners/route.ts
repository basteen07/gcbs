import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { validateRequired, handlePrismaError } from '@/lib/validation'

const BANNER_PLACEMENTS = ['HOME_TOP', 'HOME_MIDDLE', 'HOME_BOTTOM', 'COURSES_TOP', 'CONTACT_TOP']

// ─── GET /api/admin/banners ───────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await requireAdminSession()
    const banners = await prisma.banner.findMany({
      orderBy: [{ placement: 'asc' }, { sortOrder: 'asc' }],
    })
    return NextResponse.json(banners)
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

// ─── POST /api/admin/banners ──────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    await requireAdminSession()
    const data = await req.json()

    // Validate required fields
    const errors = validateRequired(data, ['title'])
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    // Validate placement if provided
    if (data.placement && !BANNER_PLACEMENTS.includes(data.placement)) {
      return NextResponse.json(
        { error: 'Validation failed', details: [{ field: 'placement', message: `placement must be one of: ${BANNER_PLACEMENTS.join(', ')}` }] },
        { status: 400 }
      )
    }

    const banner = await prisma.banner.create({ data })
    return NextResponse.json(banner, { status: 201 })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}
