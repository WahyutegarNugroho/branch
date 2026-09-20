'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  BarChart3,
  Sparkles,
  Layers,
  Calendar,
  Globe,
  QrCode,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Check,
  GripVertical,
  Flame,
  Volume2,
  Play,
  Download,
  Share2,
  Compass
} from 'lucide-react'

// Dynamically import WebGL backgrounds for the interactive shader card
const AuroraBackground = dynamic(() => import('@/components/backgrounds/AuroraBackground'), { ssr: false })
const MatrixBackground = dynamic(() => import('@/components/backgrounds/MatrixBackground'), { ssr: false })
const StarsBackground = dynamic(() => import('@/components/backgrounds/StarsBackground'), { ssr: false })
const ParticlesBackground = dynamic(() => import('@/components/backgrounds/ParticlesBackground'), { ssr: false })
const SnowfallBackground = dynamic(() => import('@/components/backgrounds/SnowfallBackground'), { ssr: false })
const ConfettiBackground = dynamic(() => import('@/components/backgrounds/ConfettiBackground'), { ssr: false })

const SHADERS = [
  { id: 'aurora', name: 'Aurora', type: 'Fluid Glow' },
  { id: 'matrix', name: 'Matrix', type: 'Digital Rain' },
  { id: 'stars', name: 'Stars', type: 'Deep Space' },
  { id: 'particles', name: 'Particles', type: 'Constellation' },
  { id: 'snowfall', name: 'Snowfall', type: 'Atmospheric' },
  { id: 'confetti', name: 'Confetti', type: 'Celebration' },
] as const

type ShaderId = typeof SHADERS[number]['id']

const CHART_DATA = [
  { day: 'Mon', views: 4210, clicks: 1250 },
  { day: 'Tue', views: 5890, clicks: 1780 },
  { day: 'Wed', views: 6120, clicks: 1940 },
  { day: 'Thu', views: 7430, clicks: 2310 },
  { day: 'Fri', views: 8920, clicks: 2840 },
  { day: 'Sat', views: 11400, clicks: 3620 },
  { day: 'Sun', views: 12480, clicks: 3950 },
]

