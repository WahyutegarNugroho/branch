import { getAnalyticsStats } from '@/app/actions/analytics-actions'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'

export const revalidate = 0 // Opt out of caching for real-time analytics dashboard

export default async function AnalyticsPage() {
  const initialData = await getAnalyticsStats()

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Analytics</h1>
        <p className="text-zinc-400 text-base mt-1">Track your audience engagement, link clicks, geolocation, and UTM campaign performace.</p>
      </div>

      <AnalyticsDashboard initialData={initialData} />
    </div>
  )
}
