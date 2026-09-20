'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  Flame,
  CheckCircle2,
  Terminal,
  Globe,
  Share2,
  Volume2
} from 'lucide-react'
import {
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaSpotify,
  FaXTwitter
} from 'react-icons/fa6'

// Dynamically import WebGL backgrounds with ssr: false
const AuroraBackground = dynamic(() => import('@/components/backgrounds/AuroraBackground'), { ssr: false })
const MatrixBackground = dynamic(() => import('@/components/backgrounds/MatrixBackground'), { ssr: false })
const StarsBackground = dynamic(() => import('@/components/backgrounds/StarsBackground'), { ssr: false })

interface Archetype {
  id: string
  label: string
  tag: string
  name: string
  handle: string
  bio: string
  avatarInitials: string
  avatarBg: string
  bgType: 'solid' | 'gradient' | 'aurora' | 'matrix' | 'stars'
  bgClass: string
  bgStyle?: React.CSSProperties
  buttonClass: string
  buttonShape: string
  fontClass: string
  verified: boolean
  domain: string
  links: Array<{
    title: string
    sub?: string
    clicks: string
    isSpotlight?: boolean
    icon?: string
  }>
  nowPlaying?: {
    title: string
    artist: string
    albumArt: string
  }
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'minimal',
    label: 'Obsidian Minimal',
    tag: 'Design Engineer',
    name: 'Elena Vance',
    handle: 'elena.design',
    bio: 'Crafting design systems & web interfaces. Based in Tokyo.',
    avatarInitials: 'EV',
    avatarBg: 'bg-zinc-800 text-white',
    bgType: 'solid',
    bgClass: 'bg-[#09090b]',
    buttonClass: 'bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-100 border border-white/[0.08] shadow-sm',
    buttonShape: 'rounded-xl',
    fontClass: 'font-sans',
    verified: true,
    domain: 'elena.design',
    links: [
      { title: 'Read my latest design essay', sub: 'Substack &bull; 8 min read', clicks: '2.4k', isSpotlight: true },
      { title: 'Interactive Web Components Kit', sub: 'GitHub Open Source', clicks: '1.8k' },
      { title: 'Design System Figma Library', sub: 'Community File v2.4', clicks: '940' },
    ],
    nowPlaying: {
      title: 'Solitude (Ambient Mix)',
      artist: 'Kiasmos',
      albumArt: '🎵'
    }
  },
  {
    id: 'aurora',
    label: 'Aurora WebGL',
    tag: 'Creative Tech',
    name: 'Kaelen Thorne',
    handle: 'kaelen.art',
    bio: 'Shader programmer & 3D generative artist. WebGL & GLSL.',
    avatarInitials: 'KT',
    avatarBg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30',
    bgType: 'aurora',
    bgClass: 'bg-black',
    buttonClass: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-lg',
    buttonShape: 'rounded-full',
    fontClass: 'font-sans',
    verified: true,
    domain: 'branch.bio/kaelen',
    links: [
      { title: 'Generative Canvas Collection 2026', sub: 'Live Interactive Shaders', clicks: '4.1k', isSpotlight: true },
      { title: 'Shader Programming Course', sub: '12 Chapters on WebGL & Three.js', clicks: '3.2k' },
      { title: 'Book a 1:1 Creative Consultation', sub: 'Cal.com &bull; 30m session', clicks: '620' },
    ],
    nowPlaying: {
      title: 'Resonance',
      artist: 'HOME',
      albumArt: '🌌'
    }
  },
  {
    id: 'matrix',
    label: 'Matrix Terminal',
    tag: 'Cybersec / Dev',
    name: 'ZeroDay Protocol',
    handle: 'zeroday.sh',
    bio: 'Root security research, reverse engineering, and exploit writeups.',
    avatarInitials: '>_',
    avatarBg: 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono',
    bgType: 'matrix',
    bgClass: 'bg-black',
    buttonClass: 'bg-zinc-950/90 hover:bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-mono',
    buttonShape: 'rounded-md',
    fontClass: 'font-mono',
    verified: true,
    domain: 'branch.bio/zeroday',
    links: [
      { title: './exploit-advisory-2026.pdf', sub: 'Zero-day vulnerability writeup', clicks: '5.6k', isSpotlight: true },
      { title: 'git clone /gh/security-toolkit', sub: 'Rust security audit tool suite', clicks: '2.9k' },
      { title: 'cat /etc/bug-bounty-hall-of-fame', sub: 'Recognized by Top 50 bounties', clicks: '1.2k' },
    ]
  },
  {
    id: 'stars',
    label: 'Cosmic Galaxy',
    tag: 'Photographer',
    name: 'Aria Nova',
    handle: 'aria.deepsky',
    bio: 'Deep sky astrophotographer. Capturing nebulae and distant galaxies.',
    avatarInitials: 'AN',
    avatarBg: 'bg-indigo-950 text-indigo-200 border border-indigo-500/30',
    bgType: 'stars',
    bgClass: 'bg-[#050510]',
    buttonClass: 'bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-100 border border-indigo-500/20 backdrop-blur-sm',
    buttonShape: 'rounded-xl',
    fontClass: 'font-sans',
    verified: true,
    domain: 'aria.stills',
    links: [
      { title: 'Orion Nebula Ultra-HD Wallpapers', sub: 'Free 8K Download Pack', clicks: '3.8k', isSpotlight: true },
      { title: '2026 Milky Way Workshop Calendar', sub: 'Atacama Desert Expedition', clicks: '1.4k' },
      { title: 'My Astrophotography Gear Setup', sub: 'Telescopes, filters, mounts', clicks: '890' },
    ]
  },
  {
    id: 'sunset',
    label: 'Sunset Terracotta',
    tag: 'Creator / Podcast',
    name: 'Leo Rivera',
    handle: 'leorivera',
    bio: 'Storyteller, specialty coffee roaster, & host of The Craft Podcast.',
    avatarInitials: 'LR',
    avatarBg: 'bg-white/20 text-white backdrop-blur-md',
    bgType: 'gradient',
    bgClass: 'bg-gradient-to-b from-amber-700 via-rose-800 to-zinc-950',
    buttonClass: 'bg-white/95 hover:bg-white text-zinc-950 font-semibold shadow-md',
    buttonShape: 'rounded-full',
    fontClass: 'font-sans',
    verified: true,
    domain: 'branch.bio/leorivera',
    links: [
      { title: 'The Craft Podcast: Ep 42 with Sarah Chen', sub: 'Listen on Spotify / Apple', clicks: '6.2k', isSpotlight: true },
      { title: 'Specialty Ethiopian Single-Origin Roast', sub: 'Small-batch release', clicks: '2.1k' },
      { title: 'Sunday Morning Newsletter', sub: 'Join 14,000+ weekly readers', clicks: '1.5k' },
    ],
    nowPlaying: {
      title: 'The Craft Podcast &bull; Ep 42',
      artist: 'Leo Rivera ft. Sarah Chen',
      albumArt: '🎙️'
    }
  }
]

