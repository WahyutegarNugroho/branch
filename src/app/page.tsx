'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, LayoutTemplate, Zap, BarChart3, Smartphone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden font-sans selection:bg-brand-pink/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-pink/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-orange/20 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/10 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Branch</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/register">
              <Button className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-all font-semibold px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
              Branch 2.0 is now live
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              One link to power <br className="hidden md:block" />
              your entire <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-orange">digital presence</span>.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
              Create a beautifully crafted, highly convertible link-in-bio page in seconds. Manage your links, embed videos, and track your audience with powerful analytics.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Link href="/register">
                <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-semibold text-lg border-0">
                  Claim your link
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="h-14 px-8 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg backdrop-blur-sm">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
            <img 
              src="/dashboard_preview.png" 
              alt="Dashboard Preview" 
              className="w-full h-auto opacity-95 object-cover select-none"
            />
          </motion.div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Built for creators & pros.</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Everything you need to showcase your work, all in one lightning-fast platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <LayoutTemplate className="w-10 h-10 text-brand-pink mb-6" />
                <h3 className="text-2xl font-bold mb-2">Beautifully Custom</h3>
                <p className="text-zinc-400 max-w-md">Design your page exactly how you want it. Solid colors, mesh gradients, or custom image backgrounds with dynamic overlays.</p>
              </div>
              <div className="mt-8 h-40 rounded-xl bg-gradient-to-r from-brand-pink/20 to-brand-orange/20 border border-white/5 flex items-center justify-center">
                <div className="w-3/4 h-8 bg-white/10 rounded-full animate-pulse" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md"
            >
              <Smartphone className="w-10 h-10 text-brand-orange mb-6" />
              <h3 className="text-2xl font-bold mb-2">Mobile First</h3>
              <p className="text-zinc-400">Crafted specifically for the thumb. Your links look incredible on every device.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md"
            >
              <ShieldCheck className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Secure & Private</h3>
              <p className="text-zinc-400">Powered by Supabase edge security. Your data is protected by Row Level Security.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <BarChart3 className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Deep Analytics</h3>
                <p className="text-zinc-400 max-w-md">Track page views, link clicks, and calculate your click-through rates. Make data-driven decisions to boost your engagement.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="font-semibold text-zinc-300">Branch</span>
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
