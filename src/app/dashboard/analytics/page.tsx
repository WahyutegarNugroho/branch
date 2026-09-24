import { getAnalyticsStats } from '@/app/actions/analytics-actions'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'
import { getCachedProfile } from '@/lib/data-loaders'
import { requireAuth } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const revalidate = 0 // Opt out of caching for real-time analytics dashboard

export default async function AnalyticsPage() {
  const { user } = await requireAuth()
  if (!user) redirect('/login')

  const [initialData, profileRes] = await Promise.all([
    getAnalyticsStats(),
    getCachedProfile(user.id)
  ])

  return (
    <div className="space-y-6 pb-12 font-sans-theme">
      <div>
        <h1 className="text-3xl font-display-theme font-black tracking-tight text-white">Analytics</h1>
        <p className="text-zinc-400 text-base mt-1">Track your audience engagement, link clicks, geolocation, and UTM campaign performance.</p>
      </div>

      <AnalyticsDashboard initialData={initialData} username={profileRes.data?.username} />
    </div>
  )
}
