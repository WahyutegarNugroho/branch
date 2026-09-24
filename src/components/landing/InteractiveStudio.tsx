'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Type,
  Square,
  MousePointerClick,
  Palette,
  Eye
} from 'lucide-react'

type ButtonShape = 'pill' | 'rounded' | 'sharp' | 'brutalist' | 'glass'
type FontOption = 'sans' | 'space' | 'serif' | 'mono'
type AnimationStyle = 'none' | 'spotlight' | 'pulse'

interface StylePreset {
  id: string
  name: string
  bg: string
  text: string
  border: string
  shadow?: string
}

const COLOR_PRESETS: StylePreset[] = [
  { id: 'monochrome', name: 'Monochrome', bg: 'bg-white', text: 'text-zinc-950', border: 'border-white' },
  { id: 'emerald', name: 'Emerald Cyber', bg: 'bg-emerald-500', text: 'text-zinc-950 font-bold', border: 'border-emerald-400' },
  { id: 'glass', name: 'Frosted Glass', bg: 'bg-white/10 backdrop-blur-md', text: 'text-white', border: 'border-white/20' },
  { id: 'slate', name: 'Dark Slate', bg: 'bg-zinc-800 hover:bg-zinc-700', text: 'text-white', border: 'border-zinc-700' },
]

export function InteractiveStudio() {
  const [shape, setShape] = useState<ButtonShape>('rounded')
  const [font, setFont] = useState<FontOption>('sans')
  const [animation, setAnimation] = useState<AnimationStyle>('spotlight')
  const [colorPreset, setColorPreset] = useState<StylePreset>(COLOR_PRESETS[0])

  // Get shape classes
  const getShapeClass = () => {
    switch (shape) {
      case 'pill':
        return 'rounded-full'
      case 'rounded':
        return 'rounded-xl'
      case 'sharp':
        return 'rounded-none'
      case 'brutalist':
        return 'rounded-none border-2 border-white shadow-[4px_4px_0_0_#ffffff] active:translate-x-1 active:translate-y-1 active:shadow-none'
      case 'glass':
        return 'rounded-xl backdrop-blur-md border border-white/25'
    }
  }

  // Get font classes
  const getFontClass = () => {
    switch (font) {
      case 'sans':
        return 'font-sans'
      case 'space':
        return 'font-display tracking-tight'
      case 'serif':
        return 'font-serif italic'
      case 'mono':
        return 'font-mono'
    }
  }

  return (
    <section id="studio" aria-labelledby="studio-heading" className="py-20 lg:py-28 px-4 sm:px-6 border-t border-white/[0.08] bg-zinc-950/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (R-09: No category pill parked above H2) */}
        <div className="max-w-3xl mb-12">
          <h2 id="studio-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
            Make it match your style.
          </h2>
          <p className="mt-3 text-base lg:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            Choose button shapes, fonts, and colors to see how your links will appear to visitors before you sign up.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Control 1: Button Shapes */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/[0.08]">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-3">
                <Square className="w-3.5 h-3.5 text-emerald-400" />
                <span>Button Shape</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'rounded', label: 'Rounded XL' },
                  { id: 'pill', label: 'Full Pill' },
                  { id: 'sharp', label: 'Sharp 90°' },
                  { id: 'brutalist', label: '3D Brutalist' },
                  { id: 'glass', label: 'Glassmorphism' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setShape(item.id as ButtonShape)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      shape === item.id
                        ? 'bg-white text-zinc-950 border-white font-bold shadow-md'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Typography */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/[0.08]">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-3">
                <Type className="w-3.5 h-3.5 text-emerald-400" />
                <span>Font</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'sans', label: 'Inter Sans', sample: 'Modern & Clean' },
                  { id: 'space', label: 'Space Grotesk', sample: 'Editorial Tech' },
                  { id: 'serif', label: 'Playfair Serif', sample: 'High Editorial' },
                  { id: 'mono', label: 'JetBrains Mono', sample: 'Code / Hacker' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFont(item.id as FontOption)}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      font === item.id
                        ? 'bg-white text-zinc-950 border-white font-semibold shadow-md'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="text-[10px] opacity-70 mt-0.5">{item.sample}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Color Palette Presets */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/[0.08]">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-3">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Button Colors</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COLOR_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setColorPreset(preset)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      colorPreset.id === preset.id
                        ? 'border-emerald-400 bg-emerald-500/10 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border border-white/20 ${preset.bg}`} />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Micro-Animations */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/[0.08]">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-3">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Link Highlight Effect</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'spotlight', label: 'Spotlight Halo' },
                  { id: 'pulse', label: 'Breathing Pulse' },
                  { id: 'none', label: 'Clean Static' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAnimation(item.id as AnimationStyle)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer select-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      animation === item.id
                        ? 'bg-white text-zinc-950 border-white font-bold shadow-md'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Canvas (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl p-6 bg-zinc-900/90 border border-white/[0.08] shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] text-xs text-zinc-400">
                <span className="font-mono">Live Preview</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>

              {/* Sample Profile Header */}
              <div className={`text-center mb-6 ${getFontClass()}`}>
                <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                  S
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Sam</h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Photographer & visual designer based in Jakarta.
                </p>
              </div>

              {/* Sample Buttons with chosen styles */}
              <div className={`space-y-3 ${getFontClass()}`}>
                <button
                  type="button"
                  className={`group relative w-full h-12 px-4 flex items-center justify-between text-sm font-semibold transition-all cursor-pointer ${getShapeClass()} ${colorPreset.bg} ${colorPreset.text} ${
                    animation === 'spotlight'
                      ? 'shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50'
                      : animation === 'pulse'
                      ? 'animate-pulse'
                      : ''
                  }`}
                >
                  <span>Featured Project</span>
                  <MousePointerClick className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  type="button"
                  className={`w-full h-12 px-4 flex items-center justify-between text-sm font-semibold transition-all cursor-pointer ${getShapeClass()} ${colorPreset.bg} ${colorPreset.text}`}
                >
                  <span>Documentation & Guide</span>
                  <span className="text-xs opacity-60">DOCS</span>
                </button>

                <button
                  type="button"
                  className={`w-full h-12 px-4 flex items-center justify-between text-sm font-semibold transition-all cursor-pointer ${getShapeClass()} ${colorPreset.bg} ${colorPreset.text}`}
                >
                  <span>Join Creator Community</span>
                  <span className="text-xs opacity-60">COMMUNITY</span>
                </button>
              </div>

              {/* Claim Action (R-08: Specific CTA, no decorative arrow) */}
              <div className="mt-8 pt-5 border-t border-white/[0.08] text-center">
                <Link
                  href="/register"
                  className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] cursor-pointer"
                >
                  Claim your link with this style
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
