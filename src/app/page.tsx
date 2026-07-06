'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Zap, 
  ChevronDown,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import MatrixBackground from '@/components/backgrounds/MatrixBackground'

const faqs = [
  {
    question: "Why do I need a link in bio tool?",
    answer: "A link in bio tool allows you to share multiple links through a single URL. This is perfect for platforms like Instagram and TikTok that only allow one link in your profile. You can route followers to your store, blog, videos, and more from one place."
  },
  {
    question: "Is Branch free to use?",
    answer: "Yes! Branch offers a robust free tier that includes unlimited links, basic themes, and essential analytics. We also offer Pro plans for advanced customization and deeper data insights."
  },
  {
    question: "Can I use my own domain?",
    answer: "Absolutely. With Branch Pro, you can connect your own custom domain (e.g., links.yourname.com) for a fully branded experience."
  },
  {
    question: "How do I make money with Branch?",
    answer: "You can add tip jars, affiliate links, or direct links to your merchandise and digital products. We make it seamless for your audience to support you."
  }
]

export default function LandingPage() {
  const [username, setUsername] = useState('')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* Subtle Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Navbar */}
        <nav className="relative z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Branch</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block px-4 py-2">
                Log in
              </Link>
              <Link href="/register">
                <Button className="h-10 px-6 rounded-lg bg-white text-black hover:bg-zinc-200 font-semibold text-sm transition-all">
                  Sign up free
                </Button>
              </Link>
            </div>
          </div>
        </nav>

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
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl blur transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-center bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                  <span className="pl-4 text-zinc-500 font-medium">branch.bio/</span>
                  <input 
                    type="text" 
                    placeholder="yourname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-14 px-2 border-none bg-transparent text-white font-medium focus:ring-0 outline-none placeholder:text-zinc-700"
                  />
                </div>
              </div>
              <Link href={`/register?username=${username}`}>
                <Button className="h-14 px-8 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-base transition-all w-full sm:w-auto">
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
               <div className="w-full h-full pt-16 px-6 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950">
                  <div className="w-20 h-20 rounded-full bg-zinc-800 border border-white/10 mb-4 p-1 overflow-hidden">
                     <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-full h-full rounded-full object-cover opacity-90" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">Alex Design</h3>
                  <p className="text-zinc-400 text-sm mb-6 text-center">Creating minimal interfaces and digital experiences.</p>
                  
                  <div className="w-full space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-full h-12 bg-zinc-900/80 border border-white/10 rounded-xl flex items-center justify-center text-sm font-medium text-zinc-300">
                        Portfolio Project {i}
                      </div>
                    ))}
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: CREATE & CUSTOMIZE --- */}
      <section className="bg-zinc-900/20 border-b border-white/5 py-24 lg:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-lg flex justify-center relative">
             {/* Abstract UI representation */}
             <div className="w-full max-w-sm grid gap-4 p-4 rounded-3xl bg-zinc-900/50 border border-white/10 shadow-2xl backdrop-blur-sm relative z-10">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                     <Palette className="w-5 h-5 text-zinc-400" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-white mb-1">Theme Customizer</div>
                     <div className="text-xs text-zinc-500">Solid, gradients, or glass</div>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                     <Zap className="w-5 h-5 text-zinc-400" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-white mb-1">Interactive Backgrounds</div>
                     <div className="text-xs text-zinc-500">WebGL animations</div>
                   </div>
                </div>
             </div>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Create and customize your Branch in minutes
            </h2>
            <p className="text-lg text-zinc-400 font-medium mb-8 leading-relaxed max-w-md">
              Connect your TikTok, Instagram, Twitter, website, store, videos, and events. It all comes together in a link in bio designed to convert perfectly.
            </p>
            <Button className="h-12 px-8 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 font-semibold border border-white/10 transition-all">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SHARE ANYWHERE --- */}
      <section className="bg-[#09090b] py-24 lg:py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-white">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Share your Branch anywhere you like
            </h2>
            <p className="text-lg text-zinc-400 font-medium mb-8 leading-relaxed max-w-md">
              Add your unique Branch URL to all the platforms and places you find your audience. Then use your custom QR code to drive offline traffic online.
            </p>
          </div>
          <div className="flex-1 relative flex justify-center">
            {/* Minimal abstract cards */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
               {[
                 { bg: 'bg-zinc-900', border: 'border-white/5', rotate: 'rotate-[-8deg]', z: 1 },
                 { bg: 'bg-zinc-800', border: 'border-white/10', rotate: 'rotate-[4deg]', z: 2 },
                 { bg: 'bg-zinc-950', border: 'border-white/20', rotate: 'rotate-[-2deg]', z: 3 },
               ].map((card, i) => (
                 <div 
                   key={i} 
                   className={`absolute w-56 h-72 ${card.bg} rounded-2xl border ${card.border} shadow-2xl transform ${card.rotate} transition-transform hover:rotate-0 flex flex-col p-6`}
                   style={{ zIndex: card.z }}
                 >
                   <div className="w-10 h-10 rounded-full bg-white/10 mb-6" />
                   <div className="w-full h-4 bg-white/5 rounded-md mb-3" />
                   <div className="w-3/4 h-4 bg-white/5 rounded-md mb-6" />
                   <div className="mt-auto w-full h-10 bg-white/5 rounded-lg" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ANALYZE (Dark Glassmorphism) --- */}
      <section className="bg-zinc-900/20 py-24 lg:py-32 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-lg">
             {/* Bento stats mockup - Dark Mode */}
             <div className="col-span-2 bg-zinc-900/80 p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
               <h4 className="font-semibold text-zinc-400 mb-2">Total Views</h4>
               <div className="text-5xl font-bold text-white mb-6">42,019</div>
               <div className="w-full h-20 flex items-end gap-1.5">
                 {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-700/50 hover:bg-zinc-600 rounded-t-sm transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                 ))}
               </div>
             </div>
             <div className="col-span-1 bg-zinc-900/80 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
               <h4 className="font-semibold text-zinc-400 mb-2">Clicks</h4>
               <div className="text-3xl font-bold text-white">12.5K</div>
             </div>
             <div className="col-span-1 bg-zinc-900/80 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
               <h4 className="font-semibold text-zinc-400 mb-2">CTR</h4>
               <div className="text-3xl font-bold text-white">29.7%</div>
             </div>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Analyze your audience and keep them engaged
            </h2>
            <p className="text-lg text-zinc-400 font-medium mb-8 leading-relaxed max-w-md">
              Track your engagement over time, monitor revenue and discover what's converting your audience. Make informed updates on the fly to keep them coming back.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FAQ --- */}
      <section className="bg-[#09090b] py-24 px-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Questions? Answered.</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-zinc-900/30 rounded-2xl overflow-hidden cursor-pointer transition-all border border-white/5 hover:border-white/10"
                onClick={() => toggleFaq(index)}
              >
                <div className="p-6 flex items-center justify-between font-semibold text-base text-zinc-200">
                  {faq.question}
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                </div>
                {activeFaq === index && (
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA --- */}
      <section className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#09090b] to-[#09090b] pt-24 pb-32 px-6 text-center border-b border-white/5">
         <h2 className="text-4xl lg:text-5xl font-bold text-white mb-10 max-w-2xl mx-auto leading-tight">
           Claim your corner of the internet today
         </h2>
         <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-lg mx-auto">
            <div className="relative flex-1">
              <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                <span className="pl-4 text-zinc-500 font-medium">branch.bio/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  className="w-full h-14 px-2 border-none bg-transparent text-white font-medium focus:ring-0 outline-none"
                />
              </div>
            </div>
            <Link href="/register">
              <Button className="h-14 px-8 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-base transition-all w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#09090b] py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm">
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Getting Started</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
             <Zap className="w-4 h-4" />
             <span>Branch Inc © 2026</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 text-sm">
             <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
             <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
             <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
