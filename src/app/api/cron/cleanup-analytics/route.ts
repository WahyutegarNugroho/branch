import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// This endpoint can be triggered by Vercel Cron or any other external scheduler
// It deletes analytics data older than 30 days
export async function GET(request: Request) {
  // Check authorization header
  const authHeader = request.headers.get('authorization')
  
  // Use Vercel's CRON_SECRET or a custom secret
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    // We need to use the service role key to bypass RLS and delete all old records
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Delete records older than 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const { data, error } = await supabase
      .from('analytics')
      .delete()
      .lt('created_at', thirtyDaysAgo.toISOString())

    if (error) {
      console.error('Error deleting old analytics:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Old analytics data cleaned up successfully' 
    })
  } catch (err: any) {
    console.error('Cron job error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
