'use client'

import { useState, startTransition } from 'react'
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
  Loader2 
} from 'lucide-react'
import { toast } from 'sonner'

export function AnalyticsDashboard({ initialData }: { initialData: any }) {
  const [stats, setStats] = useState(initialData)
  const [filterType, setFilterType] = useState('7') // '7', '30', '90', 'custom'
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)

  // Trigger reloading of analytics stats based on the active selection
  const handleFilterChange = async (val: string) => {
    setFilterType(val)
    if (val === 'custom') return

    setLoading(true)
    try {
      const data = await getAnalyticsStats(parseInt(val))
      setStats(data)
      toast.success(`Analytics updated for the last ${val} days!`)
    } catch (err) {
      toast.error('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  // Load custom date range
  const handleCustomRangeLoad = async () => {
    if (!startDate || !endDate) {
      toast.error('Pilih tanggal awal dan akhir terlebih dahulu')
      return
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Tanggal awal tidak boleh melebihi tanggal akhir')
      return
    }

    setLoading(true)
    try {
      const data = await getAnalyticsStats(undefined, startDate, endDate)
      setStats(data)
      toast.success('Analytics updated for custom date range!')
    } catch (err) {
      toast.error('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  // Compile and export data as CSV
  const handleExportCSV = () => {
    if (!stats.rawRecords || stats.rawRecords.length === 0) {
      toast.error('Tidak ada data analitik untuk diekspor')
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
      
      stats.rawRecords.forEach((row: any) => {
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
      
      toast.success('Data analitik berhasil diunduh (CSV)!')
    } catch (e) {
      toast.error('Gagal mengekspor data')
    }
  }

  const maxClicks = stats.linkClicks?.length > 0 ? Math.max(...stats.linkClicks.map((l: any) => l.clicks)) : 0
  const maxReferrers = stats.topReferrers?.length > 0 ? Math.max(...stats.topReferrers.map((r: any) => r.count)) : 0
  const maxCountries = stats.topCountries?.length > 0 ? Math.max(...stats.topCountries.map((c: any) => c.count)) : 0
  const maxCities = stats.topCities?.length > 0 ? Math.max(...stats.topCities.map((c: any) => c.count)) : 0

  return (
    <div className="space-y-6">
      {/* Dynamic Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
            <Calendar className="w-4 h-4 text-brand-pink" />
            Rentang Waktu:
          </div>
          <select 
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-pink/50 cursor-pointer"
          >
            <option value="7">7 Hari Terakhir</option>
            <option value="30">30 Hari Terakhir</option>
            <option value="90">90 Hari Terakhir</option>
            <option value="custom">Kustom Tanggal</option>
          </select>

          {filterType === 'custom' && (
            <div className="flex flex-wrap items-center gap-2 animate-in fade-in duration-200 mt-2 sm:mt-0">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-zinc-950 border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-pink"
              />
              <span className="text-zinc-500 text-xs">-</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-zinc-950 border border-white/10 rounded-xl px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-pink"
              />
              <button 
                onClick={handleCustomRangeLoad}
                className="bg-brand-pink hover:bg-brand-pink/90 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors active:scale-95 flex items-center gap-1 shrink-0"
              >
                Terapkan
              </button>
            </div>
          )}
        </div>

        {/* Download CSV Action */}
        <button 
          onClick={handleExportCSV}
          className="bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-4 py-2 rounded-xl border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Ekspor CSV
        </button>
      </div>

      {loading ? (
        <div className="h-[400px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-pink animate-spin" />
          <p className="text-zinc-400 text-sm font-semibold">Memuat Data Analitik...</p>
        </div>
      ) : (
        <>
          {/* Top Counters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.views}</div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Clicks</CardTitle>
                <MousePointerClick className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.clicks}</div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Click-Through Rate</CardTitle>
                <Percent className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.ctr}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Time Series Chart Card */}
          <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart data={stats.chartData} />
            </CardContent>
          </Card>

          {/* Advanced Visual Breakdowns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top Performing Links */}
            <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-brand-pink" />
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
                    {stats.linkClicks.map((link: any) => {
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

            {/* Geolocation Top Countries & Cities */}
            <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
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
                    stats.topCountries.map((c: any) => {
                      const percent = maxCountries > 0 ? (c.count / maxCountries) * 100 : 0
                      return (
                        <div key={c.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-300">{c.name}</span>
                            <span className="font-bold text-white">{c.count} views</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${percent}%` }} />
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
                    stats.topCities.map((c: any) => {
                      const percent = maxCities > 0 ? (c.count / maxCities) * 100 : 0
                      return (
                        <div key={c.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-zinc-300">{c.name}</span>
                            <span className="font-bold text-white">{c.count} views</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Referrer Sources */}
            <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-brand-orange" />
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
                    {stats.topReferrers.map((ref: any) => {
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

            {/* Devices & UTM Campaigns Panel */}
            <div className="space-y-6">
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
                  {(!stats.devices || stats.devices.length === 0 || (stats.devices[0].count === 0 && stats.devices[1].count === 0)) ? (
                    <div className="h-[80px] flex items-center justify-center text-zinc-500 text-sm font-medium">
                      No device breakdown available.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.devices.map((device: any) => {
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

              {/* UTM Campaigns Table */}
              <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-brand-pink" />
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
                          <tr className="border-b border-white/5 text-zinc-400 font-bold uppercase tracking-wider">
                            <th className="py-2">Campaign</th>
                            <th className="py-2 text-center">Views</th>
                            <th className="py-2 text-center">Clicks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.utmCampaigns.map((utm: any) => (
                            <tr key={utm.name} className="border-b border-white/5 text-zinc-200">
                              <td className="py-2.5 font-semibold flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5 text-zinc-500" />
                                {utm.name}
                              </td>
                              <td className="py-2.5 text-center font-bold text-emerald-400">{utm.views}</td>
                              <td className="py-2.5 text-center font-bold text-brand-pink">{utm.clicks}</td>
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
