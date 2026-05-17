import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { AnimatedProfile } from '@/components/public/AnimatedProfile'
import { Metadata } from 'next'
import Script from 'next/script'

// Force dynamic rendering to ensure real-time updates and bypass caching
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, username, bio, avatar_url, seo_title, seo_description')
    .eq('username', username)
    .single()

  if (!profile) {
    return {
      title: 'Profile Not Found'
    }
  }

  const name = profile.full_name || `@${profile.username}`
  const seoTitle = profile.seo_title || name
  const seoDescription = profile.seo_description || profile.bio || `Connect with ${name} on Branch. View their curated links, media, and social networks.`

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: `${seoTitle} | Branch`,
      description: seoDescription,
      type: "profile",
      username: profile.username,
      images: profile.avatar_url ? [{ url: profile.avatar_url, alt: name }] : []
    },
    twitter: {
      card: 'summary',
      title: `${seoTitle} | Branch`,
      description: seoDescription,
      images: profile.avatar_url ? [profile.avatar_url] : []
    }
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  // Use generic client because public profiles don't need user session
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (profileError || !profile) {
    notFound()
  }

  const { data: links, error: linksError } = await supabase
    .from('links')
    .select('*, link_images(*)')
    .eq('profile_id', profile.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  // Construct background styling
  let bgStyle: React.CSSProperties = {}
  let bgClass = "min-h-screen w-full relative flex flex-col items-center py-16 px-4 overflow-hidden"

  if (profile.bg_type === 'solid') {
    bgStyle.backgroundColor = profile.bg_color || '#09090b' // Default to zinc-950
  } else if (profile.bg_type === 'gradient') {
    bgStyle.background = profile.bg_color || 'linear-gradient(to bottom, #ec4899, #f97316)'
  } else if (profile.bg_type === 'image' && profile.bg_image_url) {
    bgStyle.backgroundImage = `url(${profile.bg_image_url})`
    bgClass += " bg-cover bg-center bg-no-repeat"
  } else if (profile.bg_type === 'video') {
    bgStyle.backgroundColor = '#09090b'
  } else {
    // Default modern fallback
    bgStyle.backgroundColor = '#09090b'
  }

  // Filter links based on active valid_from and valid_until schedules
  const now = new Date()
  const visibleLinks = (links || []).filter(link => {
    if (link.valid_from) {
      const fromDate = new Date(link.valid_from)
      if (now < fromDate) return false
    }
    if (link.valid_until) {
      const untilDate = new Date(link.valid_until)
      if (now > untilDate) return false
    }
    return true
  })

  return (
    <>
      {/* 1. Google Analytics Integration */}
      {profile.ga_measurement_id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${profile.ga_measurement_id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${profile.ga_measurement_id}');
            `}
          </Script>
        </>
      )}

      {/* 2. Facebook Meta Pixel Integration */}
      {profile.meta_pixel_id && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${profile.meta_pixel_id}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* 3. TikTok Pixel Integration */}
      {profile.tiktok_pixel_id && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokSdkObject=t;var tt=w[t]=w[t]||[];tt.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],tt.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<tt.methods.length;i++)tt.setAndDefer(tt,tt.methods[i]);tt.instance=function(t){for(var e=tt._i[t]||[],n=0;n<tt.methods.length;n++)tt.setAndDefer(e,tt.methods[n]);return e},tt.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";tt._i=tt._i||{},tt._i[e]=[],tt._i[e]._u=i,tt._t=tt._t||{},tt._t[e]=+new Date,tt._o=tt._o||{},tt._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              tt.load('${profile.tiktok_pixel_id}');
              tt.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      <AnimatedProfile 
        profile={profile} 
        links={visibleLinks} 
        bgClass={bgClass} 
        bgStyle={bgStyle} 
      />
    </>
  )
}
