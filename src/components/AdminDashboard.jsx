import { useState, useEffect } from 'react'

const BRANDS = [
  'All',
  'Tobi Yusuf',
  'RIAH Events',
  'Luxury Meets Culture',
  'TBX Life Sciences',
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function TestimonialCard({ t }) {
  return (
    <div className="bg-white border border-edge rounded-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[0.8125rem] font-semibold text-ink">{t.reviewer}</p>
          <p className="text-[0.75rem] text-mid mt-0.5">{t.brand}</p>
        </div>
        <p className="text-[0.75rem] text-muted whitespace-nowrap">{formatDate(t.created_at)}</p>
      </div>
      {t.celebration_type && (
        <p className="text-[0.75rem] text-gold font-medium mb-2">{t.celebration_type}</p>
      )}
      <p className="text-[0.8125rem] text-ink leading-relaxed">{t.message}</p>
    </div>
  )
}

export default function AdminDashboard({ onLogout }) {
  const [testimonials, setTestimonials] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const auth = sessionStorage.getItem('admin-auth') || ''
        const response = await fetch('/api/admin-testimonials', {
          headers: { 'x-admin-password': auth },
        })
        if (response.status === 401) throw new Error('unauthorized')
        if (!response.ok) throw new Error('fetch-failed')
        const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        setError(
          err.message === 'unauthorized'
            ? 'Session expired. Please log in again.'
            : 'Unable to load testimonials. Please try refreshing.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const filtered =
    activeFilter === 'All'
      ? testimonials
      : testimonials.filter((t) => t.brand === activeFilter)

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-dashboard mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-section text-forest">Testimonials</h1>
          <button
            onClick={onLogout}
            className="text-label text-mid hover:text-ink cursor-pointer transition-colors duration-150"
          >
            Log out
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by brand">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveFilter(brand)}
              aria-pressed={activeFilter === brand}
              className={[
                'px-4 py-2 rounded-full text-label font-medium cursor-pointer',
                'transition-colors duration-150 focus:outline-none',
                'focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-1',
                activeFilter === brand
                  ? 'bg-forest text-white'
                  : 'bg-white border border-edge text-mid hover:border-forest/40 hover:text-forest',
              ].join(' ')}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-muted text-body">Loading…</div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-20 text-center text-red-500 text-body">{error}</div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-body text-mid">
              No testimonials yet. Share your link and they will appear here.
            </p>
          </div>
        )}

        {/* Mobile: cards */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="flex flex-col gap-3 md:hidden">
              {filtered.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block bg-white border border-edge rounded-card shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-edge">
                      <th className="text-left px-6 py-4 text-label font-semibold text-ink w-32 whitespace-nowrap">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 text-label font-semibold text-ink w-44">
                        Brand
                      </th>
                      <th className="text-left px-6 py-4 text-label font-semibold text-ink w-36">
                        Name
                      </th>
                      <th className="text-left px-6 py-4 text-label font-semibold text-ink w-40">
                        Celebration
                      </th>
                      <th className="text-left px-6 py-4 text-label font-semibold text-ink">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t, i) => (
                      <tr
                        key={t.id}
                        className={i < filtered.length - 1 ? 'border-b border-edge' : ''}
                      >
                        <td className="px-6 py-4 text-[0.8125rem] text-mid whitespace-nowrap">
                          {formatDate(t.created_at)}
                        </td>
                        <td className="px-6 py-4 text-[0.8125rem] text-ink">
                          {t.brand}
                        </td>
                        <td className="px-6 py-4 text-[0.8125rem] text-ink whitespace-nowrap">
                          {t.reviewer}
                        </td>
                        <td className="px-6 py-4 text-[0.8125rem] text-mid whitespace-nowrap">
                          {t.celebration_type || <span className="text-muted">—</span>}
                        </td>
                        <td className="px-6 py-4 text-[0.8125rem] text-ink leading-relaxed max-w-xs">
                          {t.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
