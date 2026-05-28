'use server'

import { createClient, requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { updateLinkSchema, createLinkSchema } from '@/lib/validations'
import { formDataToObject } from '@/lib/formdata-utils'

export async function getLinks() {
  const { supabase, user } = await requireAuth()
  if (!user) return []

  const { data, error } = await supabase
    .from('links')
    .select('*, link_images(*)')
    .eq('profile_id', user.id)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching links:', error)
    return []
  }

  return data
}

export async function createLink(linkType: string = 'link') {
  const parsed = createLinkSchema.safeParse({ linkType })
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const title = linkType === 'header' ? 'New Header' : 'New Link'
  const url = linkType === 'header' ? '' : 'https://'

  const { data, error } = await supabase
    .from('links')
    .insert([{ 
      profile_id: user.id,
      title,
      url,
      is_active: true,
      link_type: linkType,
      sort_order: 0 // Will be handled on the client side, or we can fetch max sort_order
    }])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true, link: data }
}

export async function updateLink(id: string, formData: FormData) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const raw = formDataToObject(formData, {
    is_active: v => v === 'on',
    is_embed: v => v === 'on',
    show_icon: v => v === 'on',
    is_spotlight: v => v === 'on' || v === 'true',
    is_sticky_cta: v => v === 'on' || v === 'true',
    bg_opacity: v => v ? parseInt(v, 10) : null,
    valid_from: v => v ? new Date(v).toISOString() : null,
    valid_until: v => v ? new Date(v).toISOString() : null,
    thumbnail_url: v => v || null,
    bg_color: v => v || null,
    text_color: v => v || null,
    icon_color: v => v || null,
    spotlight_color: v => v || null,
    animation: v => v || null,
    embed_type: v => v || null,
  })

  // Boolean defaults for checkboxes absent when unchecked
  if (!('is_active' in raw)) raw.is_active = false
  if (!('is_embed' in raw)) raw.is_embed = false
  if (!('is_spotlight' in raw)) raw.is_spotlight = false
  if (!('is_sticky_cta' in raw)) raw.is_sticky_cta = false

  // icon_position: only include if non-empty
  if ('icon_position' in raw && !raw.icon_position) {
    delete raw.icon_position
  }

  const validated = updateLinkSchema.partial().safeParse(raw)
  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  const { error } = await supabase
    .from('links')
    .update(validated.data)
    .eq('id', id)
    .eq('profile_id', user.id) // Ensure owner

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function deleteLink(id: string) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)
    .eq('profile_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function reorderLinks(items: { id: string, sort_order: number }[]) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.rpc('bulk_reorder_links', { p_items: items })

  if (error) {
    return { error: 'Failed to reorder links' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function applyStylesToAllLinks(bgColor: string | null, textColor: string | null, bgOpacity: number | null, iconColor: string | null) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('links')
    .update({ 
      bg_color: bgColor, 
      text_color: textColor, 
      bg_opacity: bgOpacity,
      icon_color: iconColor
    })
    .eq('profile_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function getLinkImages(linkId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('link_images')
    .select('*')
    .eq('link_id', linkId)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching link images:', error)
    return []
  }
  return data
}

export async function addLinkImage(linkId: string, imageUrl: string) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  // Verify owner of the link
  const { data: link, error: linkErr } = await supabase
    .from('links')
    .select('id')
    .eq('id', linkId)
    .eq('profile_id', user.id)
    .single()

  if (linkErr || !link) return { error: 'Unauthorized or Link not found' }

  const { data, error } = await supabase
    .from('link_images')
    .insert([{
      link_id: linkId,
      image_url: imageUrl,
      sort_order: 0
    }])
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true, image: data }
}

export async function deleteLinkImage(id: string) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  // Verify ownership: get the link_image's link_id, then check profile_id
  const { data: image, error: fetchErr } = await supabase
    .from('link_images')
    .select('link_id')
    .eq('id', id)
    .single()

  if (fetchErr || !image) return { error: 'Image not found' }

  const { data: link } = await supabase
    .from('links')
    .select('profile_id')
    .eq('id', image.link_id)
    .single()

  if (!link || link.profile_id !== user.id) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('link_images')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function reorderLinkImages(images: { id: string, sort_order: number }[]) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.rpc('bulk_reorder_link_images', { p_items: images })

  if (error) {
    return { error: 'Failed to reorder carousel images' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

