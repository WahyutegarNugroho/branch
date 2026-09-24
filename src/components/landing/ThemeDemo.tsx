'use client'

import { useState } from 'react'

interface ThemePreset {
  id: string
  name: string
  swatch: string
  cardStyle: React.CSSProperties
  buttonClass: string
}

const THEMES: ThemePreset[] = [
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    swatch: '#09090b',
    cardStyle: { backgroundColor: '#09090b' },
    buttonClass: 'bg-white/[0.08] border border-white/10 text-white hover:bg-white/[0.14] rounded-lg',
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    swatch: '#ec4899',
    cardStyle: { background: 'linear-gradient(160deg, #ec4899, #f97316)' },
    buttonClass: 'bg-white text-zinc-900 font-semibold hover:bg-zinc-100 rounded-full',
  },
  {
    id: 'forest-breeze',
    name: 'Forest Breeze',
    swatch: '#14b8a6',
    cardStyle: { background: 'linear-gradient(160deg, #115e59, #14b8a6)' },
    buttonClass: 'bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-lg',
  },
]

const DEMO_LINKS = ['Portfolio', 'Latest UI kit', 'Read the newsletter']

export function ThemeDemo() {
  const [activeId, setActiveId] = useState(THEMES[0].id)
  const active = THEMES.find(t => t.id === activeId) ?? THEMES[0]

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
      <div role="group" aria-label="Preview themes" className="flex sm:flex-col gap-2 shrink-0">
        {THEMES.map(theme => {
          const isActive = theme.id === active.id
          return (
            <button
              key={theme.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(theme.id)}
              className={`flex items-center gap-2 h-10 px-3 rounded-lg border text-sm font-medium transition-colors ${
                isActive
                  ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: theme.swatch }} />
              <span className="hidden sm:inline">{theme.name}</span>
            </button>
          )
        })}
      </div>

      <div
        className="w-full max-w-[300px] rounded-xl border border-zinc-800 p-5 shadow-lg transition-colors duration-300"
        style={active.cardStyle}
        aria-live="polite"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-black/20 border border-white/15 flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">Ben</p>
            <p className="text-white/60 text-xs">Design engineer · side projects</p>
          </div>
        </div>
        <div className="space-y-2">
          {DEMO_LINKS.map(label => (
            <div key={label} className={`${active.buttonClass} h-10 flex items-center justify-center text-sm transition-colors`}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
