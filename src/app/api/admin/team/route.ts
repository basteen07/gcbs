import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { validateRequired, handlePrismaError } from '@/lib/validation'

export async function GET() {
  try {
    await requireAdminSession()
    const items = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })
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
    const errors = validateRequired(data, ['name', 'title'])
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 })
    }

    const item = await prisma.teamMember.create({ data })
    return NextResponse.json(item, { status: 201 })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

