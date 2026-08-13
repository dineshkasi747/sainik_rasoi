'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { contactInfo } from '@/data/siteData'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/contact', label: 'Contact' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen((prev) => !prev)
    document.addEventListener('toggle-sidebar', handler)
    return () => document.removeEventListener('toggle-sidebar', handler)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      {/* Overlay */}
      <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={close} />

      {/* Sidebar Panel */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={close} aria-label="Close sidebar">
          <span>✕</span>
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <img src="/assets/logo.png" alt="Sainik Rasoi" />
        </div>

        <div className="sidebar-divider" />

        {/* About */}
        <div className="sidebar-about">
          <p>Experience the finest culinary journey since 1975. Authentic flavors, beautiful ambience, and unforgettable dining moments await you.</p>
        </div>

        <div className="sidebar-divider" />

        {/* Nav Links */}
        <nav className="sidebar-nav">
          <p className="sidebar-nav-label">Navigation</p>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-nav-link" onClick={close}>
              <span className="sidebar-nav-arrow">→</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-divider" />

        {/* Contact Info */}
        <div className="sidebar-contact">
          <p className="sidebar-nav-label">Contact Us</p>
          <div className="sidebar-contact-item">
            <span className="sidebar-contact-icon">📍</span>
            <span>{contactInfo.address}</span>
          </div>
          <div className="sidebar-contact-item">
            <span className="sidebar-contact-icon">📞</span>
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          </div>
          <div className="sidebar-contact-item">
            <span className="sidebar-contact-icon">✉️</span>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>
          <div className="sidebar-contact-item">
            <span className="sidebar-contact-icon">⏰</span>
            <div>
              <div>{contactInfo.hours.weekdays}</div>
              <div>{contactInfo.hours.weekend}</div>
            </div>
          </div>
        </div>

        <div className="sidebar-divider" />

        {/* Social Links */}
        <div className="sidebar-social">
          <a href={contactInfo.social.facebook} className="social-btn" aria-label="Facebook">f</a>
          <a href={contactInfo.social.instagram} className="social-btn" aria-label="Instagram">in</a>
          <a href={contactInfo.social.twitter} className="social-btn" aria-label="Twitter">tw</a>
          <a href={contactInfo.social.youtube} className="social-btn" aria-label="YouTube">yt</a>
        </div>

        {/* CTA */}
        <Link href="/contact" className="btn btn-primary sidebar-cta" onClick={close}>
          Reserve A Table
        </Link>
      </aside>

      <style jsx>{`
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1100;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
          backdrop-filter: blur(4px);
        }
        .sidebar-overlay.visible {
          opacity: 1;
          visibility: visible;
        }

        .sidebar {
          position: fixed;
          top: 0; right: 0;
          width: 360px;
          height: 100vh;
          background: var(--primary-color);
          z-index: 1200;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow-y: auto;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-close {
          position: absolute;
          top: 20px; right: 24px;
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          width: 36px; height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.85rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
        }
        .sidebar-close:hover {
          background: var(--secondary-color);
          border-color: var(--secondary-color);
          color: #fff;
        }

        .sidebar-logo img {
          height: 44px;
          width: auto;
          filter: brightness(0) invert(1);
          margin-bottom: 8px;
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 20px 0;
        }

        .sidebar-about p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          font-style: italic;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-nav-label {
          font-size: 0.72rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--secondary-color);
          margin-bottom: 12px;
          font-weight: 500;
        }

        .sidebar-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          color: rgba(255,255,255,0.75);
          font-size: 0.95rem;
          font-family: var(--font-heading);
          font-weight: 500;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s;
        }
        .sidebar-nav-link:hover { color: var(--secondary-color); padding-left: 8px; }
        .sidebar-nav-arrow { font-size: 0.8rem; opacity: 0.5; transition: all 0.3s; }
        .sidebar-nav-link:hover .sidebar-nav-arrow { opacity: 1; }

        .sidebar-contact { display: flex; flex-direction: column; gap: 12px; }
        .sidebar-contact-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.5;
        }
        .sidebar-contact-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
        .sidebar-contact-item a { color: rgba(255,255,255,0.65); transition: color 0.3s; }
        .sidebar-contact-item a:hover { color: var(--secondary-color); }

        .sidebar-social {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .social-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.6);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s;
          border-radius: 2px;
        }
        .social-btn:hover {
          background: var(--secondary-color);
          border-color: var(--secondary-color);
          color: #fff;
          transform: translateY(-2px);
        }

        .sidebar-cta {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          width: 100%;
          letter-spacing: 1.5px;
        }

        @media (max-width: 400px) {
          .sidebar { width: 100vw; }
        }
      `}</style>
    </>
  )
}
