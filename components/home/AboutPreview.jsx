'use client'
import Link from 'next/link'
import AnimatedSection from '@/components/shared/AnimatedSection'


export default function AboutPreview() {
  return (
    <section className="about-preview section-padding">
      <div className="container">
        <div className="about-preview-grid">
          {/* Images */}
          <AnimatedSection animationClass="animate-fadeInLeft" className="about-preview-images">
            <div className="img-primary">
              <img src="/assets/about1-1000x1400.jpg" alt="Restaurant dining" />
            </div>
            <div className="img-secondary">
              <img src="/assets/about2.jpg" alt="Fine dining" />
              <div className="img-badge">
                <span className="badge-number">50</span>
                <span className="badge-text">Years of Excellence</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animationClass="animate-fadeInRight" className="about-preview-content">
            <span className="section-tag">Our Story</span>
            <h2 className="section-title">
              We have Started Our Journey to<br />
              <span className="accent">Serve You</span> from 1975
            </h2>
            <div className="title-line"></div>
            <p className="section-desc">
              For over four decades, we have embarked on a remarkable journey dedicated to serving our valued customers. Since our establishment in 1975, our unwavering commitment to excellence has guided us every step of the way.
            </p>
            <p className="about-desc-2">
              From our humble beginnings, we recognized the importance of building strong relationships with our customers. We understood that trust and loyalty were the pillars upon which successful businesses are built.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-num">50+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">12k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">120+</span>
                <span className="stat-label">Menu Items</span>
              </div>
            </div>
            <Link href="/about" className="btn btn-dark">
              Discover More
            </Link>
          </AnimatedSection>
        </div>
      </div>

      <style jsx>{`
        .about-preview { background: var(--bgr-light); }

        .about-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 70px;
          align-items: center;
        }

        .about-preview-images {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: start;
        }

        .img-primary {
          grid-row: span 2;
          border-radius: 4px;
          overflow: hidden;
        }
        .img-primary img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .img-primary:hover img { transform: scale(1.04); }

        .img-secondary {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 60px;
        }
        .img-secondary img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .img-secondary:hover img { transform: scale(1.04); }

        .img-badge {
          position: absolute;
          bottom: 16px; left: 16px;
          background: var(--secondary-color);
          padding: 14px 20px;
          color: #fff;
          border-radius: 2px;
          text-align: center;
        }
        .badge-number {
          display: block;
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }
        .badge-text {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.9;
          margin-top: 4px;
        }

        .about-preview-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-desc-2 {
          font-size: 0.92rem;
          color: #888;
          line-height: 1.8;
          margin-top: -4px;
        }

        .about-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px 0;
          border-top: 1px solid var(--seventh-color);
          border-bottom: 1px solid var(--seventh-color);
          margin: 8px 0;
        }
        .stat { text-align: center; flex: 1; }
        .stat-num {
          display: block;
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--secondary-color);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--fifth-color);
          margin-top: 4px;
          display: block;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--seventh-color);
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .about-preview-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-preview-images { max-width: 500px; margin: 0 auto; }
        }
        @media (max-width: 600px) {
          .about-preview-images { grid-template-columns: 1fr; }
          .img-secondary { margin-top: 0; }
        }
      `}</style>
    </section>
  )
}
