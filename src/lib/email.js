export async function sendNotification({ brand, reviewer, message }) {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand, reviewer, message }),
    })
    if (!response.ok) {
      console.warn('Email notification failed:', response.status)
    }
  } catch {
    // Non-fatal: testimonial is already saved. Log and continue.
    console.warn('Email notification request failed')
  }
}
