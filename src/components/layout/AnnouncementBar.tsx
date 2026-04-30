import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { X } from 'lucide-react'

export default async function AnnouncementBar() {
  let announcement = null
  try {
    announcement = await prisma.announcement.findFirst({
      where: {
        isActive: true,
        OR: [{ endsAt: null }, { endsAt: { gt: new Date() } }],
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    // Fallback when DB not ready
    announcement = {
      message: '🎓 JULY 2026 intake now open — Limited seats available!',
      ctaLabel: 'Apply Now',
      ctaUrl: '/contact',
      bgColor: '#c8860a',
      textColor: '#ffffff',
    }
  }

  if (!announcement) return null

  return (
    <div
      className="w-full py-3 px-4 text-center text-base md:text-lg font-bold relative"
      style={{ background: announcement.bgColor, color: announcement.textColor }}
    >
      <span>{announcement.message}</span>
      {announcement.ctaLabel && announcement.ctaUrl && (
        <Link
          href={announcement.ctaUrl}
          className="ml-3 underline font-bold hover:opacity-80 transition-opacity"
        >
          {announcement.ctaLabel} →
        </Link>
      )}
    </div>
  )
}
