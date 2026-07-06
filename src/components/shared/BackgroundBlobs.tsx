export function BackgroundBlobs({ className = 'opacity-60' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-white/5 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[60%] rounded-full bg-zinc-500/10 blur-[130px] animate-pulse" style={{ animationDuration: '14s' }} />
    </div>
  )
}
