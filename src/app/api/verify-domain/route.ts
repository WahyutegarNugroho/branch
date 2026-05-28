import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { domain } = await request.json()
    if (!domain || typeof domain !== 'string') {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
    }

    // Check TXT record via DNS-over-HTTPS (Cloudflare)
    const dohUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=TXT`
    const dnsResponse = await fetch(dohUrl, {
      headers: { Accept: 'application/dns-json' },
    })

    if (!dnsResponse.ok) {
      return NextResponse.json({ error: 'Failed to query DNS records' }, { status: 502 })
    }

    const dnsData = await dnsResponse.json()
    const expected = `branch-verification=${user.id}`

    let verified = false
    if (dnsData.Answer) {
      for (const answer of dnsData.Answer) {
        if (answer.type === 16) {
          const txtValue = answer.data.replace(/"/g, '')
          if (txtValue === expected) {
            verified = true
            break
          }
        }
      }
    }

    // Update domain_verified status in database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        custom_domain: domain,
        domain_verified: verified,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      verified,
      expected,
      domain,
    })
  } catch (err) {
    console.error('Domain verification error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
