import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/env', () => ({
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://gbrwieaddzkpzfpjcxcz.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicndpZWFkZHprcHpmcGpjeGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzA0MTcsImV4cCI6MjA5NDU0NjQxN30.7u_5fm6QaS-sXXtep6jyuD1JCwp6M4jXw3kGYznphZA',
  },
}))

import { login } from '@/app/auth/actions'

vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Map()),
  cookies: vi.fn(async () => ({
    getAll: () => [],
    set: vi.fn(),
  })),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('Real login action', () => {
  it('handles invalid email gracefully', async () => {
    const fd = new FormData()
    fd.append('email', 'not-an-email')
    fd.append('password', '123456')

    const res = await login(fd)
    expect(res).toEqual({ error: 'Invalid email address' })
  })

  it('handles invalid password gracefully', async () => {
    const fd = new FormData()
    fd.append('email', 'valid@example.com')
    fd.append('password', '123')

    const res = await login(fd)
    expect(res).toEqual({ error: 'Password must be at least 6 characters' })
  })

  it('handles bad credentials against Supabase gracefully', async () => {
    const fd = new FormData()
    fd.append('email', 'nonexistent_user_999@example.com')
    fd.append('password', 'wrongpassword123')

    const res = await login(fd)
    console.log('Login result for nonexistent user:', res)
    expect(res?.error).toBeDefined()
  })
})
