import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 120

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({ orderBy: { key: 'asc' } })
    const map = settings.reduce<Record<string, string>>((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {})

    return NextResponse.json(map, {
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=120, stale-while-revalidate=300',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
