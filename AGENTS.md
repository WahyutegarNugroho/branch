<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — AI Agent Knowledge Base
> **Branch (Link-in-Bio SaaS)** | Versi: 2.0 | Bahasa: Bilingual (ID/EN)
> Stack: Next.js 16 + TypeScript + Supabase + Tailwind v4 + shadcn/ui
> Dokumen ini adalah sumber kebenaran tunggal (*single source of truth*) bagi semua AI Agent yang beroperasi di dalam proyek ini.

---

## PROJECT OVERVIEW

Branch adalah aplikasi SaaS Link-in-Bio (similar to Linktree/Bio.link) dimana pengguna bisa membuat halaman profil personal, mengelola link & tombol dengan kustomisasi tampilan penuh, analytics real-time, embed media sosial, dan background animasi WebGL.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Database | Supabase (PostgreSQL via `pg`) |
| Auth | Supabase Auth (SSR) |
| UI Library | shadcn/ui + @base-ui/react |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Validation | Zod v4 |
| Forms | react-hook-form + @hookform/resolvers |
| State | Zustand |
| Testing | Vitest + @testing-library/react |
| Animation | Framer Motion |
| Drag & Drop | @dnd-kit |
| Charts | recharts |
| Theme | next-themes |
| Icons | lucide-react, react-icons |
| Toasts | sonner |
| QR Code | qrcode.react |
| Image | next/image + canvas compression |
| CSS Utils | clsx, tailwind-merge, class-variance-authority |

### Commands
| Perintah | Fungsi |
|----------|--------|
| `pnpm dev` | Start dev server (Next.js, port 3000) |
| `pnpm build` | Build production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Vitest watch mode |
| `pnpm test:run` | Vitest single run |
| `pnpm migrate` | Run database migration script |

### Project Structure
```
src/
├── app/
│   ├── (auth)/              # Auth routes group (login, register, forgot/reset password)
│   ├── [username]/          # Public profile pages (dynamic route)
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Profile page (server component with generateMetadata)
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── actions/             # Server Actions
│   │   ├── link-actions.ts      # Link CRUD operations
│   │   ├── profile-actions.ts   # Profile CRUD operations
│   │   └── analytics-actions.ts # Analytics queries
│   ├── api/                 # API Routes
│   │   ├── analytics/route.ts
│   │   ├── cron/cleanup-analytics/route.ts
│   │   ├── migrate/route.ts
│   │   └── verify-domain/route.ts
│   ├── auth/
│   │   └── actions.ts       # Auth server actions (login, signup, logout, forgot/reset password)
│   ├── dashboard/           # Dashboard pages (protected)
│   │   ├── page.tsx             # Dashboard hub
│   │   ├── layout.tsx
│   │   ├── analytics/page.tsx
│   │   ├── appearance/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx           # Root layout (fonts, toaster, SVG filters)
│   ├── page.tsx             # Landing page with interactive themes demo
│   ├── error.tsx            # Global error boundary
│   └── not-found.tsx        # Global 404 page
├── components/
│   ├── __tests__/           # Component tests
│   ├── backgrounds/         # WebGL animation components
│   │   ├── AuroraBackground.tsx
│   │   ├── MatrixBackground.tsx
│   │   ├── ConfettiBackground.tsx
│   │   ├── ParticlesBackground.tsx
│   │   ├── SnowfallBackground.tsx
│   │   └── StarsBackground.tsx
│   ├── dashboard/           # Dashboard feature components
│   │   ├── LinkManager.tsx
│   │   ├── AppearanceManager.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── AnalyticsChart.tsx
│   │   ├── LivePreview.tsx / LivePreviewWrapper.tsx
│   │   ├── SettingsForm.tsx
│   │   ├── LinkItem.tsx, LinkDesignSettings.tsx, LinkBasicInputs.tsx
│   │   ├── LinkCarouselManager.tsx, LinkScheduleSettings.tsx
│   │   ├── ColorPickerDialog.tsx, GradientPickerDialog.tsx
│   │   ├── PlatformPickerDialog.tsx, ImageCropDialog.tsx
│   │   ├── CalendarPicker.tsx, DateTimePicker.tsx
│   │   ├── BackgroundConfigSection.tsx, AnimationConfigSection.tsx
│   │   ├── DashboardNav.tsx, ShareModal.tsx
│   │   └── ...
│   ├── public/              # Public-facing profile components
│   │   ├── AnimatedProfile.tsx  # Main profile page component
│   │   ├── LinkButton.tsx       # Individual link button
│   │   ├── PageTracker.tsx      # Analytics tracking
│   │   ├── SocialShareModal.tsx
│   │   └── SVGFilters.tsx       # SVG filter definitions
│   └── ui/                  # shadcn/ui primitives
│       ├── button.tsx       # @base-ui/react button + cva variants
│       ├── input.tsx, textarea.tsx
│       ├── dialog.tsx, card.tsx, alert.tsx
│       ├── tabs.tsx, switch.tsx, slider.tsx
│       ├── label.tsx, separator.tsx
│       └── sonner.tsx
├── lib/                     # Utilities & libraries
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   ├── validations.ts       # Zod schemas for all forms
│   ├── fonts.ts             # next/font definitions (11 fonts)
│   ├── env.ts               # Environment variable validation (Zod)
│   ├── data-loaders.ts      # Cached Supabase data loaders (React.cache)
│   ├── preview-store.ts     # Zustand store for live preview state
│   ├── image-utils.ts       # Canvas-based image compression
│   ├── embed-utils.ts       # Parse YouTube/Spotify/TikTok embed URLs
│   ├── formdata-utils.ts    # FormData to object converter
│   ├── color-utils.ts       # Color manipulation helpers
│   └── rate-limiter.ts      # Rate limiting utility
├── types/
│   └── index.ts             # TypeScript interfaces (Profile, Link, LinkImage, Analytics, AnimationConfig, AvatarFrameConfig)
├── utils/
│   ├── supabase/
│   │   ├── client.ts        # Browser Supabase client
│   │   ├── server.ts        # Server Supabase client + requireAuth()
│   │   └── middleware.ts    # Next.js middleware session handler
│   └── platforms.tsx        # Social platform definitions & icons
└── middleware.ts             # Supabase session middleware
```

