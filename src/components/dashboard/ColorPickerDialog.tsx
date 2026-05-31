'use client'

import { useState, useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { hexToRgb, rgbToHsb, rgbToCmyk, hsbToHex } from '@/lib/color-utils'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'

interface ColorPickerDialogProps {
  isOpen: boolean
  onClose: () => void
  initialColor: string
  onSelectColor: (color: string) => void
}

function VerticalHueSlider({ hue, onChange }: { hue: number; onChange: (h: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const updateHue = (clientY: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const relativeY = clientY - rect.top
    const percentage = Math.min(100, Math.max(0, (relativeY / rect.height) * 100))
    const newHue = Math.round((percentage / 100) * 360)
    onChange(newHue)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    updateHue(e.clientY)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateHue(moveEvent.clientY)
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    updateHue(e.touches[0].clientY)

    const handleTouchMove = (moveEvent: TouchEvent) => {
      updateHue(moveEvent.touches[0].clientY)
    }

    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  const pointerTopPercent = (hue / 360) * 100

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="relative w-8 h-[260px] cursor-pointer select-none flex items-center justify-center"
    >
      {/* Slider Track */}
      <div 
        className="w-5 h-full rounded-full border border-white/5 shadow-inner"
        style={{
          background: 'linear-gradient(to bottom, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
        }}
      />
      {/* Slider Handle (Capsule) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-3.5 bg-white border border-zinc-400 rounded-[4px] shadow-[0_2px_5px_rgba(0,0,0,0.5)] pointer-events-none"
        style={{
          top: `${pointerTopPercent}%`
        }}
      />
    </div>
  )
}

export function ColorPickerDialog({ isOpen, onClose, initialColor, onSelectColor }: ColorPickerDialogProps) {
  const [color, setColor] = useState(initialColor || '#09090b')
  const [copied, setCopied] = useState(false)

  // Extract HSB color values
  const rgb = hexToRgb(color)
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

  const [hue, setHue] = useState(hsb.h)

  useEffect(() => {
    if (initialColor) {
      setColor(initialColor)
      const initRgb = hexToRgb(initialColor)
      const initHsb = rgbToHsb(initRgb.r, initRgb.g, initRgb.b)
      setHue(initHsb.h)
    }
  }, [initialColor, isOpen])

  const handleSaturationChange = (newHex: string) => {
    setColor(newHex)
    const newRgb = hexToRgb(newHex)
    const newHsb = rgbToHsb(newRgb.r, newRgb.g, newRgb.b)
    if (newHsb.s > 0 && newHsb.b > 0) {
      setHue(newHsb.h)
    }
  }

  const handleHueChange = (newHue: number) => {
    setHue(newHue)
    const currentRgb = hexToRgb(color)
    const currentHsb = rgbToHsb(currentRgb.r, currentRgb.g, currentRgb.b)
    const newHex = hsbToHex(newHue, currentHsb.s, currentHsb.b)
    setColor(newHex)
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(color.toUpperCase())
    if (ok) {
      setCopied(true)
      toast.success('Hex code copied!')
      setTimeout(() => setCopied(false), 2000)
    } else {
      toast.error('Failed to copy hex code')
    }
  }

  const handleSelect = () => {
    onSelectColor(color)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[480px] bg-[#0d0d0f] border border-white/10 text-white rounded-[2rem] p-6 shadow-2xl overflow-hidden [&>button]:text-zinc-400 [&>button]:hover:text-white font-sans-theme">
        <DialogHeader className="sr-only">
          <DialogTitle>Select Color</DialogTitle>
        </DialogHeader>

        {/* Color Picker Styling Override - Hide standard hue */}
        <style jsx global>{`
          .custom-picker .react-colorful__hue {
            display: none !important;
          }
          .custom-picker .react-colorful {
            height: 260px !important;
            width: 100% !important;
          }
          .custom-picker .react-colorful__saturation {
            flex: 1;
            border-radius: 1.25rem !important;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .custom-picker .react-colorful__saturation-pointer {
            width: 20px !important;
            height: 20px !important;
            border: 3px solid #ffffff !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4) !important;
            border-radius: 50% !important;
          }
        `}</style>

        <div className="space-y-6">
          {/* Main Area: Saturation area on Left, Hue slider on Right */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 custom-picker">
              <HexColorPicker color={color} onChange={handleSaturationChange} />
            </div>
            <VerticalHueSlider hue={hue} onChange={handleHueChange} />
          </div>

          {/* Compare section: NEW vs CURRENT */}
          <div className="border border-white/5 bg-[#141416] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 text-[10px] tracking-wider text-zinc-500 font-bold uppercase text-center pt-2 pb-1 border-b border-white/5 font-display-theme">
              <span>New</span>
              <span>Current</span>
            </div>
            <div className="grid grid-cols-2 h-10">
              <div style={{ backgroundColor: color }} className="transition-all" />
              <div style={{ backgroundColor: initialColor || '#09090b' }} />
            </div>
          </div>

          {/* Color Values: HSB, RGB, CMYK */}
          <div className="grid grid-cols-3 gap-3">
            {/* HSB */}
            <div className="space-y-1.5 text-center">
              <span className="text-[10px] font-bold text-zinc-500 tracking-wider font-display-theme">HSB</span>
              <div className="grid grid-cols-3 gap-1 bg-[#141416] border border-white/5 rounded-xl p-1 text-[11px]">
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[9px] text-zinc-600 font-semibold mb-0.5">H</span>
                  <span className="font-bold text-white">{hsb.h}°</span>
                </div>
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[9px] text-zinc-600 font-semibold mb-0.5">S</span>
                  <span className="font-bold text-white">{hsb.s}%</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="text-[9px] text-zinc-600 font-semibold mb-0.5">B</span>
                  <span className="font-bold text-white">{hsb.b}%</span>
                </div>
              </div>
            </div>

            {/* RGB */}
            <div className="space-y-1.5 text-center">
              <span className="text-[10px] font-bold text-zinc-500 tracking-wider font-display-theme">RGB</span>
              <div className="grid grid-cols-3 gap-1 bg-[#141416] border border-white/5 rounded-xl p-1 text-[11px]">
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[9px] text-zinc-600 font-semibold mb-0.5">R</span>
                  <span className="font-bold text-white">{rgb.r}</span>
                </div>
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[9px] text-zinc-600 font-semibold mb-0.5">G</span>
                  <span className="font-bold text-white">{rgb.g}</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="text-[9px] text-zinc-600 font-semibold mb-0.5">B</span>
                  <span className="font-bold text-white">{rgb.b}</span>
                </div>
              </div>
            </div>

            {/* CMYK */}
            <div className="space-y-1.5 text-center">
              <span className="text-[10px] font-bold text-zinc-500 tracking-wider font-display-theme">CMYK</span>
              <div className="grid grid-cols-4 gap-0.5 bg-[#141416] border border-white/5 rounded-xl p-1 text-[9px] leading-tight">
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[8px] text-zinc-600 font-semibold mb-0.5">C</span>
                  <span className="font-bold text-white">{cmyk.c}%</span>
                </div>
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[8px] text-zinc-600 font-semibold mb-0.5">M</span>
                  <span className="font-bold text-white">{cmyk.m}%</span>
                </div>
                <div className="flex flex-col py-1 border-r border-white/5">
                  <span className="text-[8px] text-zinc-600 font-semibold mb-0.5">Y</span>
                  <span className="font-bold text-white">{cmyk.y}%</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="text-[8px] text-zinc-600 font-semibold mb-0.5">K</span>
                  <span className="font-bold text-white">{cmyk.k}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hex display & Copy */}
          <div className="relative flex items-center justify-between bg-[#070708] border border-white/10 rounded-2xl h-14 px-5">
            <span className="text-zinc-600 font-bold text-xl font-display-theme">#</span>
            <input 
              type="text" 
              value={color.replace('#', '').toUpperCase()} 
              onChange={(e) => {
                const val = e.target.value
                if (val.length <= 6) {
                  setColor('#' + val)
                }
              }}
              className="flex-1 bg-transparent border-0 outline-none text-white font-mono font-bold text-lg tracking-widest text-center uppercase"
            />
            <button 
              type="button"
              onClick={handleCopy}
              className="text-zinc-500 hover:text-white transition-colors p-2 cursor-pointer"
              aria-label="Copy Hex color code"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>

          {/* SET AS CURRENT COLOR button */}
          <Button 
            onClick={(e) => {
              e.stopPropagation()
              handleSelect()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full h-14 bg-white text-black hover:bg-zinc-200 transition-colors font-display-theme font-black text-sm tracking-widest rounded-2xl uppercase shadow-lg shadow-white/5 cursor-pointer"
          >
            Set as Current Color
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
