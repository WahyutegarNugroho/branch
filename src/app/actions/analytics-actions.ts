'use server'

import { requireAuth } from '@/utils/supabase/server'

interface AnalyticsRow {
  id: string
  created_at: string
  link_id: string | null
  device: string | null
  referrer: string | null
  country: string | null
  city: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  links: { title: string; url: string } | null
}

const EMPTY_RESPONSE = {
  views: 0,
  clicks: 0,
  ctr: '0.0',
  chartData: [] as Array<{ name: string; views: number; clicks: number }>,
  linkClicks: [] as Array<{ id: string; title: string; clicks: number; url: string }>,
  topReferrers: [] as Array<{ name: string; count: number }>,
  devices: [] as Array<{ name: string; count: number; percentage: number }>,
  topCountries: [] as Array<{ name: string; count: number }>,
  topCities: [] as Array<{ name: string; count: number }>,
  utmCampaigns: [] as Array<{ name: string; views: number; clicks: number }>,
  rawRecords: [] as Array<Record<string, string>>,
}

export async function getAnalyticsStats(days?: number, startDate?: string, endDate?: string) {
  const { supabase, user } = await requireAuth()
  if (!user) return EMPTY_RESPONSE

  // 1. Build date filters

  // 2. Count views and clicks separately (no row fetch)
  const applyDateFilter = (query: any) => {
    if (startDate && endDate) {
      return query
        .gte('created_at', new Date(startDate).toISOString())
        .lte('created_at', new Date(endDate + 'T23:59:59.999Z').toISOString())
    }
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - (days || 7))
    return query.gte('created_at', cutoff.toISOString())
  }

  const [viewsResult, clicksResult] = await Promise.all([
    applyDateFilter(
      supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).is('link_id', null)
    ),
    applyDateFilter(
      supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', user.id).not('link_id', 'is', null)
    ),
  ])

  const views = viewsResult.count ?? 0
  const clicks = clicksResult.count ?? 0
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : '0.0'

  // 3. Fetch limited dataset for breakdowns (columns only, max 5000 rows)
  const { data, error } = await applyDateFilter(
    supabase
      .from('analytics')
      .select('id, created_at, link_id, device, referrer, country, city, utm_source, utm_medium, utm_campaign, links(title, url)')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5000)
  ) as { data: AnalyticsRow[] | null; error: unknown }

  const rows = (data ?? []) as AnalyticsRow[]
  if (error || rows.length === 0) {
    console.error('Error fetching analytics:', error)
    return EMPTY_RESPONSE
  }

  // 4. Chart data
  let start = new Date()
  let end = new Date()
  if (startDate && endDate) {
    start = new Date(startDate)
    end = new Date(endDate)
  } else {
    const daysCount = days || 7
    start.setDate(end.getDate() - (daysCount - 1))
  }

  const chartMap: Record<string, { views: number; clicks: number }> = {}
  const curr = new Date(start)
  while (curr <= end) {
    const dateStr = curr.toISOString().split('T')[0]
    chartMap[dateStr] = { views: 0, clicks: 0 }
    curr.setDate(curr.getDate() + 1)
  }

  rows.forEach(item => {
    const dateStr = new Date(item.created_at).toISOString().split('T')[0]
    if (chartMap[dateStr] !== undefined) {
      if (item.link_id === null) {
        chartMap[dateStr].views += 1
      } else {
        chartMap[dateStr].clicks += 1
      }
    }
  })

  const chartData = Object.keys(chartMap).map(date => ({
    name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: chartMap[date].views,
    clicks: chartMap[date].clicks,
  }))

  // 5. Link clicks breakdown
  const linkClicksMap: Record<string, { title: string; clicks: number; url: string }> = {}
  rows.forEach(item => {
    if (item.link_id !== null) {
      const linkId = item.link_id
      const title = item.links?.title || 'Unknown Link'
      const url = item.links?.url || '#'
      if (!linkClicksMap[linkId]) {
        linkClicksMap[linkId] = { title, clicks: 0, url }
      }
      linkClicksMap[linkId].clicks += 1
    }
  })

  const linkClicks = Object.keys(linkClicksMap).map(id => ({
    id,
    title: linkClicksMap[id].title,
    clicks: linkClicksMap[id].clicks,
    url: linkClicksMap[id].url,
  })).sort((a, b) => b.clicks - a.clicks)

  // 6. Top referrers
  const referrerMap: Record<string, number> = {}
  rows.forEach(item => {
    let ref = item.referrer || 'Direct'
    if (ref !== 'Direct') {
      try {
        const urlObj = new URL(ref)
        ref = urlObj.hostname.replace('www.', '')
      } catch {
        // keep original
      }
    }
    referrerMap[ref] = (referrerMap[ref] || 0) + 1
  })

  const topReferrers = Object.keys(referrerMap).map(name => ({
    name,
    count: referrerMap[name],
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // 7. Device breakdown
  let desktopCount = 0
  let mobileCount = 0
  rows.forEach(item => {
    if (item.device === 'mobile') {
      mobileCount++
    } else {
      desktopCount++
    }
  })

  const totalDeviceRecords = desktopCount + mobileCount
  const devices = [
    { name: 'Mobile', count: mobileCount, percentage: totalDeviceRecords > 0 ? Math.round((mobileCount / totalDeviceRecords) * 100) : 0 },
    { name: 'Desktop', count: desktopCount, percentage: totalDeviceRecords > 0 ? Math.round((desktopCount / totalDeviceRecords) * 100) : 0 },
  ]

  // 8. Top countries
  const countryMap: Record<string, number> = {}
  rows.forEach(item => {
    const country = item.country || 'Unknown'
    countryMap[country] = (countryMap[country] || 0) + 1
  })
  const topCountries = Object.keys(countryMap).map(name => ({
    name,
    count: countryMap[name],
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // 9. Top cities
  const cityMap: Record<string, number> = {}
  rows.forEach(item => {
    const city = item.city || 'Unknown'
    cityMap[city] = (cityMap[city] || 0) + 1
  })
  const topCities = Object.keys(cityMap).map(name => ({
    name,
    count: cityMap[name],
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // 10. UTM campaigns
  const utmMap: Record<string, { views: number; clicks: number }> = {}
  rows.forEach(item => {
    const campaign = item.utm_campaign || 'Organic'
    if (!utmMap[campaign]) {
      utmMap[campaign] = { views: 0, clicks: 0 }
    }
    if (item.link_id === null) {
      utmMap[campaign].views += 1
    } else {
      utmMap[campaign].clicks += 1
    }
  })
  const utmCampaigns = Object.keys(utmMap).map(name => ({
    name,
    views: utmMap[name].views,
    clicks: utmMap[name].clicks,
  })).sort((a, b) => (b.views + b.clicks) - (a.views + a.clicks))

  // 11. Raw records for CSV export (limited to 5000)
  const rawRecords = rows.map(item => ({
    id: item.id,
    created_at: item.created_at,
    type: item.link_id ? 'click' : 'view',
    link_title: item.links?.title || 'Profile View',
    link_url: item.links?.url || 'N/A',
    device: item.device || 'desktop',
    referrer: item.referrer || 'Direct',
    country: item.country || 'Unknown',
    city: item.city || 'Unknown',
    utm_source: item.utm_source || '',
    utm_medium: item.utm_medium || '',
    utm_campaign: item.utm_campaign || '',
  }))

  return { views, clicks, ctr, chartData, linkClicks, topReferrers, devices, topCountries, topCities, utmCampaigns, rawRecords }
}
