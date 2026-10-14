import { useLocale } from '../context/LocaleContext.jsx'
import useReveal from '../hooks/useReveal.js'
import useCountUp from '../hooks/useCountUp.js'
import { impactStats } from '../data/stats.js'
import './ImpactStats.css'

function Stat({ stat, active }) {
  const { t } = useLocale()
  const value = useCountUp(stat.value, active)
  return (
    <div className="stat">
      <p className="stat__value">
        {value.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="stat__label">{t(`stats.${stat.id}`)}</p>
    </div>
  )
}

export default function ImpactStats() {
  const { t } = useLocale()
  const [ref, isVisible] = useReveal({ threshold: 0.4 })

  return (
    <section className="impact-stats" ref={ref}>
      <div className="container">
        <div className="impact-stats__note">
          <span className="eyebrow">{t('stats.eyebrow')}</span>
        </div>
        <div className="impact-stats__grid">
          {impactStats.map((stat) => (
            <Stat key={stat.id} stat={stat} active={isVisible} />
          ))}
        </div>
        <p className="impact-stats__disclaimer">
          {t('stats.disclaimer')}
        </p>
      </div>
    </section>
  )
}
