# 🌿 Branch vs Linktree — Full Feature Gap Analysis & Roadmap

## Tujuan

Menganalisis **semua fitur Linktree** (Free, Starter, Pro, Premium) dan membandingkannya dengan fitur Branch saat ini, lalu menyusun roadmap pengembangan agar Branch bisa **menyamai atau melampaui** Linktree.

---

## 📊 Audit Fitur Branch Saat Ini

Berdasarkan analisis kode (`schema.sql`, server actions, components, pages):

| Kategori | Fitur yang Sudah Ada |
|:---|:---|
| **Auth** | Login, Register (Supabase Auth) |
| **Profil** | Username, Full Name, Bio, Avatar (upload + crop) |
| **Links** | CRUD links, Drag-and-drop reorder, Toggle aktif/nonaktif |
| **Link Styling** | Custom BG color, text color, opacity, icon color per-link, icon position, show/hide icon |
| **Link Scheduling** | `valid_from` & `valid_until` (scheduling sudah ada ✅) |
| **Embed** | Toggle `is_embed` untuk embed content |
| **Appearance** | BG solid/gradient/image, button shape, button style, font family, Apply styles to all links |
| **Social Icons** | 29 platform (Instagram, TikTok, YouTube, dll.) sebagai social links |
| **Analytics** | Total views, clicks, CTR, chart 7 hari, top performing links, referrer sources, device breakdown |
| **SEO** | OpenGraph + Twitter Card meta tags di halaman publik |
| **Public Page** | `/{username}` dengan animated profile, link filtering by schedule |
| **Admin RBAC** | Role-based access (user/admin) di database level |

---

## 🔍 Full Feature Comparison Matrix

> ✅ = Sudah ada | ⚠️ = Partial/Perlu upgrade | ❌ = Belum ada

### A. Link Management

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 1 | Unlimited links & buttons | ✅ | Free | — |
| 2 | Link drag-and-drop reorder | ✅ | Free | — |
| 3 | Link toggle on/off | ✅ | Free | — |
| 4 | Link scheduling (timed visibility) | ✅ | Starter+ | — |
| 5 | **Link thumbnails/icons** (custom image per link) | ❌ | Free | 🔴 High |
| 6 | **Header/divider links** (section separator) | ❌ | Free | 🔴 High |
| 7 | **Priority/Spotlight link** (animasi highlight) | ❌ | Starter+ | 🟡 Medium |
| 8 | **Link animation effects** (shake, pulse, glow) | ❌ | Starter+ | 🟡 Medium |
| 9 | **Lock/gate links** (password protection) | ❌ | Pro+ | 🟡 Medium |
| 10 | **Sensitive content warning** (age gate) | ❌ | Free | 🟡 Medium |
| 11 | **Link click limit** (auto-disable after N clicks) | ❌ | Pro+ | 🟢 Low |
| 12 | **UTM parameter builder** per link | ❌ | Pro+ | 🟢 Low |

### B. Appearance & Customization

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 13 | Background solid color | ✅ | Free | — |
| 14 | Background gradient | ✅ | Starter+ | — |
| 15 | Background image upload | ✅ | Starter+ | — |
| 16 | Button shape customization | ✅ | Free | — |
| 17 | Button style variants | ✅ | Free | — |
| 18 | Font family selection | ✅ | Free | — |
| 19 | Per-link color customization | ✅ | Starter+ | — |
| 20 | **Background video** | ❌ | Pro+ | 🟡 Medium |
| 21 | **Preset themes/templates gallery** | ❌ | Free | 🔴 High |
| 22 | **Remove Branch branding** (white-label) | ❌ | Starter+ | 🔴 High |
| 23 | **Custom fonts upload** | ❌ | Pro+ | 🟢 Low |
| 24 | **Profile video avatar** (animated PFP) | ❌ | Pro+ | 🟡 Medium |
| 25 | **Hero image/banner** di atas profile | ❌ | Starter+ | 🟡 Medium |

### C. Embed & Media

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 26 | Basic URL embed toggle | ✅ | Free | — |
| 27 | **YouTube video embed** (inline player) | ❌ | Free | 🔴 High |
| 28 | **Spotify/Music embed** (inline player) | ❌ | Free | 🔴 High |
| 29 | **TikTok video embed** | ❌ | Free | 🟡 Medium |
| 30 | **Twitch stream embed** | ❌ | Free | 🟢 Low |
| 31 | **SoundCloud embed** | ❌ | Free | 🟢 Low |
| 32 | **Image carousel/gallery** | ❌ | Pro+ | 🟡 Medium |

