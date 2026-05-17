'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  LayoutTemplate, 
  Zap, 
  BarChart3, 
  Smartphone, 
  QrCode, 
  Eye, 
  Palette, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const demoThemes = {
  dark: {
    name: 'Minimal Dark',
    bg: 'bg-zinc-950',
    bgColor: '#09090b',
    btnShape: 'rounded-2xl',
    btnStyle: 'bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md',
    font: 'font-sans',
    textColor: 'text-white',
    badge: 'bg-white/10 text-white/80'
  },
  sunset: {
    name: 'Sunset Glow',
    bg: 'bg-gradient-to-br from-pink-500 to-orange-500',
    bgColor: 'linear-gradient(to bottom, #ec4899, #f97316)',
    btnShape: 'rounded-full',
    btnStyle: 'bg-white text-zinc-900 border-0 shadow-lg font-bold',
    font: 'font-sans',
    textColor: 'text-white',
    badge: 'bg-white/20 text-white'
  },
  forest: {
    name: 'Forest Breeze',
    bg: 'bg-gradient-to-br from-teal-800 to-teal-500',
    bgColor: 'linear-gradient(to bottom, #115e59, #14b8a6)',
    btnShape: 'rounded-lg',
    btnStyle: 'bg-transparent border-2 border-white/40 text-white hover:border-white font-bold',
    font: 'font-sans',
    textColor: 'text-teal-50',
    badge: 'bg-teal-950/40 text-teal-200'
  },
  retro: {
    name: 'Neo Retro',
    bg: 'bg-yellow-400',
    bgColor: '#facc15',
    btnShape: 'rounded-none',
    btnStyle: 'bg-black border-2 border-black text-yellow-400 hover:bg-neutral-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-extrabold',
    font: 'font-mono',
    textColor: 'text-black',
    badge: 'bg-black text-yellow-400 border border-black'
  }
}

