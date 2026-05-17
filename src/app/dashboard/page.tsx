import { getProfile } from '@/app/actions/profile-actions'
import { getLinks, createLink } from '@/app/actions/link-actions'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { LinkManager } from '@/components/dashboard/LinkManager'

export default async function DashboardPage() {
  const profile = await getProfile()
  if (!profile) redirect('/login')

  const links = await getLinks()

  async function handleCreateLinkAction() {
    'use server'
    await createLink('link')
  }

  async function handleCreateHeaderAction() {
    'use server'
    await createLink('header')
  }

  async function handleCreateCarouselAction() {
    'use server'
    await createLink('carousel')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Links & Sections</h1>
        <p className="text-zinc-400 text-base mt-1">Manage your links, sections, and embed content.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <form action={handleCreateLinkAction} className="w-full">
          <Button type="submit" className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-all text-white font-bold text-sm border-0 shadow-lg cursor-pointer">
            <Plus className="mr-1.5 h-5 w-5" />
            Add New Link
          </Button>
        </form>
        <form action={handleCreateCarouselAction} className="w-full">
          <Button type="submit" className="w-full h-14 rounded-2xl bg-zinc-800 hover:bg-zinc-700/85 transition-all text-white font-bold text-sm border border-white/10 shadow-lg cursor-pointer">
            <Plus className="mr-1.5 h-5 w-5" />
            Add Carousel
          </Button>
        </form>
        <form action={handleCreateHeaderAction} className="w-full">
          <Button type="submit" className="w-full h-14 rounded-2xl bg-zinc-800 hover:bg-zinc-700/85 transition-all text-white font-bold text-sm border border-white/10 shadow-lg cursor-pointer">
            <Plus className="mr-1.5 h-5 w-5" />
            Add Header Section
          </Button>
        </form>
      </div>

      <LinkManager initialLinks={links} />
    </div>
  )
}
