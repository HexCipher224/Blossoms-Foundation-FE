import { HeartHandshake, Clock, Handshake, Megaphone, Share2 } from 'lucide-react'

export const involvementWays = [
  {
    id: 'donate',
    icon: HeartHandshake,
    title: 'Donate',
    description: 'Help fund the programs that give children access to education, food, healthcare, and safety.',
    cta: 'Donate now',
    to: '/donate',
  },
  {
    id: 'volunteer',
    icon: Clock,
    title: 'Volunteer',
    description: 'Give your time and skills, from mentoring children to supporting projects on the ground.',
    cta: 'Learn about volunteering',
    to: '/contact',
  },
  {
    id: 'partner',
    icon: Handshake,
    title: 'Partner With Us',
    description: 'Businesses and organizations can collaborate with us to reach more children and communities.',
    cta: 'Start a partnership',
    to: '/contact',
  },
  {
    id: 'fundraise',
    icon: Megaphone,
    title: 'Fundraise',
    description: 'Run your own fundraiser, big or small, and help raise funds for children and communities in need.',
    cta: 'Start fundraising',
    to: '/contact',
  },
  {
    id: 'spread-the-word',
    icon: Share2,
    title: 'Spread the Word',
    description: 'Share our mission with your network. Awareness is often the first step toward real support.',
    cta: 'Follow our work',
    to: '/contact',
  },
]
