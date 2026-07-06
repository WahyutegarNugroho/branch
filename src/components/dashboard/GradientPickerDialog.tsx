'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { hexToRgb, rgbToHex } from '@/lib/color-utils'
import { ColorPickerDialog } from './ColorPickerDialog'

interface Stop {
  id: string
  position: number
}

interface ColorStop extends Stop {
  color: string
}

interface OpacityStop extends Stop {
  opacity: number
}

interface GradientPickerDialogProps {
  isOpen: boolean
  onClose: () => void
  initialGradient: string
  onSelectGradient: (gradient: string) => void
}

function parseGradient(gradientStr: string) {
  let colorStops: ColorStop[] = [
    { id: 'c1', color: '#000000', position: 0 },
    { id: 'c2', color: '#ffffff', position: 100 }
  ]
  let opacityStops: OpacityStop[] = [
    { id: 'o1', opacity: 1, position: 0 },
    { id: 'o2', opacity: 1, position: 100 }
  ]
  let angle = 90 // Photoshop 90deg is straight UP

  if (!gradientStr || !gradientStr.includes('gradient')) {
    return { colorStops, opacityStops, angle }
  }

  try {
    const angleMatch = gradientStr.match(/linear-gradient\(([\d.-]+)deg/)
    if (angleMatch) {
      const cssAngle = parseFloat(angleMatch[1])
      let psAngle = (90 - cssAngle) % 360
      if (psAngle < -180) psAngle += 360
      if (psAngle > 180) psAngle -= 360
      angle = psAngle
    }

    const stopRegex = /(rgba?\([^)]+\)|#[a-fA-F0-9]+)\s+(\d+)%/g
    let match
    const extractedColorStops: ColorStop[] = []
    const extractedOpacityStops: OpacityStop[] = []
    let idCounter = 0

    while ((match = stopRegex.exec(gradientStr)) !== null) {
      const colorPart = match[1]
      const pos = parseFloat(match[2])
      idCounter++
      
      let hex = '#000000'
      let op = 1

      if (colorPart.startsWith('#')) {
        hex = colorPart
      } else if (colorPart.startsWith('rgba')) {
        const rgbaMatch = colorPart.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/)
        if (rgbaMatch) {
          hex = rgbToHex(parseInt(rgbaMatch[1]), parseInt(rgbaMatch[2]), parseInt(rgbaMatch[3]))
          op = parseFloat(rgbaMatch[4])
        }
      } else if (colorPart.startsWith('rgb')) {
        const rgbMatch = colorPart.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
        if (rgbMatch) {
          hex = rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]))
        }
      }

      extractedColorStops.push({ id: `c_${idCounter}`, color: hex, position: pos })
      extractedOpacityStops.push({ id: `o_${idCounter}`, opacity: op, position: pos })
    }

    if (extractedColorStops.length > 0) {
      colorStops = extractedColorStops
      opacityStops = extractedOpacityStops
    }
  } catch {
    // Ignore, use defaults
  }

  return { colorStops, opacityStops, angle }
}

