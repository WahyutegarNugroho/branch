'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  LayoutTemplate, 
  Zap, 
  BarChart3, 
  Eye, 
  Palette, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuroraBackground from '@/components/backgrounds/AuroraBackground'
import MatrixBackground from '@/components/backgrounds/MatrixBackground'
import ConfettiBackground from '@/components/backgrounds/ConfettiBackground'

const demoThemes = {
  aurora: {
    name: 'Aurora Glass',
    bgClass: 'bg-zinc-950',
    animation: 'aurora',
    btnShape: 'rounded-full',
    btnStyle: 'bg-white/5 border border-white/10 backdrop-blur-xl shadow-sm hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300',
    font: 'font-sans',
    textColor: 'text-zinc-100',
    badge: 'bg-white/10 text-zinc-100 border border-white/20 backdrop-blur-md',
    avatarFrame: 'p-[2px] bg-gradient-to-tr from-zinc-500/30 to-zinc-200/30 rounded-full',
    avatarShape: 'rounded-full'
  },
  cyberpunk: {
    name: 'Neon Matrix',
    bgClass: 'bg-zinc-950',
    animation: 'matrix',
    btnShape: 'rounded-none',
    btnStyle: 'bg-transparent text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-300',
    font: 'font-mono',
    textColor: 'text-emerald-400',
    badge: 'bg-black text-emerald-400 border border-emerald-500/50',
    avatarFrame: 'p-[2px] bg-emerald-500/50 rounded-none',
    avatarShape: 'rounded-none'
  },
  confetti: {
    name: 'Playful Clay',
    bgClass: 'bg-indigo-50',
    animation: 'confetti',
    btnShape: 'rounded-2xl',
    btnStyle: 'bg-white shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] border border-indigo-100 text-indigo-900 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgb(0,0,0,0.1)] transition-all duration-300',
    font: 'font-sans',
    textColor: 'text-indigo-950',
    badge: 'bg-white text-indigo-900 shadow-sm border border-indigo-100',
    avatarFrame: 'p-1.5 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-3xl',
    avatarShape: 'rounded-2xl'
  },
  minimal: {
    name: 'Stark Minimal',
    bgClass: 'bg-zinc-50',
    animation: 'none',
    btnShape: 'rounded-md',
    btnStyle: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors duration-200',
    font: 'font-sans',
    textColor: 'text-zinc-900',
    badge: 'bg-zinc-200 text-zinc-800',
    avatarFrame: 'bg-transparent',
    avatarShape: 'rounded-full'
  }
}

