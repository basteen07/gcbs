type Stat = { id: string; label: string; value: string; icon?: string | null }

export default function StatsSection({ stats }: { stats?: Stat[] }) {
  const items = stats || []
  if (items.length === 0) return null

  return (
    <section id="stats" className="bg-white py-16 relative overflow-hidden text-coffee-900">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(125,81,48,0.2) 35px, rgba(125,81,48,0.2) 70px)`,
        }}
      />
      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((stat, i) => (
            <div key={stat.id} className="text-center group">
              {stat.icon && (
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              )}
              <div
                className="text-4xl md:text-5xl font-bold text-coffee-950 mb-2"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-coffee-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
