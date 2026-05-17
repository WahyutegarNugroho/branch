import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { LivePreview } from '@/components/dashboard/LivePreview'
import { getProfile } from '@/app/actions/profile-actions'
import { getLinks } from '@/app/actions/link-actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getProfile()
  const links = await getLinks()

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardNav username={profile?.username} />
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:px-8">
        {/* Left Column - Forms */}
        <div className="py-8 px-4 md:px-0">
          {children}
        </div>
        
        {/* Right Column - Live Preview */}
        <div className="hidden md:block bg-zinc-900/20 border-l border-white/10 relative">
          <LivePreview profile={profile} links={links} />
        </div>
      </div>
    </div>
  )
}
