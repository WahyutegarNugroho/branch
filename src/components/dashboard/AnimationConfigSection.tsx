'use client'

import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { AnimationConfig } from '@/types'

const ANIMATIONS = [
  { val: 'none', label: 'None' },
  { val: 'aurora', label: 'Aurora Waves' },
  { val: 'particles', label: 'Particles' },
  { val: 'snowfall', label: 'Snowfall' },
  { val: 'stars', label: 'Stars' },
  { val: 'matrix', label: 'Matrix' },
  { val: 'confetti', label: 'Confetti' },
  { val: 'bokeh', label: 'Bokeh' },
]

export function AnimationConfigSection({
  bgAnimation,
  setBgAnimation,
  bgAnimationConfig,
  updateBgConfig,
}: {
  bgAnimation: string
  setBgAnimation: (val: string) => void
  bgAnimationConfig: AnimationConfig
  updateBgConfig: (key: string, value: unknown) => void
}) {
  return (
    <div className="space-y-3 pt-4 border-t border-white/5">
      <Label className="text-zinc-300 font-bold text-sm">Background Animation</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {ANIMATIONS.map((anim) => (
          <div
            key={anim.val}
            onClick={() => setBgAnimation(anim.val)}
            className={`h-12 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${bgAnimation === anim.val ? 'border-white bg-white/10 text-white font-bold' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
          >
            <span className="text-xs">{anim.label}</span>
          </div>
        ))}
        <input type="hidden" name="bg_animation" value={bgAnimation} />
      </div>

      {bgAnimation !== 'none' && bgAnimation !== 'bokeh' && (
        <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-zinc-300 font-bold text-xs flex items-center justify-between">
            <span>Customize {bgAnimation.charAt(0).toUpperCase() + bgAnimation.slice(1)}</span>
          </Label>

          {bgAnimation === 'aurora' && (
            <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <Label className="text-zinc-400 text-xs">Color Theme</Label>
                <select
                  value={String(bgAnimationConfig.theme ?? '0')}
                  onChange={(e) => updateBgConfig('theme', parseInt(e.target.value))}
                  className="w-full mt-2 bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white"
                >
                  <option value="0">Teal / Blue / Pink</option>
                  <option value="1">Purple / Cyan / Mint</option>
                  <option value="2">Aqua / Orange / Lime</option>
                </select>
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Speed (Multiplier)</Label>
                <Slider
                  value={[bgAnimationConfig.speed ?? 1]}
                  onValueChange={(v) => updateBgConfig('speed', Array.isArray(v) ? v[0] : v)}
                  min={0.1} max={3} step={0.1}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>
          )}

          {bgAnimation === 'snowfall' && (
            <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <Label className="text-zinc-400 text-xs">Flake Count ({bgAnimationConfig.flakeCount ?? 100})</Label>
                <Slider
                  value={[bgAnimationConfig.flakeCount ?? 100]}
                  onValueChange={(v) => updateBgConfig('flakeCount', Array.isArray(v) ? v[0] : v)}
                  min={10} max={300} step={10}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Fall Speed</Label>
                <Slider
                  value={[bgAnimationConfig.speed ?? 1]}
                  onValueChange={(v) => updateBgConfig('speed', Array.isArray(v) ? v[0] : v)}
                  min={0.1} max={5} step={0.1}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Wind Direction</Label>
                <select
                  value={bgAnimationConfig.wind ?? 'right'}
                  onChange={(e) => updateBgConfig('wind', e.target.value)}
                  className="w-full mt-2 bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white"
                >
                  <option value="left">Left</option>
                  <option value="none">Straight Down</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          )}

          {bgAnimation === 'matrix' && (
            <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <Label className="text-zinc-400 text-xs">Text Color</Label>
                <div className="flex gap-2 mt-2">
                  {['#0F0', '#F00', '#00F', '#F0F', '#0FF'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => updateBgConfig('color', color)}
                      className={`w-6 h-6 rounded-full border-2 ${bgAnimationConfig.color === color || (!bgAnimationConfig.color && color === '#0F0') ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Font Size ({bgAnimationConfig.fontSize ?? 14}px)</Label>
                <Slider
                  value={[bgAnimationConfig.fontSize ?? 14]}
                  onValueChange={(v) => updateBgConfig('fontSize', Array.isArray(v) ? v[0] : v)}
                  min={8} max={32} step={2}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Fall Speed</Label>
                <Slider
                  value={[bgAnimationConfig.speed ?? 1]}
                  onValueChange={(v) => updateBgConfig('speed', Array.isArray(v) ? v[0] : v)}
                  min={0.5} max={3} step={0.1}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>
          )}

          {bgAnimation === 'stars' && (
            <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <Label className="text-zinc-400 text-xs">Star Count ({bgAnimationConfig.starCount ?? 200})</Label>
                <Slider
                  value={[bgAnimationConfig.starCount ?? 200]}
                  onValueChange={(v) => updateBgConfig('starCount', Array.isArray(v) ? v[0] : v)}
                  min={50} max={500} step={25}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Movement Speed</Label>
                <Slider
                  value={[bgAnimationConfig.speed ?? 1]}
                  onValueChange={(v) => updateBgConfig('speed', Array.isArray(v) ? v[0] : v)}
                  min={0} max={5} step={0.2}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>
          )}

          {bgAnimation === 'confetti' && (
            <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <Label className="text-zinc-400 text-xs">Confetti Count ({bgAnimationConfig.confettiCount ?? 150})</Label>
                <Slider
                  value={[bgAnimationConfig.confettiCount ?? 150]}
                  onValueChange={(v) => updateBgConfig('confettiCount', Array.isArray(v) ? v[0] : v)}
                  min={20} max={300} step={10}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Gravity / Speed</Label>
                <Slider
                  value={[bgAnimationConfig.speed ?? 1]}
                  onValueChange={(v) => updateBgConfig('speed', Array.isArray(v) ? v[0] : v)}
                  min={0.2} max={3} step={0.1}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>
          )}

          {bgAnimation === 'particles' && (
            <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <Label className="text-zinc-400 text-xs">Particle Density</Label>
                <Slider
                  value={[bgAnimationConfig.density ?? 10000]}
                  onValueChange={(v) => updateBgConfig('density', Array.isArray(v) ? v[0] : v)}
                  min={4000} max={20000} step={1000}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
                <p className="text-[10px] text-zinc-500 mt-1">Lower is more dense.</p>
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Link Distance ({bgAnimationConfig.linkDistance ?? 120}px)</Label>
                <Slider
                  value={[bgAnimationConfig.linkDistance ?? 120]}
                  onValueChange={(v) => updateBgConfig('linkDistance', Array.isArray(v) ? v[0] : v)}
                  min={50} max={250} step={10}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
              <div>
                <Label className="text-zinc-400 text-xs">Movement Speed</Label>
                <Slider
                  value={[bgAnimationConfig.speed ?? 1]}
                  onValueChange={(v) => updateBgConfig('speed', Array.isArray(v) ? v[0] : v)}
                  min={0.1} max={3} step={0.1}
                  className="w-full mt-2 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
