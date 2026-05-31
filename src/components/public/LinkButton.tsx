'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { hexToRgba, hexToRgb } from '@/lib/color-utils'
import { getPlatformByName } from '@/utils/platforms'
import { LinkHeader } from './LinkHeader'
import { LinkCarousel } from './LinkCarousel'
import { LinkEmbed } from './LinkEmbed'

import type { Profile, Link } from '@/types'

interface CSSWithCustomVars extends React.CSSProperties {
  '--neon-glow-color'?: string
  '--spotlight-color'?: string
  '--spotlight-color-rgba'?: string
  '--spotlight-drop-shadow'?: string
}

const hoverEffectClasses: Record<string, string> = {
  scale: 'hover:scale-[1.03] transition-transform',
  lift: 'hover:-translate-y-1 hover:drop-shadow-xl transition-all',
  glow: 'hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-shadow',
  wobble: 'hover-wobble-effect',
  pulse: 'hover-pulse-effect',
  shine: 'hover-shine-effect',
  glitch: 'hover-glitch-effect',
}

const animationMap: Record<string, string> = {
  pulse: 'pulseSlow 2.5s infinite ease-in-out',
  bounce: 'bounceSlow 2s infinite ease-in-out',
  shake: 'shakeQuick 2.5s infinite ease-in-out',
  wobble: 'wobbleQuick 2.5s infinite ease-in-out',
  glow: 'glowPulse 2s infinite ease-in-out',
}

interface ButtonClasses {
  wrapper: string
  baseBtn: string
  btnHover: string
}

