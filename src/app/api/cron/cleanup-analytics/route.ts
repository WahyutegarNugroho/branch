import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization') || ''
  const secret = process.env.CRON_SECRET || ''

  if (!secret || !authHeader.startsWith('Bearer ') || !timingSafeEqual(authHeader.slice(7), secret)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const startTime = Date.now()
  const requestIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { error } = await supabase
      .from('analytics')
      .delete()
      .lt('created_at', thirtyDaysAgo.toISOString())

    const duration = Date.now() - startTime

    if (error) {
      console.error(`[CRON] Analytics cleanup FAILED | ip=${requestIp} | duration=${duration}ms | error=${error.message}`)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`[CRON] Analytics cleanup SUCCESS | ip=${requestIp} | duration=${duration}ms`)
    return NextResponse.json({ success: true, message: 'Old analytics data cleaned up successfully' })
  } catch (err: any) {
    const duration = Date.now() - startTime
    console.error(`[CRON] Analytics cleanup ERROR | ip=${requestIp} | duration=${duration}ms | error=${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
