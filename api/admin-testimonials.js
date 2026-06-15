import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify the admin password from the request header
  const incomingPassword = req.headers['x-admin-password']
  const expectedPassword = process.env.VITE_ADMIN_PASSWORD

  if (!incomingPassword || !expectedPassword || incomingPassword !== expectedPassword) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Supabase env vars not configured')
    return res.status(500).json({ error: 'Database not configured' })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const { data, error } = await supabase
    .from('testimonials')
    .select('id, brand, reviewer, message, celebration_type, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error.message)
    return res.status(500).json({ error: 'Failed to fetch testimonials' })
  }

  return res.status(200).json(data)
}
