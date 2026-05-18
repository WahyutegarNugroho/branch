'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function updateAppearance(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const bg_type = formData.get('bg_type') as string
  const bg_color = formData.get('bg_color') as string
  const bg_image_url = formData.get('bg_image_url') as string
  const bg_overlay_opacity = parseInt(formData.get('bg_overlay_opacity') as string) || 0
  const button_shape = formData.get('button_shape') as string || 'rounded-2xl'
  const button_style = formData.get('button_style') as string || 'soft'
  const font_family = formData.get('font_family') as string || 'font-sans-theme'

  const text_color = formData.get('text_color') as string || '#ffffff'
  const social_style = formData.get('social_style') as string || 'circle'
  const profile_align = formData.get('profile_align') as string || 'center'
  const avatar_shape = formData.get('avatar_shape') as string || 'circle'
  const banner_url = formData.get('banner_url') as string || null
  const link_spacing = formData.get('link_spacing') as string || 'normal'
  const avatar_size = formData.get('avatar_size') as string || 'medium'
  const bg_video_url = formData.get('bg_video_url') as string || null

  const { error } = await supabase
    .from('profiles')
    .update({
      bg_type,
      bg_color,
      bg_image_url,
      bg_overlay_opacity,
      button_shape,
      button_style,
      font_family,
      text_color,
      social_style,
      profile_align,
      avatar_shape,
      banner_url,
      link_spacing,
      avatar_size,
      bg_video_url,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function updateProfileInfo(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const full_name = formData.get('full_name') as string
  const bio = formData.get('bio') as string
  const avatar_url = formData.get('avatar_url') as string
  const username = (formData.get('username') as string || '').toLowerCase().trim()

  // Validate username if provided
  if (username) {
    // Regex validation: lowercase letters, numbers, underscores, and dashes
    const usernameRegex = /^[a-z0-9_-]+$/
    if (!usernameRegex.test(username) || username.length < 3 || username.length > 30) {
      return { error: 'Invalid username. Use 3-30 characters of lowercase letters, numbers, underscores, or hyphens.' }
    }

    // Blacklist check
    const blacklist = ['admin', 'api', 'dashboard', 'login', 'register', 'auth', 'settings', 'appearance', 'analytics']
    if (blacklist.includes(username)) {
      return { error: 'This username is protected and cannot be used.' }
    }

    // Uniqueness check
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .not('id', 'eq', user.id) // exclude current user
      .maybeSingle()

    if (existingUser) {
      return { error: 'Username is already taken by someone else.' }
    }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name,
      bio,
      avatar_url,
      ...(username ? { username } : {}),
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function updateSocialLinks(socialLinks: Record<string, string>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  // Clean empty links so we don't save blank strings
  const cleanedSocials: Record<string, string> = {}
  Object.keys(socialLinks).forEach(key => {
    if (socialLinks[key]?.trim()) {
      cleanedSocials[key] = socialLinks[key].trim()
    }
  })

  const { error } = await supabase
    .from('profiles')
    .update({
      social_links: cleanedSocials,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function updateBranding(showBranding: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('profiles')
    .update({
      show_branding: showBranding,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const seo_title = formData.get('seo_title') as string || null
  const seo_description = formData.get('seo_description') as string || null
  const meta_pixel_id = formData.get('meta_pixel_id') as string || null
  const tiktok_pixel_id = formData.get('tiktok_pixel_id') as string || null
  const ga_measurement_id = formData.get('ga_measurement_id') as string || null
  
  let custom_domain = formData.get('custom_domain') as string || null
  if (custom_domain) {
    custom_domain = custom_domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      seo_title,
      seo_description,
      meta_pixel_id,
      tiktok_pixel_id,
      ga_measurement_id,
      custom_domain,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}
