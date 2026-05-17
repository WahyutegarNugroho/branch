import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { AnimatedProfile } from '@/components/public/AnimatedProfile'
import { Metadata } from 'next'

// Force dynamic rendering to ensure real-time updates and bypass caching
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, username, bio, avatar_url')
    .eq('username', params.username)
    .single()

  if (!profile) {
    return {
      title: 'Profile Not Found'
    }
  }

  const name = profile.full_name || `@${profile.username}`
  const description = profile.bio || `Connect with ${name} on Branch. View their curated links, media, and social networks.`

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Branch`,
      description,
      type: "profile",
      username: profile.username,
      images: profile.avatar_url ? [{ url: profile.avatar_url, alt: name }] : []
    },
    twitter: {
      card: 'summary',
      title: `${name} | Branch`,
      description,
      images: profile.avatar_url ? [profile.avatar_url] : []
    }
  }
}

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  // Use generic client because public profiles don't need user session
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (profileError || !profile) {
    notFound()
  }

  const { data: links, error: linksError } = await supabase
    .from('links')
    .select('*')
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
    <AnimatedProfile 
      profile={profile} 
      links={visibleLinks} 
      bgClass={bgClass} 
      bgStyle={bgStyle} 
    />
  )
}
