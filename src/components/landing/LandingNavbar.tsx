'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react'

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // R-32: Close mobile drawer with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-all">
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1"
          >
            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform" aria-hidden="true">
              <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Branch
            </span>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
          <a
            href="#demo"
            className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Live Preview
          </a>
          <a
            href="#features"
            className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Features
          </a>
          <a
            href="#studio"
            className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Style Preview
          </a>
          <a
            href="#compare"
            className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Why Branch
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            FAQ
          </a>
        </div>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            Claim your page
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150"
        >
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
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="w-full h-10 inline-flex items-center justify-center rounded-lg bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100"
            >
              Claim your page
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
