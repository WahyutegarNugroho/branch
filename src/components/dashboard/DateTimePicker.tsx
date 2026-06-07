'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CalendarPicker } from './CalendarPicker'

interface DateTimePickerProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  minDate?: Date
}

function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function formatDisplay(datetimeStr: string): string {
  if (!datetimeStr) return ''
  const d = new Date(datetimeStr)
  if (isNaN(d.getTime())) return datetimeStr
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function DateTimePicker({ value, onChange, placeholder, minDate }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<Date | null>(null)
  const [tempTime, setTempTime] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !tempDate) {
      const initial = value ? new Date(value) : new Date()
      if (isNaN(initial.getTime())) {
        const now = new Date()
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTempDate(now)
         
        setTempTime(formatTime(now))
      } else {
         
        setTempDate(initial)
         
        setTempTime(formatTime(initial))
      }
    }
  }, [isOpen, value, tempDate])

  const handleDateSelect = (date: Date) => {
    setTempDate(date)
  }

  const handleApply = () => {
    if (!tempDate) return
    const [hours, minutes] = tempTime.split(':').map(Number)
    const final = new Date(tempDate)
    final.setHours(hours || 0, minutes || 0, 0, 0)
    onChange(final.toISOString())
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange('')
    setIsOpen(false)
  }

  const handlePreset = (daysFromNow: number) => {
    const d = new Date()
    d.setDate(d.getDate() + daysFromNow)
    d.setHours(23, 59, 0, 0)
    onChange(d.toISOString())
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Display input */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white h-10 text-xs px-3 hover:border-white/20 transition-colors text-left"
      >
        <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        <span className={value ? 'text-white' : 'text-zinc-500'}>
          {value ? formatDisplay(value) : (placeholder || 'Pick a date & time')}
        </span>
      </button>

      <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
        <DialogContent className="max-w-[360px] bg-[#222] border border-white/10 text-white rounded-2xl shadow-2xl p-5">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold text-white text-center">Pick Date & Time</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <CalendarPicker
              selected={tempDate}
              onSelect={handleDateSelect}
              minDate={minDate}
            />

            {/* Time input */}
            <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/10 rounded-xl px-3 py-2">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="time"
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                className="bg-transparent text-white text-xs border-none outline-none w-full focus:ring-0 [color-scheme:dark]"
              />
            </div>

            {/* Quick presets */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePreset(1)}
                className="flex-1 text-[10px] font-semibold text-zinc-400 bg-zinc-900/50 border border-white/10 rounded-lg py-1.5 hover:bg-white/5 hover:text-white transition-colors"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handlePreset(7)}
                className="flex-1 text-[10px] font-semibold text-zinc-400 bg-zinc-900/50 border border-white/10 rounded-lg py-1.5 hover:bg-white/5 hover:text-white transition-colors"
              >
                Next Week
              </button>
              <button
                type="button"
                onClick={() => handlePreset(30)}
                className="flex-1 text-[10px] font-semibold text-zinc-400 bg-zinc-900/50 border border-white/10 rounded-lg py-1.5 hover:bg-white/5 hover:text-white transition-colors"
              >
                Next Month
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-xl h-9 text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
              <Button
                type="button"
                onClick={handleApply}
                disabled={!tempDate}
                className="flex-1 bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white font-semibold rounded-xl h-9 text-xs"
              >
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
