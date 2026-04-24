import Link from 'next/link'

export default function FounderSection() {
  return (
    <section id="founder" className="section-padding bg-espresso-900">
      <div className="container-main">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <span className="section-label">Founder</span>
            <h2 className="section-title mb-4">
              DAVID MANOHAR <span>LANKA</span>
            </h2>
            <p className="text-coffee-200 text-lg leading-relaxed">
              David Manohar - Pioneer of South India&apos;s F&amp;B Franchise Revolution
            </p>

            <div className="mt-8 rounded-2xl border border-espresso-600 bg-espresso-800 p-6">
              <p className="text-sm text-coffee-300">Founder image will be added here.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-espresso-600 bg-espresso-800 p-6 md:p-8 space-y-5">
              <p className="text-coffee-100 leading-relaxed">
                David Manohar is a visionary entrepreneur and franchising expert with over 20 years of global hospitality experience across India, London, and Dubai. A Hotel Management graduate from Greenwich University, he has worked with leading hotel groups like The Park, Choice Group, and Ramada.
              </p>

              <p className="text-coffee-100 leading-relaxed">
                He founded successful brands like Mad Fries, We Chai, We Crunch, Milky Ma and Rollex Coffee, all built on a foundation of delivering high-quality offerings at accessible price points. He is widely recognized for pioneering the affordable luxury model in the food and beverage industry, redefining value-driven dining experiences.
              </p>

              <p className="text-coffee-100 leading-relaxed">
                Beyond business, he founded the Cafe Management Institute, mentoring aspiring entrepreneurs in cafe operations and hospitality.
              </p>

              <p className="text-coffee-100 leading-relaxed">
                David Manohar is a leader shaping the future of scalable, affordable F&amp;B.
              </p>

              <div className="pt-2">
                <Link href="/contact" className="btn-primary">
                  Connect With Founder Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
