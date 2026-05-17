'use client'

import { getPlatformByName } from '@/utils/platforms'

function hexToRgba(hex: string, opacity: number) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) return 'rgba(255, 255, 255, 0.05)';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function parseEmbedUrl(url: string) {
  try {
    const cleanUrl = url.trim()

    // 1. YouTube
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      let videoId = ''
      if (cleanUrl.includes('youtu.be/')) {
        videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0] || ''
      } else if (cleanUrl.includes('youtube.com/shorts/')) {
        videoId = cleanUrl.split('youtube.com/shorts/')[1]?.split('?')[0] || ''
      } else if (cleanUrl.includes('youtube.com/watch')) {
        videoId = new URLSearchParams(new URL(cleanUrl).search).get('v') || ''
      } else if (cleanUrl.includes('youtube.com/embed/')) {
        videoId = cleanUrl.split('youtube.com/embed/')[1]?.split('?')[0] || ''
      }
      if (videoId) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          height: 215
        }
      }
    }

    // 2. Spotify
    if (cleanUrl.includes('open.spotify.com')) {
      const parts = new URL(cleanUrl).pathname.split('/')
      const type = parts[1] // 'track', 'playlist', 'album', 'artist'
      const id = parts[2]
      if (type && id) {
        return {
          type: 'spotify',
          embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
          height: type === 'track' ? 80 : 352
        }
      }
    }

    // 3. SoundCloud
    if (cleanUrl.includes('soundcloud.com')) {
      return {
        type: 'soundcloud',
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
        height: 166
      }
    }

    // 4. TikTok
    if (cleanUrl.includes('tiktok.com')) {
      const match = cleanUrl.match(/video\/(\d+)/)
      const videoId = match ? match[1] : ''
      if (videoId) {
        return {
          type: 'tiktok',
          embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
          height: 575
        }
      }
    }
  } catch (e) {
    console.error('Error parsing embed URL:', e)
  }
  return null
}

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
                <img 
                  src={img.image_url} 
                  alt="" 
                  className="w-full h-full object-cover" 
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
    <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-inner flex items-center justify-center shrink-0 z-10 group-hover:scale-105 transition-transform">
      <img src={link.thumbnail_url} alt="" className="w-full h-full object-cover" />
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

  if (link.text_color) {
    buttonStyle.color = link.text_color
    buttonStyle.borderColor = `${link.text_color}33` // 20% opacity hex
  }

  let finalIconColor = matchedPlatform?.color || '#ffffff'
  if (link.icon_color) {
    if (link.icon_color === 'text') {
      finalIconColor = link.text_color || '#ffffff'
    } else {
      finalIconColor = link.icon_color
    }
  }

  const shapeClass = profile?.button_shape || 'rounded-2xl'
  const styleVal = profile?.button_style || 'soft'
  
  let baseBtnClass = "group flex items-center justify-center w-full py-4 px-6 text-white font-semibold transition-all relative overflow-hidden " + shapeClass
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
    spotlightClass = " ring-2 ring-brand-pink ring-offset-2 ring-offset-zinc-950/80 shadow-[0_0_20px_rgba(236,72,153,0.5)] border-brand-pink/50 animate-glow-pulse"
  }

  // Animation Effects support
  let animationClass = ""
  if (link.animation && link.animation !== 'none') {
    if (link.animation === 'pulse') {
      animationClass = " animate-pulse-slow"
    } else if (link.animation === 'bounce') {
      animationClass = " animate-bounce-slow"
    } else if (link.animation === 'shake') {
      animationClass = " animate-shake-quick"
    } else if (link.animation === 'wobble') {
      animationClass = " animate-wobble-quick"
    } else if (link.animation === 'glow') {
      animationClass = " animate-glow-pulse"
    }
  }

  const extraClasses = ` ${spotlightClass} ${animationClass}`
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

  let baseBtnClassNear = "group flex items-center justify-center gap-2.5 w-full py-4 px-6 text-white font-semibold transition-all relative overflow-hidden " + shapeClass
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

  let baseBtnClassBetween = "group flex items-center justify-between w-full py-4 px-6 text-white font-semibold transition-all relative overflow-hidden " + shapeClass
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
