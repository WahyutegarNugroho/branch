import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { 
      profile_id, 
      link_id, 
      referrer,
      utm_source,
      utm_medium,
      utm_campaign
    } = await request.json()

    if (!profile_id) {
      return NextResponse.json({ error: 'Missing profile_id' }, { status: 400 })
    }

    // We use standard supabase-js client because we don't need user session for anonymous analytics.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Detect device basically from User-Agent
    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /mobile/i.test(userAgent)
    const device = isMobile ? 'mobile' : 'desktop'

    // Detect IP Geolocation
    const ip = request.headers.get('cf-connecting-ip') || 
               request.headers.get('x-real-ip') || 
               request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               '';

    let country = 'Indonesia'
    let city = 'Jakarta'
    
    const isLocalIp = !ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('localhost') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.');
    if (!isLocalIp) {
      try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, { signal: AbortSignal.timeout(2000) });
        const data = await res.json();
        if (data && data.status === 'success') {
          country = data.country || 'Indonesia'
          city = data.city || 'Jakarta'
        }
      } catch (err) {
        console.error('IP Geolocation error:', err);
      }
    }

    const { error } = await supabase
      .from('analytics')
      .insert([{
        profile_id,
        link_id: link_id || null,
        device,
        referrer: referrer || null,
        country,
        city,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null
      }])

    if (error) {
      console.error('Analytics insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
