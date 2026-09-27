'use client'

export default function AboutContent() {
  return (
    <section className="about-content section-padding">
      <div className="container">
        <div className="about-content-grid">
          <div className="about-left reveal-left">
            <span className="section-tag">🌱 100% Pure Vegetarian</span>
            <h2 className="section-title">About <span className="accent">Sainik Rasoi</span></h2>
            <div className="title-line" />
            <h3 className="about-sub">
              Authentic Pure Vegetarian<br />Culinary Excellence
            </h3>
          </div>
          <div className="about-right reveal-right">
            <p>
              At Sainik Rasoi, we have dedicated ourselves to serving authentic, 100% pure vegetarian culinary delicacies prepared with utmost devotion, farm-fresh ingredients, and traditional Indian spices. Our kitchen is founded on the timeless philosophy of purity, uncompromised taste, and royal hospitality.
            </p>
            <p>
              From rich signature paneer gravies and slow-cooked dals to hot tawa phulkas, stuffed parathas, wholesome thalis, crispy starters, and sweet delicacies, every dish is an ode to authentic Indian culinary heritage.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-content { background: var(--bgr-light); }

        .about-content-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }

        .about-sub {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 500;
          color: var(--primary-color);
          line-height: 1.4;
          font-style: italic;
          margin-top: 16px;
        }

        .about-right p {
          font-size: 0.95rem;
          color: #777;
          line-height: 1.85;
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .about-content-grid { grid-template-columns: 1fr; gap: 30px; }
        }
      `}</style>
    </section>
  )
}
