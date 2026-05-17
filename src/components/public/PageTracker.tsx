'use client'

import { useEffect, useRef } from 'react'

export function PageTracker({ profileId }: { profileId: string }) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true

    let utm_source = null
    let utm_medium = null
    let utm_campaign = null
    
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      utm_source = params.get('utm_source')
      utm_medium = params.get('utm_medium')
      utm_campaign = params.get('utm_campaign')
    }

    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile_id: profileId,
        referrer: document.referrer,
        utm_source,
        utm_medium,
        utm_campaign,
      }),
    }).catch(err => console.error('Analytics error:', err))
  }, [profileId])

  return null
}
