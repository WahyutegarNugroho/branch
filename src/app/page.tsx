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
    btnStyle: 'bg-white/5 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:-translate-y-1 hover:drop-shadow-xl text-white',
    font: 'font-righteous',
    textColor: 'text-white',
    badge: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
    avatarFrame: 'p-1 bg-gradient-to-tr from-pink-500 to-orange-500 shadow-[0_0_20px_rgba(236,72,153,0.5)] rounded-full',
    avatarShape: 'rounded-full'
  },
  cyberpunk: {
    name: 'Cyberpunk Matrix',
    bgClass: 'bg-zinc-950',
    animation: 'matrix',
    btnShape: 'shape-hexagon rounded-none',
    btnStyle: 'bg-transparent text-green-400 shadow-[0_0_10px_#22c55e,inset_0_0_10px_#22c55e] hover:shadow-[0_0_20px_#22c55e,inset_0_0_20px_#22c55e] hover:bg-green-500/10 hover-glitch-effect',
    font: 'font-space',
    textColor: 'text-green-400',
    badge: 'bg-black text-green-400 border border-green-500 shadow-[0_0_10px_#22c55e]',
    avatarFrame: 'p-1 bg-green-500 shadow-[0_0_25px_rgba(34,197,94,0.8)]',
    avatarShape: 'shape-hexagon rounded-none'
  },
  confetti: {
    name: 'Playful Clay',
    bgClass: 'bg-indigo-500',
    animation: 'confetti',
    btnShape: 'shape-leaf rounded-none',
    btnStyle: 'bg-white/20 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.4),8px_8px_16px_rgba(0,0,0,0.3)] border border-transparent text-white hover-wobble-effect',
    font: 'font-dancing',
    textColor: 'text-white',
    badge: 'bg-white/20 text-white shadow-inner backdrop-blur-md',
    avatarFrame: 'p-1.5 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-2xl',
    avatarShape: 'rounded-2xl'
  },
  brutalist: {
    name: 'Minimal Brutalist',
    bgClass: 'bg-yellow-400',
    animation: 'none',
    btnShape: 'shape-cut-corners rounded-none',
    btnStyle: 'bg-zinc-900 border-2 border-zinc-900 text-yellow-400 shadow-[4px_4px_0px_#18181b] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#18181b]',
    font: 'font-mono',
    textColor: 'text-zinc-900',
    badge: 'bg-zinc-900 text-yellow-400 border-2 border-zinc-900',
    avatarFrame: 'bg-zinc-900 p-1',
    avatarShape: 'shape-cut-corners rounded-none'
  }
}

