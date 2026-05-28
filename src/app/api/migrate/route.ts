import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const MIGRATIONS_DIR = path.join(process.cwd(), 'migrations')

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  // Check if exec_sql RPC exists
  const { error: rpcError } = await supabase.rpc('exec_sql', { sql: 'SELECT 1' })
  if (rpcError) {
    return NextResponse.json({
      error: 'exec_sql RPC not available',
      hint: 'Run this in Supabase SQL Editor:\nCREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$\nBEGIN EXECUTE sql; END;\n$$ LANGUAGE plpgsql SECURITY DEFINER;',
    }, { status: 400 })
  }

  // Ensure tracking table exists
  await supabase.rpc('exec_sql', {
    sql: `CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    )`,
  })

  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter((f: string) => f.endsWith('.sql'))
    .sort()

  const results: { file: string; status: string; error?: string }[] = []

  for (const file of files) {
    const { data: existing } = await supabase
      .from('_migrations')
      .select('id')
      .eq('filename', file)
      .maybeSingle()

    if (existing) {
      results.push({ file, status: 'skipped' })
      continue
    }

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8')
    const { error } = await supabase.rpc('exec_sql', { sql })

    if (error) {
      results.push({ file, status: 'failed', error: error.message })
      continue
    }

    await supabase.from('_migrations').insert({ filename: file })
    results.push({ file, status: 'applied' })
  }

  return NextResponse.json({ results })
}
