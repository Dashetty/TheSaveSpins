
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://osjaklfhsmnrbbwablfg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zamFrbGZoc21ucmJid2FibGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NjAwNDksImV4cCI6MjA3NDEzNjA0OX0.C1x0Nah0vpVeeAaT2V89M4EvVEpwt4ZiQiXLtg3WL5k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