function buildButtonClasses(profile: Profile | undefined, link: Link): ButtonClasses {
  const shapeClass = profile?.button_shape || 'rounded-2xl'
  const isClippedShape = ['cut-corners', 'hexagon', 'diamond'].includes(shapeClass)
  const resolvedShape = ['cut-corners', 'leaf', 'hexagon', 'diamond'].includes(shapeClass)
    ? `shape-${shapeClass} rounded-none`
    : shapeClass

  const styleVal = profile?.button_style || 'soft'
  const hoverEffect = profile?.button_hover_effect || 'none'

  const baseHover = hoverEffectClasses[hoverEffect] || ''
  const wrapperHoverClass = ['shine', 'glitch'].includes(hoverEffect) ? '' : baseHover
  const btnHoverClass = ['shine', 'glitch'].includes(hoverEffect) ? baseHover : ''

  const isNeon = styleVal === 'neon'

  let wrapperClass = cn(
    'group w-full relative block transition-all',
    isClippedShape && 'pointer-events-none',
    wrapperHoverClass
  )

  let paddingClass = 'py-4 px-6'
  if (profile?.button_shape === 'hexagon') paddingClass = 'py-4 px-10'
  if (profile?.button_shape === 'diamond') paddingClass = 'py-6 px-16'

  let baseBtnClass = cn(
    'flex items-center justify-center w-full text-white font-semibold transition-all overflow-hidden',
    isClippedShape && 'pointer-events-auto',
    resolvedShape,
    paddingClass,
  )

  const notClipped = !isClippedShape
  const clippedFilter = (filter: string) => { wrapperClass += ` [filter:url(#${filter})]` }

  const styleConfigs: Record<string, { classes: string[]; clipped?: string }> = {
    fill: {
      classes: ['bg-white/10 hover:bg-white/20', notClipped ? 'border border-white/10 hover:border-white/20' : ''],
      clipped: 'svg-outline',
    },
    outline: {
      classes: [notClipped ? 'bg-transparent border border-white/20 hover:border-white/40' : 'bg-[rgba(255,255,255,0.01)] hover:bg-white/5'],
      clipped: 'svg-outline',
    },
    soft: {
      classes: ['bg-white/5 hover:bg-white/10 backdrop-blur-md', notClipped ? 'border border-white/10 hover:border-white/20 shadow-sm' : ''],
      clipped: 'svg-shadow',
    },
    shadow: {
      classes: ['bg-white/10 hover:bg-white/20', notClipped ? 'border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]' : ''],
      clipped: 'svg-shadow',
    },
    neumorphism: {
      classes: [notClipped ? 'bg-white/10 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.2),inset_-3px_-3px_7px_rgba(0,0,0,0.5),3px_3px_6px_rgba(0,0,0,0.4)] hover:shadow-[inset_1px_1px_3px_rgba(255,255,255,0.2),inset_-2px_-2px_5px_rgba(0,0,0,0.5),1px_1px_3px_rgba(0,0,0,0.4)] border border-transparent' : 'bg-white/10 border border-transparent'],
      clipped: 'svg-neumorphism',
    },
    glassmorphism: {
      classes: ['bg-white/5 backdrop-blur-2xl hover:bg-white/10', notClipped ? 'border-t border-l border-white/20 border-r border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : ''],
      clipped: 'svg-glassmorphism',
    },
    neon: {
      classes: [notClipped ? 'bg-transparent hover:bg-white/5 shadow-[inset_0_0_10px_currentColor] border-2 border-[currentColor] shadow-[0_0_10px_currentColor,inset_0_0_10px_currentColor] hover:shadow-[0_0_20px_currentColor,inset_0_0_20px_currentColor]' : 'bg-[rgba(255,255,255,0.01)] hover:bg-white/5'],
    },
    brutalism: {
      classes: ['bg-zinc-900 transition-all', notClipped ? 'border-2 border-white/80 shadow-[4px_4px_0px_rgba(255,255,255,0.8)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_rgba(255,255,255,0.8)]' : ''],
      clipped: 'svg-brutalism',
    },
    claymorphism: {
      classes: [notClipped ? 'bg-white/10 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.3),8px_8px_16px_rgba(0,0,0,0.4)] border border-transparent rounded-3xl' : 'bg-white/10 border border-transparent'],
      clipped: 'svg-claymorphism',
    },
  }

  const config = styleConfigs[styleVal]
  if (config) {
    baseBtnClass = cn(baseBtnClass, ...config.classes)
    if (config.clipped && !notClipped) {
      wrapperClass = cn(wrapperClass, `[filter:url(#${config.clipped})]`)
    }
  }

  return { wrapper: wrapperClass, baseBtn: baseBtnClass, btnHover: btnHoverClass }
}

export function LinkButton({ link, profileId, profile, isPreview = false }: { link: Link, profileId: string, profile?: Profile, isPreview?: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPreview) {
      e.preventDefault()
      return
    }
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile_id: profileId,
        link_id: link.id,
        utm_source: params?.get('utm_source') || null,
        utm_medium: params?.get('utm_medium') || null,
        utm_campaign: params?.get('utm_campaign') || null,
      }),
    }).catch(err => console.error('Analytics error:', err))
  }

  if (link.link_type === 'header') {
    return <LinkHeader title={link.title} textColor={link.text_color} />
  }

  if (link.link_type === 'carousel') {
    return <LinkCarousel title={link.title} images={link.link_images || []} />
  }

  if (link.is_embed) {
    return <LinkEmbed url={link.url} />
  }

  const { wrapper, baseBtn, btnHover } = buildButtonClasses(profile, link)

  const buttonStyle: CSSWithCustomVars = {}
  if (link.bg_color) {
    const opacity = typeof link.bg_opacity === 'number' ? link.bg_opacity : 100
    buttonStyle.backgroundColor = hexToRgba(link.bg_color, opacity)
  } else if (typeof link.bg_opacity === 'number') {
    buttonStyle.backgroundColor = `rgba(255, 255, 255, ${link.bg_opacity / 100})`
  }

  const textClr = link.text_color || profile?.text_color || '#ffffff'
  buttonStyle.color = textClr
  if (link.text_color) {
    buttonStyle.borderColor = `${link.text_color}33`
  } else if (profile?.text_color) {
    buttonStyle.borderColor = `${profile.text_color}33`
  }

  const matchedPlatform = getPlatformByName(link.title)
  const showIcon = link.show_icon !== false

  let finalIconColor = matchedPlatform?.color || '#ffffff'
  if (link.icon_color) {
    finalIconColor = link.icon_color === 'text' ? textClr : link.icon_color
  } else {
    finalIconColor = textClr
  }

  const ThumbnailImg = link.thumbnail_url ? (
    <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-inner flex items-center justify-center shrink-0 z-10 group-hover:scale-105 transition-transform relative">
      <Image src={link.thumbnail_url} alt="" fill className="object-cover" sizes="28px" />
    </div>
  ) : null

  const PlatformIconEl = (showIcon && matchedPlatform?.icon)
    ? <matchedPlatform.icon size={24} color={finalIconColor} className="group-hover:scale-110 transition-transform drop-shadow-sm z-10 shrink-0" />
    : null

  const iconEl = ThumbnailImg || PlatformIconEl
  const hasGraphic = !!iconEl
  const pos = link.icon_position || 'left_far'
  const isRightFar = pos === 'right' || pos === 'right_far'
  const isLeftFar = pos === 'left' || pos === 'left_far'
  const isLeftNear = pos === 'left_near'
  const isRightNear = pos === 'right_near'

  const isNeon = profile?.button_style === 'neon'
  const isClippedShape = ['cut-corners', 'hexagon', 'diamond'].includes(profile?.button_shape || '')
  if (isNeon && isClippedShape) {
    buttonStyle.filter = `url(#svg-neon)`
    buttonStyle['--neon-glow-color'] = finalIconColor
  }

  let spotlightClass = ''
  const wrapperStyle: CSSWithCustomVars = {}
  if (link.is_spotlight) {
    const spotClr = link.spotlight_color || '#ec4899'
    const rgb = hexToRgb(spotClr)
    buttonStyle['--spotlight-color'] = spotClr
    buttonStyle['--spotlight-color-rgba'] = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`
    buttonStyle['--spotlight-drop-shadow'] = `drop-shadow(0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8))`
    if (!isClippedShape) {
      spotlightClass = 'spotlight-active'
    }
  }

  if (link.animation && link.animation !== 'none' && animationMap[link.animation]) {
    wrapperStyle.animation = animationMap[link.animation]
  }

  const finalBtnClass = cn(baseBtn, spotlightClass, btnHover)

  const hasNear = isLeftNear || isRightNear
  const hasFar = isLeftFar || isRightFar

  const btnLayoutClass = !hasGraphic
    ? 'justify-center w-full'
    : hasNear
      ? 'justify-center gap-2.5 w-full'
      : 'justify-between w-full'

  const linkEl = (
    <a
      href={link.url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
      className={cn(finalBtnClass, btnLayoutClass)}
    >
      {hasGraphic && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
          style={{ backgroundColor: matchedPlatform?.color || '#ffffff' }}
        />
      )}

      {isLeftFar && (
        <div className="w-10 flex items-center shrink-0 z-10 justify-start">
          {iconEl}
        </div>
      )}

      {isLeftNear && iconEl}

      <span className={cn(
        'z-10',
        hasFar ? 'flex-1 text-center' : 'text-center'
      )}>
        {link.title}
      </span>

      {isRightNear && iconEl}

      {isRightFar && (
        <div className="w-10 flex items-center shrink-0 z-10 justify-end">
          {iconEl}
        </div>
      )}
    </a>
  )

  const spotlightFilter: React.CSSProperties = link.is_spotlight && buttonStyle['--spotlight-drop-shadow']
    ? { filter: buttonStyle['--spotlight-drop-shadow'] }
    : {}

  const spotlightWrap = link.is_spotlight
    ? (children: React.ReactNode) => <div className="w-full relative block" style={spotlightFilter}>{children}</div>
    : (children: React.ReactNode) => <>{children}</>

  return spotlightWrap(<div className={wrapper} style={wrapperStyle}>{linkEl}</div>)
}