export function HeroLivePreview() {
  const [activeId, setActiveId] = useState('aurora')
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeLinkClicks, setActiveLinkClicks] = useState<Record<string, number>>({})

  const current = ARCHETYPES.find(a => a.id === activeId) ?? ARCHETYPES[0]

  const handleLinkClick = (title: string) => {
    setActiveLinkClicks(prev => ({
      ...prev,
      [title]: (prev[title] || 0) + 1
    }))
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Preset Archetype Switcher Bar */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 p-1.5 mb-6 overflow-x-auto no-scrollbar rounded-xl bg-zinc-900/90 border border-white/[0.08] shadow-inner max-w-lg">
        {ARCHETYPES.map(theme => {
          const isActive = theme.id === activeId
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setActiveId(theme.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-zinc-950 shadow-[0_1px_8px_rgba(255,255,255,0.25)] font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  theme.bgType === 'aurora'
                    ? 'bg-emerald-400 animate-pulse'
                    : theme.bgType === 'matrix'
                    ? 'bg-emerald-500'
                    : theme.bgType === 'stars'
                    ? 'bg-indigo-400'
                    : theme.bgType === 'gradient'
                    ? 'bg-rose-400'
                    : 'bg-zinc-400'
                }`}
              />
              {theme.label}
            </button>
          )
        })}
      </div>

      {/* Smartphone Device Frame */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[640px] sm:h-[680px] rounded-[2.75rem] p-3 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] transition-all">
        {/* Outer Ring Reflection Accent */}
        <div className="absolute inset-0 rounded-[2.75rem] border border-white/10 pointer-events-none" />

        {/* Inner Screen Bezel */}
        <div
          className={`relative w-full h-full rounded-[2.25rem] overflow-hidden flex flex-col justify-between p-5 select-none transition-colors duration-500 ${current.bgClass} ${current.fontClass}`}
          style={current.bgStyle}
        >
          {/* Dynamic Background Shader */}
          {current.bgType === 'aurora' && (
            <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
              <AuroraBackground config={{ theme: 0, speed: 1.2 }} />
            </div>
          )}
          {current.bgType === 'matrix' && (
            <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
              <MatrixBackground config={{ color: '#10b981', speed: 1, fontSize: 13 }} />
            </div>
          )}
          {current.bgType === 'stars' && (
            <div className="absolute inset-0 pointer-events-none z-0 opacity-85">
              <StarsBackground config={{ starCount: 160, speed: 0.8 }} />
            </div>
          )}

          {/* Phone Top Notch / Dynamic Island */}
          <div className="relative z-20 flex items-center justify-between px-2 pt-1 pb-2 text-[11px] text-zinc-400">
            <span className="font-semibold text-white">9:41</span>
            <div className="w-20 h-4 bg-zinc-950/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-300 tracking-tight">live</span>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 border border-zinc-400 rounded-xs flex items-center p-0.5">
                <div className="w-full h-full bg-zinc-200 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Profile Header & Bio */}
          <div className="relative z-10 flex flex-col items-center text-center mt-2">
            {/* Custom Domain Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 mb-3">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">{current.domain}</span>
            </div>

            {/* Avatar with Verified Ring */}
            <div className="relative mb-3">
              <div className={`w-18 h-18 rounded-full flex items-center justify-center text-xl font-bold shadow-xl ${current.avatarBg}`}>
                {current.avatarInitials}
              </div>
              {current.verified && (
                <div className="absolute bottom-0 right-0 p-1 bg-zinc-950 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-zinc-950" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
              {current.name}
            </h3>
            <p className="text-xs text-white/70 max-w-[240px] mt-1 leading-relaxed">
              {current.bio}
            </p>

            {/* Social Icons Dock */}
            <div className="flex items-center gap-3 mt-3.5 text-white/80">
              <span className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <FaXTwitter className="w-3.5 h-3.5" />
              </span>
              <span className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <FaInstagram className="w-3.5 h-3.5" />
              </span>
              <span className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <FaGithub className="w-3.5 h-3.5" />
              </span>
              <span className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <FaSpotify className="w-3.5 h-3.5" />
              </span>
              <span className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <FaYoutube className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Links List */}
          <div className="relative z-10 flex flex-col gap-2.5 my-auto">
            {current.links.map((link) => {
              const clickCount = activeLinkClicks[link.title] || 0
              return (
                <button
                  key={link.title}
                  type="button"
                  onClick={() => handleLinkClick(link.title)}
                  className={`group relative w-full p-3.5 text-left flex items-center justify-between transition-all duration-200 active:scale-[0.98] ${current.buttonClass} ${current.buttonShape}`}
                >
                  {/* Spotlight pulse glow */}
                  {link.isSpotlight && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 text-[8px] font-bold text-black items-center justify-center">
                        ★
                      </span>
                    </span>
                  )}

                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold leading-snug truncate group-hover:text-white transition-colors">
                      {link.title}
                    </p>
                    {link.sub && (
                      <p className="text-[10px] opacity-60 leading-tight truncate mt-0.5">
                        {link.sub}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {clickCount > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        +{clickCount}
                      </span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              )
            })}

            {/* Rich Media Embed Preview: Audio Player */}
            {current.nowPlaying && (
              <div className="w-full p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm shrink-0 border border-emerald-500/30">
                    {current.nowPlaying.albumArt}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold truncate leading-tight">
                      {current.nowPlaying.title}
                    </p>
                    <p className="text-[9px] text-zinc-400 truncate">
                      {current.nowPlaying.artist}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                  aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Phone Bottom Footer Branding */}
          <div className="relative z-10 pt-2 pb-1 text-center">
            <div className="inline-flex items-center gap-1 text-[10px] font-medium text-white/50 hover:text-white/80 transition-colors">
              <span>powered by</span>
              <span className="font-bold text-white tracking-wider uppercase text-[9px]">branch</span>
            </div>
            {/* iOS Home Indicator Bar */}
            <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Micro instructions under phone */}
      <p className="text-xs text-zinc-500 mt-4 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>Click presets above to trigger real GPU WebGL shaders & button styles</span>
      </p>
    </div>
  )
}
