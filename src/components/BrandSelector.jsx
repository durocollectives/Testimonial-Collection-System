const BRANDS = [
  {
    id: 'tobi-yusuf',
    name: 'Tobi Yusuf',
    descriptor: 'Marriage mentor, speaker & relational intelligence advisor.',
  },
  {
    id: 'riah-events',
    name: 'RIAH Events',
    descriptor: 'London luxury wedding planning house for culturally rich couples.',
  },
  {
    id: 'luxury-meets-culture',
    name: 'Luxury Meets Culture',
    descriptor: 'Cultural intelligence training for venues, planners & organisations.',
  },
  {
    id: 'tbx-life-sciences',
    name: 'TBX Life Sciences',
    descriptor: 'Senior-led pharmacovigilance & drug safety operations.',
  },
]

export default function BrandSelector({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Select a brand">
      {BRANDS.map((brand) => {
        const isSelected = selected === brand.name
        return (
          <button
            key={brand.id}
            type="button"
            onClick={() => onChange(brand.name)}
            aria-pressed={isSelected}
            className={[
              'text-left px-4 py-4 sm:px-5 sm:py-5 bg-white rounded-xl',
              'border-[1.5px] transition-colors duration-150 cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-1',
              isSelected
                ? 'border-gold'
                : 'border-[#E8E3DC] hover:border-[#C8C1B8]',
            ].join(' ')}
          >
            <span
              className={[
                'block font-serif text-[0.9375rem] leading-snug mb-1.5 transition-colors duration-150',
                isSelected ? 'text-forest' : 'text-ink',
              ].join(' ')}
            >
              {brand.name}
            </span>
            <span className="block text-[0.75rem] text-muted leading-snug">
              {brand.descriptor}
            </span>
          </button>
        )
      })}
    </div>
  )
}
