'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getLinks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const is_active = formData.get('is_active') === 'on'
  const icon_position = formData.get('icon_position') as string

  const updateData: any = { title, url, is_active }
  if (formData.has('is_embed')) {
    updateData.is_embed = formData.get('is_embed') === 'on'
  }
  if (formData.has('show_icon')) {
    updateData.show_icon = formData.get('show_icon') === 'on'
  }
  if (icon_position) {
    updateData.icon_position = icon_position
  }

  // Thumbnail support
  if (formData.has('thumbnail_url')) {
    updateData.thumbnail_url = formData.get('thumbnail_url') as string || null
  }

  // Link Type support
  if (formData.has('link_type')) {
    updateData.link_type = formData.get('link_type') as string
  }

  // Button styling parameters
  if (formData.has('bg_color')) {
    const bg = formData.get('bg_color') as string
    updateData.bg_color = bg || null
  }
  if (formData.has('text_color')) {
    const text = formData.get('text_color') as string
    updateData.text_color = text || null
  }
  if (formData.has('bg_opacity')) {
    const opacity = formData.get('bg_opacity') as string
    updateData.bg_opacity = opacity ? parseInt(opacity, 10) : null
  }
  if (formData.has('icon_color')) {
    const iconColor = formData.get('icon_color') as string
    updateData.icon_color = iconColor || null
  }

  // Temporal scheduling parameters
  if (formData.has('valid_from')) {
    const fromVal = formData.get('valid_from') as string
    updateData.valid_from = fromVal ? new Date(fromVal).toISOString() : null
  }
  if (formData.has('valid_until')) {
    const untilVal = formData.get('valid_until') as string
    updateData.valid_until = untilVal ? new Date(untilVal).toISOString() : null
  }

  // Phase 2 features
  if (formData.has('is_spotlight')) {
    updateData.is_spotlight = formData.get('is_spotlight') === 'on' || formData.get('is_spotlight') === 'true'
  }
  if (formData.has('animation')) {
    updateData.animation = formData.get('animation') as string || null
  }
  if (formData.has('embed_type')) {
    updateData.embed_type = formData.get('embed_type') as string || null
  }

  const { error } = await supabase
    .from('links')
    .update(updateData)
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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  // Since Supabase doesn't easily support bulk update via standard JS client in a single call without RPC,
  // we can use a Promise.all to update each link's sort_order individually. It's usually fine for < 50 items.
  const promises = items.map(item => 
    supabase
      .from('links')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)
      .eq('profile_id', user.id)
  )

  const results = await Promise.all(promises)
  const hasError = results.some(r => r.error)

  if (hasError) {
    return { error: 'Failed to reorder some links' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

export async function applyStylesToAllLinks(bgColor: string | null, textColor: string | null, bgOpacity: number | null, iconColor: string | null) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const promises = images.map(item =>
    supabase
      .from('link_images')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)
  )

  const results = await Promise.all(promises)
  const hasError = results.some(r => r.error)

  if (hasError) {
    return { error: 'Failed to reorder carousel images' }
  }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
  return { success: true }
}

