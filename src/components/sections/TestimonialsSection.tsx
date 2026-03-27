import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

type Testimonial = {
  id: string
  name: string
  role?: string | null
  courseTitle?: string | null
  quote: string
  rating: number
  photoDesktop?: string | null
}



function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'fill-espresso-400 text-espresso-400' : 'text-coffee-200'} />
      ))}
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] }) {
  const items = testimonials || []
  if (items.length === 0) return null

  return (
    <section className="section-padding bg-cream-100 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-espresso-500/10 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-espresso-500/10 translate-y-1/3 -translate-x-1/4" />

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-espresso-400 mb-3">
            Student Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-coffee-950" style={{ fontFamily: 'var(--font-playfair)' }}>
            Lives Transformed by <span className="text-espresso-400 italic">Coffee</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.id} className="group bg-white border border-coffee-200 rounded-2xl p-6 hover:border-espresso-400 hover:shadow-lg transition-all duration-300">
              {/* Quote icon */}
              <Quote size={28} className="text-espresso-500/40 mb-4" />

              {/* Rating */}
              <Stars rating={t.rating} />

              {/* Quote */}
              <p className="mt-4 text-coffee-700 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-coffee-200">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-coffee-100 shrink-0">
                  {t.photoDesktop && (
                    <Image src={t.photoDesktop} alt={t.name} fill className="object-cover" sizes="44px" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-coffee-950">{t.name}</div>
                  {t.role && <div className="text-xs text-coffee-600">{t.role}</div>}
                  {t.courseTitle && (
                    <div className="text-xs text-espresso-600 mt-0.5">{t.courseTitle}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
