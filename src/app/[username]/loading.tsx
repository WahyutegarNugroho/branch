export default function ProfileLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1c1c1e] sm:py-8 sm:px-4">
      <div className="min-h-screen sm:min-h-[820px] sm:max-h-[880px] w-full sm:w-[480px] sm:rounded-[40px] sm:border sm:border-white/10 relative flex flex-col items-center py-16 px-6 bg-zinc-900 animate-pulse">
        <div className="w-28 h-28 rounded-full bg-zinc-800 mb-6" />
        <div className="h-6 w-48 rounded-full bg-zinc-800 mb-3" />
        <div className="h-4 w-64 rounded-full bg-zinc-800 mb-10" />
        <div className="w-full max-w-md space-y-4">
          <div className="h-14 w-full rounded-2xl bg-zinc-800" />
          <div className="h-14 w-full rounded-2xl bg-zinc-800" />
          <div className="h-14 w-full rounded-2xl bg-zinc-800" />
          <div className="h-14 w-full rounded-2xl bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}
