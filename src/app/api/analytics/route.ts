import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { profile_id, link_id, referrer } = await request.json()

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

    const { error } = await supabase
      .from('analytics')
      .insert([{
        profile_id,
        link_id: link_id || null,
        device,
        referrer: referrer || null
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
