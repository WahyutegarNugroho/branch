import { NextResponse, after } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limiter'
import { analyticsPayloadSchema, ipGeoResponseSchema } from '@/lib/validations'

function getClientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json()
    const parsedBody = analyticsPayloadSchema.safeParse(rawBody)

    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.issues[0].message }, { status: 400 })
    }

    const { profile_id, link_id, referrer, utm_source, utm_medium, utm_campaign } = parsedBody.data

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

    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /mobile/i.test(userAgent)
    const device = isMobile ? 'mobile' : 'desktop'

    // Insert event first (fast path) — geo enrichment happens post-response via after()
    const { data: inserted, error } = await supabase
      .from('analytics')
      .insert([{
        profile_id,
        link_id: link_id || null,
        device,
        referrer: referrer || null,
        country: null,
        city: null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
      }])
      .select('id')
      .single()

    if (error || !inserted) {
      console.error('Analytics insert error:', error)
      return NextResponse.json({ error: error?.message ?? 'Insert failed' }, { status: 500 })
    }

    const insertedId = inserted.id as string
    const isLocalIp = !clientIp || clientIp === '127.0.0.1' || clientIp === '::1' || clientIp.startsWith('localhost') || clientIp.startsWith('192.168.') || clientIp.startsWith('10.') || clientIp.startsWith('172.')

    if (!isLocalIp) {
      after(async () => {
        try {
          const res = await fetch(`https://ip-api.com/json/${clientIp}?fields=status,country,city`, { signal: AbortSignal.timeout(2000) })
          const rawGeo = await res.json()
          const parsedGeo = ipGeoResponseSchema.safeParse(rawGeo)
          if (parsedGeo.success && parsedGeo.data.status === 'success') {
            await supabase
              .from('analytics')
              .update({
                country: parsedGeo.data.country || null,
                city: parsedGeo.data.city || null,
              })
              .eq('id', insertedId)
          }
        } catch (err) {
          console.error('IP Geolocation enrichment error:', err)
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
