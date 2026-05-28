-- Migration 001: Initial Schema
-- Applied automatically by the migration system.
-- Wraps all statements in IF NOT EXISTS guards for idempotency.

-- Create tracking table first (used by the migration system itself)
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL UNIQUE,
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(30) UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  bg_type VARCHAR(10) DEFAULT 'solid'::character varying,
  bg_color VARCHAR(50) DEFAULT '#09090b'::character varying,
  bg_image_url TEXT,
  bg_overlay_opacity INTEGER DEFAULT 0,
  role VARCHAR(10) DEFAULT 'user'::character varying,
  button_shape VARCHAR(30) DEFAULT 'rounded-2xl'::character varying,
  button_style VARCHAR(30) DEFAULT 'soft'::character varying,
  font_family VARCHAR(50) DEFAULT 'font-sans-theme'::character varying,
  theme_style VARCHAR(20),
  button_hover_effect VARCHAR(20) DEFAULT 'none'::character varying,
  layout_type VARCHAR(10) DEFAULT 'list'::character varying,
  social_links JSONB DEFAULT '{}'::jsonb,
  show_branding BOOLEAN DEFAULT true,
  seo_title VARCHAR(120),
  seo_description TEXT,
  meta_pixel_id VARCHAR(100),
  tiktok_pixel_id VARCHAR(100),
  ga_measurement_id VARCHAR(100),
  custom_domain VARCHAR(255),
  text_color VARCHAR(50),
  social_style VARCHAR(20) DEFAULT 'circle'::character varying,
  profile_align VARCHAR(10) DEFAULT 'center'::character varying,
  avatar_shape VARCHAR(10) DEFAULT 'circle'::character varying,
  banner_url TEXT,
  link_spacing VARCHAR(10) DEFAULT 'normal'::character varying,
  avatar_size VARCHAR(10) DEFAULT 'medium'::character varying,
  bg_video_url TEXT,
  bg_animation VARCHAR(20),
  bg_animation_config JSONB DEFAULT '{}'::jsonb,
  avatar_frame VARCHAR(20) DEFAULT 'none'::character varying,
  avatar_frame_config JSONB DEFAULT '{}'::jsonb,
  social_placement VARCHAR(10) DEFAULT 'top'::character varying,
  theme_lock BOOLEAN DEFAULT false,
  glass_blur INTEGER DEFAULT 10,
  glass_opacity INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Links table
CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  is_embed BOOLEAN DEFAULT false,
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  icon_position VARCHAR(20) DEFAULT 'right'::character varying,
  bg_color VARCHAR(50),
  text_color VARCHAR(50),
  bg_opacity INTEGER DEFAULT 100,
  icon_color VARCHAR(50),
  show_icon BOOLEAN DEFAULT false,
  link_type VARCHAR(20) DEFAULT 'link'::character varying,
  thumbnail_url TEXT,
  is_spotlight BOOLEAN DEFAULT false,
  spotlight_color VARCHAR(50),
  animation VARCHAR(20) DEFAULT 'none'::character varying,
  is_sticky_cta BOOLEAN DEFAULT false,
  embed_type VARCHAR(20)
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  link_id UUID REFERENCES links(id) ON DELETE SET NULL,
  device TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Themes table
CREATE TABLE IF NOT EXISTS themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  bg_type VARCHAR(10) NOT NULL,
  bg_color VARCHAR(50) NOT NULL,
  bg_image_url TEXT,
  bg_video_url TEXT,
  button_shape VARCHAR(50) DEFAULT 'rounded-2xl'::character varying,
  button_style VARCHAR(50) DEFAULT 'soft'::character varying,
  font_family VARCHAR(50) DEFAULT 'font-sans-theme'::character varying,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link images table
CREATE TABLE IF NOT EXISTS link_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id UUID NOT NULL REFERENCES links(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) 
SELECT 'backgrounds', 'backgrounds', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'backgrounds');

INSERT INTO storage.buckets (id, name, public) 
SELECT 'avatars', 'avatars', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'avatars');
