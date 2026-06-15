import { useState } from 'react'
import BrandSelector from '../components/BrandSelector'
import TestimonialForm from '../components/TestimonialForm'
import ThankYou from '../components/ThankYou'

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-form mx-auto">
          <ThankYou />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-form mx-auto px-4 py-16 sm:py-20">

        {/* Editorial header */}
        <header className="mb-12 sm:mb-16">
          <h1 className="font-serif text-display text-forest leading-tight mb-4">
            Share Your<br />Experience
          </h1>
          <p className="text-body text-mid leading-relaxed max-w-sm">
            We would love to hear about your experience with one of Tobi's brands.
          </p>
        </header>

        {/* Brand selector */}
        <section className="mb-8" aria-labelledby="brand-label">
          <p
            id="brand-label"
            className="text-label font-semibold text-gold uppercase tracking-widest mb-4"
          >
            Select a brand
          </p>
          <BrandSelector selected={selectedBrand} onChange={setSelectedBrand} />
        </section>

        {/* Form */}
        <section aria-label="Share your testimonial">
          <TestimonialForm brand={selectedBrand} onSuccess={() => setSubmitted(true)} />
        </section>

      </div>
    </div>
  )
}
