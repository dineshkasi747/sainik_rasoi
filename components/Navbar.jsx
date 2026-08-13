'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Toggle sidebar via custom event
  const openSidebar = () => {
    document.dispatchEvent(new CustomEvent('toggle-sidebar'))
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''} ${isHome && !scrolled ? 'transparent' : ''}`}>
        <div className="navbar-inner container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <img src="/assets/logo.png" alt="Sainik Rasoi" className="logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link href="/contact" className="btn btn-primary reserve-btn">
              Reserve A Table
            </Link>
            {/* Sidebar toggle (hamburger) */}
            <button className="sidebar-toggle" onClick={openSidebar} aria-label="Open sidebar">
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* Mobile hamburger */}
            <button
              className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
            Reserve A Table
          </Link>
        </nav>
      </header>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.4s ease;
          background: transparent;
        }
        .navbar.transparent {
          background: transparent;
        }
        .navbar.scrolled,
        .navbar:not(.transparent) {
          background: rgba(247, 243, 237, 0.95);
          backdrop-filter: blur(10px);
          padding: 14px 0;
          box-shadow: 0 4px 30px rgba(42, 36, 35, 0.08);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .navbar-logo .logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: all 0.3s;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          padding: 8px 16px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--primary-color);
          transition: all 0.3s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 16px; right: 16px;
          height: 1px;
          background: var(--secondary-color);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover, .nav-link.active { color: var(--secondary-color); }
        .nav-link:hover::after, .nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .reserve-btn {
          font-size: 0.72rem;
          padding: 11px 22px;
          letter-spacing: 1px;
        }

        .sidebar-toggle {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .sidebar-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--primary-color);
          transition: all 0.3s;
        }
        .sidebar-toggle span:nth-child(2) { width: 16px; }
        .sidebar-toggle:hover span { background: var(--secondary-color); }
        .sidebar-toggle:hover span:nth-child(2) { width: 24px; }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .mobile-menu-btn span {
          display: block;
          height: 2px;
          background: var(--primary-color);
          transition: all 0.3s;
        }
        .mobile-menu-btn span:nth-child(1) { width: 24px; }
        .mobile-menu-btn span:nth-child(2) { width: 18px; }
        .mobile-menu-btn span:nth-child(3) { width: 24px; }
        .mobile-menu-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .mobile-menu-btn.open span:nth-child(2) { opacity: 0; }
        .mobile-menu-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          background: rgba(247, 243, 237, 0.98);
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .mobile-nav.open {
          max-height: 400px;
          padding: 16px 0;
        }
        .mobile-nav-link {
          padding: 14px 30px;
          color: var(--primary-color);
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--secondary-color);
          padding-left: 40px;
        }
        .mobile-nav .btn {
          margin: 16px 30px 4px;
          text-align: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .navbar-links { display: none; }
          .reserve-btn { display: none; }
          .mobile-menu-btn { display: flex; }
        }
        @media (min-width: 901px) {
          .mobile-nav { display: none; }
        }
      `}</style>
    </>
  )
}