### D. Analytics & Insights

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 33 | Total views & clicks | ✅ | Free | — |
| 34 | Click-through rate | ✅ | Free | — |
| 35 | Performance chart (7 hari) | ✅ | Starter+ | — |
| 36 | Top performing links | ✅ | Starter+ | — |
| 37 | Referrer/traffic sources | ✅ | Starter+ | — |
| 38 | Device breakdown | ✅ | Starter+ | — |
| 39 | **Geolocation/top countries** | ❌ | Pro+ | 🔴 High |
| 40 | **Custom date range filter** | ❌ | Starter+ | 🔴 High |
| 41 | **Lifetime analytics history** | ❌ | Premium | 🟡 Medium |
| 42 | **UTM tracking & campaign analytics** | ❌ | Pro+ | 🟡 Medium |
| 43 | **Export analytics data** (CSV/PDF) | ❌ | Pro+ | 🟡 Medium |
| 44 | **Real-time visitor counter** | ❌ | Pro+ | 🟢 Low |

### E. Monetization & Commerce

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 45 | **Tip jar / Donations** (PayPal/Stripe) | ❌ | Free | 🔴 High |
| 46 | **Digital product sales** (file downloads) | ❌ | Starter+ | 🟡 Medium |
| 47 | **Shoppable storefront** (product cards) | ❌ | Pro+ | 🟡 Medium |
| 48 | **Payment gateway integration** (Stripe/PayPal) | ❌ | Starter+ | 🔴 High |
| 49 | **Affiliate/referral link support** | ❌ | Pro+ | 🟢 Low |

### F. Marketing & Integrations

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 50 | **Email/subscriber collection form** | ❌ | Starter+ | 🔴 High |
| 51 | **Mailchimp integration** | ❌ | Pro+ | 🟡 Medium |
| 52 | **Meta Pixel / TikTok Pixel** tracking | ❌ | Pro+ | 🟡 Medium |
| 53 | **Google Analytics integration** | ❌ | Pro+ | 🟡 Medium |
| 54 | **Zapier / webhook integration** | ❌ | Premium | 🟢 Low |
| 55 | **Instagram DM automation** | ❌ | Premium | 🟢 Low |

### G. SEO & Branding

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 56 | OpenGraph meta tags | ✅ | Free | — |
| 57 | Twitter Card meta tags | ✅ | Free | — |
| 58 | **Custom SEO title & description** (user-editable) | ❌ | Pro+ | 🔴 High |
| 59 | **Custom domain** (yourdomain.com) | ❌ | Pro+ | 🔴 High |
| 60 | **Favicon customization** | ❌ | Pro+ | 🟢 Low |

### H. QR Code & Sharing

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 61 | **QR code generator** (download PNG/SVG) | ❌ | Free | 🔴 High |
| 62 | **QR code customization** (logo, color) | ❌ | Starter+ | 🟡 Medium |
| 63 | **Share page link** (copy URL button) | ⚠️ | Free | 🔴 High |
| 64 | **Social sharing buttons** | ❌ | Free | 🟢 Low |

### I. Account & Platform

| # | Fitur Linktree | Branch | Tier LT | Prioritas |
|:--|:---|:---:|:---:|:---:|
| 65 | **Verified badge** (blue checkmark) | ❌ | Starter+ | 🟡 Medium |
| 66 | **Multi-admin access** (invite collaborators) | ❌ | Premium | 🟡 Medium |
| 67 | **Team workspaces** (multi-linktree management) | ❌ | Premium | 🟢 Low |
| 68 | **NFT gallery / Web3 integration** | ❌ | Pro+ | 🟢 Low |
| 69 | **Two-factor authentication (2FA)** | ❌ | Free | 🟡 Medium |
| 70 | **Account deletion / data export** (GDPR) | ❌ | Free | 🟡 Medium |

### J. Landing Page (Homepage Branch)

| # | Fitur | Branch | Prioritas |
|:--|:---|:---:|:---:|
| 71 | **Landing page profesional** (marketing site) | ⚠️ | 🔴 High |
| 72 | **Pricing page** | ❌ | 🟡 Medium |
| 73 | **Explore/discover page** (public profiles) | ❌ | 🟡 Medium |
| 74 | **Blog / Help center** | ❌ | 🟢 Low |
| 75 | **Template showcase page** | ❌ | 🟡 Medium |

---

## 🗺️ Phased Development Roadmap

### Phase 1 — Quick Wins & Core Parity (1-2 minggu)
> Fitur fundamental yang harus ada agar Branch terasa "lengkap"

| # | Fitur | Kompleksitas | Schema Change? |
|:--|:---|:---:|:---:|
| 5 | Link thumbnails/icons (custom image per link) | Medium | ✅ `thumbnail_url TEXT` di `links` |
| 6 | Header/divider links (section separator) | Easy | ✅ `link_type VARCHAR` di `links` |
| 21 | Preset themes/templates gallery | Medium | ✅ Tabel baru `themes` |
| 22 | Remove Branch branding (white-label) | Easy | ✅ `show_branding BOOLEAN` di `profiles` |
| 61 | QR code generator | Easy | Tidak |
| 63 | Share/copy URL button | Easy | Tidak |
| 71 | Landing page upgrade | Medium | Tidak |

