import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseClient = createClient(url || "", anonKey, {
  auth: { persistSession: false },
});

export const supabaseAdmin = createClient(url || "", serviceRole, {
  auth: { persistSession: false },
});

export default supabaseClient;