export default function LandingPage() {
  const [activeTheme, setActiveTheme] = useState<keyof typeof demoThemes>('aurora')
  const currentTheme = demoThemes[activeTheme]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans selection:bg-white/20 selection:text-white relative">
      {/* Refined Subtle Background - Replacing the heavy blurs with a fine grid and subtle gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-[#09090b] to-[#09090b]">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dz209s6jk/image/upload/v1727787262/Patterns/grid_4_dzhxbe.svg')] opacity-[0.03] bg-[length:32px_32px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/[0.08] bg-[#09090b]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center">
              <LinkIcon className="w-4 h-4 text-zinc-950" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-100">Branch</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              Log in
            </Link>
            <Link href="/register">
              <Button className="h-9 px-4 text-sm rounded-md bg-zinc-100 text-zinc-900 hover:bg-white font-medium transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-3xl"
          >
            {/* Minimal Badge */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-medium text-zinc-300 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Branch Pro is now available</span>
              <span className="text-zinc-600 px-1">•</span>
              <Link href="/register" className="text-zinc-100 hover:underline flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] text-zinc-100"
            >
              Your digital identity, <br className="hidden sm:block" />
              <span className="text-zinc-500">beautifully unified.</span>
            </motion.h1>
            
            {/* Subdescription */}
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-zinc-400 mb-10 max-w-xl leading-relaxed"
            >
              A single, refined destination for your audience. Effortlessly connect your content, portfolios, and social presences with premium, customizable designs.
            </motion.p>
            
            {/* Call To Action */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center"
            >
              <Link href="/register">
                <Button className="h-12 px-6 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-base transition-all">
                  Start building for free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 px-6 rounded-lg border-white/10 bg-transparent hover:bg-white/5 text-zinc-300 font-medium text-base transition-all">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Live Mockup Customizer Section */}
          <div className="mt-32 w-full flex flex-col items-center">
            
            {/* Theme Selector Buttons */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center p-1.5 rounded-xl bg-zinc-900/50 border border-white/5">
              {Object.keys(demoThemes).map((key) => {
                const themeKey = key as keyof typeof demoThemes
                const isSelected = activeTheme === themeKey
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTheme(themeKey)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isSelected 
                        ? 'bg-zinc-800 text-zinc-100 shadow-sm' 
                        : 'bg-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {demoThemes[themeKey].name}
                  </button>
                )
              })}
            </div>

            {/* Interactive Smartphone View - Refined Device Frame */}
            <div className="relative h-[650px] w-[320px] rounded-[44px] border-[8px] border-zinc-900/80 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10">
              {/* Refined Dynamic Island */}
              <div className="absolute top-3 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
                <div className="w-[100px] h-full bg-black rounded-full"></div>
              </div>

              {/* Smartphone Inner Screen */}
              <div className={`flex-1 w-full flex flex-col items-center pt-20 px-5 relative overflow-hidden transition-colors duration-500 ${currentTheme.bgClass} ${currentTheme.font}`}>
                
                {/* Live Background Components */}
                {currentTheme.animation === 'aurora' && <AuroraBackground config={{ speed: 0.8 }} />}
                {currentTheme.animation === 'matrix' && <MatrixBackground config={{ speed: 1.0 }} />}
                {currentTheme.animation === 'confetti' && <ConfettiBackground config={{ speed: 1.2, confettiCount: 30 }} />}
                
                {/* Profile Avatar */}
                <div className="relative z-10 w-full flex flex-col items-center select-none mt-2">
                  
                  <div className={`relative flex items-center justify-center mb-4 ${currentTheme.avatarFrame} ${currentTheme.avatarShape}`}>
                    <div className={`w-20 h-20 bg-zinc-800 flex items-center justify-center text-zinc-300 font-medium text-2xl overflow-hidden ${currentTheme.avatarShape}`}>
                      <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover opacity-90" />
                    </div>
                  </div>

                  <h4 className={`font-bold text-xl mb-1 tracking-tight ${currentTheme.textColor}`}>
                    Alex River
                  </h4>
                  <p className={`text-sm text-center mb-6 max-w-[220px] opacity-80 ${currentTheme.textColor} font-medium`}>
                    Product Designer. Curating thoughts on design, tech, and minimalism.
                  </p>

                  {/* Header Divider */}
                  <div className="w-full text-center py-2 mb-1 select-none">
                     <span className={`text-[11px] font-semibold tracking-wider uppercase opacity-60 ${currentTheme.textColor}`}>
                      Selected Work
                    </span>
                  </div>

                  {/* Dynamic Buttons */}
                  <div className="w-full space-y-3">
                    {[
                      { title: 'Read my latest Case Study', key: '1' },
                      { title: 'Figma Community Files', key: '2' },
                      { title: 'Follow on Twitter', key: '3' }
                    ].map((btn) => (
                      <div 
                        key={btn.key}
                        className={`w-full py-4 px-5 text-sm font-medium transition-all text-center flex items-center justify-center cursor-pointer ${currentTheme.btnShape} ${currentTheme.btnStyle}`}
                      >
                        {btn.title}
                      </div>
                    ))}
                  </div>

                  {/* Footer branding */}
                  <div className="mt-12 mb-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium backdrop-blur-md ${currentTheme.badge}`}>
                      <span>Built with Branch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refined Feature Bento Section */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mb-3">
              Designed for detail.
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl">
              Powerful tools wrapped in a minimalist interface. Everything you need to manage your online presence without the clutter.
            </p>
          </div>

          {/* Minimal Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="col-span-1 md:col-span-2 p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
              <div className="mb-8">
                <Sparkles className="w-6 h-6 text-zinc-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Immersive Backgrounds</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                  Choose from stark solid colors, gentle gradients, or subtle WebGL animations that don't overwhelm your content.
                </p>
              </div>
              <div className="flex gap-3">
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20" />
                 </div>
                 <div className="w-12 h-12 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dz209s6jk/image/upload/v1727787262/Patterns/grid_4_dzhxbe.svg')] bg-[length:16px_16px]" />
                 </div>
              </div>
            </div>

            <div className="col-span-1 p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <Palette className="w-6 h-6 text-zinc-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Typography & Form</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Curated fonts and crisp component shapes that elevate readability and aesthetics.
                </p>
              </div>
            </div>
            
            <div className="col-span-1 p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
              <div>
                <Eye className="w-6 h-6 text-zinc-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Seamless Embeds</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Integrate media directly inline without breaking the visual hierarchy of your page.
                </p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <BarChart3 className="w-6 h-6 text-zinc-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-zinc-200 mb-2">Privacy-First Analytics</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                  Understand your audience with clean, precise data visualization. No cookies, no invasive tracking.
                </p>
              </div>
              <div className="w-full md:w-48 h-32 bg-zinc-950/50 rounded-xl border border-white/5 p-4 flex items-end gap-2">
                 {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-800 rounded-t-sm transition-all hover:bg-zinc-600 cursor-pointer" style={{ height: `${h}%` }} />
                 ))}
              </div>
            </div>

          </div>
        </section>

        {/* Call To Action */}
        <section className="py-32 px-6 max-w-3xl mx-auto text-center relative z-10 border-t border-white/5">
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6">
              Claim your corner of the web.
            </h2>
            <p className="text-zinc-400 text-lg mb-10">
              Join thousands of creators building a better digital identity.
            </p>
            <Link href="/register">
              <Button className="h-12 px-8 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-base transition-all">
                Get Started
              </Button>
            </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#09090b] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-sm font-medium">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-zinc-500" strokeWidth={2} />
            <span className="font-bold text-zinc-400">Branch</span>
          </div>
          <p>© 2026 Branch. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-300 transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