### Routing
| Route | Component | Deskripsi |
|-------|-----------|-----------|
| `/` | LandingPage | Landing page with interactive demo themes |
| `/login` | LoginPage | Login form |
| `/register` | RegisterPage | Registration form |
| `/forgot-password` | ForgotPasswordPage | Password reset request |
| `/reset-password` | ResetPasswordPage | Password reset form |
| `/dashboard` | DashboardPage | Dashboard hub with link management |
| `/dashboard/analytics` | AnalyticsPage | Analytics dashboard with charts |
| `/dashboard/appearance` | AppearancePage | Profile customization (background, buttons, fonts) |
| `/dashboard/settings` | SettingsPage | SEO, pixels, custom domain settings |
| `/[username]` | PublicProfilePage | Public profile page (dynamic, SSR) |

### API Routes
| Endpoint | Method | Fungsi |
|----------|--------|--------|
| `/api/analytics` | POST | Track page view or link click |
| `/api/cron/cleanup-analytics` | GET | Cron job to cleanup old analytics data |
| `/api/migrate` | POST | Manual database migration trigger |
| `/api/verify-domain` | POST | Custom domain DNS verification |

### Key Types (`src/types/index.ts`)
```typescript
interface Profile {
  id: string; username: string; full_name: string | null;
  bio: string | null; avatar_url: string | null;
  bg_type: 'solid' | 'gradient' | 'image' | 'video';
  bg_color: string; bg_image_url: string | null;
  role: 'user' | 'admin';
  button_shape: string; button_style: string;
  font_family: string; theme_style: string;
  social_links: Record<string, string> | null;
  bg_animation: string | null;
  bg_animation_config: AnimationConfig | null;
  plan: 'free' | 'premium' | null;
  // ... +30 more customization fields
}

interface Link {
  id: string; profile_id: string;
  title: string; url: string;
  is_active: boolean; sort_order: number;
  link_type: 'link' | 'header' | 'carousel';
  icon_position: string | null;
  bg_color: string | null; text_color: string | null;
  is_spotlight: boolean; is_embed: boolean;
  animation: string | null;
  link_images: LinkImage[];
  // ... +15 more styling fields
}
```

