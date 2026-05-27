'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
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

import { Profile, Link, LinkImage } from '@/types'
import { getPlatformByName } from '@/utils/platforms'

export function LivePreview({ profile: initialProfile, links }: { profile?: Profile | null, links?: Link[] }) {
  const [profile, setProfile] = useState(initialProfile)
  const [localLinks, setLocalLinks] = useState(links)

  useEffect(() => {
    setProfile(initialProfile)
  }, [initialProfile])

  useEffect(() => {
    setLocalLinks(links)
  }, [links])

  useEffect(() => {
    const handleUpdate = (e: CustomEvent) => {
      setProfile((prev: Profile | null | undefined) => ({ ...(prev || {}), ...e.detail } as Profile))
    }
    window.addEventListener('profile-update' as unknown as string, handleUpdate as EventListener)
    return () => {
      window.removeEventListener('profile-update' as unknown as string, handleUpdate as EventListener)
    }
  }, [])

  useEffect(() => {
    const handleLinksUpdate = (e: CustomEvent) => {
      setLocalLinks((prev: Link[] | undefined) => {
        if (!prev) return prev
        return prev.map(link => {
          if (link.id === e.detail.id) {
            return { ...link, ...e.detail.changes }
          }
          return link
        })
      })
    }
    window.addEventListener('link-preview-update' as unknown as string, handleLinksUpdate as EventListener)
    return () => {
      window.removeEventListener('link-preview-update' as unknown as string, handleLinksUpdate as EventListener)
    }
  }, [])

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
              profile?.profile_align === 'left' ? 'items-start text-left' : 'items-center text-center'
            } ${
              profile?.theme_style === 'glass' ? 'm-4 p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl w-[calc(100%-2rem)] shrink-0' : 'h-full p-6'
            } ${profile?.font_family || 'font-sans-theme'} ${profile?.banner_url && profile?.theme_style !== 'glass' ? 'pt-8' : ''}`}
            style={{ color: profile?.text_color || '#ffffff' }}
          >
            {profile?.avatar_url ? (
              <div className={`relative border-2 border-white/20 shadow-lg ${
                profile?.avatar_shape === 'rounded' ? 'rounded-2xl' : 
                profile?.avatar_shape === 'hexagon' ? '' : 'rounded-full'
              } ${
                profile?.avatar_size === 'small' ? 'w-16 h-16' : 
                profile?.avatar_size === 'large' ? 'w-28 h-28' : 'w-24 h-24'
              } mb-4 ${profile?.banner_url ? 'mt-4 border-4 border-zinc-950' : ''}`}
                style={{ clipPath: profile?.avatar_shape === 'hexagon' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined }}
              >
                <Image 
                  src={profile.avatar_url} 
                  alt="Avatar" 
                  fill
                  className="object-cover" 
                  sizes="112px"
                />
              </div>
            ) : (<div 
                className={`bg-zinc-800 mb-4 flex items-center justify-center text-white text-3xl font-bold border-2 border-white/20 shadow-lg ${
                  profile?.avatar_shape === 'rounded' ? 'rounded-2xl' : 
                  profile?.avatar_shape === 'hexagon' ? '' : 'rounded-full'
                } ${
                  profile?.avatar_size === 'small' ? 'w-16 h-16' : 
                  profile?.avatar_size === 'large' ? 'w-28 h-28' : 'w-24 h-24'
                } ${profile?.banner_url ? 'mt-4 border-4 border-zinc-950' : ''}`}
                style={{ clipPath: profile?.avatar_shape === 'hexagon' ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : undefined }}
              >
                {profile?.username?.charAt(0).toUpperCase() || 'B'}
              </div>
            )}
            
            <h2 style={{ color: profile?.text_color || '#ffffff' }} className="font-bold text-lg mb-1 drop-shadow-md text-center">
              {profile?.full_name || `@${profile?.username || 'username'}`}
            </h2>
            <p style={{ color: (profile?.text_color || '#ffffff') + 'cc' }} className="text-sm text-center mb-6 max-w-[250px] drop-shadow-sm">
              {profile?.bio || 'No bio yet.'}
            </p>
 
            {profile?.social_links && typeof profile.social_links === 'object' && Object.keys(profile.social_links).length > 0 && (
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
 
            <div className={`w-full ${
              profile?.link_spacing === 'compact' ? 'space-y-2' : 
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
                if (activeLinks.length > 0) {
                  return activeLinks.map(link => {
                    // Render Section Header in Live Preview
                    if (link.link_type === 'header') {
                      return (
                        <div key={link.id} className="w-full text-center py-2 mt-4 first:mt-1 select-none">
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
                        <div key={link.id} className="w-full space-y-2 py-1 select-none pointer-events-auto">
                          {link.title && (
                            <h4 className="text-[10px] font-extrabold text-white/80 uppercase tracking-wider px-1">
                              🖼️ {link.title}
                            </h4>
                          )}
                          <div className="flex gap-2.5 overflow-x-auto pb-2 pt-0.5 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory">
                            {images.length === 0 ? (
                              <div className="w-full py-6 text-center text-[10px] text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-xl border-dashed">
                                No images in this gallery yet
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
                          <div key={link.id} className="w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900/40 relative shadow-sm">
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

                    const matchedPlatform = getPlatformByName(link.title)
                    const PlatformIcon = link.show_icon !== false ? matchedPlatform?.icon : null
                    
                    const ThumbnailImg = link.thumbnail_url ? (
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-white/20 shadow-inner flex items-center justify-center shrink-0 z-10 relative">
                        <Image src={link.thumbnail_url} alt="" fill className="object-cover" sizes="20px" />
                      </div>
                    ) : null

                    const hasGraphic = !!ThumbnailImg || !!PlatformIcon
                    const pos = link.icon_position || 'left_far'
                    const isLeftFar = pos === 'left' || pos === 'left_far'
                    const isRightFar = pos === 'right' || pos === 'right_far'
                    const isLeftNear = pos === 'left_near'
                    const isRightNear = pos === 'right_near'

                    const buttonStyle: React.CSSProperties = {}
                    if (link.bg_color) {
                      const opacity = typeof link.bg_opacity === 'number' ? link.bg_opacity : 100
                      buttonStyle.backgroundColor = hexToRgba(link.bg_color, opacity)
                    } else if (typeof link.bg_opacity === 'number') {
                      buttonStyle.backgroundColor = `rgba(255, 255, 255, ${link.bg_opacity / 100})`
                    }

                    const textClr = link.text_color || profile?.text_color || '#ffffff'
                    buttonStyle.color = textClr
                    if (link.text_color) {
                      buttonStyle.borderColor = `${link.text_color}33` // 20% opacity hex
                    } else if (profile?.text_color) {
                      buttonStyle.borderColor = `${profile.text_color}33`
                    }

                    let finalIconColor = matchedPlatform?.color || '#ffffff'
                    if (link.icon_color) {
                      if (link.icon_color === 'text') {
                        finalIconColor = textClr
                      } else {
                        finalIconColor = link.icon_color
                      }
                    } else {
                      finalIconColor = textClr
                    }

                    const shapeClass = profile?.button_shape || 'rounded-2xl'
                    const styleVal = profile?.button_style || 'soft'
                    const hoverEffect = profile?.button_hover_effect || 'none'
                    let hoverClass = ""
                    if (hoverEffect === 'scale') hoverClass = " hover:scale-[1.03] transition-transform"
                    if (hoverEffect === 'lift') hoverClass = " hover:-translate-y-1 hover:shadow-xl transition-all"
                    if (hoverEffect === 'glow') hoverClass = " hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow"
                    
                    let baseBtnClass = "group flex items-center justify-center w-full py-3 px-4 text-white text-sm font-semibold pointer-events-none relative overflow-hidden " + shapeClass + hoverClass
                    let baseBtnClassNear = "group flex items-center justify-center gap-2 w-full py-3 px-4 text-white text-sm font-semibold pointer-events-none relative overflow-hidden " + shapeClass + hoverClass
                    
                    if (styleVal === 'fill') {
                      baseBtnClass += " bg-white/15 border border-white/10 shadow-sm"
                      baseBtnClassNear += " bg-white/15 border border-white/10 shadow-sm"
                    } else if (styleVal === 'outline') {
                      baseBtnClass += " bg-transparent border border-white/20"
                      baseBtnClassNear += " bg-transparent border border-white/20"
                    } else if (styleVal === 'soft') {
                      baseBtnClass += " bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
                      baseBtnClassNear += " bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
                    } else if (styleVal === 'shadow') {
                      baseBtnClass += " bg-white/15 border border-white/15 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                    }

                    // Spotlight / Priority support
                    let spotlightClass = ""
                    if (link.is_spotlight) {
                      const spotClr = link.spotlight_color || '#ec4899'
                      ;(buttonStyle as any)['--spotlight-color'] = spotClr
                      
                      let r = 236, g = 72, b = 153
                      if (spotClr.startsWith('#')) {
                        const cleanHex = spotClr.slice(1)
                        if (cleanHex.length === 6) {
                          r = parseInt(cleanHex.slice(0, 2), 16)
                          g = parseInt(cleanHex.slice(2, 4), 16)
                          b = parseInt(cleanHex.slice(4, 6), 16)
                        } else if (cleanHex.length === 3) {
                          r = parseInt(cleanHex[0] + cleanHex[0], 16)
                          g = parseInt(cleanHex[1] + cleanHex[1], 16)
                          b = parseInt(cleanHex[2] + cleanHex[2], 16)
                        }
                      }
                      ;(buttonStyle as any)['--spotlight-color-rgba'] = `rgba(${r}, ${g}, ${b}, 0.5)`
                      spotlightClass = " spotlight-active"
                    }

                    // Animation Effects support — use inline styles to bypass Turbopack CSS purging
                    const animationMap: Record<string, string> = {
                      pulse: 'pulseSlow 2.5s infinite ease-in-out',
                      bounce: 'bounceSlow 2s infinite ease-in-out',
                      shake: 'shakeQuick 2.5s infinite ease-in-out',
                      wobble: 'wobbleQuick 2.5s infinite ease-in-out',
                      glow: 'glowPulse 2s infinite ease-in-out',
                    }
                    if (link.animation && link.animation !== 'none' && animationMap[link.animation]) {
                      buttonStyle.animation = animationMap[link.animation]
                    }

                    const extraClasses = ` ${spotlightClass}`
                    baseBtnClass += extraClasses

                    if (!hasGraphic) {
                      return (
                        <div 
                          key={link.id} 
                          style={buttonStyle}
                          className={baseBtnClass}
                        >
                          <span className="z-10 truncate max-w-[160px]">{link.title}</span>
                        </div>
                      )
                    }

                    if (isLeftNear || isRightNear) {
                      return (
                        <div 
                          key={link.id} 
                          style={buttonStyle}
                          className={baseBtnClass + " gap-2"}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: matchedPlatform?.color || '#ffffff' }} />
                          
                          {isLeftNear && (
                            ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={18} color={finalIconColor} className="drop-shadow-sm z-10 shrink-0" />)
                          )}
                          
                          <span className="z-10 text-center truncate max-w-[160px]">{link.title}</span>
                          
                          {isRightNear && (
                            ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={18} color={finalIconColor} className="drop-shadow-sm z-10 shrink-0" />)
                          )}
                        </div>
                      )
                    }

                    let baseBtnClassBetween = "group flex items-center justify-between w-full py-3 px-4 text-white text-sm font-semibold pointer-events-none relative overflow-hidden " + shapeClass + hoverClass
                    if (styleVal === 'fill') {
                      baseBtnClassBetween += " bg-white/15 border border-white/10 shadow-sm"
                    } else if (styleVal === 'outline') {
                      baseBtnClassBetween += " bg-transparent border border-white/20"
                    } else if (styleVal === 'soft') {
                      baseBtnClassBetween += " bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
                    } else if (styleVal === 'shadow') {
                      baseBtnClassBetween += " bg-white/15 border border-white/15 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                    }
                    baseBtnClassBetween += extraClasses

                    return (
                      <div 
                        key={link.id} 
                        style={buttonStyle}
                        className={baseBtnClassBetween}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: matchedPlatform?.color || '#ffffff' }} />
                        
                        <div className={`w-6 flex items-center shrink-0 z-10 ${isRightFar ? 'justify-end' : 'justify-start'}`}>
                          {isLeftFar && (
                            ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={18} color={finalIconColor} className="drop-shadow-sm" />)
                          )}
                        </div>
                        
                        <span className="flex-1 text-center z-10 truncate max-w-[160px]">{link.title}</span>
                        
                        <div className={`w-6 flex items-center shrink-0 z-10 ${isRightFar ? 'justify-end' : 'justify-start'}`}>
                          {isRightFar && (
                            ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={18} color={finalIconColor} className="drop-shadow-sm" />)
                          )}
                        </div>
                      </div>
                    )
                  })
                }
                return (
                  <>
                    <div className="h-12 w-full bg-white/5 border border-white/10 rounded-2xl animate-pulse"></div>
                    <div className="h-12 w-full bg-white/5 border border-white/10 rounded-2xl animate-pulse"></div>
                  </>
                )
              })()}
            </div>
            
            {/* Live Preview Branding Pill */}
            {profile?.show_branding !== false && (
              <div className="mt-12 mb-6">
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
}
