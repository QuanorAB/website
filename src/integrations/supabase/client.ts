// Safe client: reads values from Vite env (no hard-coded secrets).
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishable = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// Make Supabase optional for development - only create client if env vars are present
export const supabase = (url && publishable)
  ? createClient<Database>(url, publishable, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!url && !!publishable;
