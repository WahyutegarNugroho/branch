import Link from 'next/link'
import {
  Zap,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/landing/HeroSection'
import { FaqSection } from '@/components/landing/FaqSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">

        {/* Navbar */}
        <nav className="relative z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Branch</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block px-4 py-2">
                Log in
              </Link>
              <Link href="/register">
                <Button className="h-10 px-6 rounded-lg bg-white text-black hover:bg-zinc-200 font-semibold text-sm transition-all border-0">
                  Sign up free
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <HeroSection />
      </section>

      {/* --- SECTION 2: CREATE & CUSTOMIZE --- */}
      <section className="bg-zinc-950 border-b border-zinc-800 py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-lg flex justify-center relative">
             {/* Abstract UI representation */}
             <div className="w-full max-w-sm grid gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 shadow-sm relative z-10">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-950 border border-zinc-800/40">
                   <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                     <Palette className="w-4 h-4 text-zinc-400" />
                   </div>
                   <div>
                     <div className="text-xs font-bold text-white mb-0.5">Theme Customizer</div>
                     <div className="text-[10px] text-zinc-500">Solid, gradients, or custom styles</div>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-950 border border-zinc-800/40">
                   <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                     <Zap className="w-4 h-4 text-zinc-400" />
                   </div>
                   <div>
                     <div className="text-xs font-bold text-white mb-0.5">Interactive Backgrounds</div>
                     <div className="text-[10px] text-zinc-500">WebGL animations</div>
                   </div>
                </div>
             </div>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
              Create and customize your Branch in minutes
            </h2>
            <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed max-w-md">
              Connect your TikTok, Instagram, Twitter, website, store, videos, and events. It all comes together in a link in bio designed to convert perfectly.
            </p>
            <Button className="h-10 px-6 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 font-semibold border border-zinc-800 transition-all text-xs">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SHARE ANYWHERE --- */}
      <section className="bg-zinc-950 py-16 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-white">
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
              Share your Branch anywhere you like
            </h2>
            <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed max-w-md">
              Add your unique Branch URL to all the platforms and places you find your audience. Then use your custom QR code to drive offline traffic online.
            </p>
          </div>
          <div className="flex-1 relative flex justify-center">
            {/* Minimal abstract cards */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
               {[
                 { bg: 'bg-zinc-900', border: 'border-zinc-800/40', rotate: 'rotate-[-8deg]', z: 1 },
                 { bg: 'bg-zinc-800', border: 'border-zinc-700/40', rotate: 'rotate-[4deg]', z: 2 },
                 { bg: 'bg-zinc-950', border: 'border-zinc-800', rotate: 'rotate-[-2deg]', z: 3 },
               ].map((card, i) => (
                 <div
                   key={i}
                   className={`absolute w-52 h-64 ${card.bg} rounded-xl border ${card.border} shadow-lg transform ${card.rotate} transition-transform hover:rotate-0 flex flex-col p-6`}
                   style={{ zIndex: card.z }}
                 >
                   <div className="w-8 h-8 rounded-full bg-white/10 mb-6" />
                   <div className="w-full h-3 bg-white/5 rounded-md mb-3" />
                   <div className="w-3/4 h-3 bg-white/5 rounded-md mb-6" />
                   <div className="mt-auto w-full h-8 bg-white/5 rounded-lg" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ANALYZE --- */}
      <section className="bg-zinc-950 py-16 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-lg">
             {/* Bento stats mockup - Dark Mode */}
             <div className="col-span-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-sm">
               <h4 className="text-xs font-semibold text-zinc-400 mb-1">Total Views</h4>
               <div className="text-4xl font-bold text-white mb-6 tabular-nums">42,019</div>
               <div className="w-full h-16 flex items-end gap-1.5">
                 {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-zinc-850 hover:bg-zinc-700 rounded-t-sm transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                 ))}
               </div>
             </div>
             <div className="col-span-1 bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-sm">
               <h4 className="text-xs font-semibold text-zinc-400 mb-1">Clicks</h4>
               <div className="text-2xl font-bold text-white tabular-nums">12.5K</div>
             </div>
             <div className="col-span-1 bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-sm">
               <h4 className="text-xs font-semibold text-zinc-400 mb-1">CTR</h4>
               <div className="text-2xl font-bold text-white tabular-nums">29.7%</div>
             </div>
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight">
              Analyze your audience and keep them engaged
            </h2>
            <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed max-w-md">
              Track your engagement over time, monitor revenue and discover what&apos;s converting your audience. Make informed updates on the fly to keep them coming back.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FAQ --- */}
      <section className="bg-zinc-950 py-16 px-6 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">Questions? Answered.</h2>
          <FaqSection />
        </div>
      </section>

      {/* --- PRE-FOOTER CTA --- */}
      <section className="bg-zinc-950 pt-16 pb-24 px-6 text-center border-b border-zinc-800">
         <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 max-w-xl mx-auto leading-tight">
           Claim your corner of the internet today
         </h2>
         <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-md mx-auto">
            <div className="relative flex-1">
              <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <span className="pl-4 text-zinc-500 font-medium text-sm">branch.bio/</span>
                <input
                  type="text"
                  placeholder="yourname"
                  className="w-full h-12 px-2 border-none bg-transparent text-white font-medium text-sm focus:ring-0 outline-none placeholder:text-zinc-700"
                />
              </div>
            </div>
            <Link href="/register">
              <Button className="h-12 px-8 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all w-full sm:w-auto border-0">
                Claim username
              </Button>
            </Link>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-zinc-950 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-xs">
          <div>
            <h4 className="font-semibold mb-3 text-white">Company</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Product</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Support</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Getting Started</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Legal</h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-400 font-medium text-xs">
             <Zap className="w-4 h-4" />
             <span>Branch Inc © 2026</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 text-xs">
             <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
             <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
             <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
