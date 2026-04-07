import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 120

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      select: { id: true, title: true, slug: true, isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    })
    return NextResponse.json(courses, {
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=120, stale-while-revalidate=300',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
