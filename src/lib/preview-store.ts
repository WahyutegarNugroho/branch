import { create } from 'zustand'
import type { Profile, Link } from '@/types'

const MAX_HISTORY = 50

interface HistoryEntry {
  profile: Partial<Profile>
}

interface PreviewState {
  profile: Partial<Profile>
  links: Link[]
  history: HistoryEntry[]
  historyIndex: number
  setProfile: (profile: Partial<Profile>) => void
  updateProfile: (partial: Partial<Profile>) => void
  setLinks: (links: Link[]) => void
  updateLink: (id: string, changes: Partial<Link>) => void
  undo: () => void
  redo: () => void
}

export const usePreviewStore = create<PreviewState>((set, get) => ({
  profile: {},
  links: [],
  history: [],
  historyIndex: -1,

  setProfile: (profile) => set({ profile, history: [], historyIndex: -1 }),

  updateProfile: (partial) => set((state) => {
    const snapshot: HistoryEntry = { profile: { ...state.profile } }
    const futureCount = state.history.length - 1 - state.historyIndex
    const trimmed = futureCount > 0
      ? state.history.slice(0, state.historyIndex + 1)
      : state.history
    const history = [...trimmed, snapshot].slice(-MAX_HISTORY)

    return {
      profile: { ...state.profile, ...partial },
      history,
      historyIndex: history.length - 1,
    }
  }),

  setLinks: (links) => set({ links }),

  updateLink: (id, changes) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...changes } : link
      ),
    })),

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < 0) return
    const entry = history[historyIndex]
    set({ profile: { ...entry.profile }, historyIndex: historyIndex - 1 })
  },

  redo: () => {
    const { history, historyIndex } = get()
    const nextIndex = historyIndex + 2
    if (nextIndex >= history.length) return
    const entry = history[nextIndex]
    set({ profile: { ...entry.profile }, historyIndex: historyIndex + 1 })
  },
}))