export default function LandingPage() {
  const [activeTheme, setActiveTheme] = useState<keyof typeof demoThemes>('dark')

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 overflow-hidden font-sans selection:bg-brand-pink/30 relative">
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
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">Branch</span>
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
              <span className="bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent uppercase tracking-wider text-[10px] font-black">Upgrade Baru</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Branch Pro Features Enabled</span>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05]"
            >
              Satu Tautan. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-pink to-brand-orange">Ekspresi Tanpa Batas.</span>
            </motion.h1>
            
            {/* Subdescription */}
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed font-medium"
            >
              Buat halaman link-in-bio yang menakjubkan dalam hitungan detik. Atur tautan dengan header, tampilkan thumbnail gambar, terapkan tema premium, dan bagikan dengan QR code instan.
            </motion.p>
            
            {/* Claim / Call To Action */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <Link href="/register">
                <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-extrabold text-lg border-0 shadow-lg shadow-brand-pink/15 hover:scale-[1.02] active:scale-[0.98]">
                  Buat Halaman Gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-extrabold text-lg backdrop-blur-md shadow-sm transition-all">
                  Kelola Linktree Anda
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Live Mockup Customizer Section */}
          <div className="mt-28 w-full flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              Coba Tema Interaktif Kami
            </h3>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8">
              Klik pemilih tema di bawah untuk mengubah tampilan live mockup smartphone secara instan!
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
              <div className={`flex-1 w-full flex flex-col items-center pt-16 px-4 relative overflow-hidden transition-all duration-500 ${currentTheme.bg}`}>
                {/* Background overlay if retro or specific theme needs it */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Profile Avatar */}
                <div className="relative z-10 w-full flex flex-col items-center select-none">
                  <div className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-white/20 shadow-lg bg-zinc-800 flex items-center justify-center text-white font-extrabold text-2xl bg-gradient-to-tr from-brand-pink to-brand-orange">
                    JD
                  </div>

                  <h4 className={`font-black text-base mb-1 drop-shadow-sm ${currentTheme.textColor}`}>
                    Jane Doe
                  </h4>
                  <p className={`text-xs text-center mb-5 max-w-[200px] opacity-90 drop-shadow-sm ${currentTheme.textColor}`}>
                    Digital Artist & Designer creating custom branding systems.
                  </p>

                  {/* Header Divider */}
                  <div className="w-full text-center py-1 mt-2 first:mt-0 select-none">
                    <span className={`text-[10px] font-black tracking-widest uppercase opacity-95 ${currentTheme.textColor}`}>
                      My Portfolios
                    </span>
                    <div className="h-[1.5px] w-8 mx-auto bg-white/30 mt-1" />
                  </div>

                  {/* Dynamic Buttons conforming to shape and style */}
                  <div className="w-full space-y-2.5 mt-4">
                    <div className={`w-full py-3.5 px-4 text-xs font-bold transition-all text-center flex items-center justify-between ${currentTheme.btnShape} ${currentTheme.btnStyle}`}>
                      <div className="w-4 h-4 rounded-full bg-white/20" />
                      <span>Explore Art Portfolio</span>
                      <div className="w-4" />
                    </div>
                    <div className={`w-full py-3.5 px-4 text-xs font-bold transition-all text-center flex items-center justify-between ${currentTheme.btnShape} ${currentTheme.btnStyle}`}>
                      <div className="w-4 h-4 rounded-full bg-white/20" />
                      <span>Latest YouTube Vlog</span>
                      <div className="w-4" />
                    </div>
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
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Fitur Premium Tanpa Batas.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
              Dirancang khusus untuk creator independen, influencer, dan brand modern.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Theme Customizer Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <Palette className="w-10 h-10 text-brand-pink mb-6" />
                <h3 className="text-2xl font-bold mb-2">Preset Themes Gallery</h3>
                <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                  Pilih dari galeri tema profesional, mesh gradients, solid color, atau gambar kustom dengan dark overlay opacity. Atur bentuk button bulat, kotak, pill, atau soft shadow secara instan.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-2">
                <div className="h-10 bg-zinc-950 border border-white/10 rounded-lg flex items-center justify-center text-[10px] text-zinc-500 font-bold">Minimal</div>
                <div className="h-10 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-[10px] text-white font-bold">Sunset</div>
                <div className="h-10 bg-gradient-to-tr from-teal-800 to-teal-500 rounded-lg flex items-center justify-center text-[10px] text-white font-bold">Forest</div>
                <div className="h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] text-zinc-950 font-bold">Retro</div>
              </div>
            </motion.div>

            {/* QR Code sharing */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <QrCode className="w-10 h-10 text-brand-orange mb-6" />
                <h3 className="text-2xl font-bold mb-2">QR Code & Share</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Bagikan profil Anda secara offline menggunakan kode QR dinamis dengan download PNG resolusi tinggi secara instan.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="p-3 bg-white rounded-2xl border border-white/10 shadow-lg">
                  <div className="w-20 h-20 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-[9px] font-bold">QR CODE</div>
                </div>
              </div>
            </motion.div>

            {/* Section Headers & Sectioning */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <LayoutTemplate className="w-10 h-10 text-brand-orange mb-6" />
                <h3 className="text-2xl font-bold mb-2">Section Headers</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Kelompokkan tautan Anda ke dalam kategori terpisah menggunakan Section Dividers & Headers elegan untuk meningkatkan navigasi profil.
                </p>
              </div>
            </motion.div>

            {/* Remove Branding white-label */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <Eye className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold mb-2">White-label Branding</h3>
                <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                  Dapatkan kontrol penuh atas brand Anda. Hilangkan branding "Powered by Branch" di bagian bawah halaman profil publik untuk tampilan mandiri profesional.
                </p>
              </div>
            </motion.div>

            {/* Deep Analytics */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="col-span-1 md:col-span-3 p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex-1">
                <BarChart3 className="w-10 h-10 text-brand-pink mb-6" />
                <h3 className="text-2xl font-bold mb-2">Analytics Mendalam</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  Pantau total kunjungan, klik tautan individu, perangkat pengunjung, serta situs perujuk (referrer) secara langsung. Gunakan data untuk meningkatkan jangkauan bisnis Anda.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center relative z-10">
          <div className="p-8 md:p-16 rounded-3xl bg-gradient-to-tr from-brand-pink/10 to-brand-orange/10 border border-brand-pink/20 backdrop-blur-xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-pink/20 blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Siap Menampilkan Diri Anda?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8">
              Mulai buat link-in-bio super premium Anda secara gratis dalam hitungan detik.
            </p>
            <Link href="/register">
              <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-extrabold text-lg border-0 shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                Buat Branch Sekarang
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
            <span className="font-extrabold text-white">Branch</span>
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
