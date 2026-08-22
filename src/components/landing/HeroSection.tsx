'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  const [username, setUsername] = useState('')

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 lg:pt-28 lg:pb-32 flex flex-col lg:flex-row items-center gap-16 relative z-10">
      <div className="flex-1 text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.05] text-white mb-6"
        >
          Everything you <br className="hidden lg:block"/> are. In one, <br className="hidden lg:block"/> simple link.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg lg:text-xl text-zinc-400 font-medium mb-10 max-w-lg leading-relaxed"
        >
          Join millions using Branch for their link in bio. One link to help you share everything you create, curate and sell from your social profiles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <div className="relative flex-1 group">
            <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              <span className="pl-4 text-zinc-500 font-medium text-sm">branch.bio/</span>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 px-2 border-none bg-transparent text-white font-medium text-sm focus:ring-0 outline-none placeholder:text-zinc-700"
              />
            </div>
          </div>
          <Link href={`/register?username=${username}`}>
            <Button className="h-14 px-8 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all w-full sm:w-auto border-0">
              Claim link
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="flex-1 w-full max-w-md relative flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative w-full max-w-[320px] aspect-[1/2] rounded-[2.5rem] overflow-hidden border-[6px] border-zinc-800 bg-zinc-950 shadow-2xl"
        >
           <div className="absolute top-4 inset-x-0 h-6 flex justify-center z-50">
             <div className="w-20 h-5 bg-black rounded-full shadow-inner border border-white/5"></div>
           </div>

           {/* Hero Dark Mockup inner */}
           <div className="w-full h-full pt-16 px-6 flex flex-col items-center bg-zinc-950">
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 mb-4 overflow-hidden relative flex items-center justify-center">
                 <span className="text-zinc-400 font-bold text-xl select-none">SC</span>
              </div>
              <h3 className="text-white font-bold text-base mb-1">Sarah Chen</h3>
              <p className="text-zinc-400 text-xs mb-6 text-center leading-normal">Software engineer building open-source developer tools.</p>

              <div className="w-full space-y-2">
                {[
                  { label: "My Design Portfolio", url: "#" },
                  { label: "Latest UI Kits", url: "#" },
                  { label: "Read Design Case Studies", url: "#" }
                ].map((item, idx) => (
                  <div key={idx} className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-between px-4 text-xs font-semibold text-zinc-200 transition-colors">
                    <span>{item.label}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">→</span>
                  </div>
                ))}
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  )
}
