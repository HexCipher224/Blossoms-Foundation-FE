import { GraduationCap, Utensils, HeartPulse, ShieldCheck, Users, Sprout } from 'lucide-react'

// Structured content — update copy here without touching component markup.
export const programs = [
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    description:
      'Supporting children with school fees, learning materials, mentorship, and educational opportunities that open doors to their future.',
    image: '/images/education.svg',
    color: 'green',
  },
  {
    id: 'nutrition',
    icon: Utensils,
    title: 'Food & Nutrition',
    description:
      'Helping vulnerable families and children access nutritious food, so no child has to learn, play, or grow on an empty stomach.',
    image: '/images/nutrition.svg',
    color: 'orange',
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Health & Wellbeing',
    description:
      'Supporting access to healthcare and promoting the physical and emotional wellbeing of children and the families who care for them.',
    image: '/images/healthcare.svg',
    color: 'green',
  },
  {
    id: 'child-protection',
    icon: ShieldCheck,
    title: 'Child Protection',
    description:
      'Creating safer environments for vulnerable children, working alongside families and communities to prevent harm and respond with care.',
    image: '/images/community.svg',
    color: 'yellow',
  },
  {
    id: 'family-support',
    icon: Users,
    title: 'Family Support',
    description:
      'Helping families develop sustainable livelihoods and build the resilience they need to support their children long after we step back.',
    image: '/images/about-children.svg',
    color: 'orange',
  },
  {
    id: 'community-development',
    icon: Sprout,
    title: 'Community Development',
    description:
      'Working with communities to identify local challenges and build sustainable, community-led solutions that last beyond any single project.',
    image: '/images/community.svg',
    color: 'green',
  },
]
