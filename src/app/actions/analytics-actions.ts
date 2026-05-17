'use server'

import { createClient } from '@/utils/supabase/server'

export async function getAnalyticsStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { views: 0, clicks: 0, ctr: 0, chartData: [], linkClicks: [], topReferrers: [], devices: [] }

  // Fetch all analytics with links relations for this profile
  const { data, error } = await supabase
    .from('analytics')
    .select('*, links(*)')
    .eq('profile_id', user.id)

  if (error || !data) {
    return { views: 0, clicks: 0, ctr: 0, chartData: [], linkClicks: [], topReferrers: [], devices: [] }
  }

  // Calculate totals
  const views = data.filter(item => item.link_id === null).length
  const clicks = data.filter(item => item.link_id !== null).length
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : '0.0'

  // 1. Group by date for chart (last 7 days simplified)
  const chartMap: Record<string, { views: number, clicks: number }> = {}
  
  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    chartMap[dateStr] = { views: 0, clicks: 0 }
  }

  data.forEach(item => {
    const dateStr = new Date(item.created_at).toISOString().split('T')[0]
    if (chartMap[dateStr]) {
      if (item.link_id === null) {
        chartMap[dateStr].views += 1
      } else {
        chartMap[dateStr].clicks += 1
      }
    }
  })

  const chartData = Object.keys(chartMap).map(date => ({
    name: new Date(date).toLocaleDateString('short', { month: 'short', day: 'numeric' }),
    views: chartMap[date].views,
    clicks: chartMap[date].clicks
  }))

  // 2. Link Clicks Breakdown
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

  // 3. Top Referrers
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

  // 4. Device Breakdown
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

  return { views, clicks, ctr, chartData, linkClicks, topReferrers, devices }
}
