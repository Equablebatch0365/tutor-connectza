// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// TEMPORARY: These are hardcoded just to get the live site working
// We will move them back to .env later!
const supabaseUrl = 'https://bihntnjyiubxbsunsn.supabase.co'
const supabaseAnonKey = 'sb_publishable_9lPZq7QKfKHJKGEk70rmfw_e0YsqRTS'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)