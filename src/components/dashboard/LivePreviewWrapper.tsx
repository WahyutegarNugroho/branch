import { LivePreview } from '@/components/dashboard/LivePreview'
import { getLinks } from '@/app/actions/link-actions'

import type { Profile } from '@/types'

export default async function LivePreviewWrapper({ profile }: { profile: Profile | null }) {
  const links = await getLinks()

  return <LivePreview profile={profile} links={links} />
}
