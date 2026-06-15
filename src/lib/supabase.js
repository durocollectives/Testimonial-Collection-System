import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function insertTestimonial({ brand, reviewer, message }) {
  const { error } = await supabase
    .from('testimonials')
    .insert({ brand, reviewer, message })

  if (error) throw error
}
