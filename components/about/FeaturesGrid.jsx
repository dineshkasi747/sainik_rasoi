'use client'
import { features } from '@/data/siteData'


export default function FeaturesGrid() {
  return (
    <section className="features section-padding">
      <div className="container">
        <div className="features-header reveal">
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title">What Makes Us <span className="accent">Special</span></h2>
          <div className="title-line" style={{ margin: '0 auto 20px' }} />
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <div className="feature-card reveal" key={feature.id} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="feature-icon-wrapper">
                <img src={feature.icon} alt={feature.title} className="feature-icon" />
                <div className="feature-icon-ring" />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features { background: var(--bgr-light); }

        .features-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .feature-card {
          background: #fff;
          padding: 40px 28px;
          text-align: center;
          border-radius: 4px;
          box-shadow: var(--shadow);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: var(--secondary-color);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }
        .feature-card:hover::before { transform: scaleX(1); }

        .feature-icon-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 20px;
        }
        .feature-icon {
          width: 62px;
          height: 62px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          transition: transform 0.4s ease;
        }
        .feature-card:hover .feature-icon { transform: scale(1.1) rotate(5deg); }

        .feature-icon-ring {
          position: absolute;
          inset: -8px;
          border: 2px dashed rgba(200, 105, 58, 0.25);
          border-radius: 50%;
          animation: spin 10s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .feature-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 12px;
        }
        .feature-desc {
          font-size: 0.87rem;
          color: #888;
          line-height: 1.75;
        }

        @media (max-width: 1000px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
