import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'
import { handlePrismaError } from '@/lib/validation'

// GET single category
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.courseCategory.findUnique({
      where: { id: params.id },
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
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession()
    const data = await req.json()

    const category = await prisma.courseCategory.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(category)
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}

// DELETE category
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession()
    await prisma.courseCategory.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    const { status, error, details } = handlePrismaError(err)
    return NextResponse.json({ error, details }, { status })
  }
}