### Project Conventions
- **TypeScript**: Strict mode di `tsconfig.json`. Define interfaces for all data shapes. Gunakan `unknown` + type guard jika tipe benar-benar tidak diketahui. Hindari `any`.
- **Components**: `.tsx` extension untuk komponen React. Server Components by default di App Router. Client Components dengan `'use client'`.
- **Server Actions**: File di `src/app/actions/` dan `src/app/auth/actions.ts`. Gunakan `'use server'` directive. Validasi input dengan Zod sebelum diproses.
- **Validation**: Semua validasi form/input menggunakan Zod schemas di `src/lib/validations.ts`. JANGAN trust input client.
- **Database**: Supabase PostgreSQL. Gunakan Supabase JS client (server/client) — jangan `pg` driver langsung.
- **Auth Flow**: Supabase SSR pattern: middleware refresh session → `createClient()` di server components → `requireAuth()` di server actions.
- **Styling**: Tailwind CSS v4 dengan CSS variables. Gunakan `cn()` dari `@/lib/utils` untuk conditional classes. shadcn/ui patterns untuk komponen UI.
- **State Management**: Zustand untuk client state (preview store). Server state via Supabase langsung. React.cache untuk deduplication.
- **Data Fetching**: Gunakan React.cache + Supabase di Server Components. Jangan fetch di Client Components kecuali benar-benar perlu.
- **Animations**: Framer Motion untuk UI transitions, @dnd-kit untuk drag-and-drop reordering.
- **Drag & Drop**: @dnd-kit digunakan untuk link reordering di dashboard. Jangan react-draggable.
- **Forms**: react-hook-form + zod resolver untuk forms kompleks. Server Actions dengan formData untuk forms sederhana.
- **Constants**: Semua validasi dan enum ada di `src/lib/validations.ts`. Platform definitions di `src/utils/platforms.tsx`.
- **Assets**: Static assets di `/public/`, images dioptimasi dengan next/image.
- **Lazy Loading**: Dynamic imports untuk background animation components yang berat.
- **Fonts**: next/font via `@/lib/fonts` — 11 font families di-root layout.
- **Performance**: `force-dynamic` di profile page untuk real-time data. React.cache untuk query deduplication.

### Background Animation Components
| Component | File | Config |
|-----------|------|--------|
| AuroraBackground | `backgrounds/AuroraBackground.tsx` | speed |
| MatrixBackground | `backgrounds/MatrixBackground.tsx` | density, speed |
| ConfettiBackground | `backgrounds/ConfettiBackground.tsx` | speed, amount |
| ParticlesBackground | `backgrounds/ParticlesBackground.tsx` | linkDistance, starCount |
| SnowfallBackground | `backgrounds/SnowfallBackground.tsx` | flakeCount, wind, speed |
| StarsBackground | `backgrounds/StarsBackground.tsx` | starCount, speed |

---

## 🧭 INDEKS KNOWLEDGE ITEMS

| ID | Kategori | Judul |
|----|----------|-------|
| K-01 | Arsitektur | 3-Tier Agent Architecture |
| K-02 | Fondasi | Clean Code & Industry Standards (TypeScript) |
| K-03 | Workflow | Build from Scratch — 4-Phase Protocol |
| K-04 | Workflow | Maintenance & Evolution Protocol |
| K-05 | Keamanan | Security & Anti-Regression Rules |
| K-06 | Keamanan | Lock Critical Core Logic |
| K-07 | Proses | Self-Correction & Troubleshooting Protocol |
| K-08 | Proses | Context-First Reading Mandate |
| K-09 | Output | Code Output Standards |
| K-10 | Output | Response Format Contract |

---

## K-01 · 3-Tier Agent Architecture

Setiap pekerjaan coding dikategorikan ke dalam salah satu dari tiga tier. Agent **wajib** mengidentifikasi tier sebelum mengeksekusi.

```
┌─────────────────────────────────────────────────────┐
│  TIER 1 — THE BLUEPRINT (Arsitektur & Perencanaan)  │
│  Non-deterministik. Output: dokumen, diagram,       │
│  struktur folder. DILARANG menulis logika bisnis.   │
├─────────────────────────────────────────────────────┤
│  TIER 2 — THE BRAIN (Konfigurasi & Integrasi)       │
│  Semi-deterministik. Output: config files,          │
│  schema DB, service layer, wiring antar komponen.   │
├─────────────────────────────────────────────────────┤
│  TIER 3 — THE BODY (Implementasi Logika Bisnis)     │
│  Deterministik penuh. Output: kode produksi yang    │
│  bisa langsung dijalankan. WAJIB bebas dari bug.    │
└─────────────────────────────────────────────────────┘
```

**Aturan Tier Transition:**
- Jangan loncat dari Tier 1 ke Tier 3 tanpa persetujuan user di Tier 2.
- Jika user minta Tier 3, agent harus memastikan Tier 1 & 2 sudah selesai atau diasumsikan secara eksplisit.

