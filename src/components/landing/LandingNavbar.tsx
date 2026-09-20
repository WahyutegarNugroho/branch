'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Menu, X, ArrowRight } from 'lucide-react'

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-all">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform" aria-hidden="true">
              <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Branch
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                v2.0
              </span>
            </span>
          </Link>

          {/* Real-time status badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800/80 px-2.5 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Zero watermarks &bull; Free forever</span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
          <a href="#demo" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors">
            Live Preview
          </a>
          <a href="#features" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors">
            Features
          </a>
          <a href="#studio" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors">
            Style Preview
          </a>
          <a href="#compare" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors">
            Why Branch
          </a>
          <a href="#faq" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors">
            FAQ
          </a>
        </div>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)]"
          >
            <span>Claim your page</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:translate-x-0.5 group-hover:text-zinc-950 transition-all" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 border border-zinc-800"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-1 text-sm font-medium text-zinc-300">
            <a
              href="#demo"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Live Preview
            </a>
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#studio"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Style Preview
            </a>
            <a
              href="#compare"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              Why Branch
            </a>
            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100"
            >
              <span>Claim your page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
