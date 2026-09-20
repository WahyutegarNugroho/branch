import React from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Why do I need Branch if I already have social accounts?',
    a: 'Instagram, TikTok, and X only allow a single clickable link in your bio. Branch turns that single slot into a blazing-fast digital storefront and portfolio — connecting your followers directly to your store, videos, newsletter, and tour dates without awkward redirects.'
  },
  {
    q: 'Is Branch genuinely free forever?',
    a: 'Yes. The Free tier includes unlimited links, all 6 GPU WebGL canvas shaders, video and audio embeds (YouTube, Spotify, TikTok), custom button styling, and 90 days of privacy-first analytics. We do not require a credit card during sign-up.'
  },
  {
    q: 'Can I connect my own custom domain?',
    a: 'Yes. You can link your own subdomain (such as links.yourdomain.com) by adding a single TXT verification record in your DNS provider (Cloudflare, Namecheap, GoDaddy, etc.). Automatic SSL encryption is provisioned immediately.'
  },
  {
    q: 'How does Branch analytics protect visitor privacy?',
    a: 'Branch collects first-party analytics directly on our edge servers. We never install third-party tracking pixels, we do not store personal identifiers, and we never share your audience data with ad networks. This means your visitors are never bothered with GDPR cookie consent banners.'
  },
  {
    q: 'Can I schedule links for product drops or limited-time campaigns?',
    a: 'Yes. Every link supports scheduled start and end timestamps. You can set a link to appear at the exact moment your album drops or ticket sales open, and automatically disappear when your promotion ends.'
  },
  {
    q: 'How long does it take to migrate from Linktree or Beacons?',
    a: 'Most creators migrate in under three minutes. Reserve your username, paste your existing links into our drag-and-drop dashboard, pick your theme, and update your bio link.'
  }
]

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 lg:py-28 px-4 sm:px-6 border-t border-white/[0.08]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-left sm:text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-medium text-emerald-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers</span>
          </div>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Everything you need to know about Branch, performance, and privacy.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer text-base font-semibold text-zinc-200 hover:text-white transition-colors marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 -outline-offset-2">
                <span>{faq.q}</span>
                <span className="w-6 h-6 rounded-full bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 group-open:rotate-180 group-open:text-white transition-all shrink-0">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <p className="pt-3 pr-8 text-sm text-zinc-400 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
