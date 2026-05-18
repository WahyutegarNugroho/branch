# 🌿 Branch

<div align="center">

**The Open-Source, Ultra-Customizable, Developer-First Link-in-Bio Platform.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-4169e1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

A high-performance, beautiful, and self-hostable Linktree alternative built for modern creators, developers, and businesses who refuse to compromise on design, data ownership, and page load speed.

[Explore Features](#-key-features) • [Why Branch?](#-the-problem-branch-solves) • [Tech Stack](#-tech-stack--rationales) • [Database Architecture](#-database-schema) • [Installation Guide](#-getting-started)

</div>

---

## 📖 Short Description

**Branch** is a powerful Link-in-Bio platform that lets you build, customize, and deploy gorgeous profile landing pages in seconds. Unlike generic alternatives, Branch features a **real-time interactive visual customizer**, built-in **privacy-first analytics**, precise **link scheduling**, and support for **rich embedded media** (YouTube, Spotify, TikTok, and more). Developed with the elegant, editorial design language of Notion, Branch operates at lightning speeds thanks to Next.js server actions and static rendering.

---

## ⚡ The Problem Branch Solves

Traditional link-in-bio services like Linktree or Beacons have increasingly burdened creators and developers:

1. **Predatory Monetization & Commissions:** Competitors take up to 12% in platform commissions on tip jars or digital products in free tiers. **Branch is completely open-source and commission-free.**
2. **Severely Restricted Customization:** Basic visual traits (such as fonts, gradients, or button geometry) are locked behind steep paywalls. **Branch gives you absolute creative freedom** over backgrounds, colors, spacing, alignment, typography, and button styles.
3. **Bloated & Slow Landing Pages:** Heavy client-side JS bundles lead to poor hydration and laggy loads on mobile devices. **Branch achieves blazing-fast, search-engine-optimized loads** via Next.js server-side hybrid hydration.
4. **Data Ownership & Privacy Walls:** Standard tools hide essential traffic analytics (UTMs, referrers, device breakdowns) behind premium plans, or sell your visitors' tracking data. **Branch offers robust, self-hosted, privacy-compliant analytics** by default.

---

## ✨ Key Features

### 🎨 1. Unlimited Visual Engine
Customization goes far beyond simple template-picking. In Branch, you can control:
* **Backgrounds:** Solid hex colors, linear/radial gradients, premium pre-configured image backdrops, or custom background video loops.
* **Geometries & Buttons:** Toggle between sharp (`rounded-none`), default rounded (`rounded-lg`), pill-shaped (`rounded-full`), and soft styles. Adjust border thickness, drop shadows, and opacity.
* **Typography:** Premium humanist-geometric font combinations based on the elegant *Notion-Sans (Inter-based)* typeface.
* **Layout Alignments:** Custom header positioning, bio alignments (left, center, right), and adjustable avatar geometries (circular vs. soft-square PFP).

### 🔄 2. Interactive Live Preview Canvas
No more guessing what your page looks like on mobile. The admin dashboard features a responsive, fully interactive **real-time phone preview simulator**. Every background tweak, link sorting, and button animation updates instantly on the virtual phone before you hit publish.

### ⏱️ 3. Timed Link Visibility & Spotlight Highlights
* **Link Scheduling:** Configure `valid_from` and `valid_until` date-time fields. Links will automatically appear and disappear from your public bio precisely when your marketing campaigns start or end.
* **Spotlight Animations:** Make critical actions stand out using dynamic highlight animations like *Shake*, *Pulse*, *Glow*, or *Bounce* powered by Framer Motion.

### 📊 4. In-Depth, Privacy-First Analytics
Keep full control of your insights without tracking scripts. The native dashboard displays:
* **Performance Metrics:** Total views, unique clicks, and overall Click-Through Rate (CTR).
* **7-Day Interactive Timelines:** Beautifully plotted time-series data using Recharts.
* **Referrals & Hardware:** Complete breakdown of top referral paths (Instagram, TikTok, Twitter, Google) and visitor devices (Mobile, Tablet, Desktop).
* **Extended Logs:** Location geo-mapping (Countries/Cities) and UTM marketing campaign trackers.

### 🎥 5. Rich Inline Media & Preset Integrations
* **Dynamic Embeds:** Support for interactive inline players. Visitors can watch YouTube videos, play Spotify podcasts, or watch TikTok feeds without leaving your landing page.
* **29+ Social Platform Presets:** Standard social accounts (GitHub, Twitter, LinkedIn, Instagram, etc.) are preloaded with high-quality icons, smart link recognition, and flexible positioning rules.
* **Custom Image Carousels:** Display galleries, product cards, or portfolio images inside your links.

### 🔒 6. Enterprise Security & RLS Policies
* **Supabase Authentication:** Secure, frictionless user logins, signups, and email verifications.
* **Strict RLS Enforcements:** Postgres Row-Level Security policies ensure users can only modify, delete, or read their own private link and analytics models.

---

## 🛠️ Tech Stack & Rationales

Branch employs a modern, production-grade architecture designed for speed, type safety, and painless deployment:

| Technology | Purpose | Engineering Rationale |
| :--- | :--- | :--- |
| **Next.js 16 (React 19)** | Core Framework | Utilizes Server Actions and dynamic routing for hyper-fast, server-rendered views, saving network roundtrips and optimizing core web vitals. |
| **Tailwind CSS v4** | UI & Styling | Provides unified, lightning-fast CSS compiling. Its CSS-first configuration allows us to easily deliver custom design systems and micro-animations. |
| **Supabase (PostgreSQL)** | Database & Auth | Automates secure user generation (triggers), stores files (Avatars & Background buckets), and enforces secure database access via Postgres Row-Level Security (RLS). |
| **Framer Motion 12** | Micro-animations | Handles complex, GPU-accelerated UI transitions, fluid drawer slides, and attention-grabbing Spotlight animation states smoothly. |
| **@dnd-kit** | Drag-and-drop | A highly optimized React library providing fluid, accessible, and touch-compatible drag-and-drop link reordering. |
| **Recharts** | Analytics Charts | Declarative, customizable, and responsive SVG charts that seamlessly blend into the dashboard layout. |
| **React Hook Form + Zod** | Form Validation | Handles high-performance client/server form operations with lightweight rendering and rigorous schema parsing. |

---

## 🗄️ Database Schema

The database relies on a highly normalized PostgreSQL schema structure:

```mermaid
erDiagram
    PROFILES {
        uuid id PK
        varchar username UK
        varchar full_name
        text bio
        text avatar_url
        varchar bg_type
        varchar bg_color
        text bg_image_url
        varchar button_shape
        varchar button_style
        varchar font_family
        boolean show_branding
        varchar seo_title
        text seo_description
        varchar custom_domain
    }
    LINKS {
        uuid id PK
        uuid profile_id FK
        varchar title
        text url
        boolean is_active
        int sort_order
        boolean is_embed
        varchar embed_type
        timestamp valid_from
        timestamp valid_until
        boolean is_spotlight
        varchar animation
        varchar bg_color
        varchar text_color
    }
    ANALYTICS {
        uuid id PK
        uuid profile_id FK
        uuid link_id FK
        varchar device
        text referrer
        varchar country
        varchar city
        varchar utm_source
        varchar utm_medium
        varchar utm_campaign
        timestamp created_at
    }
    THEMES {
        uuid id PK
        varchar name
        varchar bg_type
        varchar bg_color
        varchar button_shape
        varchar button_style
        varchar font_family
        boolean is_premium
    }

    PROFILES ||--o{ LINKS : owns
    PROFILES ||--o{ ANALYTICS : tracks
    LINKS ||--o{ ANALYTICS : registers
```

---

## 🚀 Getting Started

Follow these steps to run Branch locally on your machine:

### 1. Prerequisites
Make sure you have the following installed:
* **Node.js** (v18.x or newer)
* **npm** or **yarn / pnpm**
* A **Supabase account** (free tier is perfect)

### 2. Clone the Repository
```bash
git clone https://github.com/WahyutegarNugroho/branch.git
cd branch
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
1. Log in to your **Supabase Dashboard** and create a new project.
2. Go to the **SQL Editor** tab in Supabase.
3. Copy the contents of the local [`schema.sql`](file:///c:/xampp/htdocs/branch/schema.sql) file and run the query. This will:
   * Generate tables for `profiles`, `links`, `analytics`, `themes`, and `link_images`.
   * Set up Row-Level Security (RLS) policies.
   * Add database triggers to automatically initialize a profile when users sign up.
   * Preload a set of initial custom preset themes.

### 5. Configure Environment Variables
Create a `.env.local` file in the root of the project directory and fill in your Supabase connection strings:

```env
# Client API Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Database Connection Strings (for migrations/direct queries)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-[region].pooler.supabase.com:5432/postgres"
```

### 6. Run the Development Server
Launch the server in development mode:
```bash
npm run dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to see Branch running live!

---

## 🌿 Contributing

Branch is built on collaboration. If you have feature requests, design assets, or bug fixes, feel free to open a Pull Request or create an Issue. Let's make the best open-source link platform together!

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as you see fit.
