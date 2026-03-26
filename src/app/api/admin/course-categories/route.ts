import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

// GET all course categories
export async function GET() {
  try {
    const categories = await prisma.courseCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST create a new course category
export async function POST(req: NextRequest) {
  try {
    await requireAdminSession()
    const { name, slug, description, iconUrl } = await req.json()

    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug are required' }, { status: 400 })
    }

    const category = await prisma.courseCategory.create({
      data: {
        name,
        slug,
        description,
        iconUrl,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Category with this name or slug already exists' }, { status: 409 })
    }
    console.error('Category creation error:', err)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
