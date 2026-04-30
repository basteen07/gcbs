import Image from 'next/image'
import Link from 'next/link'
import { Clock, Award, ArrowRight } from 'lucide-react'

type Course = {
  id: string
  title: string
  slug: string
  tagline?: string | null
  duration: string
  level: string
  thumbnailDesktop?: string | null
  thumbnailMobile?: string | null
  localFee?: any
  currency?: string
  category: { name: string }
}

const levelLabels: Record<string, string> = {
  CERTIFICATE: 'Certificate',
  DIPLOMA: 'Diploma',
  ADVANCED_DIPLOMA: 'Advanced Diploma',
  HIGHER_DIPLOMA: 'Higher Diploma',
  POSTGRADUATE_DIPLOMA: 'Postgraduate Diploma',
}

const levelColors: Record<string, string> = {
  CERTIFICATE: 'bg-espresso-600 text-white',
  DIPLOMA: 'bg-espresso-500 text-white',
  ADVANCED_DIPLOMA: 'bg-coffee-700 text-white',
  HIGHER_DIPLOMA: 'bg-espresso-700 text-white',
  POSTGRADUATE_DIPLOMA: 'bg-coffee-800 text-white',
}

export default function CoursesSection({ courses }: { courses?: Course[] }) {
  const items = courses || []
  if (items.length === 0) return null

  return (
    <section className="section-padding bg-espresso-900">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Our Programmes</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Craft Your <span>Cafe Career</span>
          </h2>
          <p className="mt-4 text-coffee-200 text-lg max-w-2xl mx-auto">
            Industry-aligned programmes designed with leading café operators.
            From barista fundamentals to full business management.
          </p>
        </div>

        {/* Grid - Single column centered full width cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {items.map((course) => (
            <article key={course.id} className="group bg-espresso-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 card-hover border border-espresso-600">
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="relative h-64 md:h-auto md:w-72 overflow-hidden bg-coffee-200 shrink-0">
                  {course.thumbnailDesktop && (
                    <Image
                      src={course.thumbnailDesktop}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
                  {/* Level badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${levelColors[course.level] || 'bg-espresso-600 text-white'}`}>
                      {levelLabels[course.level] || course.level}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="text-xs text-espresso-500 font-semibold uppercase tracking-widest mb-2">
                    {course.category.name}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-coffee-100 transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {course.title}
                  </h3>
                  {course.tagline && (
                    <p className="text-sm text-coffee-200 leading-relaxed mb-4">{course.tagline}</p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-6 text-sm text-coffee-300 mb-5">
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {course.duration}
                    </span>
                    {course.localFee && (
                      <span className="flex items-center gap-2">
                        <Award size={16} />
                        {course.currency} {Number(course.localFee).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-2 text-coffee-100 text-sm font-semibold hover:gap-3 transition-all duration-200 group/link self-start"
                  >
                    Learn More
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <Link href="/courses" className="btn-secondary">
            View All Programmes
          </Link>
        </div>
      </div>
    </section>
  )
}
