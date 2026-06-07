'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { LinkItem } from './LinkItem'
import { reorderLinks } from '@/app/actions/link-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import type { Link } from '@/types'

export function LinkManager({ initialLinks }: { initialLinks: Link[] }) {
  const [reordering, setReordering] = useState(false)
  const router = useRouter()

  const links = initialLinks

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires moving 5px to start dragging (avoids accidental drags on click)
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setReordering(true)
      const oldIndex = links.findIndex((l) => l.id === active.id)
      const newIndex = links.findIndex((l) => l.id === over.id)

      const newLinks = arrayMove(links, oldIndex, newIndex)
      
      // Persist to server directly
      const payload = newLinks.map((l, index) => ({ id: l.id, sort_order: index }))
      const result = await reorderLinks(payload)
      if (result.error) {
        toast.error('Failed to save link order')
      } else {
        router.refresh()
      }
      setReordering(false)
    }
  }

  if (links.length === 0) {
    return (
      <EmptyState
        title="No links yet"
        description="Add your first link to get started"
        className="mt-6 bg-zinc-900/30 border border-white/10 rounded-2xl border-dashed backdrop-blur-md"
      />
    )
  }

  return (
    <div className={`mt-6 ${reordering ? 'opacity-60 pointer-events-none transition-opacity' : ''}`}>
      {reordering && (
        <div className="flex items-center justify-center gap-2 py-2 text-xs text-zinc-500">
          <Loader2 className="w-3 h-3 animate-spin" />
          Saving order...
        </div>
      )}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext 
          items={links.map(l => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {links.map(link => (
            <LinkItem key={link.id} link={link} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
