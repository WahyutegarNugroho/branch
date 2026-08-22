'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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

export function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer transition-all border border-zinc-800 hover:border-zinc-700/60"
          onClick={() => toggleFaq(index)}
        >
          <div className="p-5 flex items-center justify-between font-semibold text-sm text-zinc-200">
            {faq.question}
            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
          </div>
          {activeFaq === index && (
            <div className="px-5 pb-5 text-zinc-400 text-xs leading-relaxed border-t border-zinc-800/40 pt-3">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
