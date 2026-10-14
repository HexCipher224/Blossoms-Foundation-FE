import { useLocale } from '../context/LocaleContext.jsx'
import SectionTitle from './SectionTitle.jsx'
import './Gallery.css'

// PLACEHOLDER PHOTOS: swap these for real, consented photographs
// (see public/images/README.md). Keep alt text factual and non-identifying.
const photos = [
  { src: '/images/gallery-1.svg', altKey: 'gallery.alt1' },
  { src: '/images/gallery-2.svg', altKey: 'gallery.alt2' },
  { src: '/images/gallery-3.svg', altKey: 'gallery.alt3' },
  { src: '/images/gallery-4.svg', altKey: 'gallery.alt4' },
]

export default function Gallery() {
  const { t } = useLocale()
  return (
    <section className="gallery">
      <div className="container">
        <SectionTitle eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} description={t('gallery.desc')} />
        <div className="gallery__grid">
          {photos.map((photo, i) => (
            <figure className={`gallery__item gallery__item--${i + 1}`} key={photo.src}>
              <img src={photo.src} alt={t(photo.altKey)} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
