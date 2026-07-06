'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Zap, 
  BarChart3, 
  Palette, 
  Share2,
  ChevronDown,
  CheckCircle2,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuroraBackground from '@/components/backgrounds/AuroraBackground'
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
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      
      {/* --- HERO SECTION (Lime Yellow) --- */}
      <section className="bg-[#d2e823] relative overflow-hidden">
        {/* Navbar */}
        <nav className="relative z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#d2e823]" />
              </div>
              <span className="text-xl font-black tracking-tight text-black">Branch</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-base font-bold text-black hover:opacity-70 transition-opacity hidden sm:block bg-black/10 px-6 py-3 rounded-full">
                Log in
              </Link>
              <Link href="/register">
                <Button className="h-12 px-6 rounded-full bg-black text-white hover:bg-zinc-800 font-bold text-base transition-all">
                  Sign up free
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl sm:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.95] text-[#1a1a1a] mb-6"
            >
              Everything you <br className="hidden lg:block"/> are. In one, <br className="hidden lg:block"/> simple link in bio.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg lg:text-xl text-zinc-800 font-medium mb-10 max-w-lg leading-relaxed"
            >
              Join millions of people using Branch for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-lg">branch.bio/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-16 pl-[110px] pr-4 rounded-xl border-none bg-white text-lg font-bold text-black focus:ring-4 focus:ring-black/10 outline-none"
                />
              </div>
              <Link href={`/register?username=${username}`}>
                <Button className="h-16 px-8 rounded-xl bg-[#e9c0e9] hover:bg-[#d6a5d6] text-black font-black text-lg transition-all w-full sm:w-auto border border-black/10">
                  Claim your Branch
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="flex-1 w-full max-w-md relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-black bg-zinc-100"
            >
               {/* Hero Image Mockup replacement */}
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Hero Mockup" className="w-full h-full object-cover" />
               
               {/* Overlay elements */}
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-black/5">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500" />
                    <div>
                      <div className="h-3 w-24 bg-black/20 rounded-full mb-1" />
                      <div className="h-2 w-16 bg-black/10 rounded-full" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="h-10 w-full bg-black/5 rounded-xl border border-black/10" />
                    <div className="h-10 w-full bg-black/5 rounded-xl border border-black/10" />
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: CREATE & CUSTOMIZE (Deep Blue) --- */}
      <section className="bg-[#1e5cdc] py-24 lg:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-lg flex justify-center relative">
             <div className="absolute inset-0 bg-[#d2e823] rounded-full blur-3xl opacity-20" />
             {/* Simple Mockup */}
             <div className="w-[300px] h-[600px] bg-[#09090b] rounded-[3rem] p-2 border-8 border-black shadow-2xl relative z-10 overflow-hidden transform rotate-[-3deg]">
                <div className="absolute inset-0 z-0">
                  <MatrixBackground config={{ speed: 1.0 }} />
                </div>
                <div className="relative z-10 p-6 flex flex-col items-center pt-16">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mb-4">
                     <Zap className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-mono font-bold text-xl mb-6">@creator</h3>
                  <div className="w-full space-y-3">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="w-full h-12 bg-emerald-500/10 border border-emerald-500/50 rounded-none flex items-center px-4">
                         <div className="w-full h-2 bg-emerald-400/40 rounded-full" />
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
              Create and customize your Branch in minutes
            </h2>
            <p className="text-lg text-blue-100 font-medium mb-8 leading-relaxed max-w-md">
              Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
            </p>
            <Button className="h-14 px-8 rounded-full bg-[#d2e823] text-black hover:bg-[#c1d620] font-black text-lg transition-all">
              Get started for free
            </Button>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SHARE ANYWHERE (Maroon) --- */}
      <section className="bg-[#780016] py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-white">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Share your Branch anywhere you like
            </h2>
            <p className="text-lg text-red-100 font-medium mb-8 leading-relaxed max-w-md">
              Add your unique Branch URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.
            </p>
            <Button className="h-14 px-8 rounded-full bg-white text-[#780016] hover:bg-zinc-200 font-black text-lg transition-all">
              Discover all features
            </Button>
          </div>
          <div className="flex-1 relative flex justify-center">
            {/* Abstract visual representing platforms */}
            <div className="relative w-full max-w-md aspect-square">
               {[
                 { bg: 'bg-[#e9c0e9]', rotate: 'rotate-[-10deg]', top: '10%', left: '10%' },
                 { bg: 'bg-[#d2e823]', rotate: 'rotate-[5deg]', top: '20%', left: '20%' },
                 { bg: 'bg-[#1e5cdc]', rotate: 'rotate-[-5deg]', top: '30%', left: '30%' },
                 { bg: 'bg-zinc-900', rotate: 'rotate-[10deg]', top: '40%', left: '40%' },
                 { bg: 'bg-[#780016]', rotate: 'rotate-0', top: '50%', left: '50%' }
               ].map((card, i) => (
                 <div 
                   key={i} 
                   className={`absolute w-48 h-64 ${card.bg} rounded-3xl border-4 border-black shadow-xl transform ${card.rotate} transition-transform hover:rotate-0`}
                   style={{ top: card.top, left: card.left, zIndex: i }}
                 >
                   <div className="w-full h-full flex flex-col items-center justify-center p-4">
                     <div className="w-12 h-12 bg-white/20 rounded-full mb-4" />
                     <div className="w-3/4 h-3 bg-white/30 rounded-full mb-2" />
                     <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ANALYZE (Off-white/Beige) --- */}
      <section className="bg-[#f3f3f1] py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-lg">
             {/* Bento stats mockup */}
             <div className="col-span-2 bg-[#d2e823] p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0_0_#000]">
               <h4 className="font-bold text-black mb-4">Total Views</h4>
               <div className="text-5xl font-black mb-2">42,019</div>
               <div className="w-full h-16 flex items-end gap-1">
                 {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-black rounded-t-sm" style={{ height: `${h}%` }} />
                 ))}
               </div>
             </div>
             <div className="col-span-1 bg-[#e9c0e9] p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0_0_#000]">
               <h4 className="font-bold text-black mb-2">Clicks</h4>
               <div className="text-4xl font-black">12.5K</div>
             </div>
             <div className="col-span-1 bg-[#1e5cdc] p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0_0_#000] text-white">
               <h4 className="font-bold mb-2">CTR</h4>
               <div className="text-4xl font-black">29.7%</div>
             </div>
          </div>
          <div className="flex-1 text-black">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Analyze your audience and keep them engaged
            </h2>
            <p className="text-lg text-zinc-700 font-medium mb-8 leading-relaxed max-w-md">
              Track your engagement over time, monitor revenue and discover what's converting your audience. Make informed updates on the fly to keep them coming back.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FEATURES & TESTIMONIAL --- */}
      <section className="bg-white py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
           <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-black">
             The fast, friendly and powerful link in bio tool.
           </h2>
        </div>
        
        {/* Testimonial */}
        <div className="max-w-3xl mx-auto mt-24">
           <div className="bg-[#1e5cdc] rounded-t-full pt-12 px-8 flex justify-center">
             <div className="w-48 h-48 bg-[#d2e823] rounded-full border-4 border-black overflow-hidden -mt-24 shadow-xl">
               <img src="https://i.pravatar.cc/300?img=11" alt="Creator" className="w-full h-full object-cover" />
             </div>
           </div>
           <div className="bg-zinc-100 p-12 text-center rounded-3xl rounded-t-none border-2 border-black shadow-[8px_8px_0_0_#000]">
              <h3 className="text-2xl lg:text-4xl font-black leading-snug mb-6">
                "Branch simplifies the process for creators to share multiple parts of themselves in one inclusive link."
              </h3>
              <p className="font-bold text-zinc-500 uppercase tracking-widest text-sm">Forbes</p>
           </div>
        </div>
      </section>

      {/* --- SECTION 6: FAQ (Dark Red) --- */}
      <section className="bg-[#502274] py-24 px-6 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Questions? Answered.</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-black/20 rounded-2xl overflow-hidden cursor-pointer transition-all border border-white/10 hover:bg-black/30"
                onClick={() => toggleFaq(index)}
              >
                <div className="p-6 flex items-center justify-between font-bold text-lg">
                  {faq.question}
                  <ChevronDown className={`w-6 h-6 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                </div>
                {activeFaq === index && (
                  <div className="px-6 pb-6 text-purple-100 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA (Purple) --- */}
      <section className="bg-[#502274] pt-12 pb-32 px-6 text-center border-t border-white/10">
         <h2 className="text-4xl lg:text-6xl font-black text-white mb-10 max-w-2xl mx-auto leading-tight">
           Jumpstart your corner of the internet today
         </h2>
         <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-lg mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-lg">branch.bio/</span>
              <input 
                type="text" 
                placeholder="yourname"
                className="w-full h-16 pl-[110px] pr-4 rounded-xl border-none bg-white text-lg font-bold text-black outline-none"
              />
            </div>
            <Link href="/register">
              <Button className="h-16 px-8 rounded-xl bg-[#d2e823] hover:bg-[#c1d620] text-black font-black text-lg transition-all w-full sm:w-auto">
                Claim your Branch
              </Button>
            </Link>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-16 px-6 rounded-t-[3rem] -mt-12 relative z-10 border-t-2 border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 font-medium">
          <div>
            <h4 className="font-black text-lg mb-4 text-black">Company</h4>
            <ul className="space-y-3 text-zinc-600">
              <li><Link href="#" className="hover:text-black">The Branch Blog</Link></li>
              <li><Link href="#" className="hover:text-black">Engineering Blog</Link></li>
              <li><Link href="#" className="hover:text-black">Careers</Link></li>
              <li><Link href="#" className="hover:text-black">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-4 text-black">Community</h4>
            <ul className="space-y-3 text-zinc-600">
              <li><Link href="#" className="hover:text-black">Branch for Creators</Link></li>
              <li><Link href="#" className="hover:text-black">Branch for Business</Link></li>
              <li><Link href="#" className="hover:text-black">Charities</Link></li>
              <li><Link href="#" className="hover:text-black">Creator Profile Directory</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-4 text-black">Support</h4>
            <ul className="space-y-3 text-zinc-600">
              <li><Link href="#" className="hover:text-black">Help Topics</Link></li>
              <li><Link href="#" className="hover:text-black">Getting Started</Link></li>
              <li><Link href="#" className="hover:text-black">Features</Link></li>
              <li><Link href="#" className="hover:text-black">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-4 text-black">Trust & Legal</h4>
            <ul className="space-y-3 text-zinc-600">
              <li><Link href="#" className="hover:text-black">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-black">Privacy Notice</Link></li>
              <li><Link href="#" className="hover:text-black">Trust Center</Link></li>
              <li><Link href="#" className="hover:text-black">Report a Violation</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-200">
          <div className="flex items-center gap-4">
             <Link href="/login" className="px-6 py-3 bg-zinc-100 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">Log in</Link>
             <Link href="/register" className="px-6 py-3 bg-[#d2e823] text-black rounded-full font-bold text-sm hover:bg-[#c1d620] transition-colors">Get started free</Link>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            {/* Social Icons Placeholders */}
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white"><span className="text-xs">IG</span></div>
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white"><span className="text-xs">TT</span></div>
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white"><span className="text-xs">TW</span></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
