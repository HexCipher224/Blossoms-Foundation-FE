import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '../context/LocaleContext.jsx'
import './ProgramCard.css'

export default function ProgramCard({ program }) {
  const { t, tf } = useLocale()
  const Icon = program.icon

  return (
    <article className={`program-card program-card--${program.color}`}>
      <div className="program-card__icon">
        <Icon size={22} strokeWidth={2} />
      </div>
      <h3>{tf(`programs.${program.id}.title`, program.title)}</h3>
      <p>{tf(`programs.${program.id}.desc`, program.description)}</p>
      <Link to="/programs" className="program-card__link">
        {t('programs.learnMore')} <ArrowRight size={16} />
      </Link>
    </article>
  )
}
