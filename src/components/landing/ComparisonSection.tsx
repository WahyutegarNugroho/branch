import React from 'react'
import { Check, X, Zap, Shield, Sparkles } from 'lucide-react'

interface ComparisonRow {
  feature: string
  branch: string | boolean
  linktree: string | boolean
  beacons: string | boolean
  note?: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Page Load Speed',
    branch: '< 100ms',
    linktree: '1.4s - 2.8s',
    beacons: '1.2s - 2.1s',
    note: 'Loads instantly without heavy client scripts.'
  },
  {
    feature: 'Forced Watermarks',
    branch: 'None (Clean profile)',
    linktree: 'Linktree logo',
    beacons: 'Beacons logo',
    note: 'Your profile is for your brand, not ours.'
  },
  {
    feature: 'Animated Canvas Backgrounds',
    branch: '6 Included',
    linktree: false,
    beacons: false,
    note: 'Subtle moving backgrounds like aurora, stars, and snowfall.'
  },
  {
    feature: 'Privacy-Friendly Analytics',
    branch: 'First-party (0 cookies)',
    linktree: 'Ad tracking scripts',
    beacons: 'Ad cookies',
    note: 'No cookie consent popups or cross-site trackers.'
  },
  {
    feature: 'Custom Domain',
    branch: true,
    linktree: 'Pro tier ($24/mo)',
    beacons: 'Paid tier only',
    note: 'Connect links.yourdomain.com via simple DNS record.'
  },
  {
    feature: 'Link Scheduling & Expiry',
    branch: true,
    linktree: 'Paid tier only',
    beacons: 'Paid tier only',
    note: 'Set exact start and expiration dates for launches.'
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
        {/* Header */}
        <div className="max-w-3xl mb-14 text-left sm:text-center sm:mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-xs font-medium text-emerald-400 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Comparison</span>
          </div>
          <h2 id="compare-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            How Branch compares.
          </h2>
          <p className="mt-4 text-base lg:text-lg text-zinc-400 leading-relaxed">
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
                  <th className="py-5 px-6 text-sm font-bold text-emerald-400 bg-emerald-500/10 border-x border-emerald-500/20 w-1/5">
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
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{row.note}</p>
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

        {/* Micro Guarantee footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 px-2">
          <span>Based on publicly available plan specifications.</span>
          <span className="text-zinc-400 font-medium">Takes less than 2 minutes to set up &rarr;</span>
        </div>
      </div>
    </section>
  )
}
