// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Reading from the new plain names
const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)