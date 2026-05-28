-- ==========================================
-- SCHEMA.SQL FOR BRANCH (LINKTREE CLONE)
-- ==========================================
-- Schema version 1.0 (final)
-- Untuk update database yang sudah berjalan, jalankan query di bawah.
-- ==========================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    bg_type VARCHAR(20) DEFAULT 'solid', -- 'solid', 'gradient', 'image', 'video'
    bg_color VARCHAR(50) DEFAULT '#ffffff',
    bg_image_url TEXT,
    bg_overlay_opacity INT DEFAULT 0 CHECK (bg_overlay_opacity >= 0 AND bg_overlay_opacity <= 100),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    social_links JSONB DEFAULT '{}'::jsonb,
    button_shape VARCHAR(20) DEFAULT 'rounded-2xl',
    button_style VARCHAR(20) DEFAULT 'soft',
    font_family VARCHAR(50) DEFAULT 'font-sans-theme',
    theme_style VARCHAR(20) DEFAULT 'solid',
    button_hover_effect VARCHAR(20) DEFAULT 'none',
    layout_type VARCHAR(20) DEFAULT 'list',
    show_branding BOOLEAN DEFAULT true,
    seo_title VARCHAR(255),
    seo_description TEXT,
    meta_pixel_id VARCHAR(100),
    tiktok_pixel_id VARCHAR(100),
    ga_measurement_id VARCHAR(100),
    custom_domain VARCHAR(255),
    text_color VARCHAR(50) DEFAULT '#ffffff',
    social_style VARCHAR(30) DEFAULT 'circle',
    profile_align VARCHAR(20) DEFAULT 'center',
    avatar_shape VARCHAR(20) DEFAULT 'circle',
    banner_url TEXT,
    link_spacing VARCHAR(20) DEFAULT 'normal',
    avatar_size VARCHAR(20) DEFAULT 'medium',
    bg_video_url TEXT,
    bg_animation VARCHAR(50) DEFAULT 'none',
    bg_animation_config JSONB DEFAULT '{}'::jsonb,
    avatar_frame VARCHAR(50) DEFAULT 'none',
    avatar_frame_config JSONB DEFAULT '{}'::jsonb,
    social_placement VARCHAR(20) DEFAULT 'top',
    theme_lock BOOLEAN DEFAULT false,
    glass_blur INTEGER DEFAULT 10,
    glass_opacity INTEGER DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. TABEL LINKS
CREATE TABLE IF NOT EXISTS public.links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    is_embed BOOLEAN DEFAULT false,
    valid_from TIMESTAMP WITH TIME ZONE NULL,
    valid_until TIMESTAMP WITH TIME ZONE NULL,
    icon_position VARCHAR(20) DEFAULT 'left_far',
    bg_color VARCHAR(50),
    text_color VARCHAR(50),
    bg_opacity INT DEFAULT 100,
    icon_color VARCHAR(50),
    show_icon BOOLEAN DEFAULT true,
    link_type VARCHAR(20) DEFAULT 'link',
    thumbnail_url TEXT,
    embed_type VARCHAR(50),
    is_spotlight BOOLEAN DEFAULT false,
    animation VARCHAR(50),
    spotlight_color VARCHAR(50),
    is_sticky_cta BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- 4. TABEL ANALYTICS
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    link_id UUID REFERENCES public.links(id) ON DELETE CASCADE NULL,
    device VARCHAR(50),
    referrer TEXT,
    country VARCHAR(100),
    city VARCHAR(100),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- 5. TABEL THEMES
CREATE TABLE IF NOT EXISTS public.themes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bg_type VARCHAR(20) DEFAULT 'solid',
    bg_color VARCHAR(50) DEFAULT '#ffffff',
    bg_image_url TEXT,
    button_shape VARCHAR(20) DEFAULT 'rounded-2xl',
    button_style VARCHAR(20) DEFAULT 'soft',
    font_family VARCHAR(50) DEFAULT 'font-sans-theme',
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;

-- 6. TABEL LINK_IMAGES (image carousel/gallery)
CREATE TABLE IF NOT EXISTS public.link_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    link_id UUID REFERENCES public.links(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.link_images ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_links_profile_id ON public.links(profile_id);
CREATE INDEX IF NOT EXISTS idx_links_profile_id_sort_order ON public.links(profile_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_analytics_profile_id ON public.analytics(profile_id);
CREATE INDEX IF NOT EXISTS idx_analytics_profile_id_created_at ON public.analytics(profile_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_link_images_link_id ON public.link_images(link_id);
CREATE INDEX IF NOT EXISTS idx_link_images_link_id_sort_order ON public.link_images(link_id, sort_order);

-- ==========================================
-- HELPER FUNCTION
-- ==========================================
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- PROFILES
CREATE POLICY "Allow public read profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow user to update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow admin full access to profiles" ON public.profiles
    FOR ALL USING ( public.is_admin(auth.uid()) );

-- LINKS
CREATE POLICY "Allow public read links" ON public.links
    FOR SELECT USING (true);

CREATE POLICY "Allow user to insert own links" ON public.links
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Allow user to update own links" ON public.links
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Allow user to delete own links" ON public.links
    FOR DELETE USING (auth.uid() = profile_id);

CREATE POLICY "Allow admin to delete any link" ON public.links
    FOR DELETE USING ( public.is_admin(auth.uid()) );

-- ANALYTICS
CREATE POLICY "Allow public to insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow user to view own analytics" ON public.analytics
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Allow admin to view all analytics" ON public.analytics
    FOR SELECT USING ( public.is_admin(auth.uid()) );

-- THEMES
CREATE POLICY "Allow public read themes" ON public.themes
    FOR SELECT USING (true);

-- LINK_IMAGES
CREATE POLICY "Allow public read link_images" ON public.link_images
    FOR SELECT USING (true);

CREATE POLICY "Allow owners to insert link_images" ON public.link_images
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.links
            WHERE links.id = link_images.link_id AND links.profile_id = auth.uid()
        )
    );

CREATE POLICY "Allow owners to update link_images" ON public.link_images
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.links
            WHERE links.id = link_images.link_id AND links.profile_id = auth.uid()
        )
    );

