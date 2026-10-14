import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { sendContactMessage } from '../config/api.js'
import './Contact.css'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.subject.trim()) next.subject = 'Please add a subject.'
    if (!form.message.trim()) next.message = 'Please write a short message.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    setSendError('')
    if (Object.keys(validationErrors).length > 0) return

    setSending(true)
    try {
      await sendContactMessage(form)
      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setSendError('We could not send your message right now. Please try again, or email us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">We'd love to hear from you</span>
          <h1>Contact us</h1>
          <p>Questions about our programs, partnerships, or how to get involved? Reach out any time.</p>
        </div>
      </section>

      <section className="contact-page">
        <div className="container contact-page__grid">
          <div className="contact-info">
            <h2>Blossoms Foundation</h2>
            <ul>
              <li>
                <Mail size={18} />
                <a href="mailto:info@blossomsfoundation.org">info@blossomsfoundation.org</a>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+254000000000">+254 XXX XXX XXX</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>Kenya</span>
              </li>
            </ul>
            <img src="/images/contact-side.svg" alt="" className="contact-info__img" loading="lazy" />
            <p className="contact-info__note">
              Phone number shown is a placeholder. Replace it with the Foundation's real contact line.
            </p>
          </div>

          <div className="contact-form-wrap card">
            {submitted ? (
              <div className="contact-success" role="status">
                <h2>Message received.</h2>
                <p>Thank you for reaching out. Our team will get back to you as soon as we can.</p>
                <button type="button" className="btn btn-outline" onClick={() => setSubmitted(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="field">
                    <label htmlFor="contact-phone">Phone (optional)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      aria-invalid={Boolean(errors.subject)}
                    />
                    {errors.subject && <p className="field-error">{errors.subject}</p>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && <p className="field-error">{errors.message}</p>}
                </div>

                {sendError && <p className="field-error" role="alert">{sendError}</p>}
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Sending…' : 'Send Message'} <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
