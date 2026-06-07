'use server'

import { requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { updateAppearanceSchema, updateProfileInfoSchema, updateSocialLinksSchema, updateSettingsSchema } from '@/lib/validations'
import { formDataToObject } from '@/lib/formdata-utils'

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

  const raw = formDataToObject(formData, {
    theme_lock: v => v === 'true',
    bg_animation_config: v => v ? JSON.parse(v) : null,
    avatar_frame_config: v => v ? JSON.parse(v) : null,
    bg_image_url: v => v || null,
    banner_url: v => v || null,
    bg_video_url: v => v || null,
    social_placement: v => v || null,
    theme_style: v => v || null,
    button_hover_effect: v => v || null,
    bg_animation: v => v || null,
    avatar_frame: v => v || null,
  })

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

  if (!showBranding) {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()

    if (fetchError) return { error: fetchError.message }

    if (profile?.plan !== 'premium') {
      return { error: 'Only premium plan users can hide branding. Upgrade your plan to unlock this feature.' }
    }
  }

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

  // If custom_domain changed, reset verification
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('custom_domain')
    .eq('id', user.id)
    .single()

  const domainChanged = existingProfile?.custom_domain !== custom_domain

  const { error } = await supabase
    .from('profiles')
    .update({
      ...validated.data,
      ...(domainChanged ? { domain_verified: false } : {}),
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