---

## K-02 · Clean Code & Industry Standards

### Penamaan (Naming Conventions)
```
Variables & Functions : camelCase      → getUserById, cartItems, updateLinks
Types/Interfaces      : PascalCase     → Profile, LinkImage, AnimationConfig
Constants             : SCREAMING_SNAKE→ MAX_IMAGE_DIMENSION, LINK_TITLE_MAX
Database columns      : snake_case     → sort_order, bg_type, is_spotlight
Files (komponen)      : PascalCase     → LinkManager.tsx, AnimatedProfile.tsx
Files (utils/hooks)   : kebab-case     → data-loaders.ts, color-utils.ts
Server Actions        : camelCase      → createLink, updateProfile, login
Zod schemas           : camelCase + Schema suffix → updateLinkSchema, updateAppearanceSchema
```

### Prinsip Wajib
1. **Single Responsibility** — Satu fungsi/komponen hanya melakukan satu hal.
2. **DRY (Don't Repeat Yourself)** — Ekstrak logika duplikat ke utility/helper.
3. **YAGNI (You Aren't Gonna Need It)** — Jangan buat abstraksi yang belum dibutuhkan.
4. **Fail Fast** — Validasi input di awal fungsi (guard clauses via Zod safeParse), bukan di akhir.
5. **No Magic Numbers** — Semua angka/string literal harus menjadi named constant atau Zod schema.

### TypeScript Strictness (project REALTIME — not aspirational)
```typescript
// ✅ WAJIB — Definisikan interface/type secara eksplisit
interface Profile {
  id: string
  username: string
  full_name: string | null
  bg_type: 'solid' | 'gradient' | 'image' | 'video'
  bg_color: string
  role: 'user' | 'admin'
  plan: 'free' | 'premium' | null
  // ...
}

// ❌ DILARANG — any tanpa alasan yang sah
function process(data: any): any { ... }

// ✅ BOLEH — unknown + type guard jika tipe memang tidak diketahui
interface EmbedInfo { type: string; embedUrl: string; height: number }
function parseEmbedUrl(url: string): EmbedInfo | null { ... }

// ✅ Zod untuk runtime validation — selalu gunakan di Server Actions & Forms
const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
```

### Zod Validation Pattern (WAJIB)
```typescript
// ✅ Semua Server Action wajib validasi dengan Zod
export async function updateLink(formData: FormData) {
  const parsed = updateLinkSchema.safeParse({
    title: formData.get('title'),
    url: formData.get('url'),
    is_active: formData.get('is_active') === 'true',
  })
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  // Eksekusi setelah validasi lolos
}

// ✅ Semua environment variables wajib divalidasi (src/lib/env.ts)
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})
```

---

## K-03 · Build from Scratch — 4-Phase Protocol (Next.js + Supabase)

### FASE 1 · Blueprint (Tier 1 & 2)

**Trigger:** User meminta membangun fitur/aplikasi baru dari nol.

**Checklist wajib sebelum output:**
- [ ] Tentukan tech stack secara eksplisit
- [ ] Buat struktur direktori sesuai pola Next.js App Router
- [ ] Identifikasi komponen: Server Component vs Client Component
- [ ] Tentukan data flow: Server Action vs API Route
- [ ] Definisikan validasi Zod schema di `lib/validations.ts`
- [ ] Definisikan tipe TypeScript di `types/index.ts`
- [ ] **STOP** — Minta persetujuan user sebelum lanjut ke Fase 2

**Template Struktur Proyek (Sesuai Project Ini):**
```
src/
├── app/
│   ├── (auth)/             # Auth route group
│   ├── [username]/         # Dynamic public profile
│   ├── dashboard/          # Protected dashboard routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── backgrounds/        # Animation components
│   ├── dashboard/          # Dashboard features
│   ├── public/             # Profile page components
│   └── ui/                 # shadcn/ui primitives
├── lib/                    # Zod schemas, utils, fonts, stores
├── types/                  # TypeScript interfaces
├── utils/supabase/         # Supabase clients (client.ts, server.ts, middleware.ts)
└── middleware.ts           # Next.js middleware
```

---

### FASE 2 · Frontend Component Development (Tier 3)

**Trigger:** Blueprint sudah disetujui, mulai implementasi UI.

**Aturan Komponen:**
- **Server Components by default** di Next.js App Router
- **Client Components** hanya jika perlu: hooks, state, events, browser APIs
- Gunakan `'use client'` directive di baris pertama file
- Pola: ekstrak bagian interaktif ke Client Component, bungkus di Server Component

```typescript
// ✅ POLA SERVER COMPONENT — Fetch data, render layout
// File: app/dashboard/appearance/page.tsx
export default async function AppearancePage() {
  const { supabase, user } = await requireAuth()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <AppearanceManager initialProfile={profile} />
  )
}

// ✅ POLA CLIENT COMPONENT — Interaktif, state, hooks
// File: components/dashboard/AppearanceManager.tsx
'use client'
export function AppearanceManager({ initialProfile }: { initialProfile: Profile }) {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(updateAppearanceSchema) })
  // ... UI dengan form, color picker, dll
}

// ✅ POLA DUMB COMPONENT — Presentational, reusable
// File: components/ui/button.tsx
function Button({ className, variant, size, ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
```

**Urutan Pengerjaan:**
1. Definisikan TypeScript interface di `types/index.ts`
2. Buat Zod schema di `lib/validations.ts`
3. Buat Server Component dengan data fetching
4. Buat Client Component untuk interaktivitas
5. Sambungkan ke Server Actions (Fase 4)

---

### FASE 3 · Backend API Development (Tier 3)

**Trigger:** Frontend sudah disetujui, mulai implementasi API/Server Actions.

**Pilih pola yang tepat:**
| Kebutuhan | Gunakan |
|-----------|---------|
| Form submission tanpa JS | Server Action |
| Data mutation dari Client Component | Server Action |
| Webhook / Cron | API Route |
| Third-party callback | API Route |
| Streaming data | API Route (Edge) |

**Template Implementasi — Server Action:**
```typescript
// File: src/app/actions/link-actions.ts
'use server'

import { createClient, requireAuth } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { updateLinkSchema } from '@/lib/validations'

export async function updateLink(formData: FormData) {
  const { supabase, user } = await requireAuth()
  if (!user) return { error: 'Unauthorized' }

  // 1. Validasi input
  const parsed = updateLinkSchema.safeParse(formDataToObject(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  // 2. Business logic
  const { data, error } = await supabase
    .from('links')
    .update(parsed.data)
    .eq('id', formData.get('id'))
    .eq('profile_id', user.id) // ⚠️ Security: pastikan milik user
    .select()
    .single()

  if (error) return { error: error.message }

  // 3. Revalidate cache
  revalidatePath('/dashboard')
  return { success: true, data }
}
```

**Template Implementasi — API Route:**
```typescript
// File: src/app/api/analytics/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.from('analytics').insert(body)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**HTTP Response Standard (API Routes only):**
```typescript
type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: { code?: string; message: string }
}

// Status codes:
// 200 → GET berhasil
// 201 → POST berhasil (created)
// 400 → Validasi gagal
// 401 → Tidak autentikasi
// 403 → Tidak ada izin
// 404 → Resource tidak ditemukan
// 429 → Rate limited
// 500 → Internal error
```

---

### FASE 4 · Integration (Tier 2 + 3)

**Trigger:** FE dan BE sudah selesai secara terpisah.

**Aturan Integrasi:**
```typescript
// ✅ Pola: Server Component fetch → kirim data ke Client Component
// Server Component (app/dashboard/page.tsx)
export default async function DashboardPage() {
  const { supabase, user } = await requireAuth()
  const [links, profile] = await Promise.all([
    getCachedLinks(user.id).then(r => r.data ?? []),
    getCachedProfile(user.id).then(r => r.data),
  ])
  return <LinkManager initialLinks={links} initialProfile={profile} />
}

// Client Component memanggil Server Action via direct import
// components/dashboard/LinkManager.tsx
'use client'
import { createLink, updateLink, deleteLink } from '@/app/actions/link-actions'

export function LinkManager({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState(initialLinks)

  const handleCreate = async (linkType: string) => {
    const result = await createLink(linkType)
    if (result.data) setLinks(prev => [...prev, result.data])
  }
}
```

**Tiga State Wajib Ditangani (Client Components):**
```typescript
// 1. Loading State
if (isPending) return <Skeleton />
// 2. Error State
if (error) return <Alert variant="destructive">{error}</Alert>
// 3. Empty State
if (!data?.length) return <EmptyState message="No links yet" />
// 4. Data State (sukses)
return <LinkList links={data} />
```

**Regression Check Checklist Pasca-Integrasi:**
- [ ] Semua Server Action merespons dengan error handling yang benar
- [ ] Loading state muncul (pakai useTransition / useFormStatus)
- [ ] Error state muncul saat validasi gagal
- [ ] Empty state muncul saat data kosong
- [ ] Cache ter-revalidate setelah mutasi (revalidatePath)
- [ ] Console browser bebas dari error/warning
- [ ] TypeScript strict — tidak ada `any`, tidak ada type error

---

## K-04 · Maintenance & Evolution Protocol

### Bug Fixing Protocol

**Urutan Wajib — JANGAN DILEWATI:**
```
1. DIAGNOSA   → Baca log error. Identifikasi file & baris yang bermasalah.
2. ANALISIS   → Jelaskan Root Cause kepada user dalam 2-3 kalimat.
3. KONFIRMASI → Tunggu persetujuan user atas analisis.
4. EKSEKUSI   → Terapkan Surgical Modification (lihat K-05).
5. VALIDASI   → Berikan langkah verifikasi manual kepada user.
```

**Root Cause Analysis Template:**
```
🔴 GEJALA    : [Apa yang user lihat]
🔍 LOKASI    : [File:baris yang relevan]
💡 PENYEBAB  : [Mengapa ini terjadi secara teknis]
🔧 SOLUSI    : [Perubahan minimal yang diperlukan]
⚠️  RISIKO    : [Efek samping potensial jika ada]
```

---

### Feature Addition Protocol

**Urutan Wajib:**
```
1. READ      → Baca seluruh file yang akan dimodifikasi + dependensinya
2. MAP       → Identifikasi titik eksak di mana kode baru akan disisipkan
3. LOCK      → Tandai blok kode yang TIDAK boleh diubah (K-06)
4. INSERT    → Sisipkan kode baru secara presisi
5. VALIDATE  → Berikan Regression Check checklist
```

---

### Refactoring Protocol

**Kontrak Refactoring — Harus dipenuhi semua:**
- ✅ Behavior/output sistem identik 100% sebelum dan sesudah
- ✅ Semua test yang ada masih lulus (`pnpm test:run`)
- ✅ Tidak ada komentar developer yang dihapus
- ✅ Tidak ada `// @ts-expect-error` atau `// @ts-ignore` yang dihapus
- ✅ Variabel "redundan" hanya dihapus setelah grep/search global membuktikannya tidak terpakai
- ✅ Tampilkan diff sebelum/sesudah untuk setiap file yang diubah

---

### Code Review & Security Audit Protocol

**Checklist Keamanan (Proyek Ini):**
```
□ SQL Injection     → Semua query via Supabase JS client (parameterized)?
□ XSS               → Semua output user ke HTML di-escape React?
□ Auth              → Supabase SSR + middleware validasi session?
□ RBAC              → Role 'user'/'admin' dicek di requireAuth() tiap Server Action?
□ IDOR              → Query selalu filter by profile_id = user.id?
□ Secrets           → Tidak ada API key/password yang hardcoded?
□ Rate Limiting     → API Routes publik (analytics) dilindungi?
□ Files             → Unrestricted upload? Cek validasi tipe & size?
□ Zod Validation    → Semua input user tervalidasi Zod sebelum diproses?
□ Environment       → Semua env var divalidasi di lib/env.ts (fail fast di production)?
```

**Output Audit Format:**
```markdown
## Security Audit Report — [nama file] — [tanggal]

### CRITICAL (Harus diperbaiki sebelum deploy)
- [ ] VULN-001: [Deskripsi] @ [file:baris]

### HIGH (Diperbaiki dalam sprint ini)
- [ ] VULN-002: [Deskripsi] @ [file:baris]

### MEDIUM / LOW (Masuk backlog)
- [ ] VULN-003: [Deskripsi] @ [file:baris]

### INFORMATIONAL (Best practice suggestion)
- INFO-001: [Saran] @ [file:baris]
```

---

### Dependency Upgrade Protocol

```
1. AUDIT   → Analisis package.json
2. PLAN    → Buat tabel: Package | Versi Lama | Versi Baru | Breaking Changes
3. STAGE   → STOP. Presentasikan plan ke user.
4. CONFIRM → Tunggu instruksi "Lanjutkan" eksplisit dari user.
5. EXECUTE → Jalankan update per batch (minor dulu, lalu major).
6. TEST    → Jalankan `pnpm dev` & `pnpm test:run` untuk verifikasi.
```

**Format Plan Mode:**
```
📦 DEPENDENCY UPGRADE PLAN
═══════════════════════════════════════════════════
Package        │ Sekarang  │ Target    │ Breaking?
───────────────┼───────────┼───────────┼──────────
next           │ 16.2.6    │ 17.0.0    │ YES — App Router API changes
tailwindcss    │ 4.0.0     │ 4.1.0     │ NO  — Minor feature release
═══════════════════════════════════════════════════
⚠️  Estimasi effort: [N] jam
```

---

## K-05 · Security & Anti-Regression Rules

### Anti-Deletion Protocol (WAJIB)

Agent **DILARANG KERAS** menghapus kode berikut tanpa instruksi eksplisit dari user:

```
🔒 PROTECTED — TIDAK BOLEH DIHAPUS/DIMODIFIKASI TANPA IZIN:
  • Semua Supabase middleware session handler (middleware.ts, utils/supabase/middleware.ts)
  • requireAuth() di utils/supabase/server.ts
  • Zod validation schemas di lib/validations.ts
  • Environment variable validation di lib/env.ts
  • Semua error handling & logging di Server Actions
  • Rate limiter configuration di lib/rate-limiter.ts
  • Database migration script (scripts/migrate.mjs)
  • Komentar yang menjelaskan "mengapa" (bukan "apa")
  • // @ts-expect-error atau // @ts-ignore dengan komentar penjelasan
  • SVG filter definitions (SVGFilters.tsx)
  • Context: [username]/page.tsx — `dynamic = 'force-dynamic'`
  • Root layout font definitions
```

### Phantom Cleanup — DILARANG

Phantom Cleanup = menghapus/mengubah kode yang *terlihat* tidak relevan tapi sebenarnya penting.

```typescript
// ❌ PHANTOM CLEANUP — Jangan hapus ini tanpa investigasi
const _rateLimiter = new RateLimiter() // <-- Mungkin dipakai di tempat lain
const DEBUG = process.env.NODE_ENV === 'development' // <-- Mungkin dipakai via grep

// ✅ Jika ragu, lakukan dulu:
// grep -r "RateLimiter" src/
// Hanya hapus jika hasilnya 0 baris selain definisinya
```

---

## K-06 · Lock Critical Core Logic

Sebelum menyentuh file, agent harus mengidentifikasi dan **mengunci** blok-blok berikut:

```typescript
// ✅ CARA MENANDAI BLOK YANG DIKUNCI DALAM KOMENTAR
// ==================== LOCKED: Auth Middleware ====================
// ⚠️  JANGAN MODIFIKASI tanpa review keamanan eksplisit
export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}
// ==================== END LOCKED ================================
```

**Blok yang selalu dikunci secara default (proyek ini):**
- requireAuth() — autentikasi & RBAC
- Zod validation schemas — keamanan input
- Supabase session middleware (`middleware.ts`)
- Rate limiter logic
- embed-utils.ts — parsing URL embed
- image-utils.ts — image compression & upload
- env.ts — validasi environment variables
- SVG filter definitions (SVGFilters.tsx)
- Database migration scripts
- Cron job logic (cleanup analytics)

---

## K-07 · Self-Correction & Troubleshooting Protocol

Ketika agent menghasilkan output yang salah atau menghadapi error, ikuti protokol ini:

```
LANGKAH 1 — STOP. Jangan menghasilkan lebih banyak kode yang salah.
LANGKAH 2 — AKUI kesalahan secara eksplisit kepada user.
LANGKAH 3 — DIAGNOSA: Apa yang salah dan mengapa?
LANGKAH 4 — PLAN: Apa pendekatan perbaikan yang benar?
LANGKAH 5 — KONFIRMASI: Minta izin user jika perbaikan melibatkan banyak file.
LANGKAH 6 — EKSEKUSI: Terapkan perbaikan secara Surgical (K-05).
```

**Error Classification:**
```
TIER-1 ERROR : Salah arsitektur/desain → Diskusikan ulang dengan user
TIER-2 ERROR : Salah konfigurasi/integrasi → Perbaiki config, jangan logika bisnis
TIER-3 ERROR : Bug dalam logika bisnis → Surgical fix pada fungsi spesifik
```

---

## K-08 · Context-First Reading Mandate

**Sebelum** menulis atau memodifikasi kode apapun, agent **WAJIB**:

```
CHECKLIST PRA-CODING:
□ Baca seluruh file yang akan dimodifikasi (bukan hanya seksi yang relevan)
□ Baca file yang diimpor oleh file tersebut (satu level)
□ Cek apakah ada test file yang meng-cover kode yang akan diubah
□ Identifikasi semua caller/consumer dari fungsi yang akan diubah
□ Pahami kontrak (interface/type) yang sudah ada
```

**Jika file terlalu besar (>500 baris):**
```
1. Baca bagian imports & exports dulu (gambaran dependensi)
2. Baca fungsi/kelas yang paling relevan
3. Deklarasikan asumsi yang dibuat kepada user secara eksplisit
```

---

## K-09 · Code Output Standards

### Format Output Kode

Agent **WAJIB** menyertakan informasi ini di setiap blok kode:

````markdown
**File:** `src/app/actions/link-actions.ts`
**Action:** CREATE | MODIFY | DELETE
**Affects:** LinkManager, usePreviewStore

```typescript
// kode di sini
```

**Perubahan dari versi sebelumnya:**
- Baris 45: Tambah null check sebelum akses `link.url`
- Baris 67: Tambah Zod validasi untuk `sort_order`
````

### Surgical Modification Format (Diff Style)

Untuk modifikasi pada file yang sudah ada, gunakan format diff:

```diff
// File: src/app/actions/link-actions.ts

  export async function createLink(linkType: string = 'link') {
-   const { supabase, user } = await createClient()
+   const { supabase, user } = await requireAuth() // FIX: tambah auth check

    if (!user) return { error: 'Unauthorized' }

-   const { data, error } = await supabase.from('links').insert({ ... })
+   const parsed = createLinkSchema.safeParse({ linkType }) // FIX: tambah validasi
+   if (!parsed.success) return { error: parsed.error.issues[0].message }
+
+   const { data, error } = await supabase.from('links').insert({ ... })
```

---

## K-10 · Response Format Contract

Agent **WAJIB** mengikuti format respons berikut berdasarkan tipe permintaan:

### Untuk Analisis/Review (Read-Only)
```
1. RINGKASAN    → Apa yang ditemukan (3-5 kalimat)
2. TEMUAN       → List berformat dengan severity
3. REKOMENDASI  → Langkah selanjutnya yang disarankan
4. PERTANYAAN   → Jika ada ambiguitas, tanyakan SATU pertanyaan saja
```

### Untuk Implementasi (Write)
```
1. KONFIRMASI PEMAHAMAN → Ulangi apa yang akan dibuat/diubah
2. ASUMSI               → Daftar asumsi yang dibuat secara eksplisit
3. KODE                 → Output dengan format K-09
4. INSTRUKSI PENGGUNAAN → Cara mengintegrasikan kode ini
5. REGRESSION CHECK     → 3-5 langkah verifikasi manual
```

### Checkpoint Wajib (STOP & ASK)
Agent wajib berhenti dan meminta konfirmasi user ketika:
- Akan menghapus lebih dari 10 baris kode
- Akan mengubah interface/type yang dipakai di banyak tempat
- Akan mengubah schema database
- Akan memodifikasi file konfigurasi keamanan
- Tidak yakin dengan requirement (ambiguitas tinggi)
- Akan membuat perubahan yang memengaruhi lebih dari 3 file

---

## 📋 QUICK REFERENCE — Perintah Cepat untuk User

| Perintah | Efek |
|----------|------|
| `@phase1` | Mulai Fase 1: Blueprint |
| `@phase2 [fitur]` | Mulai Fase 2: Buat komponen UI untuk [fitur] |
| `@phase3 [fitur]` | Mulai Fase 3: Buat Server Actions / API Routes untuk [fitur] |
| `@phase4 [komponen] → [action]` | Mulai Fase 4: Integrasi |
| `@fix [gejala]` | Bug fix protocol |
| `@add [fitur] to [file]` | Feature addition protocol |
| `@refactor [file] for [tujuan]` | Refactoring protocol |
| `@audit [file/folder]` | Security audit |
| `@upgrade [package]` | Dependency upgrade plan |
| `@lock [blok kode]` | Tandai blok sebagai kritial, jangan diubah |

---

*Dokumen ini adalah living document. Update versi setiap kali ada perubahan signifikan pada standar proyek.*
*Last updated: 2026 | Stack: Next.js 16 + TypeScript + Supabase + Tailwind v4 + shadcn/ui*
*Format: Markdown | Compatible: Antigravity IDE Knowledge Items*
