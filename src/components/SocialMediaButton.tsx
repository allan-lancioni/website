import { IconDefinition, faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faLinkedinIn,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

type AvailablePlatforms = 'linkedin' | 'twitter' | 'facebook' | 'email' | 'copy'

type Platform = {
  name: AvailablePlatforms
  icon: IconDefinition
  label: string
  baseURL: string
}

const platforms: Record<AvailablePlatforms, Platform> = {
  linkedin: {
    name: 'linkedin',
    icon: faLinkedinIn,
    label: 'Share on LinkedIn',
    baseURL: 'https://www.linkedin.com/shareArticle?mini=true&url=',
  },
  twitter: {
    name: 'twitter',
    icon: faXTwitter,
    label: 'Share on Twitter',
    baseURL: 'https://twitter.com/intent/tweet?url=',
  },
  facebook: {
    name: 'facebook',
    icon: faFacebook,
    label: 'Share on Facebook',
    baseURL: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  email: {
    name: 'email',
    icon: faEnvelope,
    label: 'Share via Email',
    baseURL: 'mailto:?subject=Check%20this%20out&body=',
  },
  copy: {
    name: 'copy',
    icon: faCopy,
    label: 'Copy Link',
    baseURL: '',
  },
}

const SocialMediaButton = ({ platform, link }: { platform: AvailablePlatforms, link: string }) => {
  const data = platforms[platform]
  return (
    <Link href={data.baseURL + link} passHref>
      <button
        type="button"
        title={data.label}
        aria-label={data.label}
        className="p-2 text-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={data.icon} />
      </button>
    </Link>
  )
}

export default SocialMediaButton