export function BentoFeatures() {
  const [activeShader, setActiveShader] = useState<ShaderId>('aurora')
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(6)
  const [spotlightActive, setSpotlightActive] = useState(true)

  const activeStat = hoveredPoint !== null ? CHART_DATA[hoveredPoint] : CHART_DATA[6]

  return (
    <section id="features" aria-labelledby="features-heading" className="py-20 lg:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-medium text-emerald-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Features</span>
          </div>
          <h2 id="features-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Everything you need to share your work.
          </h2>
          <p className="mt-4 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            From interactive embeds to privacy-friendly analytics, Branch gives you complete control over your bio page without bloat.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ================= CARD 1: Analytics Engine (Spans 2 cols) ================= */}
          <div className="lg:col-span-2 rounded-2xl bg-zinc-900/70 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>Real-Time Analytics</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    See what your audience clicks, without creepy cookies
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>0 Cookies &bull; GDPR Ready</span>
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className="rounded-xl bg-zinc-950/80 border border-white/[0.06] p-5 mb-6">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-zinc-500 font-medium">Selected Day ({activeStat.day})</span>
                    <div className="flex items-baseline gap-3 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                        {activeStat.views.toLocaleString()}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">
                        {activeStat.clicks.toLocaleString()} clicks ({((activeStat.clicks / activeStat.views) * 100).toFixed(1)}% CTR)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Views</span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-white/40 ml-2" />
                    <span>Clicks</span>
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="w-full h-40 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
                    {/* Flat Area fill */}
                    <path
                      d="M 50,110 Q 150,85 250,80 T 450,55 T 650,20 L 650,150 L 50,150 Z"
                      fill="#10b981"
                      fillOpacity="0.1"
                    />

                    {/* Stroke line */}
                    <path
                      d="M 50,110 Q 150,85 250,80 T 450,55 T 650,20"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />

                    {/* Interactive points */}
                    {CHART_DATA.map((d, index) => {
                      const cx = 50 + index * 100
                      // calculated y coordinates corresponding to curve
                      const cy = [110, 85, 80, 68, 55, 32, 20][index]
                      const isHovered = hoveredPoint === index

                      return (
                        <g
                          key={d.day}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredPoint(index)}
                        >
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isHovered ? 6 : 4}
                            className={`transition-all ${isHovered ? 'fill-emerald-400 stroke-white stroke-2' : 'fill-emerald-500'}`}
                          />
                        </g>
                      )
                    })}
                  </svg>

                  {/* Day labels */}
                  <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2 px-6">
                    {CHART_DATA.map((d, i) => (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setHoveredPoint(i)}
                        className={`hover:text-white transition-colors ${hoveredPoint === i ? 'text-emerald-400 font-bold' : ''}`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metric Breakdown Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                  <p className="text-[11px] text-zinc-400 font-medium">Top Referrer</p>
                  <p className="text-sm font-bold text-white mt-0.5">Instagram (48%)</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                  <p className="text-[11px] text-zinc-400 font-medium">Mobile Traffic</p>
                  <p className="text-sm font-bold text-white mt-0.5">84% iOS/Android</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                  <p className="text-[11px] text-zinc-400 font-medium">Click-Through Rate</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">31.4% Avg</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.04]">
                  <p className="text-[11px] text-zinc-400 font-medium">UTM Tracking</p>
                  <p className="text-sm font-bold text-white mt-0.5 font-mono text-xs">Automated</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
              <span>First-party stats stored securely. No tracking pixels or ad cookies.</span>
              <span className="text-emerald-400 font-medium">Export raw CSV anytime &rarr;</span>
            </div>
          </div>

          {/* ================= CARD 2: WebGL Background Shaders ================= */}
          <div className="rounded-2xl bg-zinc-900/70 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Animated Backgrounds</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                6 Dynamic Canvas Effects
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Pick from subtle animations like aurora, starfields, snow, or matrix rain. Smooth and battery-friendly on phones.
              </p>

              {/* Shader Selector Chips */}
              <div className="grid grid-cols-3 gap-1.5 mt-4 mb-4">
                {SHADERS.map(shader => (
                  <button
                    key={shader.id}
                    type="button"
                    onClick={() => setActiveShader(shader.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      activeShader === shader.id
                        ? 'bg-white text-zinc-950 border-white font-bold shadow-md'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {shader.name}
                  </button>
                ))}
              </div>

              {/* Live Canvas Mini-Viewport */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
                {activeShader === 'aurora' && <AuroraBackground config={{ theme: 0, speed: 1.2 }} />}
                {activeShader === 'matrix' && <MatrixBackground config={{ color: '#10b981', speed: 1.2, fontSize: 13 }} />}
                {activeShader === 'stars' && <StarsBackground config={{ starCount: 140, speed: 0.8 }} />}
                {activeShader === 'particles' && <ParticlesBackground config={{ starCount: 60, linkDistance: 70 }} />}
                {activeShader === 'snowfall' && <SnowfallBackground config={{ flakeCount: 70, speed: 1 }} />}
                {activeShader === 'confetti' && <ConfettiBackground config={{ amount: 50, speed: 1 }} />}

                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                  {activeShader.toUpperCase()} &bull; 60 FPS
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-4">
              Runs smoothly on mobile devices with minimal battery and CPU usage.
            </p>
          </div>

          {/* ================= CARD 3: Drag & Drop and Scheduling ================= */}
          <div className="rounded-2xl bg-zinc-900/70 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between group hover:border-zinc-700/80 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Organization</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Drag, Drop & Schedule
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Reorder links with drag and drop, pin spotlight links, and set automatic start or expiration dates.
              </p>

              {/* Mockup of Drag & Drop Item */}
              <div className="mt-5 space-y-2.5">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GripVertical className="w-4 h-4 text-zinc-600 shrink-0 cursor-grab" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">New Album Pre-order</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-400 mt-0.5">
                        <Flame className="w-3 h-3" />
                        <span>Spotlight Link</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSpotlightActive(!spotlightActive)}
                    className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                      spotlightActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {spotlightActive ? 'PINNED' : 'NORMAL'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GripVertical className="w-4 h-4 text-zinc-600 shrink-0 cursor-grab" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">Black Friday Sale (50% Off)</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">Auto-expires Nov 30</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    SCHEDULED
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-4">
              Easy to reorder on both phone and desktop.
            </p>
          </div>

          {/* ================= CARD 4: Rich Media Embeds ================= */}
          <div className="rounded-2xl bg-zinc-900/70 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between group hover:border-zinc-700/80 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Volume2 className="w-4 h-4" />
                <span>Media & Music</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Spotify, YouTube & TikTok
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Play songs, podcast episodes, and video clips directly on your page without sending visitors away.
              </p>

              {/* Embed Card Mockup */}
              <div className="mt-5 p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Spotify In-Line Player</p>
                      <p className="text-[10px] text-zinc-400">No external app redirect</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    Native
                  </span>
                </div>

                {/* Fake audio waveform */}
                <div className="h-6 flex items-center justify-between gap-1 px-1">
                  {[40, 65, 85, 30, 75, 95, 60, 45, 80, 100, 70, 50, 90, 65, 40, 85, 95, 35, 50, 75, 90, 60, 30].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-emerald-400/60 rounded-full"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-4">
              Embeds load lazily so your page opens in milliseconds.
            </p>
          </div>

          {/* ================= CARD 5: Custom Domain & QR Vector ================= */}
          <div className="rounded-2xl bg-zinc-900/70 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between group hover:border-zinc-700/80 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Globe className="w-4 h-4" />
                <span>Custom Domain</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Your Own Domain & QR Code
              </h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Connect your personal domain like links.yourname.com with automatic SSL, and generate clean QR codes for print.
              </p>

              {/* DNS Verification Mockup */}
              <div className="mt-5 p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-300">links.yourbrand.com</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                    <span>SSL ACTIVE</span>
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-mono text-zinc-500">DNS: TXT record verified</span>
                  <span className="text-zinc-300">Response: &lt;32ms</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-zinc-400">Download QR code as SVG or PNG</span>
              <QrCode className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
