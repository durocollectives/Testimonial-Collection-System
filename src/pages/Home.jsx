import { useState } from 'react'
import BrandSelector from '../components/BrandSelector'
import TestimonialForm from '../components/TestimonialForm'
import ThankYou from '../components/ThankYou'

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="w-full max-w-form mx-auto">
          <ThankYou />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Logo bar ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-8">
        <img
          src="/logo.png"
          alt="Tobi Yusuf"
          className="w-11 h-11 rounded-full"
          draggable={false}
        />
      </div>

      {/* ── Hero: heading + photo ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-10 pb-14 sm:pb-16">
        <div className="flex items-start gap-10 sm:gap-16">

          {/* Left: copy */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-[0.6875rem] font-semibold text-gold uppercase tracking-[0.22em] mb-6">
              Testimonials
            </p>
            <h1 className="font-serif text-[2.25rem] sm:text-[2.75rem] text-forest leading-[1.08] mb-5">
              Your words<br />
              <span className="text-ink">mean everything.</span>
            </h1>
            <p className="text-[0.9rem] text-mid leading-[1.8] max-w-[19rem]">
              Share your experience with one of Tobi's brands —
              it takes two minutes and means the world.
            </p>
          </div>

          {/* Right: Tobi's photo — editorial, not hero */}
          <div className="hidden sm:block w-[188px] flex-shrink-0 self-start mt-2">
            <img
              src="/tobi.webp"
              alt="Tobi Yusuf speaking at an event"
              className="w-full h-[264px] object-cover rounded-2xl"
              style={{ objectPosition: '50% 6%' }}
              draggable={false}
            />
          </div>

        </div>
      </div>

      {/* ── Hairline divider ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        <div className="h-px bg-edge" />
      </div>

      {/* ── Form section ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pt-12 pb-24">
        <div className="max-w-form">

          {/* Brand selector */}
          <div className="mb-10" aria-labelledby="brand-label">
            <p
              id="brand-label"
              className="text-[0.6875rem] font-semibold text-forest uppercase tracking-[0.22em] mb-5"
            >
              Select a brand
            </p>
            <BrandSelector selected={selectedBrand} onChange={setSelectedBrand} />
          </div>

          {/* Form */}
          <TestimonialForm brand={selectedBrand} onSuccess={() => setSubmitted(true)} />

        </div>
      </div>

    </div>
  )
}
