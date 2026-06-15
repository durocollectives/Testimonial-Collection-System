const BRANDS = [
  {
    id: 'tobi-yusuf',
    name: 'Tobi Yusuf',
    descriptor: 'Marriage mentor, speaker & relational intelligence advisor.',
    domain: 'tobiyusuf.com',
  },
  {
    id: 'riah-events',
    name: 'RIAH Events',
    descriptor: 'London luxury wedding planning house for culturally rich couples.',
    domain: 'riahevents.com',
  },
  {
    id: 'luxury-meets-culture',
    name: 'Luxury Meets Culture',
    descriptor: 'Cultural intelligence training for venues, planners & organisations.',
    domain: '',
  },
  {
    id: 'tbx-life-sciences',
    name: 'TBX Life Sciences',
    descriptor: 'Senior-led pharmacovigilance & drug safety operations.',
    domain: 'tbxlifesciences.com',
  },
]

export default function BrandSelector({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3" role="group" aria-label="Select a brand">
      {BRANDS.map((brand) => {
        const isSelected = selected === brand.name
        return (
          <button
            key={brand.id}
            type="button"
            onClick={() => onChange(brand.name)}
            aria-pressed={isSelected}
            className={[
              'text-left p-5 bg-white rounded-card shadow-card',
              'transition-all duration-150 cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
              isSelected
                ? 'border-2 border-gold ring-2 ring-gold/20'
                : 'border border-edge hover:border-forest/30 hover:shadow-card-hover',
            ].join(' ')}
          >
            <span className="block font-serif text-forest text-[1rem] leading-snug mb-2">
              {brand.name}
            </span>
            <span className="block text-[0.8125rem] text-mid leading-snug">
              {brand.descriptor}
            </span>
            {brand.domain && (
              <span className="block text-[0.75rem] text-muted mt-3 tracking-wide">
                {brand.domain}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
