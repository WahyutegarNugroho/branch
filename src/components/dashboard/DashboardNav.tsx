'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/auth/actions'
import { LogOut, Zap, Share2, Link2, Palette, BarChart3, Settings } from 'lucide-react'
import { ShareModal } from '@/components/dashboard/ShareModal'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Links', icon: Link2 },
  { href: '/dashboard/appearance', label: 'Appearance', icon: Palette },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardNav({ username }: { username?: string }) {
  const pathname = usePathname()
  const [isShareOpen, setIsShareOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl font-sans-theme">
        <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-display-theme font-black text-xl tracking-tight text-white">Branch</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={isActive ? 'bg-white text-zinc-950 hover:bg-zinc-200 rounded-full font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/10 rounded-full font-medium'}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {username && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsShareOpen(true)}
                  className="rounded-full border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 h-9 sm:h-10 px-3 sm:px-4 text-xs font-semibold flex items-center gap-1.5 sm:gap-2 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </Button>
                <ShareModal 
                  isOpen={isShareOpen}
                  onClose={() => setIsShareOpen(false)}
                  profile={{ id: '', username, full_name: null, bio: null, avatar_url: null, bg_type: 'solid', bg_color: '#09090b', bg_image_url: null, bg_overlay_opacity: 40, role: 'user', button_shape: 'rounded-2xl', button_style: 'soft', font_family: 'font-sans-theme', theme_style: 'solid', social_links: null, bg_animation: null, bg_animation_config: null, plan: null, created_at: '', updated_at: '' }}
                />
              </>
            )}
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full h-9 sm:h-10 px-2.5 sm:px-3 text-xs cursor-pointer flex items-center"
              onClick={() => logout()}
              title="Log out"
            >
              <LogOut className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline font-medium">Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 px-3 py-1.5">
        <nav className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 text-center",
                    isActive 
                      ? "text-white font-bold bg-white/10 shadow-sm" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] leading-tight tracking-tight">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
