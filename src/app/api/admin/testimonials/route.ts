import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { validateRequired, validateNumber, handlePrismaError } from '@/lib/validation'

export async function GET() {
  try {
    await requireAdminSession()
    const items = await prisma.testimonial.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
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
    const errors = validateRequired(data, ['name', 'quote'])
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    // Validate rating if provided
    if (data.rating !== undefined) {
      const ratingError = validateNumber(data.rating, 'rating', { min: 1, max: 5 })
      if (ratingError) {
        return NextResponse.json({ error: 'Validation failed', details: [ratingError] }, { status: 400 })
      }
    }

    const item = await prisma.testimonial.create({ data })
    return NextResponse.json(item, { status: 201 })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}
