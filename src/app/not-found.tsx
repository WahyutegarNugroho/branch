import Link from 'next/link'
import { BackgroundBlobs } from '@/components/shared/BackgroundBlobs'
import { Zap, ShieldAlert } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      <BackgroundBlobs className="opacity-30" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-lg shadow-brand-pink/20 mb-2">
          <Zap className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-7xl font-display-theme font-black tracking-tight text-white">
          404
        </h1>

        <div className="space-y-2">
          <p className="text-xl font-bold text-zinc-200">Page not found</p>
          <p className="text-sm text-zinc-400 max-w-xs">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-brand-pink/10 hover:shadow-brand-pink/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Zap className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
