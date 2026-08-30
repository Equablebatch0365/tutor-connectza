// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// These are the EXACT names we saved in Vercel
const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)