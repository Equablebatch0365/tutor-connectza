// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// HARDCODED KEYS (Guaranteed to work)
const supabaseUrl = 'https://bihntnjyiubxbsunsn.supabase.co'
const supabaseAnonKey = 'sb_publishable_9lPZq7QKfKHJKGEk70rmfw_e0YsqRTS' // PASTE YOUR KEY HERE

export const supabase = createClient(supabaseUrl, supabaseAnonKey)