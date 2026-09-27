'use client'
import { useState } from 'react'
import { menuCategories } from '@/data/menuData'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('starter')
  const activeData = menuCategories.find((c) => c.id === activeCategory)

  return (
    <section className="menu-section section-padding">
      <div className="container">
        {/* Category Tabs */}
        <div className="menu-tabs reveal">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              className={`menu-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="menu-section-header reveal">
          <img src="/assets/title_border.png" alt="" className="title-border-img" />
          <h2 className="section-title">{activeData?.title}</h2>
          <p className="section-desc">{activeData?.subtitle}</p>
        </div>

        {/* Menu Items Grid */}
        <div className="sainik-menu-grid">
          {activeData?.items.map((item, i) => {
            const numPrice = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 100
            const origPrice = Math.round((numPrice * 1.25) / 5) * 5
            const rating = (4.4 + ((item.id * 7) % 6) * 0.1).toFixed(1)
            const reviews = 25 + ((item.id * 17) % 150)
            const isBestseller = item.id % 4 === 0

            return (
              <div className="sainik-food-card reveal" key={item.id} style={{ transitionDelay: `${(i % 4) * 0.08}s` }}>
                <div className="sainik-card-media">
                  <img src={item.img} alt={item.name} className="sainik-food-img" />
                  {isBestseller && <div className="sainik-bestseller-tag">★ Bestseller</div>}
                </div>
                <div className="sainik-card-content">
                  <div className="sainik-meta-row">
                    <div className="sainik-veg-badge" title="100% Pure Vegetarian">
                      <span className="sainik-veg-dot"></span>
                    </div>
                    <div className="sainik-rating-badge">
                      <span className="star">★</span> {rating} ({reviews})
                    </div>
                  </div>
                  <h4 className="sainik-dish-title">{item.name}</h4>
                  <p className="sainik-dish-desc">{item.desc}</p>
                  <div className="sainik-card-bottom">
                    <div className="sainik-price-col">
                      <span className="sainik-price-original">₹{origPrice}</span>
                      <span className="sainik-price-current">{item.price}</span>
                    </div>
                    <button className="sainik-add-btn">ADD</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .menu-section { background: #fff; }

        .menu-tabs {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }
        .menu-tab {
          padding: 8px 18px;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
          font-weight: 600;
          border: 1px solid var(--seventh-color);
          border-radius: 30px;
          background: transparent;
          color: var(--fifth-color);
          cursor: pointer;
          transition: all 0.3s;
        }
        .menu-tab:hover { border-color: var(--secondary-color); color: var(--secondary-color); }
        .menu-tab.active {
          background: var(--secondary-color);
          border-color: var(--secondary-color);
          color: #fff;
        }

        .menu-section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .title-border-img {
          margin: 0 auto 16px;
          opacity: 0.7;
        }
        .menu-section-header .section-desc {
          margin: 0 auto;
        }

        .sainik-menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          width: 100%;
        }

        @media (max-width: 1200px) {
          .sainik-menu-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 850px) {
          .sainik-menu-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 500px) {
          .sainik-menu-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }

        .sainik-food-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          padding: 12px;
          box-sizing: border-box;
        }
        .sainik-food-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .sainik-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-height: 190px;
          border-radius: 14px;
          overflow: hidden;
          background: #1e1e1e;
        }
        .sainik-food-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .sainik-food-card:hover .sainik-food-img {
          transform: scale(1.05);
        }

        .sainik-bestseller-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background: linear-gradient(135deg, #e65100, #ff9800);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        .sainik-card-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding-top: 10px;
        }

        .sainik-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .sainik-veg-badge {
          width: 15px;
          height: 15px;
          border: 1.6px solid #2e7d32;
          border-radius: 3px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }
        .sainik-veg-dot {
          width: 7px;
          height: 7px;
          background: #2e7d32;
          border-radius: 50%;
        }

        .sainik-rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 700;
          color: #15803d;
          background: #dcfce7;
          padding: 2px 7px;
          border-radius: 12px;
        }
        .sainik-rating-badge .star {
          color: #15803d;
        }

        .sainik-dish-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          margin: 2px 0 6px 0;
          line-height: 1.3;
          color: var(--primary-color);
        }

        .sainik-dish-desc {
          font-size: 0.8rem;
          color: #777;
          line-height: 1.45;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sainik-card-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px dashed rgba(0, 0, 0, 0.08);
        }

        .sainik-price-col {
          display: flex;
          flex-direction: column;
        }
        .sainik-price-original {
          font-size: 11px;
          color: #999;
          text-decoration: line-through;
          font-weight: 500;
          margin-bottom: 2px;
        }
        .sainik-price-current {
          display: inline-block;
          background: #ffc72c;
          color: #1a1a1a;
          font-weight: 800;
          font-size: 14px;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .sainik-add-btn {
          background: #ffffff;
          border: 1.5px solid #2e7d32;
          color: #2e7d32;
          font-weight: 700;
          font-size: 12px;
          padding: 6px 20px;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
        }
        .sainik-add-btn:hover {
          background: #2e7d32;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(46, 125, 50, 0.25);
        }
      `}</style>
    </section>
  )
}
