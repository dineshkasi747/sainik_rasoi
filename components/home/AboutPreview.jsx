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
              <img src="/assets/food/about_image.jpg" alt="Sainik Rasoi Traditional Kitchen" />
            </div>
            <div className="img-secondary">
              <img src="/assets/food/cat_thali.jpg" alt="Royal Vegetarian Feast" />
              <div className="img-badge">
                <span className="badge-number">50</span>
                <span className="badge-text">Years of Excellence</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection animationClass="animate-fadeInRight" className="about-preview-content">
            <span className="section-tag">🌱 100% Pure Vegetarian</span>
            <h2 className="section-title">
              The Legacy of Authentic<br />
              <span className="accent">Pure Veg Dining</span>
            </h2>
            <div className="title-line"></div>
            <p className="section-desc">
              At Sainik Rasoi, we are dedicated to crafting authentic 100% pure vegetarian culinary masterpieces. With time-honored Indian recipes, farm-fresh ingredients, and uncompromised purity, we bring royal homestyle flavors to your table.
            </p>
            <p className="about-desc-2">
              From our rich and creamy paneer curries to slow-simmered dals, hot tawa phulkas, stuffed parathas, and golden snacks, every meal is prepared with fresh spices, hygienic care, and heartwarming hospitality.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-num">100%</span>
                <span className="stat-label">Pure Veg</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">60+</span>
                <span className="stat-label">Menu Delicacies</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">15k+</span>
                <span className="stat-label">Happy Guests</span>
              </div>
            </div>
            <Link href="/about" className="btn btn-dark">
              Discover Our Story
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
