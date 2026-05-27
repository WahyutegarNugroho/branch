import { LivePreview } from '@/components/dashboard/LivePreview'
import { getLinks } from '@/app/actions/link-actions'

export default async function LivePreviewWrapper({ profile }: { profile: any }) {
  const links = await getLinks()

  return <LivePreview profile={profile} links={links} />
}
