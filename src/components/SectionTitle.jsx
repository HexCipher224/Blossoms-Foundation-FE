import './SectionTitle.css'

export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p className="section-title__desc">{description}</p>}
    </div>
  )
}
