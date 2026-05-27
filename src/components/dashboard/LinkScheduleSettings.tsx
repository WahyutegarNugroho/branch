'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export function LinkScheduleSettings({
  scheduleEnabled,
  setScheduleEnabled,
  validFrom,
  setValidFrom,
  validUntil,
  setValidUntil
}: {
  scheduleEnabled: boolean
  setScheduleEnabled: (val: boolean) => void
  validFrom: string
  setValidFrom: (val: string) => void
  validUntil: string
  setValidUntil: (val: string) => void
}) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white flex items-center gap-2">
          🕒 Schedule Link
        </span>
        <Switch checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
      </div>
      
      {scheduleEnabled && (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 font-semibold uppercase">Show From</span>
            <Input 
              type="datetime-local" 
              name="valid_from"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-xs focus-visible:ring-brand-pink" 
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 font-semibold uppercase">Hide After</span>
            <Input 
              type="datetime-local" 
              name="valid_until"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-xs focus-visible:ring-brand-pink" 
            />
          </div>
        </div>
      )}
      {!scheduleEnabled && (
        <>
          <input type="hidden" name="valid_from" value="" />
          <input type="hidden" name="valid_until" value="" />
        </>
      )}
    </div>
  )
}
