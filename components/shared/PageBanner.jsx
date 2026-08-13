'use client'

export default function PageBanner({ title, breadcrumb }) {
  return (
    <section className="page-banner">
      <div className="page-banner-bg" style={{ backgroundImage: 'url(/assets/bg7.jpg)' }} />
      <div className="page-banner-overlay" />
      <div className="page-banner-content container">
        <span className="page-banner-breadcrumb">Home / {breadcrumb}</span>
        <h1 className="page-banner-title animate-fadeInUp">{title}</h1>
        <div className="page-banner-line" />
      </div>

      <style jsx>{`
        .page-banner {
          position: relative;
          height: 360px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .page-banner-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          animation: subtleZoom 10s ease infinite alternate;
        }
        @keyframes subtleZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.12); }
        }
        .page-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(31, 25, 23, 0.85) 0%,
            rgba(31, 25, 23, 0.65) 100%
          );
        }
        .page-banner-content {
          position: relative;
          z-index: 2;
          padding-top: 80px;
        }
        .page-banner-breadcrumb {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 12px;
        }
        .page-banner-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          animation: fadeInUp 0.8s ease 0.1s both;
        }
        .page-banner-line {
          width: 70px;
          height: 3px;
          background: var(--secondary-color);
          margin-top: 16px;
          animation: lineGrow 0.8s ease 0.3s both;
        }
      `}</style>
    </section>
  )
}
