import { Quote } from 'lucide-react'
import './Testimonial.css'

export default function Testimonial({ quote, name, role }) {
  return (
    <figure className="testimonial">
      <Quote className="testimonial__icon" size={30} aria-hidden="true" />
      <blockquote>
        <p>{quote}</p>
      </blockquote>
      <figcaption>
        <span className="testimonial__name">{name}</span>
        {role && <span className="testimonial__role">{role}</span>}
      </figcaption>
    </figure>
  )
}
