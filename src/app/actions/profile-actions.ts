'use server'

import { createClient, requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { updateAppearanceSchema, updateProfileInfoSchema, updateSocialLinksSchema, updateSettingsSchema } from '@/lib/validations'

export async function getProfile() {
  const { supabase, user } = await requireAuth()
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
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const raw = {
    bg_type: formData.get('bg_type') as string,
    bg_color: formData.get('bg_color') as string,
    bg_image_url: formData.get('bg_image_url') as string || null,
    bg_overlay_opacity: formData.get('bg_overlay_opacity') as string,
    button_shape: formData.get('button_shape') as string,
    button_style: formData.get('button_style') as string,
    font_family: formData.get('font_family') as string,
    text_color: formData.get('text_color') as string,
    social_style: formData.get('social_style') as string,
    profile_align: formData.get('profile_align') as string,
    avatar_shape: formData.get('avatar_shape') as string,
    banner_url: formData.get('banner_url') as string || null,
    link_spacing: formData.get('link_spacing') as string,
    avatar_size: formData.get('avatar_size') as string,
    bg_video_url: formData.get('bg_video_url') as string || null,
    theme_style: formData.get('theme_style') as string || null,
    button_hover_effect: formData.get('button_hover_effect') as string || null,
    layout_type: formData.get('layout_type') as string,
    bg_animation: formData.get('bg_animation') as string || null,
    bg_animation_config: formData.get('bg_animation_config') ? JSON.parse(formData.get('bg_animation_config') as string) : null,
    avatar_frame: formData.get('avatar_frame') as string || null,
    avatar_frame_config: formData.get('avatar_frame_config') ? JSON.parse(formData.get('avatar_frame_config') as string) : null,
    social_placement: formData.get('social_placement') as string || null,
    theme_lock: formData.get('theme_lock') === 'true',
    glass_blur: formData.get('glass_blur') ? parseInt(formData.get('glass_blur') as string, 10) : undefined,
    glass_opacity: formData.get('glass_opacity') ? parseInt(formData.get('glass_opacity') as string, 10) : undefined,
  }

  const validated = updateAppearanceSchema.safeParse(raw)
  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      ...validated.data,
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
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const username = (formData.get('username') as string || '').toLowerCase().trim()

  // Validate username with Zod
  const validated = updateProfileInfoSchema.safeParse({
    full_name: formData.get('full_name') as string || null,
    bio: formData.get('bio') as string || null,
    avatar_url: formData.get('avatar_url') as string || null,
    username,
  })

  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  const { full_name, bio, avatar_url } = validated.data

  // Uniqueness check
  if (username) {
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
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const validated = updateSocialLinksSchema.safeParse(socialLinks)
  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  // Clean empty links so we don't save blank strings
  const cleanedSocials: Record<string, string> = {}
  Object.keys(validated.data).forEach(key => {
    if (validated.data[key]?.trim()) {
      cleanedSocials[key] = validated.data[key].trim()
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
  const { supabase, user } = await requireAuth()
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
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  let custom_domain = formData.get('custom_domain') as string || null
  if (custom_domain) {
    custom_domain = custom_domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, '')
  }

  const raw = {
    seo_title: formData.get('seo_title') as string || null,
    seo_description: formData.get('seo_description') as string || null,
    meta_pixel_id: formData.get('meta_pixel_id') as string || null,
    tiktok_pixel_id: formData.get('tiktok_pixel_id') as string || null,
    ga_measurement_id: formData.get('ga_measurement_id') as string || null,
    custom_domain,
  }

  const validated = updateSettingsSchema.safeParse(raw)
  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      ...validated.data,
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
