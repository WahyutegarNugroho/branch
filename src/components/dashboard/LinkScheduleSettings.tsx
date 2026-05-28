'use client'

import { Switch } from '@/components/ui/switch'
import { DateTimePicker } from './DateTimePicker'

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
            <input type="hidden" name="valid_from" value={validFrom} />
            <DateTimePicker
              value={validFrom}
              onChange={setValidFrom}
              placeholder="When to show?"
              minDate={new Date()}
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 font-semibold uppercase">Hide After</span>
            <input type="hidden" name="valid_until" value={validUntil} />
            <DateTimePicker
              value={validUntil}
              onChange={setValidUntil}
              placeholder="When to hide?"
              minDate={validFrom ? new Date(validFrom) : new Date()}
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
