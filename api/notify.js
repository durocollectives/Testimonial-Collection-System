export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { brand, reviewer, message } = req.body ?? {}

  if (!brand || !reviewer || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'tobi@tobiyusuf.com'
  const APP_URL = process.env.VITE_APP_URL || 'https://your-project.vercel.app'

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  const submittedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const emailText = `You have a new testimonial.

Brand: ${brand}
Reviewer: ${reviewer}
Submitted: ${submittedAt}

---
${message}
---

Log in to your dashboard to view all testimonials:
${APP_URL}/admin`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Update this to a verified sender domain once your domain is configured in Resend
        from: 'Testimonials <noreply@tobiyusuf.com>',
        to: [NOTIFICATION_EMAIL],
        subject: `New testimonial — ${brand}`,
        text: emailText,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.message || `Resend API returned ${response.status}`)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Email send failed:', err.message)
    return res.status(500).json({ error: 'Failed to send notification' })
  }
}
