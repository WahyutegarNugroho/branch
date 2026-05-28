import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
})

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
})

if (!parsed.success) {
  console.error('========================================')
  console.error('  BRANCH: Missing/Invalid Environment Variables')
  console.error('========================================')
  for (const issue of parsed.error.issues) {
    console.error(`  \u2022 ${issue.path.join('.')}: ${issue.message}`)
  }
  console.error('========================================')
  console.error('  Please check your .env.local file.')
  console.error('========================================')

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Environment validation failed. Server cannot start.')
  }
}

export const env = parsed.data ?? {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
}