function generateGradient(colorStops: ColorStop[], opacityStops: OpacityStop[], angle: number) {
  const cStops = [...colorStops].sort((a, b) => a.position - b.position)
  const oStops = [...opacityStops].sort((a, b) => a.position - b.position)

  const positions = Array.from(new Set([...cStops.map(s => s.position), ...oStops.map(s => s.position)])).sort((a, b) => a - b)

  const getColorAt = (pos: number) => {
    if (cStops.length === 0) return { r: 0, g: 0, b: 0 }
    if (pos <= cStops[0].position) return hexToRgb(cStops[0].color)
    if (pos >= cStops[cStops.length - 1].position) return hexToRgb(cStops[cStops.length - 1].color)
    
    let left = cStops[0], right = cStops[cStops.length - 1]
    for (let i = 0; i < cStops.length - 1; i++) {
      if (pos >= cStops[i].position && pos <= cStops[i+1].position) {
        left = cStops[i]
        right = cStops[i+1]
        break
      }
    }
    const ratio = right.position === left.position ? 0 : (pos - left.position) / (right.position - left.position)
    const rgbL = hexToRgb(left.color)
    const rgbR = hexToRgb(right.color)
    return {
      r: Math.round(rgbL.r + (rgbR.r - rgbL.r) * ratio),
      g: Math.round(rgbL.g + (rgbR.g - rgbL.g) * ratio),
      b: Math.round(rgbL.b + (rgbR.b - rgbL.b) * ratio)
    }
  }

  const getOpacityAt = (pos: number) => {
    if (oStops.length === 0) return 1
    if (pos <= oStops[0].position) return oStops[0].opacity
    if (pos >= oStops[oStops.length - 1].position) return oStops[oStops.length - 1].opacity
    
    let left = oStops[0], right = oStops[oStops.length - 1]
    for (let i = 0; i < oStops.length - 1; i++) {
      if (pos >= oStops[i].position && pos <= oStops[i+1].position) {
        left = oStops[i]
        right = oStops[i+1]
        break
      }
    }
    const ratio = right.position === left.position ? 0 : (pos - left.position) / (right.position - left.position)
    return left.opacity + (right.opacity - left.opacity) * ratio
  }

  const cssStops = positions.map(pos => {
    const c = getColorAt(pos)
    const o = getOpacityAt(pos)
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${o}) ${pos}%`
  })

  const cssAngle = (90 - angle) % 360
  return `linear-gradient(${cssAngle}deg, ${cssStops.join(', ')})`
}

export function GradientPickerDialog({ isOpen, onClose, initialGradient, onSelectGradient }: GradientPickerDialogProps) {
  const [colorStops, setColorStops] = useState<ColorStop[]>([])
  const [opacityStops, setOpacityStops] = useState<OpacityStop[]>([])
  const [angle, setAngle] = useState(90)
  const [activeStop, setActiveStop] = useState<{ type: 'color' | 'opacity', id: string } | null>(null)
  
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [pickerInitialColor, setPickerInitialColor] = useState('#ffffff')

  const nextIdRef = useRef(0)
  const barRef = useRef<HTMLDivElement>(null)
  const dialRef = useRef<HTMLDivElement>(null)

  const handleDialPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const updateAngleFromPointer = (clientX: number, clientY: number) => {
      const rect = dialRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy

      const rad = Math.atan2(-dy, dx)
      const deg = Math.round(rad * (180 / Math.PI))
      setAngle(deg)
    }

    updateAngleFromPointer(e.clientX, e.clientY)

    const handlePointerMove = (moveEvent: PointerEvent) => {
      updateAngleFromPointer(moveEvent.clientX, moveEvent.clientY)
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  useEffect(() => {
    if (isOpen && colorStops.length === 0) {
      const parsed = parseGradient(initialGradient)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setColorStops(parsed.colorStops)
       
      setOpacityStops(parsed.opacityStops)
       
      setAngle(parsed.angle)
      
      if (parsed.colorStops.length > 0) {
         
        setActiveStop({ type: 'color', id: parsed.colorStops[0].id })
      }
    }
  }, [isOpen, initialGradient, colorStops.length])

  const previewGradient = generateGradient(colorStops, opacityStops, 0) // Always preview horizontal (left-to-right) on the bar to match stops
  const finalGradient = generateGradient(colorStops, opacityStops, angle)

  const handlePointerDown = (e: React.PointerEvent, type: 'color' | 'opacity', id?: string) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = barRef.current?.getBoundingClientRect()
    if (!rect) return

    let currentId = id

    if (!currentId) {
      // Create new stop
      const pos = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
      currentId = `${type}_${nextIdRef.current++}`

      if (type === 'color') {
        const cStops = [...colorStops].sort((a, b) => a.position - b.position)
        // Find approximate color (simplified to white for new stops for ease, or could interpolate)
        const newStop: ColorStop = { id: currentId, position: pos, color: '#ffffff' }
        setColorStops([...cStops, newStop])
      } else {
        const newStop: OpacityStop = { id: currentId, position: pos, opacity: 1 }
        setOpacityStops([...opacityStops, newStop])
      }
    }

    setActiveStop({ type, id: currentId })

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const pos = Math.min(100, Math.max(0, ((moveEvent.clientX - rect.left) / rect.width) * 100))
      
      // Delete if dragged far vertically
      const distanceY = Math.abs(moveEvent.clientY - rect.top)
      if (distanceY > 100) {
        if (type === 'color' && colorStops.length > 2) {
          setColorStops(prev => prev.filter(s => s.id !== currentId))
          setActiveStop(null)
          return
        } else if (type === 'opacity' && opacityStops.length > 2) {
          setOpacityStops(prev => prev.filter(s => s.id !== currentId))
          setActiveStop(null)
          return
        }
      }

      if (type === 'color') {
        setColorStops(prev => {
          if (!prev.find(s => s.id === currentId)) {
            // Restore if brought back
            const newStop: ColorStop = { id: currentId!, position: pos, color: '#ffffff' }
            return [...prev, newStop]
          }
          return prev.map(s => s.id === currentId ? { ...s, position: pos } : s)
        })
      } else {
        setOpacityStops(prev => {
          if (!prev.find(s => s.id === currentId)) {
            const newStop: OpacityStop = { id: currentId!, position: pos, opacity: 1 }
            return [...prev, newStop]
          }
          return prev.map(s => s.id === currentId ? { ...s, position: pos } : s)
        })
      }
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const activeColorStop = activeStop?.type === 'color' ? colorStops.find(s => s.id === activeStop.id) : null
  const activeOpacityStop = activeStop?.type === 'opacity' ? opacityStops.find(s => s.id === activeStop.id) : null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (isColorPickerOpen) return
        if (!open) onClose()
      }}>
        <DialogContent className="max-w-[500px] bg-[#323232] border border-white/20 text-[#e1e1e1] rounded-md shadow-2xl p-6 font-sans">
          <DialogHeader>
            <DialogTitle className="text-lg font-normal mb-2 text-white">Gradient Editor</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Gradient Editor Area */}
            <div className="relative pt-6 pb-6 select-none">
              
              {/* Opacity Stops (Top) */}
              <div 
                className="absolute top-0 left-0 right-0 h-6 cursor-pointer"
                onPointerDown={(e) => handlePointerDown(e, 'opacity')}
              >
                {opacityStops.map(stop => {
                  const isActive = activeStop?.id === stop.id
                  const fillVal = Math.round((1 - stop.opacity) * 255)
                  const swatchColor = `rgb(${fillVal}, ${fillVal}, ${fillVal})`
                  const strokeColor = isActive ? '#3b82f6' : '#000000'
                  const handleColor = '#7f7f7f'

                  return (
                    <div
                      key={stop.id}
                      onPointerDown={(e) => handlePointerDown(e, 'opacity', stop.id)}
                      className="absolute top-[5px] -translate-x-1/2 cursor-pointer z-10"
                      style={{ left: `${stop.position}%` }}
                    >
                      <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Outer White Border for contrast */}
                        <path d="M1 1h12v11h-3.5L7 17.5 4.5 12H1V1z" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
                        {/* Inner Gray Handle Body */}
                        <path d="M1 1h12v11h-3.5L7 17.5 4.5 12H1V1z" fill={handleColor} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
                        {/* Swatch Window inside the handle */}
                        <rect x="3" y="3" width="8" height="7" fill={swatchColor} stroke="#000000" strokeWidth="1" />
                      </svg>
                    </div>
                  )
                })}
              </div>

              {/* Gradient Bar */}
              <div 
                ref={barRef}
                className="h-12 w-full border border-black shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] relative bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAA8CH/zMwMDKgCxijizMwMDAwMCGbgFE1jGoIRgwQo2E4EAQAcbMT8G9Vn7QAAAAASUVORK5CYII=')] bg-repeat"
              >
                <div className="absolute inset-0" style={{ background: previewGradient }} />
              </div>

              {/* Color Stops (Bottom) */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-6 cursor-pointer"
                onPointerDown={(e) => handlePointerDown(e, 'color')}
              >
                {colorStops.map(stop => {
                  const isActive = activeStop?.id === stop.id
                  const strokeColor = isActive ? '#3b82f6' : '#000000'
                  const handleColor = '#7f7f7f'

                  return (
                    <div
                      key={stop.id}
                      onPointerDown={(e) => handlePointerDown(e, 'color', stop.id)}
                      onDoubleClick={() => {
                        if (activeStop?.id === stop.id) {
                          setPickerInitialColor(stop.color)
                          setIsColorPickerOpen(true)
                        }
                      }}
                      className="absolute bottom-[5px] -translate-x-1/2 cursor-pointer z-10"
                      style={{ left: `${stop.position}%` }}
                    >
                      <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Outer White Border for contrast */}
                        <path d="M1 18h12V7H9.5L7 1.5 4.5 7H1v11z" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
                        {/* Inner Gray Handle Body */}
                        <path d="M1 18h12V7H9.5L7 1.5 4.5 7H1v11z" fill={handleColor} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
                        {/* Swatch Window inside the handle */}
                        <rect x="3" y="9" width="8" height="7" fill={stop.color} stroke="#000000" strokeWidth="1" />
                      </svg>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Stops Settings */}
            <div className="bg-[#424242] p-4 rounded-md border border-[#222]">
              <div className="text-sm font-semibold mb-3 pb-2 border-b border-[#333] text-zinc-300">Stops</div>
              <div className="grid grid-cols-2 gap-4">
                {/* Opacity Settings */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="w-16 text-right text-xs text-zinc-300">Opacity:</Label>
                    <Input 
                      type="number" 
                      min="0" max="100"
                      disabled={!activeOpacityStop}
                      value={activeOpacityStop ? Math.round(activeOpacityStop.opacity * 100) : ''}
                      onChange={(e) => {
                        const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) / 100
                        setOpacityStops(prev => prev.map(s => s.id === activeStop?.id ? { ...s, opacity: val } : s))
                      }}
                      className="h-7 w-16 bg-[#2a2a2a] border-[#222] text-xs text-center"
                    />
                    <span className="text-xs text-zinc-400">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="w-16 text-right text-xs text-zinc-300">Location:</Label>
                    <Input 
                      type="number" 
                      min="0" max="100"
                      disabled={!activeOpacityStop}
                      value={activeOpacityStop ? Math.round(activeOpacityStop.position) : ''}
                      onChange={(e) => {
                        const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                        setOpacityStops(prev => prev.map(s => s.id === activeStop?.id ? { ...s, position: val } : s))
                      }}
                      className="h-7 w-16 bg-[#2a2a2a] border-[#222] text-xs text-center"
                    />
                    <span className="text-xs text-zinc-400">%</span>
                  </div>
                </div>

                {/* Color Settings */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="w-16 text-right text-xs text-zinc-300">Color:</Label>
                    <div 
                      className={`h-7 w-16 rounded-sm border border-[#222] cursor-pointer shadow-inner ${!activeColorStop && 'opacity-50 pointer-events-none'}`}
                      style={{ backgroundColor: activeColorStop ? activeColorStop.color : '#000' }}
                      onClick={() => {
                        if (activeColorStop) {
                          setPickerInitialColor(activeColorStop.color)
                          setIsColorPickerOpen(true)
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="w-16 text-right text-xs text-zinc-300">Location:</Label>
                    <Input 
                      type="number" 
                      min="0" max="100"
                      disabled={!activeColorStop}
                      value={activeColorStop ? Math.round(activeColorStop.position) : ''}
                      onChange={(e) => {
                        const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                        setColorStops(prev => prev.map(s => s.id === activeStop?.id ? { ...s, position: val } : s))
                      }}
                      className="h-7 w-16 bg-[#2a2a2a] border-[#222] text-xs text-center"
                    />
                    <span className="text-xs text-zinc-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Settings */}
            <div className="flex items-center gap-4">
              <Label className="text-sm text-zinc-300 w-16">Angle:</Label>
              <div className="flex items-center gap-2 bg-[#2a2a2a] border border-[#222] rounded-sm px-2 py-1 h-8 w-20">
                <input 
                  type="number" 
                  value={angle}
                  onChange={(e) => {
                    let val = parseInt(e.target.value) || 0
                    if (val > 180) val = 180
                    if (val < -180) val = -180
                    setAngle(val)
                  }}
                  className="bg-transparent border-0 outline-none w-full text-sm text-white text-right font-mono"
                />
                <span className="text-xs text-zinc-400 select-none">°</span>
              </div>

              {/* Photoshop Dial Component */}
              <div 
                ref={dialRef}
                onPointerDown={handleDialPointerDown}
                className="w-8 h-8 rounded-full border border-zinc-500 relative cursor-crosshair select-none bg-black/20 flex items-center justify-center shadow-inner"
              >
                {/* Center dot */}
                <div className="w-[5px] h-[5px] bg-zinc-400 rounded-full z-10" />
                {/* Dial line */}
                <div 
                  className="w-[1.2px] h-3.5 bg-zinc-400 absolute bottom-1/2 left-1/2 origin-bottom transition-transform duration-75 pointer-events-none"
                  style={{
                    transform: `translateX(-50%) rotate(${90 - angle}deg)`,
                  }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#444]">
              <Button variant="outline" onClick={onClose} className="bg-transparent border-[#555] hover:bg-[#444] text-white">Cancel</Button>
              <Button onClick={() => {
                onSelectGradient(finalGradient)
                onClose()
              }} className="bg-white hover:bg-zinc-200 text-black">OK</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ColorPickerDialog
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        initialColor={pickerInitialColor}
        onSelectColor={(color) => {
          if (activeStop?.type === 'color') {
            setColorStops(prev => prev.map(s => s.id === activeStop.id ? { ...s, color } : s))
          }
        }}
      />
    </>
  )
}
