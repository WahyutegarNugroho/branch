'use client'

import { useEffect, useRef } from 'react'

export function PageTracker({ profileId }: { profileId: string }) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true

    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile_id: profileId,
        referrer: document.referrer,
      }),
    }).catch(err => console.error('Analytics error:', err))
  }, [profileId])

  return null
}
