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
    await createLink()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Links</h1>
        <p className="text-zinc-400 text-base mt-1">Manage your links and embed content.</p>
      </div>
      
      <form action={handleCreateLinkAction}>
        <Button type="submit" className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-bold text-lg border-0 shadow-lg">
          <Plus className="mr-2 h-6 w-6" />
          Add New Link
        </Button>
      </form>

      <LinkManager initialLinks={links} />
    </div>
  )
}
