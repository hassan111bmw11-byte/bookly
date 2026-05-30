import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey) {
  throw new Error(
    "SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in environment variables.",
  );
}

export const supabaseClient = createClient(url, anonKey, {
  auth: { persistSession: true },
});

export const supabaseAdmin =
  serviceRole ?
    createClient(url, serviceRole, { auth: { persistSession: false } })
  : supabaseClient;

export default supabaseClient;
