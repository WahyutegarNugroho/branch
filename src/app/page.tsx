import React from 'react'
import Link from 'next/link'
import {
  Zap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Layers,
  BarChart3,
  Gauge
} from 'lucide-react'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { HeroLivePreview } from '@/components/landing/HeroLivePreview'
import { BentoFeatures } from '@/components/landing/BentoFeatures'
import { InteractiveStudio } from '@/components/landing/InteractiveStudio'
import { ComparisonSection } from '@/components/landing/ComparisonSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export const metadata = {
  title: 'Branch — The High-Performance Link-in-Bio for Creators',
  description: 'Fast, customizable, and completely yours. Branch combines hardware-accelerated WebGL backgrounds, drag-and-drop link scheduling, and privacy-first analytics.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-400/20 selection:text-white relative overflow-x-hidden">

      {/* Top Navbar */}
      <LandingNavbar />

      <main>
        {/* ============================== HERO SECTION ============================== */}
        <section id="demo" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* Left Column: Copy & Form (7 cols) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                {/* Release announcement tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-medium text-zinc-300">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    NEW v2.0
                  </span>
                  <span className="text-zinc-400">GPU WebGL Shaders & Next.js 16 SSR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>

                {/* Primary Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                  The link-in-bio built like{' '}
                  <span className="text-zinc-100">
                    high-end software.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                  Fast, customizable, and completely yours. Branch gives you living WebGL canvas backgrounds, drag-and-drop scheduling, and real-time privacy analytics without watermarks.
                </p>

                {/* Username Claim Form */}
                <div className="space-y-3 max-w-lg">
                  <form action="/register" method="get" className="flex flex-col sm:flex-row gap-2.5">
                    <label htmlFor="hero-username" className="sr-only">Choose your username</label>
                    <div className="flex flex-1 items-center bg-zinc-900/90 border border-zinc-700/80 rounded-xl overflow-hidden focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all shadow-inner">
                      <span className="pl-3.5 text-zinc-500 font-mono text-sm select-none" aria-hidden="true">
                        branch.bio/
                      </span>
                      <input
                        id="hero-username"
                        name="username"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        spellCheck={false}
                        maxLength={30}
                        placeholder="yourname"
                        pattern="[a-z0-9_-]+"
                        title="Lowercase letters, numbers, hyphens and underscores only"
                        className="w-full h-12 px-2 bg-transparent text-white font-medium text-sm placeholder:text-zinc-600 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group h-12 px-6 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-all shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]"
                    >
                      <span>Claim your link</span>
                      <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:translate-x-0.5 group-hover:text-zinc-950 transition-all" />
                    </button>
                  </form>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Free forever tier
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Zero credit card needed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Instant edge deploy
                    </span>
                  </div>
                </div>

                {/* Metric Highlights Pill Bar */}
                <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">&lt;100ms</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Edge SSR TTFB</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">6 Shaders</p>
                    <p className="text-xs text-zinc-400 mt-0.5">GPU WebGL Canvases</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">0 Cookies</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Privacy First Analytics</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">Zero</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Forced Watermarks</p>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Fidelity Interactive Preview (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <HeroLivePreview />
              </div>

            </div>
          </div>
        </section>

        {/* ============================ BENTO GRID FEATURES ============================ */}
        <BentoFeatures />

        {/* ========================== INTERACTIVE STUDIO SANDBOX ======================= */}
        <InteractiveStudio />

        {/* ========================== ARCHITECTURAL COMPARISON ========================= */}
        <ComparisonSection />

        {/* ============================= ACCESSIBLE FAQ =============================== */}
        <FaqSection />

        {/* ============================== FINAL CTA BANNER ============================= */}
        <section className="py-20 lg:py-28 px-4 sm:px-6 relative border-t border-white/[0.08]">
          <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-900/90 border border-white/[0.08] p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto shadow-lg">
                <Zap className="w-6 h-6 text-zinc-950 fill-zinc-950" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Reserve your username today.
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                Take control of your audience and link architecture. Free forever, no credit card required, and zero forced branding on your profile.
              </p>

              <form action="/register" method="get" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <label htmlFor="final-username" className="sr-only">Choose your username</label>
                <div className="flex flex-1 items-center bg-zinc-950 border border-zinc-700 rounded-xl overflow-hidden focus-within:border-emerald-400 transition-colors shadow-inner">
                  <span className="pl-3.5 text-zinc-500 font-mono text-sm select-none" aria-hidden="true">
                    branch.bio/
                  </span>
                  <input
                    id="final-username"
                    name="username"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={30}
                    placeholder="yourname"
                    pattern="[a-z0-9_-]+"
                    className="w-full h-12 px-2 bg-transparent text-white font-medium text-sm placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-7 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-all shadow-md whitespace-nowrap active:scale-[0.98]"
                >
                  Get started
                </button>
              </form>

              <p className="text-xs text-zinc-400">
                Setup takes approximately 120 seconds. Custom domains supported on all tiers.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}
