export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 sm:py-32 px-4">
      {/* Checkmark circle */}
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
        style={{ backgroundColor: 'rgba(44,74,62,0.08)' }}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12l5 5L19 7"
            stroke="#2C4A3E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="font-serif text-section text-forest mb-4">Thank you.</h2>
      <p className="text-body text-mid leading-relaxed max-w-[22rem]">
        Your testimonial has been received. We appreciate you taking the time to share
        your experience.
      </p>
    </div>
  )
}
