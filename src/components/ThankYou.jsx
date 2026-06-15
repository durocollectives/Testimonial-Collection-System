export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28 px-4">

      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-8"
        style={{ backgroundColor: 'rgba(44,74,62,0.07)' }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12l5 5L19 7"
            stroke="#2C4A3E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="text-[0.6875rem] font-semibold text-gold uppercase tracking-[0.22em] mb-5">
        Received
      </p>
      <h2 className="font-serif text-[2rem] text-forest mb-4">Thank you.</h2>
      <p className="text-[0.9rem] text-mid leading-[1.8] max-w-[18rem]">
        Your testimonial has been received. We appreciate you taking the time to share
        your experience.
      </p>

    </div>
  )
}
