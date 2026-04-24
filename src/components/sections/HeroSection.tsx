import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

type HeroData = {
  badge?: string | null
  headline?: string | null
  headlineAccent?: string | null
  subheadline?: string | null
  bodyText?: string | null
  ctaPrimary?: string | null
  ctaPrimaryUrl?: string | null
  ctaSecondary?: string | null
  ctaSecondaryUrl?: string | null
  desktopImageUrl?: string | null
  mobileImageUrl?: string | null
  overlayOpacity?: number
  overlayColor?: string
} | null

export default function HeroSection({ data }: { data: HeroData }) {
  const h = data
  if (!h) return null

  const heroCtas = [
    { label: 'Apply Now', href: '/contact', primary: true },
    { label: 'View Course', href: '/courses', primary: false },
  ]

  return (
    <section className="relative overflow-hidden bg-espresso-950">
      <div className="grid md:grid-cols-5 min-h-half md:min-h-[88vh]">
        <div className="relative order-2 md:order-1 md:col-span-2 bg-espresso-900 text-coffee-100 flex items-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(199,210,254,0.28) 35px, rgba(199,210,254,0.28) 70px)',
            }}
          />
          <div className="relative z-10 w-full px-8 md:px-10 py-12 md:py-16">
            <h2
              className="text-4xl md:text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              DIPLOMA IN CAFE MANAGEMENT
            </h2>
            <p className="text-lg md:text-base text-coffee-200 leading-relaxed mt-3 mb-8">
              Learn the art and science of coffee from industry professionals. Our hands-on training prepares students for careers in cafes, restaurants, hotels, and coffee businesses.
            </p>
            <div className="flex flex-row gap-2 md:gap-4">
              {heroCtas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    cta.primary
                      ? 'btn-primary md:flex-1 justify-center text-sm md:text-base py-2.5 md:py-4 px-4 md:px-10'
                      : 'inline-flex items-center justify-center gap-2 md:flex-1 px-4 md:px-10 py-2.5 md:py-4 rounded-full font-semibold text-white text-sm md:text-base border-2 border-espresso-400 bg-espresso-600 hover:bg-espresso-700 transition-all duration-200'
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative order-1 md:order-2 md:col-span-3 min-h-[42vh] md:min-h-0">
          {(h.desktopImageUrl || h.mobileImageUrl) && (
            <Image
              src={h.desktopImageUrl || h.mobileImageUrl || ''}
              alt="Barista crafting cafe"
              fill
              priority
              quality={100}
              className="object-cover hidden sm:block"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          )}
          {(h.mobileImageUrl || h.desktopImageUrl) && (
            <Image
              src={h.mobileImageUrl || h.desktopImageUrl || ''}
              alt="Barista crafting cafe"
              fill
              priority
              quality={85}
              className="object-cover sm:hidden"
              sizes="100vw"
            />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white hover:text-cream-100 transition-colors hidden md:flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </a>
    </section>
  )
}
