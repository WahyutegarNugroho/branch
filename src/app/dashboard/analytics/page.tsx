import { getAnalyticsStats } from '@/app/actions/analytics-actions'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Eye, MousePointerClick, Percent, Globe, Laptop, Smartphone, Link as LinkIcon, Share2 } from 'lucide-react'

export const revalidate = 0 // Opt out of caching for analytics dashboard

export default async function AnalyticsPage() {
  const { views, clicks, ctr, chartData, linkClicks, topReferrers, devices } = await getAnalyticsStats()

  // Find max click count to compute percentages dynamically for the link click progress bars
  const maxClicks = linkClicks.length > 0 ? Math.max(...linkClicks.map(l => l.clicks)) : 0
  const maxReferrers = topReferrers.length > 0 ? Math.max(...topReferrers.map(r => r.count)) : 0

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Analytics</h1>
        <p className="text-zinc-400 text-base mt-1">Track your audience engagement and link performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{views}</div>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{clicks}</div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Click-Through Rate</CardTitle>
            <Percent className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{ctr}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyticsChart data={chartData} />
        </CardContent>
      </Card>

      {/* Deep Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performing Links Card */}
        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-brand-pink" />
              Top Performing Links
            </CardTitle>
            <CardDescription className="text-zinc-400">Individual clicks count per button link.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {linkClicks.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                No link clicks recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {linkClicks.map(link => {
                  const percent = maxClicks > 0 ? (link.clicks / maxClicks) * 100 : 0
                  return (
                    <div key={link.id} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-zinc-200 truncate max-w-[200px]">{link.title}</span>
                        <span className="font-bold text-white shrink-0">{link.clicks} clicks</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-pink to-brand-orange rounded-full transition-all duration-500" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500 block truncate max-w-[250px]">{link.url}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referrer & Device Column */}
        <div className="space-y-6">
          {/* Traffic Sources Referrers */}
          <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-brand-orange" />
                Top Traffic Sources
              </CardTitle>
              <CardDescription className="text-zinc-400">Referrer domains where visitors clicked your bio.</CardDescription>
            </CardHeader>
            <CardContent>
              {topReferrers.length === 0 ? (
                <div className="h-[120px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                  No referral sources recorded.
                </div>
              ) : (
                <div className="space-y-4">
                  {topReferrers.map(ref => {
                    const percent = maxReferrers > 0 ? (ref.count / maxReferrers) * 100 : 0
                    return (
                      <div key={ref.name} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-zinc-400" />
                            {ref.name}
                          </span>
                          <span className="font-bold text-white shrink-0">{ref.count} visits</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                          <div 
                            className="h-full bg-brand-orange rounded-full transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Devices Breakdown */}
          <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-400" />
                Devices Breakdown
              </CardTitle>
              <CardDescription className="text-zinc-400">Types of hardware used by your visitors.</CardDescription>
            </CardHeader>
            <CardContent>
              {devices.length === 0 || (devices[0].count === 0 && devices[1].count === 0) ? (
                <div className="h-[80px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                  No device breakdown available.
                </div>
              ) : (
                <div className="space-y-4">
                  {devices.map(device => {
                    const isMobile = device.name === 'Mobile'
                    const DeviceIcon = isMobile ? Smartphone : Laptop
                    return (
                      <div key={device.name} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                            <DeviceIcon className="w-4 h-4 text-zinc-400" />
                            {device.name}
                          </span>
                          <span className="font-bold text-white shrink-0">
                            {device.count} ({device.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${isMobile ? 'bg-brand-pink' : 'bg-blue-400'}`}
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
