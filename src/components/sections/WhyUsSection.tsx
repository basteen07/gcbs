import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import skillIndiaLogo from '../../skill india.jpeg'
import apjLogo from '../../apj.jpeg'

const features = [
  {
    icon: '🔬',
    title: 'Hands-On Cafe Lab',
    desc: 'Train on commercial-grade espresso machines, grinders, and roasters in our fully equipped 3,000 sq ft cafe laboratory.',
  },
  {
    icon: '🌐',
    title: 'International Certification',
    desc: 'Earn globally recognised certifications from Dr. APJ Abdul Kalam International Foundation alongside your diploma.',
  },
  {
    icon: '💼',
    title: 'Job Placement Support',
    desc: '100% employment rate within 6 months of graduation. Our career services team connects you with top café brands.',
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
              <div className="text-xl text-coffee-200 font-bolt">Graduate employment within 12 months</div>
            </div>
            {/* Small accent image */}
           
          </div>

          {/* Right — content */}
          <div>
            <span className="section-label text-2xl">Why Choose GCBS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Where <span>Passion</span> Meets<br />Professionalism
            </h2>
            <p className="text-coffee-200 leading-relaxed mb-8 text-lg">
              At Global Café Business School, we believe that exceptional cafe is both an art and a science.
              Our curriculum blends sensory training, business acumen, and hands-on practice to produce
              graduates who are truly café-ready from day one.
            </p>

            {/* Partner Logos */}
            <div className="flex items-center gap-6 mb-10">
              <div className="bg-espresso-800 px-4 py-3 rounded-lg border border-espresso-600">
                <Image
                  src={skillIndiaLogo}
                  alt="Skill India"
                  width={180}
                  height={72}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
              </div>
              <div className="bg-espresso-800 px-4 py-3 rounded-lg border border-espresso-600">
                <Image
                  src={apjLogo}
                  alt="Dr. APJ Abdul Kalam International Foundation"
                  width={220}
                  height={72}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
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
