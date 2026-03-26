import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { handlePrismaError } from '@/lib/validation'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession()
    const { id } = await params
    const item = await prisma.announcement.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession()
    const { id } = await params
    const data = await req.json()
    const item = await prisma.announcement.update({ where: { id }, data })
    return NextResponse.json(item)
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession()
    const { id } = await params
    await prisma.announcement.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}
