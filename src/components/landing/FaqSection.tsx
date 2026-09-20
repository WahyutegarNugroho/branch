import React from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Why do I need Branch if I already have social accounts?',
    a: 'Instagram, TikTok, and X only allow a single link in your bio. Branch gives you a clean, fast page to connect your followers to your shop, newsletter, music, and latest projects without redirects.'
  },
  {
    q: 'Is Branch genuinely free forever?',
    a: 'Yes. The free plan includes unlimited links, all animated backgrounds, video and audio embeds (YouTube, Spotify, TikTok), custom button styles, and built-in analytics. No credit card required.'
  },
  {
    q: 'Can I connect my own custom domain?',
    a: 'Yes. You can use your own domain (such as links.yourdomain.com) by adding a single TXT verification record at your DNS provider. Automatic SSL encryption is included.'
  },
  {
    q: 'How does Branch analytics protect visitor privacy?',
    a: 'Branch measures page visits and link clicks directly on our servers without third-party tracking cookies or advertising networks. Your visitors will never see cookie consent banners.'
  },
  {
    q: 'Can I schedule links for launches or limited-time campaigns?',
    a: 'Yes. Every link can have a start and expiration date. You can set links to go live when a project launches, and automatically expire when a sale ends.'
  },
  {
    q: 'How long does it take to switch from Linktree or Beacons?',
    a: 'About two minutes. Reserve your username, paste your existing links into the dashboard, choose your theme, and update your bio link.'
  }
]

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 lg:py-28 px-4 sm:px-6 border-t border-white/[0.08]">
      <div className="max-w-3xl mx-auto">
        {/* Header (R-09: No category pill parked above H2) */}
        <div className="mb-12 text-left sm:text-center">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-zinc-300">
            Answers to common questions about features, domains, and privacy.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer text-base font-semibold text-zinc-100 hover:text-white transition-colors marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 -outline-offset-2 select-none">
                <span>{faq.q}</span>
                <span className="w-6 h-6 rounded-full bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-open:rotate-180 group-open:text-white transition-all shrink-0">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <p className="pt-3 pr-8 text-sm text-zinc-300 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
