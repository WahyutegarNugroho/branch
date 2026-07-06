import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
      <div className="w-12 h-12 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-6 h-6 text-zinc-500" />}
      </div>
      <p className="text-sm font-semibold text-zinc-400 mb-1">{title}</p>
      {description && (
        <p className="text-xs text-zinc-600 text-center max-w-[220px] mb-4">{description}</p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="text-xs font-bold text-white hover:text-zinc-300 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
