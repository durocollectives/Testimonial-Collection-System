import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Guard against missing env vars — createClient throws if URL is undefined,
// which crashes the entire module and produces a blank page.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export async function insertTestimonial({ brand, reviewer, message, celebration_type }) {
  if (!supabase) throw new Error('Database not configured. Please contact the site owner.')

  const row = { brand, reviewer, message }
  if (celebration_type) row.celebration_type = celebration_type

  const { error } = await supabase
    .from('testimonials')
    .insert(row)

  if (error) throw error
}
