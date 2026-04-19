import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: '🔬',
    title: 'Hands-On Cafe Lab',
    desc: 'Train on commercial-grade espresso machines, grinders, and roasters in our fully equipped 3,000 sq ft cafe laboratory.',
  },
  {
    icon: '👨‍🏫',
    title: 'Industry Expert Faculty',
    desc: 'Learn from World Barista Championship competitors, café owners, and F&B industry veterans with 15+ years experience.',
  },
  {
    icon: '🌐',
    title: 'International Certification',
    desc: 'Earn globally recognised certifications from SCA (Specialty Coffee Association) alongside your diploma.',
  },
  {
    icon: '💼',
    title: 'Job Placement Support',
    desc: '98% employment rate within 6 months of graduation. Our career services team connects you with top café brands.',
  },
]

const highlights = []

export default function WhyUsSection() {
  return (
    <section className="section-padding bg-espresso-900">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — images collage */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden h-96 lg:h-[500px] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=900&q=85"
                alt="Students in cafe lab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/50 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-6 bg-espresso-700 rounded-2xl shadow-2xl p-5 max-w-[200px] border border-espresso-500">
              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>98%</div>
              <div className="text-xs text-coffee-200 font-medium">Graduate employment within 6 months</div>
            </div>
            {/* Small accent image */}
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-espresso-500 hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=80"
                alt="Latte art"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span className="section-label text-2xl">Why Choose GCBS</span>
            <h2 className="section-title text-5xl md:text-6xl mb-6">
              Where <span>Passion</span> Meets<br />Professionalism
            </h2>
            <p className="text-coffee-200 leading-relaxed mb-8 text-lg">
              At Global Café Business School, we believe that exceptional cafe is both an art and a science.
              Our curriculum blends sensory training, business acumen, and hands-on practice to produce
              graduates who are truly café-ready from day one.
            </p>

            {/* Partner Logos */}
            <div className="flex items-center gap-6 mb-10">
              <div className="text-4xl font-bold text-white bg-espresso-800 px-4 py-2 rounded-lg">
                Skill India
              </div>
              <div className="text-lg font-bold text-white bg-espresso-800 px-4 py-2 rounded-lg">
                Dr. APJ Abdul Kalam<br/>International Foundation
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.slice(0, 4).map((f) => (
                <div key={f.title} className="group p-4 rounded-xl border border-espresso-600 bg-espresso-800 hover:border-espresso-400 hover:bg-espresso-700 transition-all duration-200">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-coffee-200 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom features row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(4).map((f) => (
            <div key={f.title} className="flex gap-4 p-6 rounded-2xl bg-espresso-800 hover:bg-espresso-700 transition-colors duration-200 border border-espresso-600">
              <div className="text-3xl shrink-0">{f.icon}</div>
              <div>
                <div className="font-bold text-white mb-1">{f.title}</div>
                <div className="text-sm text-coffee-200 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
