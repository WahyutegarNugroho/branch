import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">Branch</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              A clean, fast link-in-bio for creators and developers. Custom themes, privacy-friendly analytics, and zero forced watermarks.
            </p>
          </div>

          {/* Navigation Column 1: Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#demo" className="hover:text-white transition-colors">Live Preview</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">Style Preview</a>
              </li>
              <li>
                <a href="#compare" className="hover:text-white transition-colors">Why Branch</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Account */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
              Account
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">Create Account</Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-white transition-colors">Reset Password</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row (R-26: No dead cursor-pointer controls) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Branch. All rights reserved.</p>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Built for creator privacy</span>
            <span>&bull;</span>
            <span>0 third-party ad cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
