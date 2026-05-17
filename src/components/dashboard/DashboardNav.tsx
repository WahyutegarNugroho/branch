'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/auth/actions'
import { LogOut, Copy, Check, Zap, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { ShareModal } from '@/components/dashboard/ShareModal'

export function DashboardNav({ username }: { username?: string }) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleCopy = async () => {
    if (!username) return
    try {
      const publicUrl = `${window.location.origin}/${username}`
      await navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      toast.success('Link profil disalin ke clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Gagal menyalin link:', err)
      toast.error('Gagal menyalin link')
    }
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">Branch</span>
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
                profile={{ username } as any}
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