export default function LandingPage() {
  const [activeTheme, setActiveTheme] = useState<keyof typeof demoThemes>('aurora')

  const currentTheme = demoThemes[activeTheme]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden font-sans-theme selection:bg-brand-pink/30 relative">
      {/* Mesh Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-brand-pink/20 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[60%] rounded-full bg-brand-orange/20 blur-[130px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/10 bg-zinc-950/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-lg shadow-brand-pink/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display-theme font-black tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">Branch</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/login" className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/register">
              <Button className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-all font-bold px-6 shadow-md hover:scale-[1.03] active:scale-[0.97]">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl"
          >
            {/* Live Badge */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 mb-8 backdrop-blur-md shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-spin" style={{ animationDuration: '4s' }} />
              <span className="bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent uppercase tracking-wider text-[10px] font-black">NEW UPDATE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Branch Pro Features Enabled</span>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl sm:text-6xl md:text-8xl font-display-theme font-black tracking-tight mb-8 leading-[1.05]"
            >
              One Link. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-pink to-brand-orange">Infinite Expression.</span>
            </motion.h1>
            
            {/* Subdescription */}
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed font-medium font-sans-theme"
            >
              Create stunning link-in-bio pages in seconds. Organize your links with headers, display image thumbnails, apply premium themes, and share with instant QR codes.
            </motion.p>
            
            {/* Claim / Call To Action */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <Link href="/register">
                <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-extrabold text-lg border-0 shadow-lg shadow-brand-pink/15 hover:scale-[1.02] active:scale-[0.98]">
                  Create Your Free Page
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-extrabold text-lg backdrop-blur-md shadow-sm transition-all">
                  Manage Your Profiles
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Live Mockup Customizer Section */}
          <div className="mt-28 w-full flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-display-theme font-black text-white mb-3">
              Try Our Interactive Themes
            </h3>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8">
              Click the theme selectors below to change the live smartphone mockup look instantly!
            </p>

            {/* Theme Selector Buttons */}
            <div className="flex flex-wrap gap-2.5 mb-10 justify-center p-2 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-md">
              {Object.keys(demoThemes).map((key) => {
                const themeKey = key as keyof typeof demoThemes
                const isSelected = activeTheme === themeKey
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTheme(themeKey)}
                    className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-r from-brand-pink to-brand-orange text-white shadow-lg' 
                        : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {demoThemes[themeKey].name}
                  </button>
                )
              })}
            </div>

            {/* Interactive Smartphone View */}
            <div className="relative h-[620px] w-[300px] sm:w-[320px] rounded-[3rem] border-[10px] border-zinc-900 bg-zinc-950 shadow-[0_0_80px_rgba(236,72,153,0.15)] overflow-hidden flex flex-col transition-all duration-300">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-2 inset-x-0 h-6 flex justify-center z-50">
                <div className="w-24 h-5 bg-black rounded-full shadow-inner"></div>
              </div>

              {/* Smartphone Inner Screen */}
              <div className={`flex-1 w-full flex flex-col items-center pt-16 px-4 relative overflow-hidden transition-all duration-500 ${currentTheme.bgClass} ${currentTheme.font}`}>
                
                {/* Live Background Components */}
                {currentTheme.animation === 'aurora' && <AuroraBackground config={{ speed: 1.2 }} />}
                {currentTheme.animation === 'matrix' && <MatrixBackground config={{ speed: 1.0 }} />}
                {currentTheme.animation === 'confetti' && <ConfettiBackground config={{ speed: 1.5, confettiCount: 40 }} />}
                
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

                {/* Profile Avatar */}
                <div className="relative z-10 w-full flex flex-col items-center select-none">
                  
                  <div className={`relative flex items-center justify-center mb-3 ${currentTheme.avatarFrame} ${currentTheme.avatarShape}`}>
                    <div className={`w-20 h-20 bg-zinc-800 flex items-center justify-center text-white font-extrabold text-2xl bg-gradient-to-tr from-brand-pink to-brand-orange shadow-inner overflow-hidden ${currentTheme.avatarShape}`}>
                      JD
                    </div>
                  </div>

                  <h4 className={`font-display-theme font-black text-lg mb-1 drop-shadow-sm ${currentTheme.textColor}`}>
                    Jane Doe
                  </h4>
                  <p className={`text-sm text-center mb-5 max-w-[200px] opacity-90 drop-shadow-sm font-semibold ${currentTheme.textColor}`}>
                    Digital Artist & Designer creating custom branding systems.
                  </p>

                  {/* Header Divider */}
                  <div className="w-full text-center py-1 mt-2 first:mt-0 select-none">
                    <span className={`text-[10px] font-black tracking-widest uppercase opacity-95 ${currentTheme.textColor}`}>
                      My Portfolios
                    </span>
                    <div className={`h-[2px] w-12 mx-auto mt-1 ${activeTheme === 'brutalist' ? 'bg-zinc-900' : 'bg-current opacity-30'}`} />
                  </div>

                  {/* Dynamic Buttons conforming to shape and style */}
                  <div className="w-full space-y-3 mt-4">
                    {[
                      { title: 'Explore Art Portfolio', key: '1' },
                      { title: 'Latest YouTube Vlog', key: '2' }
                    ].map((btn) => {
                      const isBrutalist = activeTheme === 'brutalist'
                      const isCyberpunk = activeTheme === 'cyberpunk'
                      
                      if (isBrutalist) {
                        return (
                          <div 
                            key={btn.key}
                            className="w-full h-[52px] relative cursor-pointer group active:scale-[0.98] transition-transform"
                          >
                            {/* Black shadow layer */}
                            <div className="absolute inset-0 bg-zinc-900/40 shape-cut-corners rounded-none translate-x-[4px] translate-y-[4px] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all" />
                            {/* Main button body */}
                            <div className="absolute inset-0 bg-zinc-900 shape-cut-corners rounded-none flex items-center justify-between px-4 text-xs font-mono font-extrabold text-yellow-400 group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                              <div className="w-4 h-4 rounded-full bg-current opacity-20" />
                              <span>{btn.title}</span>
                              <div className="w-4" />
                            </div>
                          </div>
                        )
                      }
                      
                      if (isCyberpunk) {
                        return (
                          <div
                            key={btn.key}
                            style={{ filter: 'url(#svg-neon)', '--neon-glow-color': '#22c55e' } as React.CSSProperties}
                            className={`w-full py-4 px-4 text-xs font-extrabold text-green-400 text-center flex items-center justify-between cursor-pointer shape-hexagon rounded-none bg-zinc-950/80 hover:bg-green-500/10 hover-glitch-effect transition-all`}
                          >
                            <div className="w-4 h-4 rounded-full bg-green-500 opacity-20" />
                            <span>{btn.title}</span>
                            <div className="w-4" />
                          </div>
                        )
                      }

                      return (
                        <div 
                          key={btn.key}
                          className={`w-full py-4 px-4 text-xs font-extrabold transition-all text-center flex items-center justify-between cursor-pointer ${currentTheme.btnShape} ${currentTheme.btnStyle}`}
                        >
                          <div className="w-4 h-4 rounded-full bg-current opacity-20" />
                          <span>{btn.title}</span>
                          <div className="w-4" />
                        </div>
                      )
                    })}
                  </div>

                  {/* Footer branding respect show branding */}
                  <div className="mt-14 mb-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-semibold backdrop-blur-md ${currentTheme.badge}`}>
                      <span>Powered by</span>
                      <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center">
                        <Zap className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="font-bold">Branch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Bento Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display-theme font-black tracking-tight mb-4">
              Unlimited Premium Features.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
              Designed specifically for independent creators, influencers, and modern brands.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Theme Customizer Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Sparkles className="w-10 h-10 text-brand-pink mb-6" />
                <h3 className="text-2xl font-display-theme font-bold mb-2">Dynamic Live Backgrounds</h3>
                <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                  Go beyond static colors. Bring your profile to life with interactive WebGL animations including Aurora, Matrix, Snowfall, Particles, Bokeh, Confetti, and even full Video backgrounds.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2 font-display-theme relative z-10">
                <div className="h-12 bg-zinc-950 border border-white/10 rounded-xl flex items-center justify-center text-xs text-white font-bold relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-md" />
                  <span className="relative z-10">Aurora</span>
                </div>
                <div className="h-12 bg-zinc-950 border border-green-500/30 rounded-xl flex items-center justify-center text-xs text-green-400 font-bold relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/10" />
                  <span className="relative z-10">Matrix</span>
                </div>
                <div className="h-12 bg-zinc-950 border border-blue-500/30 rounded-xl flex items-center justify-center text-xs text-blue-300 font-bold relative overflow-hidden">
                  <span className="relative z-10">Snowfall</span>
                </div>
              </div>
            </motion.div>

            {/* Avatar Frames & Shapes */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Palette className="w-10 h-10 text-brand-orange mb-6" />
                <h3 className="text-2xl font-display-theme font-bold mb-2">Avatar Frames</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Make your profile picture stand out with animated Gradient Rings, Neon Glows, or custom Hexagon shapes.
                </p>
              </div>
              <div className="mt-8 flex justify-center relative z-10">
                <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-orange-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  <div className="w-full h-full bg-zinc-800 rounded-full border-2 border-zinc-950" />
                </div>
              </div>
            </motion.div>

            {/* Premium Button Styles */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-3 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex-1 relative z-10">
                <LayoutTemplate className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-display-theme font-bold mb-2">Advanced Button Customization</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  Ditch the boring buttons. We offer <strong>Glassmorphism</strong>, <strong>Neumorphism</strong>, <strong>Claymorphism</strong>, and <strong>Brutalism</strong>. Pair them with unique shapes like Leaves or Cut-Corners, and add interactive hover micro-animations (Glitch, Wobble, Lift).
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-3 w-full md:w-auto relative z-10">
                <div className="py-3 px-6 rounded-full bg-white/5 border-t border-l border-white/20 border-r border-b border-white/5 backdrop-blur-md text-white text-sm font-bold text-center shadow-lg">Glassmorphism</div>
                <div className="w-full relative h-[48px]">
                  {/* Shadow layer */}
                  <div className="absolute inset-0 bg-emerald-500 shape-cut-corners rounded-none translate-x-[4px] translate-y-[4px]" />
                  {/* Outer border container */}
                  <div className="absolute inset-0 bg-emerald-500 shape-cut-corners rounded-none p-[2px]">
                    {/* Inner content container */}
                    <div className="w-full h-full bg-zinc-900 text-emerald-400 flex items-center justify-center text-sm font-black shape-cut-corners rounded-none">
                      Neo-Brutalism
                    </div>
                  </div>
                </div>
                <div className="py-3 px-6 rounded-2xl bg-zinc-800 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.1)] text-white text-sm font-bold text-center">Neumorphism</div>
              </div>
            </motion.div>
            
            {/* Spotlight & Embeds */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <Eye className="w-10 h-10 text-brand-pink mb-6" />
                <h3 className="text-2xl font-display-theme font-bold mb-2">Spotlight & Embeds</h3>
                <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                  Embed YouTube videos, Spotify tracks, and Image Carousels directly into your link-in-bio. Use the Spotlight feature to make your most important links pulse and glow.
                </p>
              </div>
            </motion.div>

            {/* Deep Analytics */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <BarChart3 className="w-10 h-10 text-brand-orange mb-6" />
                <h3 className="text-2xl font-display-theme font-bold mb-2">Deep Analytics</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Monitor visits, individual clicks, and referrer data in real time to grow your audience.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center relative z-10">
          <div className="p-8 md:p-16 rounded-3xl bg-gradient-to-tr from-brand-pink/10 to-brand-orange/10 border border-brand-pink/20 backdrop-blur-xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-pink/20 blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-display-theme font-black text-white mb-4">
              Ready to Show Your True Self?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8">
              Start building your super premium link-in-bio page for free in seconds.
            </p>
            <Link href="/register">
              <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-extrabold text-lg border-0 shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                Create Your Branch Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950/80 py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-pink" />
            <span className="font-display-theme font-extrabold text-white">Branch</span>
          </div>
          <p>© 2026 Branch Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
