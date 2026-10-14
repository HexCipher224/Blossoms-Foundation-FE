import { Heart, Sprout, Users, Scale, Sparkles } from 'lucide-react'
import SectionTitle from '../components/SectionTitle.jsx'
import CTASection from '../components/CTASection.jsx'
import Gallery from '../components/Gallery.jsx'
import './About.css'

const values = [
  { icon: Heart, label: 'Compassion', text: 'We meet every child and family with empathy, not judgment.' },
  { icon: Sprout, label: 'Growth', text: 'We invest in long-term potential, not short-term fixes.' },
  { icon: Users, label: 'Community', text: 'Lasting change happens alongside communities, not for them.' },
  { icon: Scale, label: 'Dignity', text: 'Every person we work with is treated with respect and agency.' },
  { icon: Sparkles, label: 'Hope', text: 'We believe every child\u2019s story can still turn toward brighter.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="container">
          <span className="eyebrow">About Blossoms Foundation</span>
          <h1>Growing hope. Creating change.</h1>
          <p>
            Blossoms Foundation believes that every child deserves the opportunity to grow, learn, feel safe, and
            dream about their future.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__grid">
          <img src="/images/about-children.svg" alt="Children participating in a Blossoms Foundation program" />
          <div>
            <SectionTitle
              eyebrow="Our story"
              title="A community-first approach"
              description="Blossoms Foundation is a community-focused nonprofit dedicated to supporting vulnerable children, families, and disadvantaged communities. We work to provide children with access to education, food, healthcare, shelter, emotional support, and opportunities to build a better future."
            />
            <p className="about-story__note">
              Content on this page — including our history and founding details — is a placeholder pending the
              Foundation's real organizational information.
            </p>
          </div>
        </div>
      </section>

      <section className="mvv">
        <div className="container mvv__grid">
          <div className="mvv__card">
            <h3>Mission</h3>
            <p>
              To support vulnerable children, families, and communities with access to education, food, healthcare,
              shelter, and emotional support — helping every child blossom.
            </p>
          </div>
          <div className="mvv__card">
            <h3>Vision</h3>
            <p>
              A future where every child, regardless of circumstance, has the opportunity to grow up safe, educated,
              healthy, and hopeful.
            </p>
          </div>
          <div className="mvv__card">
            <h3>Values</h3>
            <p>Compassion, growth, community, dignity, and hope guide every decision we make.</p>
          </div>
        </div>
      </section>

      <Gallery />

      <section className="values-section">
        <div className="container">
          <SectionTitle eyebrow="What guides us" title="Our values" align="center" />
          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.label}>
                <value.icon size={22} />
                <h3>{value.label}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come alongside our work."
        text="Whether through giving, volunteering, or simply sharing our story, there's a place for you in this work."
        ctaLabel="Get involved"
        ctaTo="/get-involved"
      />
    </>
  )
}
