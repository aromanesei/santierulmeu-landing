import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fnawjtpqbvpmjcrymhse.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYXdqdHBxYnZwbWpjcnltaHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDI4NjYsImV4cCI6MjA5MDU3ODg2Nn0.kpz4tY38EgnhIFDeb2Oc7XC-021A9xDQSfsbgEgMgXg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
