'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ThemesGalleryProps {
  themes: any[]
  bgType: string
  bgColor: string
  buttonShape: string
  buttonStyle: string
  fontFamily: string
  handleSelectTheme: (theme: any) => void
}

export function ThemesGallery({
  themes,
  bgType,
  bgColor,
  buttonShape,
  buttonStyle,
  fontFamily,
  handleSelectTheme,
}: ThemesGalleryProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-white font-display-theme font-black flex items-center gap-2">
          🎨 Preset Themes Gallery
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Choose from professionally designed premium themes to instantly beautify your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {themes.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-zinc-500 text-sm font-medium animate-pulse">
            Loading themes gallery...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {themes.map((theme) => {
              const isActive =
                bgType === theme.bg_type &&
                bgColor === theme.bg_color &&
                buttonShape === theme.button_shape &&
                buttonStyle === theme.button_style &&
                fontFamily === theme.font_family

              const btnRadius =
                theme.button_shape === 'rounded-full' ? 'rounded-full' :
                theme.button_shape === 'rounded-xl' ? 'rounded-md' :
                theme.button_shape === 'rounded-3xl' ? 'rounded-[10px]' : 'rounded-none'

              const btnStyle =
                theme.button_style === 'fill' ? 'bg-white/20' :
                theme.button_style === 'soft' ? 'bg-white/10' :
                theme.button_style === 'outline' ? 'bg-transparent border-white/30' : 'bg-white/20 shadow-md'

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleSelectTheme(theme)}
                  className={cn(
                    'group relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-left overflow-hidden h-36',
                    isActive
                      ? 'border-brand-pink bg-brand-pink/5 shadow-[0_0_20px_rgba(236,72,153,0.15)] scale-[1.02]'
                      : 'border-white/10 bg-zinc-950/40 hover:border-white/20 hover:scale-[1.01]',
                  )}
                >
                  <div
                    className="w-full flex-1 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-2 gap-1.5 border border-white/5"
                    style={{
                      background: theme.bg_type === 'image' ? undefined : theme.bg_color,
                      backgroundImage: theme.bg_type === 'image' ? `url(${theme.bg_image_url})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-white/25 border border-white/15" />
                    <div className={cn('w-14 h-2.5 border border-white/10 flex items-center justify-center', btnRadius, btnStyle)} />
                    <div className={cn('w-10 h-2.5 border border-white/10 flex items-center justify-center', btnRadius, btnStyle)} />
                  </div>
                  <div className="w-full mt-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white group-hover:text-brand-pink transition-colors truncate">
                      {theme.name}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
