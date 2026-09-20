import React from 'react'
import { Check, X, Zap } from 'lucide-react'

interface ComparisonRow {
  feature: string
  branch: string | boolean
  linktree: string | boolean
  beacons: string | boolean
  note?: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Forced Brand Watermarks',
    branch: 'Zero on any plan',
    linktree: 'Forced logo badge',
    beacons: 'Forced logo badge',
    note: 'Your profile highlights your content, not our branding.'
  },
  {
    feature: 'Visitor Privacy & Cookies',
    branch: '0 ad tracking cookies',
    linktree: 'Third-party ad scripts',
    beacons: 'Third-party tracking cookies',
    note: 'Server-side telemetry without invasive cookies or consent popups.'
  },
  {
    feature: 'Animated WebGL Backgrounds',
    branch: '6 Included',
    linktree: false,
    beacons: false,
    note: 'Interactive background shaders like aurora, stars, and snowfall.'
  },
  {
    feature: 'Custom Domain Connection',
    branch: true,
    linktree: 'Paid tier only ($24/mo)',
    beacons: 'Paid tier only',
    note: 'Connect links.yourdomain.com via a single DNS TXT record.'
  },
  {
    feature: 'Link Scheduling & Auto-Expiry',
    branch: true,
    linktree: 'Paid tier only',
    beacons: 'Paid tier only',
    note: 'Set exact start and expiration dates for launches or sales.'
  },
  {
    feature: 'CSV Data Export',
    branch: true,
    linktree: 'Paid tier only',
    beacons: 'Paid tier only',
    note: 'Download your full visitor and click data anytime.'
  },
]

export function ComparisonSection() {
  return (
    <section id="compare" aria-labelledby="compare-heading" className="py-20 lg:py-28 px-4 sm:px-6 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Header (R-09: No category pill parked above H2) */}
        <div className="max-w-3xl mb-14 text-left sm:text-center sm:mx-auto">
          <h2 id="compare-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
            How Branch compares.
          </h2>
          <p className="mt-3 text-base lg:text-lg text-zinc-300 leading-relaxed">
            Fair pricing, no forced watermarks, and fast page loads without heavy tracking scripts.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-zinc-900/80">
                  <th className="py-5 px-6 text-sm font-semibold text-zinc-400 w-2/5">
                    Feature & Performance Metric
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-emerald-400 bg-emerald-500/10 border-x border-emerald-500/20 w-1/5 font-heading">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Branch</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-zinc-400 w-1/5">
                    Linktree
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-zinc-400 w-1/5">
                    Beacons
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-white">{row.feature}</p>
                      {row.note && (
                        <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{row.note}</p>
                      )}
                    </td>

                    {/* Branch Column (Highlighted) */}
                    <td className="py-4 px-6 font-semibold text-white bg-emerald-500/[0.04] border-x border-emerald-500/20">
                      {typeof row.branch === 'boolean' ? (
                        row.branch ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Included</span>
                          </span>
                        ) : (
                          <X className="w-4 h-4 text-zinc-600" />
                        )
                      ) : (
                        <span className="text-emerald-300 font-bold">{row.branch}</span>
                      )}
                    </td>

                    {/* Linktree Column */}
                    <td className="py-4 px-6 text-zinc-400">
                      {typeof row.linktree === 'boolean' ? (
                        row.linktree ? (
                          <Check className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-400 text-xs">
                            <X className="w-4 h-4 text-zinc-400" />
                            <span>No</span>
                          </span>
                        )
                      ) : (
                        <span className="text-zinc-400">{row.linktree}</span>
                      )}
                    </td>

                    {/* Beacons Column */}
                    <td className="py-4 px-6 text-zinc-400">
                      {typeof row.beacons === 'boolean' ? (
                        row.beacons ? (
                          <Check className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-400 text-xs">
                            <X className="w-4 h-4 text-zinc-400" />
                            <span>No</span>
                          </span>
                        )
                      ) : (
                        <span className="text-zinc-400">{row.beacons}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Micro Guarantee footer (R-08: Clean, no decorative arrow) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400 px-2">
          <span>Based on publicly available plan specifications.</span>
          <span className="text-zinc-300 font-medium">Free plan requires no credit card</span>
        </div>
      </div>
    </section>
  )
}
