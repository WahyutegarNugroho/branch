'use client'
 
import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error)
  }, [error])
 
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans-theme text-white">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 text-center shadow-xl flex flex-col items-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-zinc-400 mb-8 text-sm">
          We experienced an unexpected issue. You can try refreshing the page or contact support if the problem persists.
        </p>
        <Button 
          onClick={() => reset()}
          className="w-full bg-white text-zinc-950 hover:bg-zinc-200"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Try again
        </Button>
      </div>
    </div>
  )
}
