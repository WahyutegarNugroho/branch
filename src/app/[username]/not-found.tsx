import Link from 'next/link'
import { Zap, Search } from 'lucide-react'

export default function UsernameNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 relative overflow-hidden font-sans-theme">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-brand-pink/15 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[60%] rounded-full bg-brand-orange/15 blur-[130px] animate-pulse" style={{ animationDuration: '14s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-lg shadow-brand-pink/20 mb-2">
          <Search className="w-8 h-8 text-white" />
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-brand-pink/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create yours
          </Link>
        </div>
      </div>
    </div>
  )
}
