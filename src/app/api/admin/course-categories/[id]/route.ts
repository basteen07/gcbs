import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { handlePrismaError } from '@/lib/validation'

type RouteContext = { params: Promise<{ id: string }> }

// GET single category
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    const category = await prisma.courseCategory.findUnique({
      where: { id },
    })
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    return NextResponse.json(category)
  } catch (err: any) {
    const { status, error } = handlePrismaError(err)
    return NextResponse.json({ error }, { status })
  }
}

// PATCH update category
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdminSession()
    const { id } = await params
    const data = await req.json()

    const category = await prisma.courseCategory.update({
      where: { id },
      data,
    })
    return NextResponse.json(category)
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

// DELETE category
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    await requireAdminSession()
    const { id } = await params
    await prisma.courseCategory.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}