CREATE POLICY "Allow owners to delete link_images" ON public.link_images
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.links
            WHERE links.id = link_images.link_id AND links.profile_id = auth.uid()
        )
    );

-- ==========================================
-- TRIGGER: AUTO-CREATE PROFILE ON SIGNUP
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_username VARCHAR(50);
    base_username VARCHAR(50);
    suffix INT;
    max_attempts INT := 10;
    attempt INT := 0;
BEGIN
    base_username := lower(left(split_part(NEW.email, '@', 1), 42));

    LOOP
        suffix := floor(random() * 900000 + 100000)::int;
        new_username := base_username || '_' || suffix;
        attempt := attempt + 1;

        BEGIN
            INSERT INTO public.profiles (id, username, full_name, role, avatar_url)
            VALUES (
                NEW.id,
                new_username,
                COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
                'user',
                NEW.raw_user_meta_data->>'avatar_url'
            );
            RETURN NEW;
        EXCEPTION WHEN unique_violation THEN
            IF attempt >= max_attempts THEN
                new_username := 'user_' || substr(md5(random()::text), 1, 8);
                INSERT INTO public.profiles (id, username, full_name, role, avatar_url)
                VALUES (
                    NEW.id,
                    new_username,
                    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
                    'user',
                    NEW.raw_user_meta_data->>'avatar_url'
                );
                RETURN NEW;
            END IF;
        END;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- STORAGE BUCKETS & POLICIES
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('backgrounds', 'backgrounds', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read storage backgrounds" ON storage.objects
    FOR SELECT USING (bucket_id = 'backgrounds');

CREATE POLICY "Allow public read storage avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Allow user to upload background" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'backgrounds' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Allow user to upload avatar" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'avatars' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Allow user to delete background" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'backgrounds' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Allow user to delete avatar" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'avatars' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- ==========================================
-- INITIAL PRESET THEMES
-- ==========================================
INSERT INTO public.themes (name, bg_type, bg_color, button_shape, button_style, font_family)
VALUES
    ('Minimal Dark', 'solid', '#09090b', 'rounded-2xl', 'soft', 'font-sans-theme'),
    ('Sunset Glow', 'gradient', 'linear-gradient(to bottom, #ec4899, #f97316)', 'rounded-full', 'fill', 'font-sans-theme'),
    ('Forest Breeze', 'gradient', 'linear-gradient(to bottom, #115e59, #14b8a6)', 'rounded-lg', 'outline', 'font-sans-theme'),
    ('Neo Retro', 'solid', '#facc15', 'rounded-none', 'flat', 'font-sans-theme')
ON CONFLICT DO NOTHING;

-- ==========================================
-- BULK UPDATE RPCs
-- ==========================================
CREATE OR REPLACE FUNCTION bulk_reorder_links(p_items JSONB)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.links l
  SET sort_order = (item->>'sort_order')::int
  FROM jsonb_array_elements(p_items) AS item
  WHERE l.id = (item->>'id')::uuid
    AND l.profile_id = auth.uid();
END;
$$;

CREATE OR REPLACE FUNCTION bulk_reorder_link_images(p_items JSONB)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.link_images li
  SET sort_order = (item->>'sort_order')::int
  FROM jsonb_array_elements(p_items) AS item
  WHERE li.id = (item->>'id')::uuid
    AND EXISTS (
      SELECT 1 FROM public.links l
      WHERE l.id = li.link_id AND l.profile_id = auth.uid()
    );
END;
$$;

-- ==========================================
-- ANALYTICS RETENTION
-- ==========================================
CREATE OR REPLACE FUNCTION delete_old_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.analytics WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$;

-- Note: Enable pg_cron in Supabase Dashboard -> Extensions, then run:
-- SELECT cron.schedule('delete_old_analytics_job', '0 0 * * *', 'SELECT public.delete_old_analytics();');

-- ==========================================
-- MIGRATION NOTE
-- Untuk update database yang sudah berjalan (sudah ada data), jalankan query berikut:
-- ==========================================
/*
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bg_animation VARCHAR(50) DEFAULT 'none';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bg_animation_config JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_frame VARCHAR(50) DEFAULT 'none';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_frame_config JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_placement VARCHAR(20) DEFAULT 'top';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme_lock BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS glass_blur INTEGER DEFAULT 10;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS glass_opacity INTEGER DEFAULT 20;
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS spotlight_color VARCHAR(50);
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS is_sticky_cta BOOLEAN DEFAULT false;
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS link_type VARCHAR(20) DEFAULT 'link';
*/
