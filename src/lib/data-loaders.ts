import { cache } from 'react'
import { createClient } from '@/utils/supabase/server'

export const getCachedLinks = cache(async (userId: string) => {
  const supabase = await createClient()
  return supabase
    .from('links')
    .select('*')
    .eq('profile_id', userId)
    .order('sort_order', { ascending: true })
})

export const getCachedProfile = cache(async (userId: string) => {
  const supabase = await createClient()
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
})

export const getCachedProfileByUsername = cache(async (username: string) => {
  const supabase = await createClient()
  return supabase
    .from('profiles')
    .select('*, links(*)')
    .eq('username', username)
    .single()
})

export const getCachedAnalyticsCounts = cache(async (userId: string, dateFilter: { start?: string; end?: string; days?: number }) => {
  const supabase = await createClient()

  const applyFilter = (query: any) => {
    if (dateFilter.start && dateFilter.end) {
      return query
        .gte('created_at', new Date(dateFilter.start).toISOString())
        .lte('created_at', new Date(dateFilter.end + 'T23:59:59.999Z').toISOString())
    }
    if (dateFilter.days && dateFilter.days > 0) {
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - dateFilter.days)
      return query.gte('created_at', cutoff.toISOString())
    }
    return query
  }

  const [views, clicks] = await Promise.all([
    applyFilter(
      supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', userId).is('link_id', null)
    ),
    applyFilter(
      supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('profile_id', userId).not('link_id', 'is', null)
    ),
  ])
  return { views: views.count ?? 0, clicks: clicks.count ?? 0 }
})