---

### Phase 2 — Media & Embed System (1-2 minggu)
> Rich media yang membuat halaman publik lebih interaktif

| # | Fitur | Kompleksitas | Schema Change? |
|:--|:---|:---:|:---:|
| 27 | YouTube video embed (inline player) | Medium | ✅ `embed_type VARCHAR` di `links` |
| 28 | Spotify/Music embed (inline player) | Medium | Sama dgn #27 |
| 29 | TikTok video embed | Medium | Sama dgn #27 |
| 32 | Image carousel/gallery | Hard | ✅ Tabel baru `link_images` |
| 7 | Priority/Spotlight link | Easy | ✅ `is_spotlight BOOLEAN` di `links` |
| 8 | Link animation effects | Medium | ✅ `animation VARCHAR` di `links` |

---

### Phase 3 — Advanced Analytics & SEO (1-2 minggu)
> Data insights yang lebih dalam + branding control

| # | Fitur | Kompleksitas | Schema Change? |
|:--|:---|:---:|:---:|
| 39 | Geolocation/top countries | Medium | ✅ `country VARCHAR`, `city VARCHAR` di `analytics` |
| 40 | Custom date range filter | Medium | Tidak |
| 42 | UTM tracking & campaign | Medium | ✅ `utm_source`, `utm_medium`, `utm_campaign` di `analytics` |
| 43 | Export analytics (CSV) | Easy | Tidak |
| 58 | Custom SEO title & description | Easy | ✅ `seo_title`, `seo_description` di `profiles` |
| 59 | Custom domain | Hard | ✅ `custom_domain VARCHAR` di `profiles` + DNS setup |
| 52 | Meta Pixel / TikTok Pixel | Easy | ✅ `meta_pixel_id`, `tiktok_pixel_id` di `profiles` |
| 53 | Google Analytics integration | Easy | ✅ `ga_measurement_id` di `profiles` |

---

### Phase 4 — Monetization & Commerce (2-3 minggu)
> Fitur yang memungkinkan creator menghasilkan uang

| # | Fitur | Kompleksitas | Schema Change? |
|:--|:---|:---:|:---:|
| 45 | Tip jar / Donations | Hard | ✅ Tabel baru `payments`, integrasi Stripe/PayPal |
| 48 | Payment gateway (Stripe/PayPal) | Hard | ✅ `stripe_account_id` di `profiles` |
| 46 | Digital product sales | Hard | ✅ Tabel baru `products`, `orders` |
| 47 | Shoppable storefront | Hard | Component baru di public page |
| 50 | Email/subscriber collection | Medium | ✅ Tabel baru `subscribers` |

---

### Phase 5 — Marketing & Integrations (1-2 minggu)
> Koneksi ke ekosistem marketing tools

| # | Fitur | Kompleksitas | Schema Change? |
|:--|:---|:---:|:---:|
| 51 | Mailchimp integration | Medium | ✅ `mailchimp_api_key` di `profiles` |
| 9 | Lock/gate links (password) | Medium | ✅ `password_hash VARCHAR` di `links` |
| 10 | Sensitive content warning | Easy | ✅ `age_gate VARCHAR` di `profiles` |
| 20 | Background video | Medium | Sudah ada `bg_image_url` (extend ke video) |
| 24 | Profile video avatar | Medium | ✅ `avatar_type VARCHAR` di `profiles` |
| 25 | Hero image/banner | Easy | ✅ `banner_url TEXT` di `profiles` |
| 62 | QR code customization | Medium | Tidak |

---

### Phase 6 — Enterprise & Platform (3-4 minggu)
> Fitur tier premium dan platform-level

| # | Fitur | Kompleksitas | Schema Change? |
|:--|:---|:---:|:---:|
| 65 | Verified badge | Medium | ✅ `is_verified BOOLEAN`, `badge_type VARCHAR` di `profiles` |
| 66 | Multi-admin access | Hard | ✅ Tabel baru `team_members` |
| 67 | Team workspaces | Hard | ✅ Tabel baru `workspaces` |
| 69 | Two-factor auth (2FA) | Medium | Supabase config |
| 70 | Account deletion / GDPR | Medium | API endpoint |
| 72 | Pricing page | Medium | Tidak |
| 73 | Explore/discover page | Medium | Tidak |
| 75 | Template showcase | Easy | Tidak |

---

## 📋 Schema Changes Summary

Perubahan database yang diperlukan secara keseluruhan:

