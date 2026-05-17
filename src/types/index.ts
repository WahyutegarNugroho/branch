export interface Profile {
  id: string
  username: string
  full_name: string | null
  bio: string | null
  avatar_url: string | null
  bg_type: 'solid' | 'gradient' | 'image' | 'video'
  bg_color: string
  bg_image_url: string | null
  bg_overlay_opacity: number
  role: 'user' | 'admin'
  button_shape?: string
  button_style?: string
  font_family?: string
  social_links?: Record<string, string> | null
  show_branding?: boolean
  created_at: string
  updated_at: string
  seo_title?: string | null
  seo_description?: string | null
  meta_pixel_id?: string | null
  tiktok_pixel_id?: string | null
  ga_measurement_id?: string | null
  custom_domain?: string | null
  text_color?: string | null
  social_style?: string | null
  profile_align?: string | null
  avatar_shape?: string | null
  banner_url?: string | null
  link_spacing?: string | null
  avatar_size?: string | null
  bg_video_url?: string | null
}

export interface Link {
  id: string
  profile_id: string
  title: string
  url: string
  is_active: boolean
  sort_order: number
  is_embed: boolean
  valid_from: string | null
  valid_until: string | null
  created_at: string
  icon_position?: 'left' | 'left_far' | 'right' | 'right_far' | 'left_near' | 'right_near' | null
  bg_color?: string | null
  text_color?: string | null
  bg_opacity?: number | null
  icon_color?: string | null
  show_icon?: boolean
  link_type?: 'link' | 'header' | 'carousel'
  thumbnail_url?: string | null
  embed_type?: string | null
  is_spotlight?: boolean
  animation?: string | null
  spotlight_color?: string | null
  link_images?: LinkImage[]
  images?: LinkImage[]
}

export interface LinkImage {
  id: string
  link_id: string
  image_url: string
  sort_order: number
  created_at: string
}

export interface Analytics {
  id: string
  profile_id: string
  link_id: string | null
  device: string | null
  referrer: string | null
  created_at: string
  country?: string | null
  city?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}
