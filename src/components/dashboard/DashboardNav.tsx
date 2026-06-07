'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/auth/actions'
import { LogOut, Zap, Share2 } from 'lucide-react'
import { ShareModal } from '@/components/dashboard/ShareModal'

export function DashboardNav({ username }: { username?: string }) {
  const pathname = usePathname()
  const [isShareOpen, setIsShareOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl font-sans-theme">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display-theme font-black text-xl tracking-tight text-white hidden sm:block">Branch</span>
          </div>
          <nav className="flex items-center space-x-1 lg:space-x-2">
            <Link href="/dashboard">
              <Button
                variant={pathname === '/dashboard' ? 'default' : 'ghost'}
                className={pathname === '/dashboard' ? 'bg-white text-zinc-950 hover:bg-zinc-200 rounded-full' : 'text-zinc-400 hover:text-white hover:bg-white/10 rounded-full'}
              >
                Links
              </Button>
            </Link>
            <Link href="/dashboard/appearance">
              <Button
                variant={pathname === '/dashboard/appearance' ? 'default' : 'ghost'}
                className={pathname === '/dashboard/appearance' ? 'bg-white text-zinc-950 hover:bg-zinc-200 rounded-full' : 'text-zinc-400 hover:text-white hover:bg-white/10 rounded-full'}
              >
                Appearance
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button
                variant={pathname === '/dashboard/analytics' ? 'default' : 'ghost'}
                className={pathname === '/dashboard/analytics' ? 'bg-white text-zinc-950 hover:bg-zinc-200 rounded-full' : 'text-zinc-400 hover:text-white hover:bg-white/10 rounded-full'}
              >
                Analytics
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button
                variant={pathname === '/dashboard/settings' ? 'default' : 'ghost'}
                className={pathname === '/dashboard/settings' ? 'bg-white text-zinc-950 hover:bg-zinc-200 rounded-full' : 'text-zinc-400 hover:text-white hover:bg-white/10 rounded-full'}
              >
                Settings
              </Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {username && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsShareOpen(true)}
                className="rounded-full border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 h-10 px-4 text-xs font-semibold flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
          <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
