import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

if (!isSupabaseConfigured) {
    console.warn('Supabase URL or Anon Key is missing. Authentication features will not work.');
}

// Create client only if configured, otherwise create a dummy or null (handled in Context)
// To satisfy TypeScript without complex mocking, we can use a proxy or just cast null,
// but let's try to pass valid-ish strings if we must, OR better: handle null in consumer.
// However, many files import `supabase` directly.
// Let's create a safe client if possible, or force the user of this module to check.

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.supabase.co', 'placeholder');

