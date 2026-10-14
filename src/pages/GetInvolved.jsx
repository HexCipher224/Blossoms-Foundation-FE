import { Link } from 'react-router-dom'
import { involvementWays } from '../data/getInvolved.js'
import SectionTitle from '../components/SectionTitle.jsx'
import CTASection from '../components/CTASection.jsx'
import './GetInvolved.css'

export default function GetInvolved() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Join us</span>
          <h1>Get involved</h1>
          <p>
            There are many ways to stand with children and families. Whatever your time, skills, or resources allow,
            there's a place for you here.
          </p>
        </div>
      </section>

      <section className="involve-banner">
        <div className="container">
          <img src="/images/involve-banner.svg" alt="" loading="lazy" />
        </div>
      </section>

      <section className="involve-list">
        <div className="container">
          <SectionTitle eyebrow="Ways to help" title="Choose how you'd like to contribute" />
          <div className="involve-list__grid">
            {involvementWays.map((way) => (
              <article className="involve-card card" key={way.id}>
                <div className="involve-card__icon">
                  <way.icon size={24} />
                </div>
                <h3>{way.title}</h3>
                <p>{way.description}</p>
                <Link to={way.to} className="btn btn-outline involve-card__cta">
                  {way.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure where to start?"
        text="Reach out and tell us a little about yourself — we'll help you find the right way to get involved."
        ctaLabel="Contact us"
        ctaTo="/contact"
      />
    </>
  )
}
