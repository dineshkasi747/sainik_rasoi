'use client'
import { useState } from 'react'
import { contactInfo } from '@/data/siteData'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="contact-section section-padding">
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal-left">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Visit <span className="accent">Us</span></h2>
            <div className="title-line" />
            <p className="contact-intro">
              We would love to hear from you. Whether you are planning a special occasion or simply want to make a reservation, we are here to help.
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div>
                  <strong>Our Location</strong>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div>
                  <strong>Phone Number</strong>
                  <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div>
                  <strong>Email Address</strong>
                  <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">⏰</div>
                <div>
                  <strong>Opening Hours</strong>
                  <p>{contactInfo.hours.weekdays}</p>
                  <p>{contactInfo.hours.weekend}</p>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1697000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HungryBuzz Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrapper reveal-right">
            <div className="contact-form-card">
              <h3 className="form-title">Send Us a Message</h3>
              <p className="form-subtitle">Or Reserve Your Table</p>

              {sent && (
                <div className="form-success">
                  ✓ Your message has been sent! We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="Table Reservation"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your reservation or inquiry..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section { background: var(--bgr-light); }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
        }

        .contact-intro {
          font-size: 0.92rem;
          color: #888;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .contact-items { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }
        .contact-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .contact-item-icon {
          width: 44px; height: 44px;
          background: var(--secondary-color);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .contact-item strong {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--primary-color);
          margin-bottom: 4px;
        }
        .contact-item p {
          font-size: 0.88rem;
          color: #888;
          line-height: 1.5;
        }
        .contact-item a { color: #888; transition: color 0.3s; }
        .contact-item a:hover { color: var(--secondary-color); }

        .contact-map {
          width: 100%;
          height: 240px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--seventh-color);
        }
        .contact-map iframe { width: 100%; height: 100%; border: none; }

        .contact-form-card {
          background: #fff;
          padding: 48px 40px;
          border-radius: 4px;
          box-shadow: var(--shadow);
        }

        .form-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .form-subtitle {
          font-style: italic;
          color: var(--secondary-color);
          font-family: var(--font-heading);
          font-size: 1rem;
          margin-bottom: 28px;
        }

        .form-success {
          background: rgba(200, 105, 58, 0.1);
          border: 1px solid var(--secondary-color);
          color: var(--secondary-color);
          padding: 14px 20px;
          border-radius: 4px;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .contact-form { display: flex; flex-direction: column; gap: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }

        .form-group label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--primary-color);
          font-weight: 500;
        }
        .form-group input,
        .form-group textarea {
          padding: 12px 16px;
          border: 1px solid var(--seventh-color);
          border-radius: 2px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--primary-color);
          background: var(--bgr-light);
          transition: border-color 0.3s;
          outline: none;
          width: 100%;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--secondary-color);
          background: #fff;
        }
        .form-group textarea { resize: vertical; }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: #bbb; }

        .form-submit { width: 100%; justify-content: center; letter-spacing: 1.5px; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-form-card { padding: 30px 24px; }
        }
      `}</style>
    </section>
  )
}
