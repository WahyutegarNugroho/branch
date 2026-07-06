"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PLATFORMS, Platform } from "@/utils/platforms"
import { Search } from "lucide-react"

interface PlatformPickerDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectPlatform: (platform: Platform) => void
}

export function PlatformPickerDialog({ isOpen, onClose, onSelectPlatform }: PlatformPickerDialogProps) {
  const [search, setSearch] = useState("")

  const filteredPlatforms = PLATFORMS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (platform: Platform) => {
    onSelectPlatform(platform)
    setSearch("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[500px] max-h-[85vh] bg-[#222] border border-white/10 text-white rounded-2xl shadow-2xl p-6 font-sans flex flex-col">
        <DialogHeader className="mb-4 shrink-0">
          <DialogTitle className="text-xl font-display-theme font-black text-center text-white mb-2">
            Select Platform
          </DialogTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search platforms..."
              className="w-full pl-10 pr-4 h-12 rounded-xl bg-zinc-900 border-white/10 text-white placeholder-zinc-500 focus-visible:ring-white"
            />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {filteredPlatforms.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <button
                    key={platform.id}
                    onClick={() => handleSelect(platform)}
                    className="flex flex-col items-center justify-center p-4 gap-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl border border-white/5 hover:border-white/20 transition-all group cursor-pointer"
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-950 shadow-inner group-hover:scale-110 transition-transform"
                      style={{ color: platform.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                      {platform.name}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <p>Platform not found.</p>
              <p className="text-xs mt-1">You can still type manually in the field.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
