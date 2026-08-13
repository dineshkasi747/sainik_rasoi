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
                img: '/assets/tip2-1200x794.jpg',
                tag: 'Signature',
                title: 'Wagyu Beef Tenderloin',
                desc: 'Premium grade Wagyu beef, slow-cooked to perfection and served with truffle jus.',
                price: '$89',
              },
              {
                img: '/assets/tip3-1200x794.jpg',
                tag: 'Seasonal',
                title: 'Saffron Seafood Bisque',
                desc: 'A rich, velvety bisque crafted from the freshest catches of the season.',
                price: '$45',
              },
              {
                img: '/assets/tip4-1200x794.jpg',
                tag: "Chef's Pick",
                title: 'Truffle Mushroom Risotto',
                desc: 'Creamy Arborio rice with wild mushrooms and shaved black truffle.',
                price: '$56',
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
                    <span className="special-price">{special.price}</span>
                    <Link href="/menu" className="special-link">Order Now →</Link>
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
        .special-price {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--secondary-color);
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