### Modifikasi Tabel `profiles`
```sql
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS
  show_branding BOOLEAN DEFAULT true,
  seo_title VARCHAR(100),
  seo_description TEXT,
  custom_domain VARCHAR(255),
  meta_pixel_id VARCHAR(100),
  tiktok_pixel_id VARCHAR(100),
  ga_measurement_id VARCHAR(50),
  stripe_account_id VARCHAR(100),
  mailchimp_api_key VARCHAR(255),
  age_gate VARCHAR(20),         -- 'none', '18+', '21+', 'sensitive'
  banner_url TEXT,
  avatar_type VARCHAR(20) DEFAULT 'image', -- 'image', 'video'
  is_verified BOOLEAN DEFAULT false,
  badge_type VARCHAR(20);       -- 'blue', 'gold', null
```

### Modifikasi Tabel `links`
```sql
ALTER TABLE public.links ADD COLUMN IF NOT EXISTS
  link_type VARCHAR(20) DEFAULT 'link', -- 'link', 'header', 'divider', 'embed'
  thumbnail_url TEXT,
  embed_type VARCHAR(30),     -- 'youtube', 'spotify', 'tiktok', 'soundcloud', etc.
  is_spotlight BOOLEAN DEFAULT false,
  animation VARCHAR(30),      -- 'none', 'shake', 'pulse', 'glow', 'bounce'
  password_hash VARCHAR(255);
```

### Modifikasi Tabel `analytics`
```sql
ALTER TABLE public.analytics ADD COLUMN IF NOT EXISTS
  country VARCHAR(100),
  city VARCHAR(100),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100);
```

### Tabel Baru
```sql
-- Tema preset
CREATE TABLE public.themes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  preview_url TEXT,
  bg_type VARCHAR(20),
  bg_color VARCHAR(50),
  button_shape VARCHAR(20),
  button_style VARCHAR(20),
  font_family VARCHAR(50),
  is_premium BOOLEAN DEFAULT false,
  category VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriber collection
CREATE TABLE public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Digital products (commerce)
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  file_url TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders / payments
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id),
  profile_id UUID REFERENCES public.profiles(id),
  buyer_email VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_provider VARCHAR(20),  -- 'stripe', 'paypal'
  payment_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members (multi-admin)
CREATE TABLE public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'editor', -- 'editor', 'viewer', 'admin'
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, member_id)
);
```

---

## 🏆 Fitur Dimana Branch Bisa MELAMPAUI Linktree

Linktree memiliki beberapa kelemahan yang bisa dieksploitasi:

| Kelemahan Linktree | Peluang Branch |
|:---|:---|
| ❌ Tidak ada Custom CSS editor | ✅ Buat CSS injection / advanced styling |
| ❌ Tidak ada dark mode toggle untuk visitor | ✅ Buat auto dark/light mode |
| ❌ Template hanya built-in, tidak ada marketplace | ✅ Buat community theme marketplace |
| ❌ Analytics terbatas per tier | ✅ Berikan analytics lengkap di semua tier |
| ❌ Commerce fee 12% di free tier | ✅ No fee / lower fee model |
| ❌ Tidak ada multi-language support | ✅ Buat i18n support (ID/EN) |
| ❌ Tidak ada blog/article block | ✅ Buat rich content blocks |
| ❌ Loading speed lambat | ✅ Next.js SSR = instant load |
| ❌ Tidak ada PWA support | ✅ Buat installable PWA |
| ❌ Tidak ada contact form block | ✅ Buat inline contact form |

---

## Open Questions

> [!IMPORTANT]
> Sebelum mulai eksekusi, mohon feedback untuk pertanyaan berikut:

1. **Prioritas mana yang ingin dikerjakan duluan?** Apakah ikut Phase 1 → 6 secara berurutan, atau ada fitur tertentu yang ingin didahulukan?
2. **Monetization model**: Apakah Branch akan punya sistem tier berbayar (Free/Pro/Premium) seperti Linktree, atau semua fitur gratis?
3. **Payment integration**: Untuk fitur Tip Jar & Commerce, prefer **Stripe**, **PayPal**, atau **Midtrans** (untuk pasar Indonesia)?
4. **Custom domain**: Apakah ini prioritas tinggi? Implementasinya cukup kompleks karena butuh DNS verification dan SSL certificate management.
5. **Bahasa**: Apakah UI Branch mau bilingual (Indonesia + English) atau English only?

---

## Verification Plan

### Setiap Phase selesai:
- `npm run build` — pastikan tidak ada build errors
- Test manual di browser untuk setiap fitur baru
- Verifikasi database migration berhasil di Supabase
- Test responsive di mobile viewport

### End-to-End:
- Buat test account baru → register → setup profile → add links → view public page
- Verifikasi analytics tracking berfungsi
- Test semua embed types (YouTube, Spotify, dll)
