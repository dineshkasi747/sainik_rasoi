'use client'

export default function AboutContent() {
  return (
    <section className="about-content section-padding">
      <div className="container">
        <div className="about-content-grid">
          <div className="about-left reveal-left">
            <span className="section-tag">Since 1975</span>
            <h2 className="section-title">About <span className="accent">Us</span></h2>
            <div className="title-line" />
            <h3 className="about-sub">
              We have Started Our Journey to<br />Serve You from 1975
            </h3>
          </div>
          <div className="about-right reveal-right">
            <p>
              For over four decades, we have embarked on a remarkable journey dedicated to serving our valued customers. Since our establishment in 1975, our unwavering commitment to excellence has guided us every step of the way. Today, we stand proud as a leading provider in our industry, ready to meet your needs with unparalleled expertise and passion.
            </p>
            <p>
              From our humble beginnings, we recognized the importance of building strong relationships with our customers. We understood that trust and loyalty were the pillars upon which successful businesses are built.
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
