'use client'
import Link from 'next/link'
import { featuredDishes } from '@/data/siteData'
import AnimatedSection from '@/components/shared/AnimatedSection'


export default function FeaturedDishes() {
  return (
    <section className="featured section-padding">
      <div className="container">
        {/* Header */}
        <AnimatedSection animationClass="revealed" className="featured-header reveal">
          <span className="section-tag">Our Specialties</span>
          <h2 className="section-title">Featured <span className="accent">Dishes</span></h2>
          <div className="title-line"></div>
          <p className="section-desc">
            Handpicked selections from our kitchen — each dish crafted with fresh ingredients and culinary artistry.
          </p>
        </AnimatedSection>

        {/* Dishes Grid */}
        <div className="dishes-grid">
          {featuredDishes.map((dish, i) => (
            <AnimatedSection animationClass="revealed" className="dish-card reveal" key={dish.id}>
              <div className="dish-img">
                <img src={dish.img} alt={dish.name} />
                <div className="dish-overlay">
                  <Link href="/menu" className="dish-btn">View Menu</Link>
                </div>
              </div>
              <div className="dish-info">
                <span className="dish-category">{dish.category}</span>
                <h3 className="dish-name">{dish.name}</h3>
                <div className="dish-footer">
                  <span className="dish-price">{dish.price}</span>
                  <span className="dish-dots">· · · · · · · · · · ·</span>
                  <Link href="/menu" className="dish-order">Order →</Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animationClass="revealed" className="featured-cta reveal">
          <Link href="/menu" className="btn btn-primary">
            View Full Menu
          </Link>
        </AnimatedSection>
      </div>

      <style jsx>{`
        .featured { background: #fff; }

        .featured-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .featured-header .title-line { margin: 0 auto 20px; }

        .dishes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 50px;
        }

        .dish-card {
          border-radius: 4px;
          overflow: hidden;
          background: var(--bgr-light);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .dish-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }

        .dish-img {
          position: relative;
          overflow: hidden;
          height: 240px;
        }
        .dish-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .dish-card:hover .dish-img img { transform: scale(1.06); }

        .dish-overlay {
          position: absolute;
          inset: 0;
          background: rgba(31, 25, 23, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .dish-card:hover .dish-overlay { opacity: 1; }

        .dish-btn {
          background: var(--secondary-color);
          color: #fff;
          padding: 10px 24px;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s;
          transform: translateY(10px);
        }
        .dish-card:hover .dish-btn { transform: translateY(0); }
        .dish-btn:hover { background: #fff; color: var(--primary-color); }

        .dish-info {
          padding: 20px 24px;
        }
        .dish-category {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--secondary-color);
          font-weight: 500;
        }
        .dish-name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--primary-color);
          margin: 6px 0 12px;
        }
        .dish-footer {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dish-price {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--secondary-color);
        }
        .dish-dots {
          flex: 1;
          color: var(--seventh-color);
          font-size: 0.6rem;
          letter-spacing: 3px;
          overflow: hidden;
        }
        .dish-order {
          font-size: 0.8rem;
          color: var(--primary-color);
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }
        .dish-order:hover { color: var(--secondary-color); }

        .featured-cta { text-align: center; }

        @media (max-width: 900px) {
          .dishes-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .dishes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
