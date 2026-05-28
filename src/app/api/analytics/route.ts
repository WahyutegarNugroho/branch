import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limiter'

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function isValidUuid(val: unknown): val is string {
  return typeof val === 'string' && uuidRegex.test(val)
}

function getClientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { profile_id, link_id } = body

    // L1: Validasi format UUID profile_id
    if (!isValidUuid(profile_id)) {
      return NextResponse.json({ error: 'Invalid profile_id' }, { status: 400 })
    }

    // L2: Rate limiting per IP
    const clientIp = getClientIp(request)
    const ipLimit = checkRateLimit(`analytics:ip:${clientIp}`, { maxRequests: 100, windowMs: 60_000 })
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Try again later.' },
        { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfter) } }
      )
    }

    // L3: Rate limiting per profile_id (anti spam targeting profile tertentu)
    const profileLimit = checkRateLimit(`analytics:profile:${profile_id}`, { maxRequests: 30, windowMs: 60_000 })
    if (!profileLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests for this profile.' },
        { status: 429, headers: { 'Retry-After': String(profileLimit.retryAfter) } }
      )
    }

    // L4: Validasi profile_id benar-benar exist di database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: existingProfile, error: profileErr } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', profile_id)
      .maybeSingle()

    if (profileErr || !existingProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const { referrer, utm_source, utm_medium, utm_campaign } = body

    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /mobile/i.test(userAgent)
    const device = isMobile ? 'mobile' : 'desktop'

    const ip = clientIp
    let country: string | null = null
    let city: string | null = null

    const isLocalIp = !ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('localhost') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')
    if (!isLocalIp) {
      try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, { signal: AbortSignal.timeout(2000) })
        const data = await res.json()
        if (data && data.status === 'success') {
          country = data.country || null
          city = data.city || null
        }
      } catch (err) {
        console.error('IP Geolocation error:', err)
      }
    }

    const { error } = await supabase
      .from('analytics')
      .insert([{
        profile_id,
        link_id: isValidUuid(link_id) ? link_id : null,
        device,
        referrer: referrer || null,
        country,
        city,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
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
