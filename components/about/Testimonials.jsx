'use client'
import { useState } from 'react'
import { testimonials } from '@/data/siteData'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <section className="testimonials">
      <div className="testimonials-bg" style={{ backgroundImage: 'url(/assets/bg16.jpg)' }} />
      <div className="testimonials-overlay" />
      <div className="container testimonials-content">
        <div className="testimonials-header reveal">
          <span className="section-tag" style={{ color: 'var(--secondary-color)' }}>Testimonials</span>
          <h2 className="section-title" style={{ color: '#fff' }}>
            What Our <span className="accent">Guests</span> Say
          </h2>
          <div className="title-line" style={{ margin: '0 auto 0' }} />
        </div>

        <div className="testimonial-card reveal">
          <div className="testimonial-quote">"</div>
          <p className="testimonial-text">{t.text}</p>
          <div className="testimonial-author">
            <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
            <div>
              <strong className="testimonial-name">{t.name}</strong>
              <span className="testimonial-role">{t.role}</span>
            </div>
            <div className="testimonial-stars">
              {'★'.repeat(t.rating)}
            </div>
          </div>
        </div>

        {/* Dots nav */}
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
        }
        .testimonials-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .testimonials-overlay {
          position: absolute;
          inset: 0;
          background: rgba(31, 25, 23, 0.9);
        }
        .testimonials-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 40px;
        }
        .testimonials-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .testimonial-card {
          max-width: 720px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 50px;
          border-radius: 4px;
          backdrop-filter: blur(10px);
          position: relative;
        }

        .testimonial-quote {
          font-family: var(--font-heading);
          font-size: 6rem;
          color: var(--secondary-color);
          line-height: 0.5;
          opacity: 0.5;
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-style: italic;
          color: rgba(255,255,255,0.85);
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .testimonial-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--secondary-color);
        }
        .testimonial-name {
          display: block;
          color: #fff;
          font-size: 1rem;
          font-family: var(--font-heading);
        }
        .testimonial-role {
          display: block;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2px;
        }
        .testimonial-stars {
          color: var(--secondary-color);
          font-size: 1rem;
          margin-left: auto;
        }

        .testimonial-dots {
          display: flex;
          gap: 10px;
        }
        .t-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .t-dot.active {
          background: var(--secondary-color);
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .testimonial-card { padding: 30px 24px; }
          .testimonial-text { font-size: 1rem; }
          .testimonial-stars { margin-left: 0; }
        }
      `}</style>
    </section>
  )
}
