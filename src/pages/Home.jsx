import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import ImpactStats from '../components/ImpactStats.jsx'
import Gallery from '../components/Gallery.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import CTASection from '../components/CTASection.jsx'
import StoryCard from '../components/StoryCard.jsx'
import { useLocale } from '../context/LocaleContext.jsx'
import { programs } from '../data/programs.js'
import { stories } from '../data/stories.js'
import { involvementWays } from '../data/getInvolved.js'
import './Home.css'

const values = [
  { emoji: '❤️', key: 'values.compassion' },
  { emoji: '🌱', key: 'values.growth' },
  { emoji: '🤝', key: 'values.community' },
  { emoji: '⚖️', key: 'values.dignity' },
  { emoji: '✨', key: 'values.hope' },
]

export default function Home() {
  const { t } = useLocale()
  return (
    <>
      <Hero />
      <ImpactStats />
      <Gallery />

      <section className="about-preview">
        <div className="container about-preview__grid">
          <div className="about-preview__media">
            <img src="/images/about-children.svg" alt="" width="520" height="600" loading="lazy" />
          </div>
          <div className="about-preview__copy">
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h2>{t('about.title')}</h2>
            <p>{t('about.text')}</p>
            <ul className="about-preview__values">
              {values.map((v) => (
                <li key={v.key}>
                  <span aria-hidden="true">{v.emoji}</span> {t(v.key)}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-outline">
              {t('about.learnMore')}
            </Link>
          </div>
        </div>
      </section>

      <section className="programs-preview">
        <div className="container">
          <SectionTitle eyebrow={t('programs.eyebrow')} title={t('programs.title')} description={t('programs.desc')} align="center" />
          <div className="programs-preview__grid">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <section className="stories-preview">
        <div className="container">
          <SectionTitle eyebrow={t('stories.eyebrow')} title={t('stories.title')} description={t('stories.desc')} align="center" />
          <div className="stories-preview__grid">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
          <div className="stories-preview__more">
            <Link to="/stories" className="btn btn-outline">
              {t('stories.more')}
            </Link>
          </div>
        </div>
      </section>

      <section className="involved-preview">
        <div className="container">
          <SectionTitle eyebrow={t('involved.eyebrow')} title={t('involved.title')} description={t('involved.desc')} align="center" />
          <div className="involved-preview__grid">
            {involvementWays.map((way) => (
              <Link to={way.to} key={way.id} className="involved-chip">
                <way.icon size={20} />
                <span>{t(`involved.${way.id}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
