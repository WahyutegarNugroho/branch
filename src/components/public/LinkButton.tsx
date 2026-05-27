'use client'

import Image from 'next/image'
import { getPlatformByName } from '@/utils/platforms'
import { hexToRgba } from '@/lib/color-utils'
import { parseEmbedUrl } from '@/lib/embed-utils'

import { Profile, Link } from '@/types'

export function LinkButton({ link, profileId, profile }: { link: Link, profileId: string, profile?: Profile }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Extract UTMs from current URL query string
    let utm_source = null
    let utm_medium = null
    let utm_campaign = null
    
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      utm_source = params.get('utm_source')
      utm_medium = params.get('utm_medium')
      utm_campaign = params.get('utm_campaign')
    }

    // Send background analytics request
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile_id: profileId,
        link_id: link.id,
        utm_source,
        utm_medium,
        utm_campaign,
      }),
    }).catch(err => console.error('Analytics error:', err))
  }

  // Render Section Header
  if (link.link_type === 'header') {
    return (
      <div className="w-full text-center py-5 mt-6 first:mt-2 select-none">
        <h2 
          style={{ color: link.text_color || undefined }} 
          className="text-base sm:text-lg font-extrabold tracking-wider uppercase text-white/95 drop-shadow-md cursor-default px-4"
        >
          {link.title}
        </h2>
        <div className="h-[2px] w-12 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2.5" />
      </div>
    )
  }

  // Render Image Carousel / Gallery
  if (link.link_type === 'carousel') {
    const images = link.link_images || []
    return (
      <div className="w-full space-y-3 py-2">
        {link.title && (
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider px-2 flex items-center gap-2">
            <span>🖼️</span> {link.title}
          </h3>
        )}
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {images.length === 0 ? (
            <div className="w-full py-8 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-2xl border-dashed">
              No images in this gallery yet
            </div>
          ) : (
            images.map((img: any) => (
              <div 
                key={img.id} 
                className="w-[200px] h-[130px] rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0 snap-center relative group/img cursor-pointer transition-transform hover:scale-[1.03]"
                onClick={() => {
                  window.open(img.image_url, '_blank')
                }}
              >
                <Image 
                  src={img.image_url} 
                  alt="" 
                  fill
                  className="object-cover" 
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[9px] text-white/90 truncate font-semibold">Buka Gambar Penuh ↗</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  if (link.is_embed) {
    const embedInfo = parseEmbedUrl(link.url)
    if (embedInfo) {
      return (
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 backdrop-blur-md bg-zinc-900/40">
          <iframe
            width="100%"
            height={embedInfo.height}
            src={embedInfo.embedUrl}
            title={`${embedInfo.type} embed player`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full block"
          ></iframe>
        </div>
      )
    }
  }

  const matchedPlatform = getPlatformByName(link.title)
  const PlatformIcon = link.show_icon !== false ? matchedPlatform?.icon : null
  
  const ThumbnailImg = link.thumbnail_url ? (
    <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-inner flex items-center justify-center shrink-0 z-10 group-hover:scale-105 transition-transform relative">
      <Image src={link.thumbnail_url} alt="" fill className="object-cover" sizes="28px" />
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
  
  let baseBtnClass = "group flex items-center justify-center w-full py-4 px-6 text-white font-semibold transition-all relative overflow-hidden " + shapeClass + hoverClass
  if (styleVal === 'fill') {
    baseBtnClass += " bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20"
  } else if (styleVal === 'outline') {
    baseBtnClass += " bg-transparent border border-white/20 hover:border-white/40"
  } else if (styleVal === 'soft') {
    baseBtnClass += " bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-sm"
  } else if (styleVal === 'shadow') {
    baseBtnClass += " bg-white/10 hover:bg-white/20 border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
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
      <a
        href={link.url}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
        className={baseBtnClass}
      >
        <span className="z-10">{link.title}</span>
      </a>
    )
  }

  let baseBtnClassNear = "group flex items-center justify-center gap-2.5 w-full py-4 px-6 text-white font-semibold transition-all relative overflow-hidden " + shapeClass + hoverClass
  if (styleVal === 'fill') {
    baseBtnClassNear += " bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20"
  } else if (styleVal === 'outline') {
    baseBtnClassNear += " bg-transparent border border-white/20 hover:border-white/40"
  } else if (styleVal === 'soft') {
    baseBtnClassNear += " bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-sm"
  } else if (styleVal === 'shadow') {
    baseBtnClassNear += " bg-white/10 hover:bg-white/20 border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
  }
  baseBtnClassNear += extraClasses

  if (isLeftNear || isRightNear) {
    return (
      <a
        href={link.url}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
        className={baseBtnClassNear}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: matchedPlatform?.color || '#ffffff' }} />
        
        {isLeftNear && (
          ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={24} color={finalIconColor} className="group-hover:scale-110 transition-transform drop-shadow-sm z-10 shrink-0" />)
        )}
        
        <span className="z-10 text-center">{link.title}</span>
        
        {isRightNear && (
          ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={24} color={finalIconColor} className="group-hover:scale-110 transition-transform drop-shadow-sm z-10 shrink-0" />)
        )}
      </a>
    )
  }

  let baseBtnClassBetween = "group flex items-center justify-between w-full py-4 px-6 text-white font-semibold transition-all relative overflow-hidden " + shapeClass + hoverClass
  if (styleVal === 'fill') {
    baseBtnClassBetween += " bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20"
  } else if (styleVal === 'outline') {
    baseBtnClassBetween += " bg-transparent border border-white/20 hover:border-white/40"
  } else if (styleVal === 'soft') {
    baseBtnClassBetween += " bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-sm"
  } else if (styleVal === 'shadow') {
    baseBtnClassBetween += " bg-white/10 hover:bg-white/20 border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
  }
  baseBtnClassBetween += extraClasses

  return (
    <a
      href={link.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
      className={baseBtnClassBetween}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: matchedPlatform?.color || '#ffffff' }} />
      
      <div className={`w-8 flex items-center shrink-0 z-10 ${isRightFar ? 'justify-end' : 'justify-start'}`}>
        {isLeftFar && (
          ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={24} color={finalIconColor} className="group-hover:scale-110 transition-transform drop-shadow-sm" />)
        )}
      </div>
      
      <span className="flex-1 text-center z-10">{link.title}</span>
      
      <div className={`w-8 flex items-center shrink-0 z-10 ${isRightFar ? 'justify-end' : 'justify-start'}`}>
        {isRightFar && (
          ThumbnailImg ? ThumbnailImg : (PlatformIcon && <PlatformIcon size={24} color={finalIconColor} className="group-hover:scale-110 transition-transform drop-shadow-sm" />)
        )}
      </div>
    </a>
  )
}
