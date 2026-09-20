import React from 'react'
import Link from 'next/link'
import {
  Zap,
  CheckCircle2
} from 'lucide-react'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { HeroLivePreview } from '@/components/landing/HeroLivePreview'
import { BentoFeatures } from '@/components/landing/BentoFeatures'
import { InteractiveStudio } from '@/components/landing/InteractiveStudio'
import { ComparisonSection } from '@/components/landing/ComparisonSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export const metadata = {
  title: 'Branch: Clean, Fast Link-in-Bio',
  description: 'Put your links, music, videos, and socials on a single fast page. Fully customizable, no watermarks, and privacy-friendly analytics.',
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
                {/* Primary Heading (Focal Point: No category badge parked above) */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                  One link for everything you make.
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                  Share your links, music, videos, and socials on a clean page that loads instantly. Custom backgrounds, no ads, and analytics that actually respect privacy.
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
                      className="h-12 px-6 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-all shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center whitespace-nowrap active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Claim your link
                    </button>
                  </form>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Free forever
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      No credit card needed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Setup in 2 minutes
                    </span>
                  </div>
                </div>

                {/* Architecture Highlights Bar (R-17/R-36: Real features, no speculative speeds) */}
                <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">Unlimited</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Links & embeds</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">6 Styles</p>
                    <p className="text-xs text-zinc-400 mt-0.5">WebGL backgrounds</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">0 Cookies</p>
                    <p className="text-xs text-zinc-400 mt-0.5">First-party stats</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">Zero</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Forced watermarks</p>
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
                Build your bio page in minutes.
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                Put your store, socials, and projects under one clean URL. Free forever with no ads and zero forced watermarks.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="h-12 px-8 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-all shadow-md flex items-center justify-center whitespace-nowrap active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Create your free page
                </Link>
                <Link
                  href="/login"
                  className="h-12 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-sm border border-zinc-700 transition-all flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Sign in
                </Link>
              </div>

              <p className="text-xs text-zinc-400">
                No credit card required. Free plan includes custom themes and analytics.
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
