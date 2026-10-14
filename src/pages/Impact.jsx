import { MapPin } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import ImpactStats from '../components/ImpactStats.jsx'
import CTASection from '../components/CTASection.jsx'
import { impactLocations, impactAreas } from '../data/stats.js'
import './Impact.css'

export default function Impact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our impact</span>
          <h1>The difference we're working toward</h1>
          <p>
            A look at where we work and what our programs focus on. Figures on this page are demonstration content
            until replaced with verified data.
          </p>
        </div>
      </section>

      <ImpactStats />

      <section className="where-we-work">
        <div className="container">
          <SectionTitle
            eyebrow="Where we work"
            title="Communities we work alongside"
            description="Example locations shown below for layout purposes only — these must be replaced with the Foundation's actual operating areas before publishing."
          />
          <div className="where-we-work__grid">
            <div className="where-we-work__map">
              <img src="/images/impact-map.svg" alt="Illustrative map placeholder of Kenya operating regions" />
            </div>
            <ul className="where-we-work__list">
              {impactLocations.map((loc) => (
                <li key={loc.id}>
                  <MapPin size={18} />
                  <div>
                    <strong>{loc.name}</strong>
                    <span>{loc.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="impact-areas">
        <div className="container">
          <SectionTitle eyebrow="Focus areas" title="What our impact covers" align="center" />
          <div className="impact-areas__list">
            {impactAreas.map((area) => (
              <div className="impact-area" key={area.id}>
                <div className="impact-area__head">
                  <span>{area.label}</span>
                  <strong>{area.value}%</strong>
                </div>
                <div className="impact-area__bar">
                  <div className="impact-area__fill" style={{ width: `${area.value}%` }} />
                </div>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
          <p className="impact-areas__disclaimer">
            Percentages are illustrative placeholders and do not represent verified outcomes.
          </p>
        </div>
      </section>

      <CTASection
        title="Help us grow this impact."
        text="Every donation, volunteer hour, and partnership adds another data point we're proud of."
        ctaLabel="Donate now"
        ctaTo="/donate"
      />
    </>
  )
}
