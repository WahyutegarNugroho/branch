import { create } from 'zustand'
import type { Profile, Link } from '@/types'

interface PreviewState {
  profile: Partial<Profile>
  links: Link[]
  setProfile: (profile: Partial<Profile>) => void
  updateProfile: (partial: Partial<Profile>) => void
  setLinks: (links: Link[]) => void
  updateLink: (id: string, changes: Partial<Link>) => void
}

export const usePreviewStore = create<PreviewState>((set) => ({
  profile: {},
  links: [],
  setProfile: (profile) => set({ profile }),
  updateProfile: (partial) =>
    set((state) => ({ profile: { ...state.profile, ...partial } })),
  setLinks: (links) => set({ links }),
  updateLink: (id, changes) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...changes } : link
      ),
    })),
}))
