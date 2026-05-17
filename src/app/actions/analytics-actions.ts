'use server'

import { createClient } from '@/utils/supabase/server'

export async function getAnalyticsStats(days?: number, startDate?: string, endDate?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const emptyResponse = {
    views: 0,
    clicks: 0,
    ctr: '0.0',
    chartData: [],
    linkClicks: [],
    topReferrers: [],
    devices: [],
    topCountries: [],
    topCities: [],
    utmCampaigns: [],
    rawRecords: []
  }

  if (!user) return emptyResponse

  // 1. Construct dynamic date filters
  let query = supabase
    .from('analytics')
    .select('*, links(*)')
    .eq('profile_id', user.id)

  if (startDate && endDate) {
    // Include the entire end date till 23:59:59
    query = query
      .gte('created_at', new Date(startDate).toISOString())
      .lte('created_at', new Date(endDate + 'T23:59:59.999Z').toISOString())
  } else if (days && days > 0) {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    query = query.gte('created_at', cutoff.toISOString())
  } else {
    // Default to last 7 days
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    query = query.gte('created_at', cutoff.toISOString())
  }

  const { data, error } = await query

  if (error || !data) {
    console.error('Error fetching analytics:', error)
    return emptyResponse
  }

  // Calculate totals
  const views = data.filter(item => item.link_id === null).length
  const clicks = data.filter(item => item.link_id !== null).length
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : '0.0'

  // 2. Dynamic Chart date range initial mapping
  const chartMap: Record<string, { views: number, clicks: number }> = {}
  
  let start = new Date()
  let end = new Date()

  if (startDate && endDate) {
    start = new Date(startDate)
    end = new Date(endDate)
  } else {
    const daysCount = days || 7
    start.setDate(end.getDate() - (daysCount - 1))
  }

  // Fill in every single date in the range to ensure a continuous line/bar chart
  const curr = new Date(start)
  while (curr <= end) {
    const dateStr = curr.toISOString().split('T')[0]
    chartMap[dateStr] = { views: 0, clicks: 0 }
    curr.setDate(curr.getDate() + 1)
  }

  data.forEach(item => {
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
    name: new Date(date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
    views: chartMap[date].views,
    clicks: chartMap[date].clicks
  }))

  // 3. Link Clicks Breakdown
  const linkClicksMap: Record<string, { title: string; clicks: number; url: string }> = {}
  data.forEach(item => {
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
    url: linkClicksMap[id].url
  })).sort((a, b) => b.clicks - a.clicks)

  // 4. Top Referrers
  const referrerMap: Record<string, number> = {}
  data.forEach(item => {
    let ref = item.referrer || 'Direct'
    if (ref !== 'Direct') {
      try {
        const urlObj = new URL(ref)
        ref = urlObj.hostname.replace('www.', '')
      } catch (e) {
        // Keep original string if not a valid URL
      }
    }
    referrerMap[ref] = (referrerMap[ref] || 0) + 1
  })

  const topReferrers = Object.keys(referrerMap).map(name => ({
    name,
    count: referrerMap[name]
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // 5. Device Breakdown
  let desktopCount = 0
  let mobileCount = 0
  data.forEach(item => {
    if (item.device === 'mobile') {
      mobileCount++
    } else {
      desktopCount++
    }
  })
  
  const totalDeviceRecords = desktopCount + mobileCount
  const devices = [
    { name: 'Mobile', count: mobileCount, percentage: totalDeviceRecords > 0 ? Math.round((mobileCount / totalDeviceRecords) * 100) : 0 },
    { name: 'Desktop', count: desktopCount, percentage: totalDeviceRecords > 0 ? Math.round((desktopCount / totalDeviceRecords) * 100) : 0 }
  ]

  // 6. Top Countries Geolocation
  const countryMap: Record<string, number> = {}
  data.forEach(item => {
    const country = item.country || 'Indonesia'
    countryMap[country] = (countryMap[country] || 0) + 1
  })
  const topCountries = Object.keys(countryMap).map(name => ({
    name,
    count: countryMap[name]
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // 7. Top Cities Geolocation
  const cityMap: Record<string, number> = {}
  data.forEach(item => {
    const city = item.city || 'Jakarta'
    cityMap[city] = (cityMap[city] || 0) + 1
  })
  const topCities = Object.keys(cityMap).map(name => ({
    name,
    count: cityMap[name]
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  // 8. UTM Campaigns Tracker
  const utmMap: Record<string, { views: number; clicks: number }> = {}
  data.forEach(item => {
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
    clicks: utmMap[name].clicks
  })).sort((a, b) => (b.views + b.clicks) - (a.views + a.clicks))

  // 9. Formatted Raw Records for CSV Export
  const rawRecords = data.map(item => ({
    id: item.id,
    created_at: item.created_at,
    type: item.link_id ? 'click' : 'view',
    link_title: item.links?.title || 'Profile View',
    link_url: item.links?.url || 'N/A',
    device: item.device || 'desktop',
    referrer: item.referrer || 'Direct',
    country: item.country || 'Indonesia',
    city: item.city || 'Jakarta',
    utm_source: item.utm_source || '',
    utm_medium: item.utm_medium || '',
    utm_campaign: item.utm_campaign || ''
  }))

  return { 
    views, 
    clicks, 
    ctr, 
    chartData, 
    linkClicks, 
    topReferrers, 
    devices, 
    topCountries, 
    topCities, 
    utmCampaigns, 
    rawRecords 
  }
}
