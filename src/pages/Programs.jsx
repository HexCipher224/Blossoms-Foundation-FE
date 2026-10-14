import { programs } from '../data/programs.js'
import CTASection from '../components/CTASection.jsx'
import './Programs.css'

export default function Programs() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">What we do</span>
          <h1>Our programs</h1>
          <p>
            Six areas of work, shaped by what children and families tell us they need most — from a meal today to a
            safer tomorrow.
          </p>
        </div>
      </section>

      <section className="programs-detail">
        <div className="container">
          {programs.map((program, index) => (
            <article
              key={program.id}
              className={`program-row ${index % 2 === 1 ? 'program-row--reverse' : ''}`}
              id={program.id}
            >
              <div className="program-row__media">
                <img src={program.image} alt="" width="560" height="400" />
              </div>
              <div className="program-row__copy">
                <div className={`program-row__icon program-row__icon--${program.color}`}>
                  <program.icon size={24} />
                </div>
                <h2>{program.title}</h2>
                <p>{program.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Help us reach more children."
        text="Every program on this page runs because someone chose to give, volunteer, or partner with us."
        ctaLabel="Donate now"
        ctaTo="/donate"
      />
    </>
  )
}
