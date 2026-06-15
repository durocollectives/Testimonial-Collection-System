import { useState } from 'react'
import { insertTestimonial } from '../lib/supabase'
import { sendNotification } from '../lib/email'

const INPUT_BASE =
  'w-full bg-white border border-edge rounded-input px-4 py-3 text-body text-ink ' +
  'placeholder:text-muted focus:outline-none focus:border-forest ' +
  'focus:ring-2 focus:ring-forest/10 transition-colors duration-150'

export default function TestimonialForm({ brand, onSuccess }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canSubmit = Boolean(brand) && name.trim().length > 0 && message.trim().length > 0 && !loading

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
      })
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    // Non-blocking — notification failure must not prevent success state
    sendNotification({ brand, reviewer: name.trim(), message: message.trim() })

    setLoading(false)
    onSuccess()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-edge rounded-card shadow-card p-6 sm:p-8"
    >
      {/* Name */}
      <div className="mb-6">
        <label htmlFor="reviewer-name" className="block text-label font-semibold text-ink mb-2">
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
        <label htmlFor="testimonial-message" className="block text-label font-semibold text-ink mb-2">
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
        className="w-full sm:w-auto bg-forest text-white font-semibold px-8 py-3 rounded-input cursor-pointer hover:bg-forest-dark transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting…' : 'Submit testimonial'}
      </button>
    </form>
  )
}
