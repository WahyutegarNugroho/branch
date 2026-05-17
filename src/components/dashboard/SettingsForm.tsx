'use client'

import { useState } from 'react'
import { updateSettings } from '@/app/actions/profile-actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Search, 
  LineChart, 
  Settings, 
  Save, 
  Loader2, 
  Compass, 
  HelpCircle, 
  Server, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

export function SettingsForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false)
  const [customDomain, setCustomDomain] = useState(profile.custom_domain || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await updateSettings(formData)
      if (res?.error) {
        toast.error(`Gagal menyimpan: ${res.error}`)
      } else {
        toast.success('Pengaturan berhasil disimpan!')
      }
    } catch (err) {
      toast.error('Terjadi kesalahan koneksi server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[800px]">
      
      {/* 1. Custom SEO Settings */}
      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-pink" />
            Kustomisasi SEO & Meta Tags
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Tingkatkan visibilitas pencarian Google Anda dengan judul dan deskripsi metadata khusus.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Judul Halaman SEO (Title Tag)</label>
            <Input 
              name="seo_title"
              placeholder={profile.full_name || `@${profile.username}`}
              defaultValue={profile.seo_title || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-brand-pink"
            />
            <p className="text-[10px] text-zinc-500">Direkomendasikan di bawah 60 karakter untuk tampilan hasil Google terbaik.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Deskripsi Halaman SEO (Meta Description)</label>
            <Textarea 
              name="seo_description"
              placeholder={profile.bio || "Hubungkan dan lihat semua tautan penting di satu tempat."}
              defaultValue={profile.seo_description || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white min-h-[80px] focus-visible:ring-brand-pink"
            />
            <p className="text-[10px] text-zinc-500">Direkomendasikan di bawah 160 karakter untuk memberikan rangkuman yang jelas di halaman pencarian.</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Retargeting & Tracking Pixels */}
      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <LineChart className="w-5 h-5 text-brand-orange" />
            Integrasi Piksel & Pelacakan Web
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Tautkan akun iklan marketing Anda untuk merekam perilaku pengunjung secara instan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Meta Pixel (Facebook Pixel ID)
            </label>
            <Input 
              name="meta_pixel_id"
              placeholder="Contoh: 123456789012345"
              defaultValue={profile.meta_pixel_id || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-blue-500"
            />
            <p className="text-[10px] text-zinc-500">Catat kunjungan dari platform Facebook & Instagram untuk optimalisasi penayangan iklan.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              TikTok Pixel ID
            </label>
            <Input 
              name="tiktok_pixel_id"
              placeholder="Contoh: C52A6F18B3E49"
              defaultValue={profile.tiktok_pixel_id || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-red-500"
            />
            <p className="text-[10px] text-zinc-500">Lacak konversi kampanye promosi dan optimasi audiens tertarget di platform TikTok.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Google Analytics Measurement ID
            </label>
            <Input 
              name="ga_measurement_id"
              placeholder="Contoh: G-A1B2C3D4E5"
              defaultValue={profile.ga_measurement_id || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-emerald-500"
            />
            <p className="text-[10px] text-zinc-500">Hubungkan properti Google Analytics (GA4) untuk memantau data demografi & analisis pengunjung terperinci.</p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Custom Domain Configuration */}
      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Integrasi Custom Domain
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Akses halaman bio premium Anda menggunakan nama domain pribadi Anda sendiri (contoh: bio.namaanda.com).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Nama Domain Kustom Anda</label>
            <Input 
              name="custom_domain"
              placeholder="bio.namaanda.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-blue-400"
            />
            {customDomain.trim() && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Halaman akan siap diakses di:</span>
                <span className="font-bold underline">https://{customDomain.toLowerCase().trim()}</span>
              </p>
            )}
          </div>

          {/* DNS Instructions Panel */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
              <Server className="w-4 h-4 text-blue-400" />
              Panduan Konfigurasi DNS Server:
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Buka pengelola nama domain Anda (misal: Niagahoster, GoDaddy, Cloudflare) dan tambahkan baris data catatan DNS berikut agar tersambung sempurna:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono text-zinc-300">
                <thead>
                  <tr className="border-b border-white/5 text-zinc-500 font-bold">
                    <th className="pb-1.5">Tipe (Type)</th>
                    <th className="pb-1.5">Nama (Host/Name)</th>
                    <th className="pb-1.5">Tujuan (Value/Target)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-zinc-200">
                    <td className="py-2 font-bold text-blue-400">CNAME</td>
                    <td className="py-2">@ atau subdomain (misal: bio)</td>
                    <td className="py-2">cname.branch.bio</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-brand-orange/10 rounded-lg border border-brand-orange/20 flex gap-2.5">
              <AlertTriangle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <p className="text-[10px] text-brand-orange/90 leading-relaxed">
                <strong>Catatan Penting:</strong> Perubahan DNS memerlukan waktu propagasi internet antara 1 - 24 jam sebelum domain kustom Anda dapat diakses secara merata di seluruh dunia.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Submission Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-white/5 active:scale-95 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </Button>
      </div>

    </form>
  )
}
