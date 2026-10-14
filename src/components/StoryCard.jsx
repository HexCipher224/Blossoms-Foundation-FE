import { ArrowRight } from 'lucide-react'
import { useLocale } from '../context/LocaleContext.jsx'
import './StoryCard.css'

export default function StoryCard({ story }) {
  const { t } = useLocale()
  return (
    <article className="story-card">
      <div className="story-card__image-wrap">
        <img src={story.image} alt="" className="story-card__image" width="400" height="280" />
        <span className="story-card__category">{story.category}</span>
      </div>
      <div className="story-card__body">
        <h3>{story.title}</h3>
        <p>{story.excerpt}</p>
        <button type="button" className="story-card__link">
          {t('stories.read')} <ArrowRight size={16} />
        </button>
        {story.isPlaceholder && (
          <p className="story-card__flag">Placeholder story — not a real account</p>
        )}
      </div>
    </article>
  )
}
