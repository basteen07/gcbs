import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdminSession()
    const courses = await prisma.course.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    })
    return NextResponse.json(courses)
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession()
    const data = await req.json()

    // Validate that categoryId exists
    if (!data.categoryId) {
      return NextResponse.json({ error: 'categoryId is required' }, { status: 400 })
    }

    const categoryExists = await prisma.courseCategory.findUnique({
      where: { id: data.categoryId },
    })

    if (!categoryExists) {
      const categories = await prisma.courseCategory.findMany()
      return NextResponse.json(
        {
          error: 'Invalid categoryId',
          message: `Category with ID "${data.categoryId}" does not exist`,
          availableCategories: categories,
        },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({ data, include: { category: true } })
    return NextResponse.json(course, { status: 201 })
  } catch (err: any) {
    if (err.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    if (err.code === 'P2003') return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 })
    console.error('Course creation error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
