'use client'

import Image from 'next/image'
import { LinkButton } from '@/components/public/LinkButton'
import AuroraBackground from '@/components/backgrounds/AuroraBackground'
import SnowfallBackground from '@/components/backgrounds/SnowfallBackground'
import MatrixBackground from '@/components/backgrounds/MatrixBackground'
import StarsBackground from '@/components/backgrounds/StarsBackground'
import ConfettiBackground from '@/components/backgrounds/ConfettiBackground'
import ParticlesBackground from '@/components/backgrounds/ParticlesBackground'
import { memo, useEffect } from 'react'
import { 
  FaInstagram, 
  FaYoutube, 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaTiktok, 
  FaEnvelope 
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Zap } from 'lucide-react'

import { hexToRgba } from '@/lib/color-utils'
import { parseEmbedUrl } from '@/lib/embed-utils'

const socialsIconMap: Record<string, any> = {
  instagram: FaInstagram,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  github: FaGithub,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
}

import { EmptyState } from '@/components/ui/empty-state'
import { Profile, Link, LinkImage } from '@/types'
import { getPlatformByName } from '@/utils/platforms'
import { usePreviewStore } from '@/lib/preview-store'

export const LivePreview = memo(function LivePreview({ profile: initialProfile, links }: { profile?: Profile | null, links?: Link[] }) {
  const profile = usePreviewStore((s) => s.profile)
  const localLinks = usePreviewStore((s) => s.links)
  const setProfile = usePreviewStore((s) => s.setProfile)
  const setLinks = usePreviewStore((s) => s.setLinks)

  useEffect(() => {
    if (initialProfile) setProfile(initialProfile)
  }, [initialProfile, setProfile])

  useEffect(() => {
    if (links) setLinks(links)
  }, [links, setLinks])

  let bgStyle: React.CSSProperties = {}
  let bgClass = "flex-1 w-full flex flex-col items-center pt-20 px-4 relative overflow-hidden"

  if (profile?.bg_type === 'solid') {
    bgStyle.backgroundColor = profile.bg_color || '#09090b'
  } else if (profile?.bg_type === 'gradient') {
    bgStyle.background = profile.bg_color || 'linear-gradient(to bottom, #ec4899, #f97316)'
  } else if (profile?.bg_type === 'image' && profile?.bg_image_url) {
    bgStyle.backgroundImage = `url(${profile.bg_image_url})`
    bgClass += " bg-cover bg-center bg-no-repeat"
  } else {
    bgStyle.backgroundColor = '#09090b' // fallback
  }

  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center p-8 sticky top-16">
      {/* Smartphone Mockup with Tech Glow */}
      <div className="relative h-[700px] w-[340px] rounded-[3rem] border-[12px] border-zinc-900 bg-zinc-950 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-24 h-6 bg-black rounded-full shadow-inner"></div>
        </div>

        {/* Content Area */}
        <div className={bgClass} style={bgStyle}>
          {profile?.bg_type === 'video' && profile?.bg_video_url && (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <video 
                src={profile.bg_video_url} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {profile?.bg_animation === 'aurora' && <AuroraBackground config={profile?.bg_animation_config} />}
          {profile?.bg_animation === 'particles' && <ParticlesBackground config={profile?.bg_animation_config} />}
          {profile?.bg_animation === 'snowfall' && <SnowfallBackground config={profile?.bg_animation_config} />}
          {profile?.bg_animation === 'stars' && <StarsBackground config={profile?.bg_animation_config} />}
          {profile?.bg_animation === 'matrix' && <MatrixBackground config={profile?.bg_animation_config} />}
          {profile?.bg_animation === 'confetti' && <ConfettiBackground config={profile?.bg_animation_config} />}
          {profile?.bg_animation === 'bokeh' && <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen blur-[8px]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(236,72,153,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(249,115,22,0.4) 0%, transparent 40%)', animation: 'pulseSlow 5s infinite alternate, bgMove 20s ease-in-out infinite' }} />}

          {profile?.banner_url && (
            <div className="absolute top-0 inset-x-0 h-24 w-full overflow-hidden border-b border-white/10 z-0">
              <Image src={profile.banner_url} alt="Banner" fill className="object-cover" sizes="340px" />
            </div>
          )}

          {(profile?.bg_overlay_opacity ?? 0) > 0 && (
            <div 
              className="absolute inset-0 bg-black pointer-events-none z-0" 
              style={{ opacity: (profile?.bg_overlay_opacity ?? 0) / 100 }}
            />
          )}
          
          <div 
            className={`relative z-10 w-full flex flex-col ${
              profile?.profile_align === 'left' ? 'items-start text-left' : 
              profile?.profile_align === 'right' ? 'items-end text-right' : 'items-center text-center'
            } ${
              profile?.theme_style === 'glass' ? 'm-4 p-6 rounded-3xl border border-white/20 shadow-2xl w-[calc(100%-2rem)] shrink-0' : 'h-full p-6'
            } ${profile?.font_family || 'font-sans-theme'} ${profile?.banner_url && profile?.theme_style !== 'glass' ? 'pt-8' : ''}`}
            style={{ 
              color: profile?.text_color || '#ffffff',
              ...(profile?.theme_style === 'glass' ? {
                backdropFilter: `blur(${profile?.glass_blur ?? 10}px)`,
                backgroundColor: `rgba(255,255,255,${(profile?.glass_opacity ?? 20) / 100})`
              } : {})
            }}
          >
            {(() => {
              const avatarShapeClass = profile?.avatar_shape === 'rounded' ? 'rounded-2xl' : profile?.avatar_shape === 'hexagon' ? '' : 'rounded-full'
              const avatarClipPath = profile?.avatar_shape === 'hexagon' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined
              const frameColor1 = profile?.avatar_frame_config?.color1 || (profile?.avatar_frame === 'gradient-ring' ? '#ec4899' : '#22d3ee')
              const frameColor2 = profile?.avatar_frame_config?.color2 || '#f97316'
              
              let frameClass = ''
              let frameStyle: React.CSSProperties = { clipPath: avatarClipPath }
              
              if (profile?.avatar_frame === 'gradient-ring') {
                frameClass = 'p-1'
                frameStyle.background = `linear-gradient(to top right, ${frameColor1}, ${frameColor2})`
                frameStyle.boxShadow = `0 0 15px ${frameColor1}80`
              } else if (profile?.avatar_frame === 'neon-glow') {
                frameClass = 'p-0.5'
                frameStyle.backgroundColor = frameColor1
                frameStyle.boxShadow = `0 0 20px ${frameColor1}cc`
              }

              return profile?.avatar_url ? (
              <div 
                className={`relative flex items-center justify-center ${frameClass} mb-4 ${profile?.banner_url ? 'mt-4 border-4 border-zinc-950 bg-zinc-950' : ''} ${avatarShapeClass}`}
                style={frameStyle}
              >
                <div className={`relative border-2 border-white/20 shadow-lg ${
                  profile?.avatar_size === 'small' ? 'w-16 h-16' : 
                  profile?.avatar_size === 'large' ? 'w-28 h-28' : 'w-24 h-24'
                } overflow-hidden ${avatarShapeClass}`}
                  style={{ clipPath: avatarClipPath }}
                >
                <Image 
                  src={profile.avatar_url} 
                  alt="Avatar" 
                  fill
                  className="object-cover" 
                  sizes="112px"
                />
              </div>
            </div>
            ) : (
              <div 
                className={`relative flex items-center justify-center ${frameClass} mb-4 ${profile?.banner_url ? 'mt-4 border-4 border-zinc-950 bg-zinc-950' : ''} ${avatarShapeClass}`}
                style={frameStyle}
              >
                <div 
                  className={`bg-zinc-800 flex items-center justify-center text-white text-3xl font-bold border-2 border-white/20 shadow-lg ${
                    profile?.avatar_size === 'small' ? 'w-16 h-16' : 
                    profile?.avatar_size === 'large' ? 'w-28 h-28' : 'w-24 h-24'
                  } ${avatarShapeClass}`}
                  style={{ clipPath: avatarClipPath }}
                >
                {profile?.username?.charAt(0).toUpperCase() || 'B'}
                </div>
              </div>
            )
            })()}
            
            <h2 style={{ color: profile?.text_color || '#ffffff' }} className="font-bold text-lg mb-1 drop-shadow-md text-center">
              {profile?.full_name || `@${profile?.username || 'username'}`}
            </h2>
            <p style={{ color: (profile?.text_color || '#ffffff') + 'cc' }} className="text-sm text-center mb-6 max-w-[250px] drop-shadow-sm">
              {profile?.bio || 'No bio yet.'}
            </p>
 
            {(!profile?.social_placement || profile?.social_placement === 'top') && profile?.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 z-10">
                {Object.keys(profile.social_links).map((key) => {
                  const socialLinksRecord = profile.social_links as Record<string, string>
                  const url = socialLinksRecord[key]
                  if (!url) return null
                  const IconComponent = socialsIconMap[key]
                  if (!IconComponent) return null
 
                  return (
                    <div
                      key={key}
                      className={`w-7 h-7 flex items-center justify-center shadow-sm backdrop-blur-md ${
                        profile?.social_style === 'outline' ? 'bg-transparent border border-white/30 text-white' :
                        profile?.social_style === 'square' ? 'bg-white/5 border border-white/10 text-white rounded-lg' :
                        profile?.social_style === 'minimal' ? 'bg-transparent border-0 text-white shadow-none' :
                        'rounded-full bg-white/5 border border-white/10 text-white'
                      }`}
                      style={{ color: profile?.text_color || '#ffffff' }}
                    >
                      <IconComponent size={14} />
                    </div>
                  )
                })}
              </div>
            )}
 
            <div className={`w-full pb-20 ${
              profile?.layout_type === 'grid' 
                ? 'grid grid-cols-2 gap-3' 
                : profile?.link_spacing === 'compact' ? 'space-y-2' : 
                  profile?.link_spacing === 'relaxed' ? 'space-y-4' : 'space-y-3'
            }`}>
              {(() => {
                const now = new Date()
                const activeLinks = (localLinks || []).filter(link => {
                  if (!link.is_active) return false
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
                
                const normalLinks = activeLinks.filter(l => !(l.is_sticky_cta && l.link_type === 'link'))
                const stickyLinks = activeLinks.filter(l => l.is_sticky_cta && l.link_type === 'link')
                
                const renderLink = (link: Link) => {
                    // Render Section Header in Live Preview
                    if (link.link_type === 'header') {
                      return (
                        <div key={link.id} className={`w-full text-center py-2 mt-4 first:mt-1 select-none ${profile?.layout_type === 'grid' ? 'col-span-2' : ''}`}>
                          <h3 
                            style={{ color: link.text_color || undefined }} 
                            className="text-xs font-extrabold tracking-wider uppercase text-white/95 drop-shadow-md cursor-default px-2"
                          >
                            {link.title}
                          </h3>
                          <div className="h-[1.5px] w-8 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mt-1.5" />
                        </div>
                      )
                    }

                    // Render Carousel in Live Preview
                    if (link.link_type === 'carousel') {
                      const images = link.link_images || link.images || []
                      return (
                        <div key={link.id} className={`w-full space-y-2 py-1 select-none pointer-events-auto ${profile?.layout_type === 'grid' ? 'col-span-2' : ''}`}>
                          {link.title && (
                            <h4 className="text-[10px] font-extrabold text-white/80 uppercase tracking-wider px-1">
                              🖼️ {link.title}
                            </h4>
                          )}
                          <div className="flex gap-2.5 overflow-x-auto pb-2 pt-0.5 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory">
                            {images.length === 0 ? (
                              <div className="w-full">
                                <EmptyState title="No images in this gallery yet" className="py-6" />
                              </div>
                            ) : (
                              images.map((img: LinkImage) => (
                                <div 
                                  key={img.id} 
                                  className="w-[120px] h-[80px] rounded-xl overflow-hidden border border-white/10 shadow shrink-0 snap-center relative"
                                >
                                <Image 
                                  src={img.image_url} 
                                  alt="" 
                                  fill
                                  className="object-cover" 
                                  sizes="120px"
                                />
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )
                    }

                    if (link.is_embed) {
                      const embedInfo = parseEmbedUrl(link.url, true)
                      if (embedInfo) {
                        return (
                          <div key={link.id} className={`w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900/40 relative shadow-sm ${profile?.layout_type === 'grid' ? 'col-span-2' : ''}`}>
                            <iframe
                              width="100%"
                              height={embedInfo.height}
                              src={embedInfo.embedUrl}
                              title={`${embedInfo.type} preview`}
                              frameBorder="0"
                              className="w-full block pointer-events-none"
                            ></iframe>
                          </div>
                        )
                      }
                    }

                    return (
                      <div key={link.id}>
                        <LinkButton link={link} profileId={profile?.id as string || ''} profile={profile as Profile | undefined} isPreview={true} />
                      </div>
                    )
                }

                return (
                  <>
                    {normalLinks.length > 0 && normalLinks.map(renderLink)}
                    
                    {/* Sticky CTA container */}
                    {stickyLinks.length > 0 && (
                      <div className="absolute bottom-6 left-0 right-0 px-4 z-50 flex flex-col gap-2">
                        {stickyLinks.map(renderLink)}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
            
            {profile?.social_placement === 'bottom' && profile?.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 mb-4 z-10 w-full">
                {Object.keys(profile.social_links).map((key) => {
                  const socialLinksRecord = profile.social_links as Record<string, string>
                  const url = socialLinksRecord[key]
                  if (!url) return null
                  const IconComponent = socialsIconMap[key]
                  if (!IconComponent) return null
 
                  return (
                    <div
                      key={key}
                      className={`w-7 h-7 flex items-center justify-center shadow-sm backdrop-blur-md ${
                        profile?.social_style === 'outline' ? 'bg-transparent border border-white/30 text-white' :
                        profile?.social_style === 'square' ? 'bg-white/5 border border-white/10 text-white rounded-lg' :
                        profile?.social_style === 'minimal' ? 'bg-transparent border-0 text-white shadow-none' :
                        'rounded-full bg-white/5 border border-white/10 text-white'
                      }`}
                      style={{ color: profile?.text_color || '#ffffff' }}
                    >
                      <IconComponent size={14} />
                    </div>
                  )
                })}
              </div>
            )}

            {/* Live Preview Branding Pill */}
            {profile?.show_branding !== false && (
              <div className="mt-6 mb-6 flex justify-center w-full z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-semibold backdrop-blur-md">
                  <span>Powered by</span>
                  <div className="w-4 h-4 rounded bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center">
                    <Zap className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="font-bold text-white/80">Branch</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
