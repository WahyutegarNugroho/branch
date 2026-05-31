import type { ReactNode } from 'react'
import { BackgroundBlobs } from '@/components/shared/BackgroundBlobs'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 relative overflow-hidden font-sans-theme">
      <BackgroundBlobs className="opacity-60" />
      <div className="w-full max-w-md px-4 z-10">
        {children}
      </div>
    </div>
  )
}
