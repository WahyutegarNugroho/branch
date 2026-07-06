import Link from 'next/link'
import { BackgroundBlobs } from '@/components/shared/BackgroundBlobs'
import { Search, Zap } from 'lucide-react'

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      <BackgroundBlobs className="opacity-30" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-3xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/20 mb-2">
          <Search className="w-8 h-8 text-black" />
        </div>

        <h1 className="text-6xl font-display-theme font-black tracking-tight text-white">
          User not found
        </h1>

        <div className="space-y-2">
          <p className="text-sm text-zinc-400 max-w-xs">
            This username does not exist. It may have been changed or the link you followed is incorrect.
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 border border-white/10 hover:bg-zinc-700 text-white font-bold text-sm transition-all"
          >
            <Zap className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm shadow-lg shadow-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create yours
          </Link>
        </div>
      </div>
    </div>
  )
}
