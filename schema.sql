-- ==========================================
-- SCHEMA.SQL FOR BRANCH (LINKTREE CLONE)
-- ==========================================

-- 1. EXTENSIONS (Jika belum aktif)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PROFILES
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    bg_type VARCHAR(20) DEFAULT 'solid', -- 'solid', 'gradient', 'image'
    bg_color VARCHAR(50) DEFAULT '#ffffff',
    bg_image_url TEXT,
    bg_overlay_opacity INT DEFAULT 0 CHECK (bg_overlay_opacity >= 0 AND bg_overlay_opacity <= 100),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    social_links JSONB DEFAULT '{}'::jsonb,
    button_shape VARCHAR(20) DEFAULT 'rounded-2xl',
    button_style VARCHAR(20) DEFAULT 'soft',
    font_family VARCHAR(50) DEFAULT 'font-sans-theme',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. TABEL LINKS
CREATE TABLE public.links (
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- 4. TABEL ANALYTICS
CREATE TABLE public.analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    link_id UUID REFERENCES public.links(id) ON DELETE CASCADE NULL,
    device VARCHAR(50),
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;


-- Helper function to check admin role without RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- A. POLICIES UNTUK TABEL: PROFILES
-- Publik bisa melihat profil siapa saja (agar halaman /[username] bisa diakses)
CREATE POLICY "Allow public read profiles" ON public.profiles
    FOR SELECT USING (true);

-- User bisa update profil mereka sendiri
CREATE POLICY "Allow user to update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admin bisa melakukan apapun ke semua profil (RBAC)
CREATE POLICY "Allow admin full access to profiles" ON public.profiles
    FOR ALL USING ( public.is_admin(auth.uid()) );

-- B. POLICIES UNTUK TABEL: LINKS
-- Publik bisa melihat semua link (tapi di frontend nanti kita filter yang aktif & valid saja)
CREATE POLICY "Allow public read links" ON public.links
    FOR SELECT USING (true);

-- User bisa insert link milik mereka sendiri
CREATE POLICY "Allow user to insert own links" ON public.links
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- User bisa update link milik mereka sendiri
CREATE POLICY "Allow user to update own links" ON public.links
    FOR UPDATE USING (auth.uid() = profile_id);

-- User bisa delete link milik mereka sendiri
CREATE POLICY "Allow user to delete own links" ON public.links
    FOR DELETE USING (auth.uid() = profile_id);

-- Admin bisa menghapus link apa saja (RBAC)
CREATE POLICY "Allow admin to delete any link" ON public.links
    FOR DELETE USING ( public.is_admin(auth.uid()) );

-- C. POLICIES UNTUK TABEL: ANALYTICS
-- Siapa saja bisa mencatat analitik (karena visitor adalah anonim)
CREATE POLICY "Allow public to insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (true);

-- Hanya pemilik profil yang bisa membaca data analitiknya
CREATE POLICY "Allow user to view own analytics" ON public.analytics
    FOR SELECT USING (auth.uid() = profile_id);

-- Admin bisa melihat semua data analitik
CREATE POLICY "Allow admin to view all analytics" ON public.analytics
    FOR SELECT USING ( public.is_admin(auth.uid()) );


-- ==========================================
-- TRIGGERS & FUNCTIONS
-- ==========================================

-- Fungsi otomatis membuat profile ketika user baru mendaftar di Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_username VARCHAR(50);
BEGIN
    -- Buat username unik default berdasarkan email
    new_username := lower(split_part(NEW.email, '@', 1)) || '_' || floor(random() * 1000)::text;
    
    INSERT INTO public.profiles (id, username, full_name, role, avatar_url)
    VALUES (
        NEW.id,
        new_username,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'user',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger setelah insert di auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- STORAGE SETUP (BUCKETS & POLICIES)
-- ==========================================

-- Catatan: Jalankan query insert bucket ini jika Anda tidak ingin membuatnya manual lewat Dashboard GUI
INSERT INTO storage.buckets (id, name, public) 
VALUES ('backgrounds', 'backgrounds', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- RLS untuk Bucket backgrounds & avatars
-- Publik bisa membaca file gambar
CREATE POLICY "Allow public read storage backgrounds" ON storage.objects
    FOR SELECT USING (bucket_id = 'backgrounds');

CREATE POLICY "Allow public read storage avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

-- User terautentikasi bisa mengunggah ke foldernya sendiri (nama folder sesuai user_id)
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

-- User terautentikasi bisa menghapus file di foldernya sendiri
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
-- PHASE 1 UPGRADES
-- ==========================================

-- Alter public.links table
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS link_type VARCHAR(20) DEFAULT 'link';
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Alter public.profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS show_branding BOOLEAN DEFAULT true;

-- Create themes table
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

-- Enable RLS for themes
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to themes
CREATE POLICY "Allow public read themes" ON public.themes
    FOR SELECT USING (true);

-- Insert initial preset themes
INSERT INTO public.themes (name, bg_type, bg_color, button_shape, button_style, font_family)
VALUES 
    ('Minimal Dark', 'solid', '#09090b', 'rounded-2xl', 'soft', 'font-sans-theme'),
    ('Sunset Glow', 'gradient', 'linear-gradient(to bottom, #ec4899, #f97316)', 'rounded-full', 'fill', 'font-sans-theme'),
    ('Forest Breeze', 'gradient', 'linear-gradient(to bottom, #115e59, #14b8a6)', 'rounded-lg', 'outline', 'font-sans-theme'),
    ('Neo Retro', 'solid', '#facc15', 'rounded-none', 'flat', 'font-sans-theme')
ON CONFLICT DO NOTHING;


-- ==========================================
-- PHASE 2 UPGRADES
-- ==========================================

-- 1. Alter public.links table to support Spotlight, Animations, and explicit Embed Type
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS embed_type VARCHAR(50);
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS is_spotlight BOOLEAN DEFAULT false;
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS animation VARCHAR(50);

-- 2. Create public.link_images table for Image Carousel/Gallery
CREATE TABLE IF NOT EXISTS public.link_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    link_id UUID REFERENCES public.links(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE public.link_images ENABLE ROW LEVEL SECURITY;

-- 4. Set up RLS Policies for link_images
CREATE POLICY Allow_public_read_link_images ON public.link_images
    FOR SELECT USING (true);

CREATE POLICY Allow_owners_to_insert_link_images ON public.link_images
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.links
            WHERE links.id = link_images.link_id AND links.profile_id = auth.uid()
        )
    );

CREATE POLICY Allow_owners_to_update_link_images ON public.link_images
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.links
            WHERE links.id = link_images.link_id AND links.profile_id = auth.uid()
        )
    );

