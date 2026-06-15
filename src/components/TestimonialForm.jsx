import { useState, useEffect } from 'react'
import { insertTestimonial } from '../lib/supabase'
import { sendNotification } from '../lib/email'

const INPUT_BASE =
  'w-full bg-white border border-edge rounded-input px-4 py-3 text-[0.9rem] text-ink ' +
  'placeholder:text-muted focus:outline-none focus:border-forest ' +
  'focus:ring-2 focus:ring-forest/10 transition-colors duration-150'

const LABEL = 'block text-[0.6875rem] font-semibold text-ink uppercase tracking-[0.14em] mb-2.5'

const CELEBRATION_OPTIONS = ['Wedding Celebration', 'Private Celebration']

export default function TestimonialForm({ brand, onSuccess }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [celebrationType, setCelebrationType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isRiah = brand === 'RIAH Events'

  useEffect(() => {
    if (!isRiah) setCelebrationType('')
  }, [isRiah])

  const canSubmit =
    Boolean(brand) &&
    name.trim().length > 0 &&
    message.trim().length > 0 &&
    (!isRiah || Boolean(celebrationType)) &&
    !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setError(null)

    try {
      await insertTestimonial({
        brand,
        reviewer: name.trim(),
        message: message.trim(),
        celebration_type: celebrationType || undefined,
      })
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    sendNotification({ brand, reviewer: name.trim(), message: message.trim() })
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* RIAH celebration type */}
      {isRiah && (
        <div className="mb-6">
          <label htmlFor="celebration-type" className={LABEL}>
            Type of celebration
          </label>
          <div className="relative">
            <select
              id="celebration-type"
              value={celebrationType}
              onChange={(e) => setCelebrationType(e.target.value)}
              required
              className={
                INPUT_BASE +
                ' appearance-none cursor-pointer pr-10' +
                (celebrationType ? ' text-ink' : ' text-muted')
              }
            >
              <option value="" disabled>Select a celebration type</option>
              {CELEBRATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      )}

      {/* Name */}
      <div className="mb-6">
        <label
          htmlFor="reviewer-name"
          className={LABEL}
        >
          Your name
        </label>
        <input
          id="reviewer-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          autoComplete="name"
          required
          className={INPUT_BASE}
        />
      </div>

      {/* Testimonial */}
      <div className="mb-8">
        <label
          htmlFor="testimonial-message"
          className={LABEL}
        >
          Your testimonial
        </label>
        <textarea
          id="testimonial-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your experience..."
          rows={5}
          required
          className={`${INPUT_BASE} resize-none min-h-[120px]`}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        aria-busy={loading}
        className="w-full sm:w-auto bg-forest text-white text-[0.875rem] font-semibold px-8 py-3 rounded-input cursor-pointer hover:bg-forest-dark transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting…' : 'Submit testimonial'}
      </button>

    </form>
  )
}
