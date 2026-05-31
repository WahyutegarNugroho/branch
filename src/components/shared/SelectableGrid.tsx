'use client'

import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface SelectableItem {
  val: string
  label: string
  icon?: LucideIcon
  preview?: string
  previewClass?: string
}

interface SelectableGridProps {
  items: SelectableItem[]
  value: string
  onChange: (val: string) => void
  columns?: 2 | 3 | 4
  itemHeight?: 'sm' | 'md' | 'lg'
  name?: string
}

const heightClasses = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-16',
}

const gridCols = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

const iconSizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-[18px] h-[18px]',
}

export function SelectableGrid({
  items,
  value,
  onChange,
  columns = 4,
  itemHeight = 'md',
  name,
}: SelectableGridProps) {
  return (
    <div className={cn('grid gap-2', gridCols[columns])}>
      {items.map((item) => {
        const Icon = item.icon
        const isSelected = value === item.val
        return (
          <div
            key={item.val}
            onClick={() => onChange(item.val)}
            className={cn(
              'flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all',
              heightClasses[itemHeight],
              isSelected
                ? 'border-brand-pink bg-brand-pink/10 text-white font-bold'
                : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20',
            )}
          >
            {Icon ? (
              <div className={cn('flex items-center justify-center', itemHeight === 'lg' && 'flex-col')}>
                <Icon className={cn('shrink-0', iconSizes[itemHeight])} />
                {itemHeight === 'lg' && (
                  <span className="text-[10px] text-zinc-500 mt-1 font-sans">{item.label}</span>
                )}
              </div>
            ) : item.preview !== undefined ? (
              <div className="flex flex-col items-center justify-center">
                <span className={cn('text-base font-bold', item.previewClass)}>{item.preview}</span>
                <span className="text-[10px] text-zinc-500 mt-1 font-sans">{item.label}</span>
              </div>
            ) : (
              <span className={cn(itemHeight === 'lg' ? 'text-base' : 'text-xs')}>{item.label}</span>
            )}
          </div>
        )
      })}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  )
}
