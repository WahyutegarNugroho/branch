import Link from 'next/link'
import { Zap } from 'lucide-react'
import { ThemeDemo } from '@/components/landing/ThemeDemo'

const STEPS = [
  {
    title: 'Claim your username',
    desc: 'Reserve branch.bio/yourname during sign-up. Takes an email and password.',
  },
  {
    title: 'Add links and embeds',
    desc: 'Paste URLs, or embed YouTube, Spotify, and TikTok directly. Reorder by drag-and-drop.',
  },
  {
    title: 'Style the page',
    desc: 'Pick a theme, button shape, font, and animated background. No code involved.',
  },
  {
    title: 'Share one URL',
    desc: 'Drop it in every bio. Views and clicks start showing up in analytics immediately.',
  },
]

const SAMPLE_STATS = [
  { label: 'Profile views', value: '42,019' },
  { label: 'Link clicks', value: '12,480' },
  { label: 'Click-through rate', value: '29.7%' },
  { label: 'Top referrer', value: 'instagram.com' },
  { label: 'Mobile share', value: '71%' },
]

const FAQS = [
  {
    q: 'Why do I need a link-in-bio page?',
    a: 'Instagram, TikTok, and X allow a single bio link. A Branch page turns that one slot into a directory of everything you want people to reach — store, videos, newsletter, portfolio.',
  },
  {
    q: 'Is Branch free?',
    a: 'The free plan includes unlimited links, all core themes, embeds, and 90 days of click analytics. Paid plans add custom domains, branding removal, and longer data retention.',
  },
  {
    q: 'Can I use my own domain?',
    a: 'Yes. Point a TXT record at your Branch account to verify it, and your page serves from links.yourdomain.com instead of branch.bio.',
  },
  {
    q: 'What does the analytics track?',
    a: 'Profile views and per-link clicks, broken down by device type, country, city, referrer, and UTM campaign. Data is first-party and stored on our own infrastructure.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-400/20 selection:text-white">

      {/* ============================== HERO ============================== */}
      <header className="border-b border-zinc-800">
        <nav aria-label="Main" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center" aria-hidden="true">
              <Zap className="w-4 h-4 text-zinc-950" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">Branch</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-2">
              Log in
            </Link>
            <Link href="/register" className="h-9 inline-flex items-center px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold transition-colors">
              Create your page
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 pt-14 pb-16 lg:pt-20 lg:pb-20 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
              Link-in-bio for creators
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-white mb-5">
              One link for everything you make.
            </h1>
            <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-md mb-8">
              Branch puts your links, shops, videos, and socials on a single page — then shows you exactly which ones your audience clicks.
            </p>

            <form action="/register" method="get" className="flex flex-col sm:flex-row gap-3 max-w-md">
              <label htmlFor="claim-username" className="sr-only">Choose your username</label>
              <div className="flex flex-1 items-center bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden focus-within:border-emerald-400/60 transition-colors">
                <span className="pl-3.5 text-zinc-500 font-medium text-sm select-none" aria-hidden="true">branch.bio/</span>
                <input
                  id="claim-username"
                  name="username"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={30}
                  placeholder="yourname"
                  pattern="[a-z0-9_-]+"
                  title="Lowercase letters, numbers, hyphens and underscores only"
                  className="w-full h-12 px-2 bg-transparent text-white font-medium text-sm placeholder:text-zinc-600"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 rounded-lg bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-sm transition-colors whitespace-nowrap"
              >
                Claim your link
              </button>
            </form>
            <p className="mt-3 text-xs text-zinc-500">Free forever plan. No credit card required.</p>
          </div>

          <ThemeDemo />
        </div>
      </header>

      <main>
        {/* ========================= HOW IT WORKS ========================= */}
        <section id="how-it-works" aria-labelledby="how-heading" className="border-b border-zinc-800 py-12 lg:py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 id="how-heading" className="text-2xl font-bold tracking-tight text-white mb-2">
              From sign-up to shared link in minutes
            </h2>
            <ol className="mt-8 divide-y divide-zinc-800 border-y border-zinc-800 list-none">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5 py-4">
                  <span className="text-sm font-bold text-emerald-400 tabular-nums shrink-0 w-7 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-zinc-400 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================== ANALYTICS ========================== */}
        <section id="analytics" aria-labelledby="analytics-heading" className="border-b border-zinc-800 py-12 lg:py-16 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 id="analytics-heading" className="text-2xl font-bold tracking-tight text-white mb-4">
                See what your audience actually clicks
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                Every profile view and every link click is recorded with device, country, referrer,
                and UTM campaign — kept for 90 days, exportable as CSV.
              </p>
            </div>

            <div>
              <div className="rounded-xl border border-zinc-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Last 7 days</span>
                  <span className="text-xs text-zinc-500 tabular-nums">Sample data</span>
                </div>
                <dl className="divide-y divide-zinc-800/80 bg-zinc-900/40">
                  {SAMPLE_STATS.map(stat => (
                    <div key={stat.label} className="flex items-center justify-between px-4 h-11">
                      <dt className="text-sm text-zinc-400">{stat.label}</dt>
                      <dd className="text-sm font-semibold text-white tabular-nums">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-2 text-xs text-zinc-600">
                Numbers shown are illustrative. Your dashboard starts at zero.
              </p>
            </div>
          </div>
        </section>

        {/* ============================== FAQ ============================= */}
        <section id="faq" aria-labelledby="faq-heading" className="border-b border-zinc-800 py-12 lg:py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-white mb-8">
              Questions, answered
            </h2>
            <div className="border-t border-zinc-800">
              {FAQS.map(faq => (
                <details key={faq.q} className="group border-b border-zinc-800">
                  <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer text-sm font-semibold text-zinc-200 hover:text-white transition-colors marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 -outline-offset-4">
                    {faq.q}
                    <span className="text-zinc-500 group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">
                      ▾
                    </span>
                  </summary>
                  <p className="pb-4 pr-8 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ FINAL CTA ========================== */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Ready when you are.</h2>
              <p className="text-sm text-zinc-400 mt-1">Setup takes about two minutes.</p>
            </div>
            <Link href="/register" className="shrink-0 h-11 inline-flex items-center px-6 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm transition-colors">
              Create your page
            </Link>
          </div>
        </section>
      </main>

      {/* ============================= FOOTER ============================ */}
      <footer className="border-t border-zinc-800 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Branch © 2026</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
            <Link href="/register" className="hover:text-white transition-colors">Sign up</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
