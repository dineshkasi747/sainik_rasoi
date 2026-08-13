'use client'
import Link from 'next/link'
import { contactInfo } from '@/data/siteData'


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img src="/assets/logo.png" alt="HungryBuzz" className="footer-logo" />
            <p className="footer-tagline">
              A culinary journey that celebrates authentic flavors, beautiful ambience, and the joy of fine dining since 1975.
            </p>
            <div className="footer-social">
              {Object.entries(contactInfo.social).map(([key, href]) => (
                <a key={key} href={href} className="footer-social-btn" aria-label={key}>
                  {key[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {[['/', 'Home'], ['/about', 'About Us'], ['/menu', 'Our Menu'], ['/contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    <span className="link-arrow">→</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact-list">
              <li><span className="contact-icon">📍</span>{contactInfo.address}</li>
              <li><span className="contact-icon">📞</span><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></li>
              <li><span className="contact-icon">✉️</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">Opening Hours</h4>
            <div className="footer-hours">
              <div className="hours-item">
                <span className="hours-label">Monday – Friday</span>
                <span className="hours-time">11:00 AM – 10:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-label">Saturday – Sunday</span>
                <span className="hours-time">10:00 AM – 11:00 PM</span>
              </div>
            </div>
            <Link href="/contact" className="btn btn-primary footer-reserve">
              Reserve A Table
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} HungryBuzz. All Rights Reserved. Crafted with ❤️ for Fine Dining.
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--primary-color);
          color: rgba(255,255,255,0.65);
        }

        .footer-top { padding: 80px 0 60px; }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1.2fr;
          gap: 50px;
        }

        .footer-logo {
          height: 44px;
          width: auto;
          filter: brightness(0) invert(1);
          margin-bottom: 20px;
          object-fit: contain;
        }

        .footer-tagline {
          font-size: 0.88rem;
          line-height: 1.75;
          margin-bottom: 20px;
          max-width: 280px;
        }

        .footer-social { display: flex; gap: 8px; }
        .footer-social-btn {
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.6);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .footer-social-btn:hover {
          background: var(--secondary-color);
          border-color: var(--secondary-color);
          color: #fff;
          transform: translateY(-2px);
        }

        .footer-heading {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 40px; height: 2px;
          background: var(--secondary-color);
        }

        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-link {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.65);
          display: flex; align-items: center; gap: 8px;
          transition: all 0.3s;
        }
        .footer-link:hover { color: var(--secondary-color); padding-left: 4px; }
        .link-arrow { font-size: 0.75rem; color: var(--secondary-color); }

        .footer-contact-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-contact-list li {
          display: flex; gap: 10px; align-items: flex-start;
          font-size: 0.85rem; line-height: 1.5;
        }
        .contact-icon { flex-shrink: 0; }
        .footer-contact-list a { color: rgba(255,255,255,0.65); transition: color 0.3s; }
        .footer-contact-list a:hover { color: var(--secondary-color); }

        .footer-hours { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .hours-item { display: flex; flex-direction: column; gap: 2px; }
        .hours-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; color: var(--secondary-color); }
        .hours-time { font-size: 0.9rem; color: rgba(255,255,255,0.75); }

        .footer-reserve { font-size: 0.75rem; letter-spacing: 1.5px; }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 20px 0;
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-copy { font-size: 0.83rem; color: rgba(255,255,255,0.4); }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 30px; }
          .footer-top { padding: 50px 0 40px; }
        }
      `}</style>
    </footer>
  )
}