CREATE POLICY Allow_owners_to_delete_link_images ON public.link_images
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.links
            WHERE links.id = link_images.link_id AND links.profile_id = auth.uid()
        )
    );

-- ==========================================
-- PHASE 3: ADVANCED ANALYTICS & SEO EXTENSIONS
-- ==========================================

-- 1. Extend analytics table with Geolocation & UTM tracking fields
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100);
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100);
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100);

-- 2. Extend profiles table with Custom SEO, Pixels, Google Analytics, and Custom Domain fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS meta_pixel_id VARCHAR(100);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tiktok_pixel_id VARCHAR(100);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ga_measurement_id VARCHAR(100);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS custom_domain VARCHAR(255);

-- ==========================================
-- PHASE 4: ENHANCED APPEARANCE & CUSTOMIZATION
-- ==========================================

-- 1. Extend profiles table with global style controls, banners, and layout alignments
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS text_color VARCHAR(50) DEFAULT '#ffffff';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_style VARCHAR(30) DEFAULT 'circle';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_align VARCHAR(20) DEFAULT 'center';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_shape VARCHAR(20) DEFAULT 'circle';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS link_spacing VARCHAR(20) DEFAULT 'normal';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_size VARCHAR(20) DEFAULT 'medium';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bg_video_url TEXT;



