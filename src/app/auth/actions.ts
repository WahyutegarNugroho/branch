'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { checkRateLimit } from '@/lib/rate-limiter'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

async function getClientIp(): Promise<string> {
  const reqHeaders = await headers()
  return reqHeaders.get('cf-connecting-ip') ||
    reqHeaders.get('x-real-ip') ||
    reqHeaders.get('x-forwarded-for')?.split(',')[0].trim() ||
    '127.0.0.1'
}

export async function login(formData: FormData) {
  const clientIp = await getClientIp()
  const limit = checkRateLimit(`auth:${clientIp}`, { maxRequests: 5, windowMs: 60_000 })
  if (!limit.allowed) {
    return { error: 'Too many requests. Try again later.' }
  }

  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = authSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const clientIp = await getClientIp()
  const limit = checkRateLimit(`auth:${clientIp}`, { maxRequests: 5, windowMs: 60_000 })
  if (!limit.allowed) {
    return { error: 'Too many requests. Try again later.' }
  }

  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = authSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function forgotPassword(formData: FormData) {
  const clientIp = await getClientIp()
  const limit = checkRateLimit(`auth:${clientIp}`, { maxRequests: 5, windowMs: 60_000 })
  if (!limit.allowed) {
    return { error: 'Too many requests. Try again later.' }
  }

  const supabase = await createClient()
  const email = formData.get('email') as string

  const result = z.string().email({ message: 'Invalid email address' }).safeParse(email)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function resetPassword(formData: FormData) {
  const clientIp = await getClientIp()
  const limit = checkRateLimit(`auth:${clientIp}`, { maxRequests: 5, windowMs: 60_000 })
  if (!limit.allowed) {
    return { error: 'Too many requests. Try again later.' }
  }

  const supabase = await createClient()
  const password = formData.get('password') as string

  const result = z.string().min(6, { message: 'Password must be at least 6 characters' }).safeParse(password)
  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
