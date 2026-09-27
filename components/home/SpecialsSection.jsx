'use client'
import Link from 'next/link'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function SpecialsSection() {
  return (
    <section className="specials">
      {/* Dark BG section */}
      <div className="specials-dark">
        <div className="specials-dark-bg" style={{ backgroundImage: 'url(/assets/bgr-dark.jpg)' }} />
        <div className="specials-dark-overlay" />
        <div className="container specials-dark-content">
          <AnimatedSection animationClass="revealed" className="reveal">
            <span className="section-tag" style={{ color: '#c8693a' }}>Chef's Selection</span>
            <h2 className="section-title" style={{ color: '#fff' }}>
              Signature <span className="accent">Specials</span>
            </h2>
            <div className="title-line" />
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: '1.8', maxWidth: '580px' }}>
              Indulge in our chef's carefully curated selection of signature dishes — each one a testament to our culinary philosophy of bold flavors and refined technique.
            </p>
          </AnimatedSection>
          <AnimatedSection animationClass="revealed" className="specials-actions reveal" delayClass="delay-200">
            <Link href="/menu" className="btn btn-primary">
              Explore Menu
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Book A Table
            </Link>
          </AnimatedSection>
        </div>
      </div>

      {/* Specials Cards */}
      <div className="specials-cards-section">
        <div className="container">
          <div className="specials-cards">
            {[
              {
                img: '/assets/food/paneer_butter_masala.jpg',
                tag: 'Signature',
                title: 'Paneer Butter Masala',
                desc: 'Rich and creamy tomato-butter curry loaded with soft cottage cheese cubes and fresh fenugreek.',
                price: '₹210',
              },
              {
                img: '/assets/food/paneer_thali.jpg',
                tag: 'Thali Special',
                title: 'Rasoi Special Paneer Thali',
                desc: 'Royal platter with Paneer Butter Masala, Dal Makhani, 4 Butter Phulkas, Jeera Rice, Raita & Gulab Jamun.',
                price: '₹200',
              },
              {
                img: '/assets/food/dal_makhani.jpg',
                tag: "Chef's Pick",
                title: 'Dal Makhani & Butter Naan',
                desc: 'Slow-cooked black lentils simmered overnight with cream and butter, paired with clay-oven naan.',
                price: '₹225',
              },
            ].map((special, i) => (
              <AnimatedSection animationClass="revealed" className="special-card reveal" key={i}>
                <div className="special-card-img">
                  <img src={special.img} alt={special.title} />
                </div>
                <div className="special-card-body">
                  <span className="special-tag">{special.tag}</span>
                  <h3 className="special-title">{special.title}</h3>
                  <p className="special-desc">{special.desc}</p>
                  <div className="special-footer">
                    <span className="special-badge">🌱 Pure Veg</span>
                    <Link href="/menu" className="special-link">Order via WhatsApp →</Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .specials-dark {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
        }
        .specials-dark-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .specials-dark-overlay {
          position: absolute;
          inset: 0;
          background: rgba(31, 25, 23, 0.88);
        }
        .specials-dark-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .specials-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
        }

        .specials-cards-section {
          background: var(--bgr-light);
          padding: 80px 0;
        }
        .specials-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .special-card {
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .special-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .special-card-img {
          height: 220px;
          overflow: hidden;
        }
        .special-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .special-card:hover .special-card-img img { transform: scale(1.06); }

        .special-card-body { padding: 24px; }
        .special-tag {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--secondary-color);
          font-weight: 500;
        }
        .special-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 600;
          margin: 8px 0 10px;
        }
        .special-desc {
          font-size: 0.87rem;
          color: #888;
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .special-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--seventh-color);
        }
        .special-badge {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          color: #2e7d32;
          background: #e8f5e9;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        .special-link {
          font-size: 0.82rem;
          color: var(--primary-color);
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }
        .special-link:hover { color: var(--secondary-color); }

        @media (max-width: 900px) {
          .specials-cards { grid-template-columns: repeat(2, 1fr); }
          .specials-dark-content { flex-direction: column; text-align: center; align-items: center; }
        }
        @media (max-width: 600px) {
          .specials-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
