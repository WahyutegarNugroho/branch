import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { DashboardLayoutContent } from '@/components/dashboard/DashboardLayoutContent'
import { LivePreview } from '@/components/dashboard/LivePreview'
import { getProfile } from '@/app/actions/profile-actions'
import { getLinks } from '@/app/actions/link-actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [profile, links] = await Promise.all([
    getProfile(),
    getLinks()
  ])

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardNav username={profile?.username} />
      <DashboardLayoutContent
        preview={<LivePreview profile={profile} links={links} />}
      >
        {children}
      </DashboardLayoutContent>
    </div>
  )
}
