'use client'

import { useState, useSyncExternalStore } from 'react'
import { getAnalyticsStats } from '@/app/actions/analytics-actions'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  Eye, 
  MousePointerClick, 
  Percent, 
  Globe, 
  Laptop, 
  Smartphone, 
  Link as LinkIcon, 
  Share2, 
  Download, 
  Calendar, 
  MapPin, 
  Compass, 
  Target, 
  Loader2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'

export function AnalyticsDashboard({ 
  initialData, 
  username 
}: { 
  initialData: Awaited<ReturnType<typeof getAnalyticsStats>>
  username?: string 
}) {
  const [stats, setStats] = useState(initialData)
  const [filterType, setFilterType] = useState('7') // '7', '30', '90', 'custom'
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showEmptyMetrics, setShowEmptyMetrics] = useState(false)
  const emptySubscribe = () => () => {}
  const origin = useSyncExternalStore(emptySubscribe, () => window.location.origin, () => 'https://branch.bio')
  const profileUrl = username ? `${origin}/${username}` : ''

  const handleCopy = () => {
    if (!profileUrl) return
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    toast.success('Profile URL copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  // Trigger reloading of analytics stats based on the active selection
  const handleFilterChange = async (val: string) => {
    setFilterType(val)
    if (val === 'custom') return

    setLoading(true)
    try {
      const data = await getAnalyticsStats(parseInt(val))
      setStats(data)
      toast.success(`Analytics updated for the last ${val} days!`)
    } catch {
      toast.error('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  // Load custom date range
  const handleCustomRangeLoad = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select both a start and end date first')
      return
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date cannot be after the end date')
      return
    }

    setLoading(true)
    try {
      const data = await getAnalyticsStats(undefined, startDate, endDate)
      setStats(data)
      toast.success('Analytics updated for custom date range!')
    } catch {
      toast.error('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  // Compile and export data as CSV
  const handleExportCSV = () => {
    if (!stats.rawRecords || stats.rawRecords.length === 0) {
      toast.error('No analytics data available to export')
      return
    }

    try {
      const headers = [
        'ID', 
        'Date/Time', 
        'Type', 
        'Link Title', 
        'Link URL', 
        'Device', 
        'Referrer', 
        'Country', 
        'City', 
        'UTM Source', 
        'UTM Medium', 
        'UTM Campaign'
      ]
      
      const csvRows = [headers.join(',')]
      
      stats.rawRecords.forEach((row) => {
        const values = [
          row.id,
          row.created_at,
          row.type,
          `"${(row.link_title || '').replace(/"/g, '""')}"`,
          `"${(row.link_url || '').replace(/"/g, '""')}"`,
          row.device,
          `"${(row.referrer || '').replace(/"/g, '""')}"`,
          `"${(row.country || '').replace(/"/g, '""')}"`,
          `"${(row.city || '').replace(/"/g, '""')}"`,
          `"${(row.utm_source || '').replace(/"/g, '""')}"`,
          `"${(row.utm_medium || '').replace(/"/g, '""')}"`,
          `"${(row.utm_campaign || '').replace(/"/g, '""')}"`
        ]
        csvRows.push(values.join(','))
      })
      
      const csvContent = "\uFEFF" + csvRows.join("\n") // Add UTF-8 BOM for Excel support
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `branch_bio_analytics_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('Analytics data successfully downloaded (CSV)!')
    } catch {
      toast.error('Failed to export data')
    }
  }

  const hasData = (stats.views > 0 || stats.clicks > 0 || (stats.rawRecords && stats.rawRecords.length > 0))
  const maxClicks = stats.linkClicks?.length > 0 ? Math.max(...stats.linkClicks.map((l) => l.clicks)) : 0
  const maxReferrers = stats.topReferrers?.length > 0 ? Math.max(...stats.topReferrers.map((r) => r.count)) : 0
  const maxCountries = stats.topCountries?.length > 0 ? Math.max(...stats.topCountries.map((c) => c.count)) : 0
  const maxCities = stats.topCities?.length > 0 ? Math.max(...stats.topCities.map((c) => c.count)) : 0

  return (
    <div className="space-y-6 font-sans-theme">
      {/* Dynamic Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
            <Calendar className="w-4 h-4 text-white" />
            Time Range:
          </div>
          <select 
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/50 cursor-pointer"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="custom">Custom Date Range</option>
          </select>

          {filterType === 'custom' && (
            <div className="flex flex-wrap items-center gap-2 animate-in fade-in duration-200 mt-2 sm:mt-0">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-zinc-950 border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-white [color-scheme:dark]"
              />
              <span className="text-zinc-500 text-xs">-</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-zinc-950 border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-white [color-scheme:dark]"
              />
              <button 
                onClick={handleCustomRangeLoad}
                className="bg-white hover:bg-zinc-200 text-black font-bold text-xs px-3 py-1.5 rounded-xl transition-colors active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Download CSV Action */}
        <button 
          onClick={handleExportCSV}
          className="bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-4 py-2 rounded-xl border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="h-[400px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
          <p className="text-zinc-400 text-sm font-semibold">Loading Analytics Data...</p>
        </div>
      ) : !hasData && !showEmptyMetrics ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center shadow-inner">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display-theme font-black text-white">Start driving visitors to your Branch</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  You don&apos;t have any page views or link clicks recorded yet. Share your profile URL on your social bio, posts, or messaging apps to see real-time engagement data light up.
                </p>
              </div>

              {username && (
                <div className="p-2 sm:p-2.5 bg-zinc-900 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-lg">
                  <div className="flex-1 px-3 py-1.5 text-xs sm:text-sm font-mono text-zinc-300 truncate w-full sm:w-auto text-center sm:text-left select-all">
                    {profileUrl}
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopy}
                      className="flex-1 sm:flex-initial bg-white hover:bg-zinc-200 text-black font-bold text-xs h-10 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                    <a
                      href={`/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs h-10 px-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Preview
                    </a>
                  </div>
                </div>
              )}

              {/* 3 Quick Growth Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Social Bio
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Put your link in Instagram, TikTok, and X bios to convert followers into visitors.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-sky-400" />
                    Direct Messages
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Share in WhatsApp, Telegram groups, and email signatures for quick direct clicks.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    UTM Campaigns
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    Append <code className="text-zinc-300">?utm_source=ig</code> to see exactly which channel drives the most visits.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowEmptyMetrics(true)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  View empty metric reports anyway <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {!hasData && showEmptyMetrics && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 gap-3 text-xs mb-4">
              <span className="text-zinc-400">Viewing empty metric templates. No live visits recorded yet.</span>
              <button
                onClick={() => setShowEmptyMetrics(false)}
                className="text-zinc-200 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronUp className="w-3.5 h-3.5" /> Back to Growth Tips
              </button>
            </div>
          )}
          {/* Top Counters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white tabular-nums">{stats.views}</div>
              </CardContent>
            </Card>
            
            <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Clicks</CardTitle>
                <MousePointerClick className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white tabular-nums">{stats.clicks}</div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Click-Through Rate</CardTitle>
                <Percent className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white tabular-nums">{stats.ctr}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Time Series Chart Card */}
          <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-display-theme font-black text-white">Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart data={stats.chartData} />
            </CardContent>
          </Card>

          {/* Advanced Visual Breakdowns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Performing Links */}
            <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-white" />
                  Top Performing Links
                </CardTitle>
                <CardDescription className="text-zinc-400">Individual clicks count per button link.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {(!stats.linkClicks || stats.linkClicks.length === 0) ? (
                  <div className="h-[200px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                    No link clicks recorded yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.linkClicks.map((link) => {
                      const percent = maxClicks > 0 ? (link.clicks / maxClicks) * 100 : 0
                      return (
                        <div key={link.id} className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-zinc-200 truncate max-w-[200px]">{link.title}</span>
                            <span className="font-bold text-white shrink-0 tabular-nums">{link.clicks} clicks</span>
                          </div>
                          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-white rounded-full transition-all duration-500" 
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

            {/* Geolocation Top Countries & Cities */}
            <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white" />
                  Audience Geolocation
                </CardTitle>
                <CardDescription className="text-zinc-400">Demographic breakdown of visitor countries and cities.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Countries List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Top Countries</h4>
                  {(!stats.topCountries || stats.topCountries.length === 0) ? (
                    <p className="text-zinc-500 text-xs">No country data recorded.</p>
                  ) : (
                    stats.topCountries.map((c) => {
                      const percent = maxCountries > 0 ? (c.count / maxCountries) * 100 : 0
                      return (
                        <div key={c.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-300">{c.name}</span>
                            <span className="font-bold text-white tabular-nums">{c.count} views</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>

                <hr className="border-white/5" />

                {/* Cities List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Top Cities</h4>
                  {(!stats.topCities || stats.topCities.length === 0) ? (
                    <p className="text-zinc-500 text-xs">No city data recorded.</p>
                  ) : (
                    stats.topCities.map((c) => {
                      const percent = maxCities > 0 ? (c.count / maxCities) * 100 : 0
                      return (
                        <div key={c.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-300">{c.name}</span>
                            <span className="font-bold text-white tabular-nums">{c.count} views</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Referrer Sources */}
            <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-white" />
                  Top Traffic Sources
                </CardTitle>
                <CardDescription className="text-zinc-400">Domains where visitors clicked your bio page.</CardDescription>
              </CardHeader>
              <CardContent>
                {(!stats.topReferrers || stats.topReferrers.length === 0) ? (
                  <div className="h-[120px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                    No referral sources recorded.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.topReferrers.map((ref) => {
                      const percent = maxReferrers > 0 ? (ref.count / maxReferrers) * 100 : 0
                      return (
                        <div key={ref.name} className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5 text-zinc-400" />
                              {ref.name}
                            </span>
                            <span className="font-bold text-white shrink-0 tabular-nums">{ref.count} visits</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                            <div 
                              className="h-full bg-white rounded-full transition-all duration-500" 
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

            {/* Devices & UTM Campaigns Panel */}
            <div className="space-y-6">
              {/* Devices Breakdown */}
              <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-white" />
                    Devices Breakdown
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Types of hardware used by your visitors.</CardDescription>
                </CardHeader>
                <CardContent>
                  {(!stats.devices || stats.devices.length === 0 || (stats.devices[0].count === 0 && stats.devices[1].count === 0)) ? (
                    <div className="h-[80px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                      No device breakdown available.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.devices.map((device) => {
                        const isMobile = device.name === 'Mobile'
                        const DeviceIcon = isMobile ? Smartphone : Laptop
                        return (
                          <div key={device.name} className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                                <DeviceIcon className="w-4 h-4 text-zinc-400" />
                                {device.name}
                              </span>
                              <span className="font-bold text-white shrink-0 tabular-nums">
                                {device.count} ({device.percentage}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                              <div className={`h-full rounded-full transition-all duration-500 ${isMobile ? 'bg-white' : 'bg-zinc-500'}`} style={{ width: `${device.percentage}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* UTM Campaigns Table */}
              <Card className="border-zinc-800 bg-zinc-950 shadow-sm rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-white" />
                    UTM Campaign Performance
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Marketing campaign tracking parameters performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  {(!stats.utmCampaigns || stats.utmCampaigns.length === 0) ? (
                    <div className="text-zinc-500 text-xs py-4 text-center">No UTM campaigns recorded yet.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                            <th className="py-2">Campaign</th>
                            <th className="py-2 text-right">Views</th>
                            <th className="py-2 text-right">Clicks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.utmCampaigns.map((utm) => (
                            <tr key={utm.name} className="border-b border-zinc-800 text-zinc-200">
                              <td className="py-2.5 font-semibold flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5 text-zinc-500" />
                                {utm.name}
                              </td>
                              <td className="py-2.5 text-right font-bold text-white tabular-nums">{utm.views}</td>
                              <td className="py-2.5 text-right font-bold text-white tabular-nums">{utm.clicks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          </div>
        </>
      )}
    </div>
  )
}
