import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { DashboardLayoutContent } from '@/components/dashboard/DashboardLayoutContent'
import { getProfile } from '@/app/actions/profile-actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getProfile()

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardNav username={profile?.username} />
      <DashboardLayoutContent profile={profile}>
        {children}
      </DashboardLayoutContent>
    </div>
  )
}
