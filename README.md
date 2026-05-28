# Branch

<div align="center">

**The Open-Source, Ultra-Customizable, Developer-First Link-in-Bio Platform.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-4169e1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A self-hostable Linktree alternative with **real-time visual editor**, **privacy-first analytics**, **link scheduling**, **rich media embeds**, and **absolute creative freedom** — all running on Next.js 16.

[Explore Features](#key-features) • [Tech Stack](#tech-stack) • [Architecture](#architecture) • [Database Schema](#database-schema) • [Installation](#getting-started) • [API Reference](#api-endpoints)

</div>

---

## Key Features

### 🎨 Unlimited Visual Customization

| Category | Options |
|---|---|
| **Backgrounds** | Solid, gradient, image, video — plus 7 live animations (Aurora, Matrix, Snowfall, Stars, Particles, Confetti, Bokeh) with per-animation config panels |
| **Button Styles** | 9 styles: Filled, Outline, Soft, Shadow, Neumorphism, Glassmorphism, Neon Glow, Brutalism, Claymorphism — each with SVG-filter variants for clipped shapes |
| **Button Shapes** | 8 shapes: Square, Rounded, Curve, Pill, Cut Corners, Leaf, Hexagon, Diamond — CSS `clip-path` powered |
| **Buttons Hover Effects** | 8 effects: Scale, Lift, Glow, Wobble, Pulse, Shine, Glitch |
| **Typography** | 12 font families (Inter, Outfit, Georgia, Space Mono, Caveat, Comic Neue, Playfair, Press Start 2P, Space Grotesk, Bebas Neue, Righteous, Dancing Script) |
| **Avatar** | 3 shapes (circle, square, hexagon), 3 sizes (S/M/L), 2 frames (gradient-ring, neon-glow) |
| **Layout** | List/grid, left/center/right alignment, compact/normal/relaxed spacing, glassmorphism container with configurable blur & opacity |
| **Social Icons** | 29+ platform presets with brand icons, 4 style variants (circle, outline, square, minimal), top/bottom placement |
| **Per-Link Styling** | Individual background color, text color, opacity, icon color, icon position, spotlight + animation on any link |
| **Theme Lock** | Disable visitor dark/light mode toggle to preserve your design |

### 📱 Real-Time Live Preview Canvas

The dashboard features a **phone mockup preview** that updates instantly as you tweak styles. Powered by **Zustand** — no more CustomEvent bridging, no stale preview state.

- Every background, button, font, and layout change reflects in real-time
- Drag-and-drop link reordering is mirrored live
- Preview is server-side rendered on first load, then hydrated with client state

### ⏰ Link Scheduling & Spotlight

- **Date-time scheduling:** Set `valid_from` / `valid_until` on any link — links auto-hide outside the window
- **Visual calendar picker:** Custom `DateTimePicker` component replaces native `<input type="datetime-local">`
- **Spotlight animations:** Mark links as "spotlight" with configurable glow color, plus per-link animations (pulse, bounce, shake, wobble, glow)
- **Sticky CTA:** Pin a link to the bottom of the page permanently

### 📊 Privacy-First Analytics

Self-hosted, no third-party tracking scripts. Page views and clicks are recorded via your own `/api/analytics` endpoint.

| Metric | Detail |
|---|---|
| **Views & Clicks** | Total counts + per-link breakdown |
| **Click-Through Rate** | Clicks ÷ Views × 100 |
| **Time-Series Chart** | 7/30/90-day interactive line chart (Recharts) |
| **Top Links** | Sorted bar chart of most-clicked links |
| **Referrers** | Hostname-extracted traffic sources |
| **Devices** | Mobile vs Desktop breakdown |
| **Geolocation** | Country + City (via ip-api.com) |
| **UTM Tracking** | Source, medium, campaign dimensions |
| **CSV Export** | Full raw data download with all columns |

Includes **rate limiting** (100 req/min per IP, 30 req/min per profile) and **90-day automatic retention cleanup** via cron.

### 🔗 Rich Media Embed & Carousels

- **Embeds:** YouTube, Spotify, TikTok — rendered as interactive iframes
- **Image Carousels:** Horizontal scroll galleries inside links, with drag-and-drop image management
- **Section Headers:** Decorative title dividers between link groups

### 🌐 Custom Domain Support

- Point your own domain via CNAME
- **DNS verification** via DNS-over-HTTPS (Cloudflare) — checks `TXT` record for `branch-verification=<user_id>`
- Verified status shown in dashboard settings

### 🔐 Authentication & Security

- Supabase SSR auth (cookie-based sessions)
- Password reset flow (forgot/reset password pages)
- PostgreSQL Row-Level Security (RLS) — users can only access their own data
- Admin role detection for elevated access

### 🏷️ White-Label Branding

Toggle "Powered by Branch" footer visibility. Free users see the branding; **premium plan** users can hide it (plan gating enforced both server-side and UI-side).

### 📤 Social Sharing

Share your profile via Twitter/X, WhatsApp, Telegram, Facebook, native Web Share API, copy link, or **QR code** (powered by `qrcode.react`).

### 🚀 Client-Side Optimization

- **Image compression:** Client-side canvas resize + JPEG compress before upload (max 1920px, 0.85 quality)
- **SVG filter consolidation:** All button-style SVG filters (brutalism, claymorphism, glassmorphism, neumorphism, outline, shadow, neon) are defined once in a shared `<SVGFilters />` component — no per-link filter duplication
- **Zustand over CustomEvent:** Replaced fragile `window.dispatchEvent` pattern with Zustand store for live preview state management

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** (App Router) | 16.2.6 | Framework — Server Actions, RSC, dynamic routing |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Type safety throughout |
| **Tailwind CSS** | v4 (CSS-first) | Utility-first styling |
| **Supabase** | ssr 0.10.3 / js 2.105.4 | PostgreSQL database, auth, file storage |
| **PostgreSQL** | 15+ | Relational database with RLS |
| **Framer Motion** | 12.38.0 | Animations & transitions |
| **Zustand** | 5.0.13 | Client-side state management (live preview) |
| **@dnd-kit** | core 6.3.1 / sortable 10.0.0 | Drag-and-drop link reordering |
| **React Hook Form** | 7.76.0 | Form state management |
| **Zod** | 4.4.3 | Schema validation (server + client) |
| **Recharts** | 3.8.0 | Analytics charts |
| **Lucide React** | 1.16.0 | UI icons |
| **React Icons** | 5.6.0 | Social platform brand icons |
| **Sonner** | 2.0.7 | Toast notifications |
| **qrcode.react** | 4.2.0 | QR code generation |
| **react-colorful** | 5.7.0 | Color picker |
| **shadcn/ui** | 4.7.0 | Primitive UI components |
| **class-variance-authority** | 0.7.1 | Component variants |
| **tailwind-merge** | 3.6.0 | Tailwind class merging |
| **next-themes** | 0.4.6 | Dark/light mode toggle |
| **Vitest** | 4.1.7 | Unit & component testing |
| **pg** | 8.20.0 | PostgreSQL client (migrations) |

---

## Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Browser                              │
│  ┌────────────┐          ┌───────────────────────────┐  │
│  │  Public     │          │  Dashboard (Client)       │  │
│  │  Profile    │          │                           │  │
│  │  [username] │          │  AppearanceManager ───────┼──┐
│  │             │          │       │                   │  │
│  │  Animated   │          │  usePreviewStore (Zustand)│  │
│  │  Profile    │          │       │                   │  │
│  └──────┬──────┘          │  LivePreview ◄────────────┼──┤
│         │                 │       │                   │  │
│         │                 │  Server Actions (use server)│  │
│         │                 └───────┼───────────────────┘  │
└─────────┼─────────────────────────┼──────────────────────┘
          │                         │
          ▼                         ▼
┌──────────────────────────────────────────────────────────┐
│                    Next.js Server                        │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────────┐  │
│  │ Server   │  │ Server    │  │ API Routes           │  │
│  │ Actions  │  │ Components│  │ /api/analytics       │  │
│  │          │  │           │  │ /api/verify-domain   │  │
│  │ auth/    │  │ [username]│  │ /api/migrate         │  │
│  │ link-    │  │ /dashboard│  │ /api/cron/*          │  │
│  │ profile- │  │           │  └──────────────────────┘  │
│  │ analytics│  └───────────┘                            │
│  └────┬─────┘                                           │
│       │                                                 │
└───────┼─────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────┐
│  Supabase                                               │
│  ┌──────────┐  ┌────────────┐  ┌────────────────────┐  │
│  │ Auth     │  │ PostgreSQL │  │ Storage (images)   │  │
│  │ (SSR     │  │ - profiles │  │ - avatars          │  │
│  │  cookies)│  │ - links    │  │ - backgrounds      │  │
│  │          │  │ - analytics│  └────────────────────┘  │
│  │          │  │ - themes   │                          │
│  │          │  │ - link_imgs│                          │
│  │          │  └────────────┘                          │
│  └──────────┘                                          │
└──────────────────────────────────────────────────────────┘
```

### Routing

| Route | Type | Description |
|---|---|---|
| `/` | Static | Landing page with interactive theme demo |
| `/login`, `/register` | Static | Authentication pages |
| `/forgot-password`, `/reset-password` | Static | Password reset flow |
| `/{username}` | Dynamic SSR | Public profile page with SEO metadata |
| `/dashboard` | Protected | Link manager (drag-and-drop CRUD) |
| `/dashboard/appearance` | Protected | Full visual editor with live preview |
| `/dashboard/analytics` | Protected | Analytics dashboard with charts & CSV |
| `/dashboard/settings` | Protected | SEO tags, pixels, custom domain |

### Middleware

- **Auth protection:** Redirects unauthenticated users from `/dashboard/*` to `/login`
- **Auth redirect:** Redirects authenticated users from `/login` or `/register` to `/dashboard`
- **Custom domain routing:** If `Host` header matches a `custom_domain`, rewrites to the correct `/{username}` route

### SVG Filter Architecture

All CSS-clipped button shapes use SVG filters defined in a single `<SVGFilters />` component (rendered once in the root layout):

| Filter ID | Style | Technique |
|---|---|---|
| `svg-outline` | Outline | `feMorphology` dilate + `feComposite` out |
| `svg-shadow` | Shadow | `feOffset` + `feGaussianBlur` + outline |
| `svg-neon` | Neon Glow | Dual `feGaussianBlur` + `feComposite` with CSS variable color |
| `svg-brutalism` | Brutalism | 1px border + 3×3 offset shadow |
| `svg-claymorphism` | Claymorphism | Soft inner highlights + outer shadow |
| `svg-neumorphism` | Neumorphism | Dual outer shadows + dual inner highlights |
| `svg-glassmorphism` | Glassmorphism | Outer shadow + top-left highlight + thin outline |

The neon filter uses CSS custom properties (`--neon-glow-color`) for per-link color variation without duplicating the SVG element.

---

## Database Schema

### Tables

#### `profiles`
Core user profile — stores all customization settings and account data.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | `UUID` PK | `gen_random_uuid()` | References `auth.users` ON DELETE CASCADE |
| `username` | `VARCHAR(50)` UNIQUE | Random 12-char | Public profile URL slug |
| `full_name` | `VARCHAR(100)` | — | Display name |
| `bio` | `TEXT` | — | Short biography |
| `avatar_url` | `TEXT` | — | Avatar image URL (Supabase storage) |
| `banner_url` | `TEXT` | — | Hero banner image URL |
| `bg_type` | `VARCHAR(20)` | `'solid'` | `solid`, `gradient`, `image`, `video` |
| `bg_color` | `VARCHAR(50)` | `'#09090b'` | Hex color or CSS gradient |
| `bg_image_url` | `TEXT` | — | Background image URL |
| `bg_video_url` | `TEXT` | — | Background video URL |
| `bg_overlay_opacity` | `INT` | `40` | Dark overlay opacity (0–100) |
| `bg_animation` | `VARCHAR(50)` | — | `aurora`, `matrix`, `snowfall`, `stars`, `particles`, `confetti`, `bokeh` |
| `bg_animation_config` | `JSONB` | — | Per-animation parameters |
| `text_color` | `VARCHAR(50)` | — | Custom text color |
| `button_shape` | `VARCHAR(20)` | — | `square`, `rounded`, `curve`, `pill`, `cut-corners`, `leaf`, `hexagon`, `diamond` |
| `button_style` | `VARCHAR(20)` | — | `fill`, `outline`, `soft`, `shadow`, `neumorphism`, `glassmorphism`, `neon`, `brutalism`, `claymorphism` |
| `button_hover_effect` | `VARCHAR(20)` | — | `scale`, `lift`, `glow`, `wobble`, `pulse`, `shine`, `glitch` |
| `font_family` | `VARCHAR(50)` | — | Font choice (12 options) |
| `theme_style` | `VARCHAR(20)` | `'solid'` | `solid` or `glass` |
| `theme_lock` | `BOOLEAN` | `false` | Disable visitor theme toggle |
| `glass_blur` | `INTEGER` | — | Glass blur in px |
| `glass_opacity` | `INTEGER` | — | Glass opacity % |
| `layout_type` | `VARCHAR(20)` | — | `list` or `grid` |
| `profile_align` | `VARCHAR(20)` | — | `center`, `left`, `right` |
| `link_spacing` | `VARCHAR(20)` | — | `compact`, `normal`, `relaxed` |
| `avatar_shape` | `VARCHAR(20)` | — | `circle`, `rounded`, `hexagon` |
| `avatar_size` | `VARCHAR(20)` | — | `small`, `medium`, `large` |
| `avatar_frame` | `VARCHAR(50)` | — | `none`, `gradient-ring`, `neon-glow` |
| `avatar_frame_config` | `JSONB` | — | Frame color configuration |
| `social_links` | `JSONB` | — | Social platform key-value store |
| `social_style` | `VARCHAR(30)` | — | `circle`, `outline`, `square`, `minimal` |
| `social_placement` | `VARCHAR(20)` | — | `top` or `bottom` |
| `show_branding` | `BOOLEAN` | `true` | Show "Powered by Branch" footer |
| `role` | `VARCHAR(20)` | `'user'` | `user` or `admin` |
| `plan` | `TEXT` | `'free'` | `free` or `premium` (gates white-label) |
| `seo_title` | `VARCHAR(120)` | — | Custom SEO title |
| `seo_description` | `TEXT` | — | Custom meta description |
| `custom_domain` | `VARCHAR(255)` | — | Custom domain name |
| `domain_verified` | `BOOLEAN` | `false` | DNS verification status |
| `meta_pixel_id` | `VARCHAR(100)` | — | Facebook Meta Pixel ID |
| `tiktok_pixel_id` | `VARCHAR(100)` | — | TikTok Pixel ID |
| `ga_measurement_id` | `VARCHAR(50)` | — | Google Analytics GA4 ID |
| `created_at` | `TIMESTAMPTZ` | `now()` | — |
| `updated_at` | `TIMESTAMPTZ` | `now()` | — |

#### `links`
Individual links, headers, and carousels for a profile.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` PK | Auto-generated |
| `profile_id` | `UUID` FK | References `profiles.id` ON DELETE CASCADE |
| `title` | `VARCHAR(100)` | Link text / header title |
| `url` | `TEXT` | Link URL (empty for headers) |
| `link_type` | `VARCHAR(20)` | `link`, `header`, or `carousel` |
| `is_active` | `BOOLEAN` | Active toggle |
| `sort_order` | `INT` | Display order |
| `is_embed` | `BOOLEAN` | Enable embedded player |
| `embed_type` | `VARCHAR(50)` | `youtube`, `spotify`, or `tiktok` |
| `valid_from` | `TIMESTAMPTZ` | Schedule start |
| `valid_until` | `TIMESTAMPTZ` | Schedule end |
| `is_spotlight` | `BOOLEAN` | Enable spotlight effect |
| `spotlight_color` | `VARCHAR(50)` | Spotlight glow color |
| `animation` | `VARCHAR(50)` | `pulse`, `bounce`, `shake`, `glow`, `wobble` |
| `is_sticky_cta` | `BOOLEAN` | Pin to bottom of page |
| `thumbnail_url` | `TEXT` | Link thumbnail image |
| `show_icon` | `BOOLEAN` | Show platform icon |
| `icon_position` | `VARCHAR(20)` | `left`, `left_far`, `right`, `right_far`, `left_near`, `right_near` |
| `icon_color` | `VARCHAR(50)` | Custom icon color |
| `bg_color` | `VARCHAR(50)` | Custom background color |
| `text_color` | `VARCHAR(50)` | Custom text color |
| `bg_opacity` | `INT` | Custom background opacity |

#### `link_images`
Carousel images for `link_type = 'carousel'` links.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` PK | Auto-generated |
| `link_id` | `UUID` FK | References `links.id` ON DELETE CASCADE |
| `image_url` | `TEXT` | Image URL |
| `sort_order` | `INT` | Display order |

#### `analytics`
Page views and link clicks — one row per event.

| Column | Type | Description |
|---|---|---|
| `id` | `UUID` PK | Auto-generated |
| `profile_id` | `UUID` FK | References `profiles.id` |
| `link_id` | `UUID` FK (nullable) | `NULL` = page view, non-NULL = link click |
| `device` | `VARCHAR(50)` | `mobile` or `desktop` |
| `referrer` | `TEXT` | HTTP Referer header (hostname extracted) |
| `country` | `VARCHAR(100)` | IP geolocation (ip-api.com) |
| `city` | `VARCHAR(100)` | IP geolocation |
| `utm_source` | `VARCHAR(255)` | UTM campaign parameter |
| `utm_medium` | `VARCHAR(255)` | UTM campaign parameter |
| `utm_campaign` | `VARCHAR(255)` | UTM campaign parameter |
| `created_at` | `TIMESTAMPTZ` | Event timestamp (default `now()`) |

#### `themes`
Preset theme configurations (loaded on signup).

| Column | Type |
|---|---|
| `id` | `UUID` PK |
| `name` | `VARCHAR(100)` |
| `bg_type`, `bg_color`, `bg_image_url` | Background config |
| `button_shape`, `button_style` | Button config |
| `font_family` | Font config |
| `is_premium` | `BOOLEAN` |

#### `_migrations`
Migration tracking table. Records which SQL files have been applied, with checksum and timestamp.

### RLS Policies

- **Profiles:** Public SELECT (anyone), INSERT on signup (trigger), UPDATE/DELETE only by owner or admin
- **Links:** Public SELECT (active links), CRUD by owner
- **Analytics:** INSERT by anyone (anon), SELECT by owner only
- **Themes:** Public SELECT
- **Link images:** Public SELECT, CRUD by link owner
- **Storage:** `backgrounds` and `avatars` buckets — public read, owner-only write

### Migration System

SQL migration files live in `/migrations/`:
- `001_initial_schema.sql` — All tables, RLS, triggers, seed themes (idempotent with `IF NOT EXISTS`)
- `002_add_domain_verified_and_plan.sql` — Adds `domain_verified` and `plan` columns

Run via: `GET /api/migrate` (requires Supabase service role key and `exec_sql` RPC function)

Or manually:
```sql
CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
BEGIN EXECUTE sql; END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## API Endpoints

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/analytics` | POST | None (anon) | Record page view or link click. Rate-limited: 100 req/min/IP, 30 req/min/profile. Detects device, referrer, geolocation, UTM params. |
| `/api/verify-domain` | POST | Session (auth) | Verify custom domain DNS TXT record via Cloudflare DoH. Checks `branch-verification={user.id}` TXT record. |
| `/api/migrate` | GET | Service role key | Apply pending SQL migrations. Reads `/migrations/`, tracks in `_migrations` table. |
| `/api/cron/cleanup-analytics` | POST | Bearer `CRON_SECRET` | Delete analytics records older than 30 days. For Vercel Cron Jobs or similar. |

### Server Actions (implicit POST)

| Action | File | Description |
|---|---|---|
| `login`, `signup`, `logout` | `auth/actions.ts` | Supabase authentication |
| `forgotPassword`, `resetPassword` | `auth/actions.ts` | Password reset flow |
| `createLink`, `updateLink`, `deleteLink` | `link-actions.ts` | Link CRUD |
| `reorderLinks` | `link-actions.ts` | Drag-and-drop persistence |
| `updateAppearance` | `profile-actions.ts` | Bulk appearance save |
| `updateProfileInfo` | `profile-actions.ts` | Name, bio, avatar, username |
| `updateSocialLinks` | `profile-actions.ts` | Social platform URLs |
| `updateBranding` | `profile-actions.ts` | White-label toggle (premium-gated) |
| `updateSettings` | `profile-actions.ts` | SEO, pixels, custom domain |
| `getAnalytics`, `getAnalyticsCSV` | `analytics-actions.ts` | Analytics data queries |

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- A **Supabase** project (free tier)
- (Optional) A custom domain for white-label profiles

### 1. Clone & Install

```bash
git clone https://github.com/WahyutegarNugroho/branch.git
cd branch
npm install
```

### 2. Database Setup

Run the migration SQL files in Supabase SQL Editor:
1. Copy contents of `migrations/001_initial_schema.sql` and execute
2. Copy contents of `migrations/002_add_domain_verified_and_plan.sql` and execute
3. Create the `exec_sql` RPC function:
   ```sql
   CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
   BEGIN EXECUTE sql; END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

### 3. Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[anon-key]"

# Service role (for migrations only — keep secret)
SUPABASE_SERVICE_ROLE_KEY="[service-role-key]"

# Database connection (for direct migrations via CLI)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-[region].pooler.supabase.com:5432/postgres"

# Optional: CRON secret for analytics cleanup (generate a random string)
CRON_SECRET="random-secret-here"
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Run Migrations (alternative)

```bash
npm run migrate
```

Or visit `/api/migrate` after setting `SUPABASE_SERVICE_ROLE_KEY`.

---

## Testing

```bash
npm test        # Run all tests
npx vitest      # Watch mode
npx vitest run  # Single run
```

**67 tests** across 4 files covering:
- `validations.test.ts` — Zod schema validations
- `embed-utils.test.ts` — Embed URL parsing
- `color-utils.test.ts` — Color manipulation
- `LinkButton.test.tsx` — Button component rendering

---

## Contributing

Open issues, submit PRs, or discuss ideas. Please maintain existing code style (TypeScript strict, Zod validation for all inputs, RLS security patterns).

---

## License

MIT © 2026 whtsn dev.
