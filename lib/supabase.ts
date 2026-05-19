// lib/supabase.ts May 16 2026 - lazy init to prevent build-time errors
import { createClient as _c } from "@supabase/supabase-js"

function getURL() { return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "" }
function getANON() { return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "" }
function getSVC() { return process.env.SUPABASE_SERVICE_ROLE_KEY ?? getANON() }

let _supabase: ReturnType<typeof _c> | null = null
let _supabaseAdmin: ReturnType<typeof _c> | null = null

export function getSupabase() {
  if (!_supabase) _supabase = _c(getURL(), getANON())
  return _supabase
}

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) _supabaseAdmin = _c(getURL(), getSVC(), { auth: { persistSession: false } })
  return _supabaseAdmin
}

// Legacy named exports for backward compat - lazy proxies
export const supabase = new Proxy({} as ReturnType<typeof _c>, {
  get(_: any, prop: string) {
    return (getSupabase() as any)[prop]
  }
})

export const supabaseAdmin = new Proxy({} as ReturnType<typeof _c>, {
  get(_: any, prop: string) {
    return (getSupabaseAdmin() as any)[prop]
  }
})

export const createClient = () => _c(getURL(), getANON())
export const createClientComponentClient = () => _c(getURL(), getANON())
export const createServerComponentClient = () => _c(getURL(), getANON())

export async function getUser(c?: ReturnType<typeof createClient>) {
  try {
    const { data: { user } } = await (c ?? getSupabase()).auth.getUser()
    return user
  } catch { return null }
}

export function shouldChargeCredits(e?: string | null) {
  return !["royhenderson@craudiovizai.com"].includes(e ?? "")
}

export function isAdmin(e?: string | null) {
  return !shouldChargeCredits(e)
}
