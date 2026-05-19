// lib/credits/index.ts — CR AudioViz AI Platform Standard
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kteobfyferrukqeolofj.supabase.co';

function getAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}

export async function hasCredits(userId: string, amount: number): Promise<boolean> {
  const supabaseAdmin = getAdmin();
  if (!supabaseAdmin) return false;
  const { data } = await supabaseAdmin.from('user_credits').select('balance').eq('user_id', userId).single();
  return (data?.balance ?? 0) >= amount;
}

export async function spendCredits(userId: string, amount: number, appId: string, operation: string, metadata?: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  const supabaseAdmin = getAdmin();
  if (!supabaseAdmin) return { success: false, error: 'Admin not configured' };
  const { data: credits } = await supabaseAdmin.from('user_credits').select('balance, lifetime_spent').eq('user_id', userId).single();
  if (!credits || credits.balance < amount) return { success: false, error: 'Insufficient credits' };
  const newBalance = credits.balance - amount;
  await supabaseAdmin.from('user_credits').update({ balance: newBalance, lifetime_spent: (credits.lifetime_spent || 0) + amount, updated_at: new Date().toISOString() }).eq('user_id', userId);
  await supabaseAdmin.from('credit_transactions').insert({ user_id: userId, amount: -amount, transaction_type: 'spend', app_id: appId, operation, description: `${appId}: ${operation}`, metadata });
  return { success: true };
}

export async function refundCredits(userId: string, amount: number, appId: string, reason: string): Promise<{ success: boolean; error?: string }> {
  const supabaseAdmin = getAdmin();
  if (!supabaseAdmin) return { success: false, error: 'Admin not configured' };
  const { data } = await supabaseAdmin.from('user_credits').select('balance').eq('user_id', userId).single();
  if (!data) return { success: false, error: 'User not found' };
  await supabaseAdmin.from('user_credits').update({ balance: data.balance + amount }).eq('user_id', userId);
  await supabaseAdmin.from('credit_transactions').insert({ user_id: userId, amount, transaction_type: 'refund', app_id: appId, description: `Refund: ${reason}` });
  return { success: true };
}

export async function getCredits(userId: string): Promise<number> {
  const supabaseAdmin = getAdmin();
  if (!supabaseAdmin) return 0;
  const { data } = await supabaseAdmin.from('user_credits').select('balance').eq('user_id', userId).single();
  return data?.balance ?? 0;
}
