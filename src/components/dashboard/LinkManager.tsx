'use client'

import { useState, useEffect } from 'react'
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
import type { Link } from '@/types'

export function LinkManager({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState(initialLinks)
  const router = useRouter()

  useEffect(() => {
    setLinks(initialLinks)
  }, [initialLinks])

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
      const oldIndex = links.findIndex((l) => l.id === active.id)
      const newIndex = links.findIndex((l) => l.id === over.id)

      const newLinks = arrayMove(links, oldIndex, newIndex)
      
      // Update sort_order locally
      const updatedLinks = newLinks.map((link, index) => ({
        ...link,
        sort_order: index
      }))

      setLinks(updatedLinks)

      // Persist to server
      const payload = updatedLinks.map(l => ({ id: l.id, sort_order: l.sort_order }))
      const result = await reorderLinks(payload)
      if (result.error) {
        toast.error('Failed to save link order')
        // Revert on error
        setLinks(initialLinks)
      } else {
        router.refresh()
      }
    }
  }

  if (links.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-400 bg-zinc-900/30 border border-white/10 rounded-2xl border-dashed mt-6 backdrop-blur-md">
        No links created yet. Add one above!
      </div>
    )
  }

  return (
    <div className="mt-6">
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
