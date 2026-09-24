'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

interface DashboardLayoutContentProps {
  children: React.ReactNode
  preview?: React.ReactNode
}

export function DashboardLayoutContent({ children, preview }: DashboardLayoutContentProps) {
  const pathname = usePathname()

  // Full-width pages without the mobile live preview phone
  const isWidePage = pathname === '/dashboard/analytics' || pathname === '/dashboard/settings'

  if (isWidePage) {
    return (
      <main className="max-w-6xl mx-auto py-8 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:px-8">
      {/* Left Column - Forms */}
      <main className="py-8 pb-24 md:pb-8 px-4 md:px-0">
        {children}
      </main>
      
      {/* Right Column - Live Preview */}
      <aside aria-label="Live Profile Preview" className="hidden md:block bg-zinc-900/20 border-l border-white/10 relative">
        {preview}
      </aside>
    </div>
  )
}
