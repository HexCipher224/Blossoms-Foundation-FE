import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__mark" aria-hidden="true">
          🌱
        </span>
        <h1>This page hasn't blossomed yet.</h1>
        <p>The page you're looking for doesn't exist or may have moved. Let's get you back on track.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
