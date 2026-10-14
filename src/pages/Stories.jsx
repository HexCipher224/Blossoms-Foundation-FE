import StoryCard from '../components/StoryCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { stories } from '../data/stories.js'
import './Stories.css'

export default function Stories() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Voices from our work</span>
          <h1>Stories of hope</h1>
          <p>
            The stories below are fictional placeholders included to show how this page will look. They'll be
            replaced with real stories and consented photographs before launch.
          </p>
        </div>
      </section>

      <section className="stories-page">
        <div className="container">
          <div className="stories-page__grid">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Every story starts with support."
        text="Your generosity is what makes stories like these possible for real children and families."
        ctaLabel="Support Blossoms"
        ctaTo="/donate"
      />
    </>
  )
}
