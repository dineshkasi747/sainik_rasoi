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
        <div className="menu-items-grid">
          {activeData?.items.map((item, i) => (
            <div className="menu-item-card reveal" key={item.id} style={{ transitionDelay: `${(i % 4) * 0.1}s` }}>
              <div className="menu-item-img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="menu-item-body">
                <div className="menu-item-header">
                  <h4 className="menu-item-name">{item.name}</h4>
                  <span className="menu-item-dots">· · · · · · · · ·</span>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .menu-section { background: #fff; }

        .menu-tabs {
          display: flex;
          gap: 4px;
          justify-content: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }
        .menu-tab {
          padding: 12px 32px;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 500;
          border: 1px solid var(--seventh-color);
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
          margin-bottom: 50px;
        }
        .title-border-img {
          margin: 0 auto 20px;
          opacity: 0.7;
        }
        .menu-section-header .section-desc {
          margin: 0 auto;
        }

        .menu-items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .menu-item-card {
          display: flex;
          gap: 20px;
          padding: 20px;
          background: var(--bgr-light);
          border-radius: 4px;
          transition: all 0.3s ease;
          align-items: flex-start;
        }
        .menu-item-card:hover {
          background: #fff;
          box-shadow: var(--shadow);
          transform: translateX(4px);
        }

        .menu-item-img {
          flex-shrink: 0;
          width: 72px; height: 72px;
          border-radius: 4px;
          overflow: hidden;
        }
        .menu-item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .menu-item-card:hover .menu-item-img img { transform: scale(1.08); }

        .menu-item-body { flex: 1; }

        .menu-item-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }
        .menu-item-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .menu-item-dots {
          flex: 1;
          color: var(--seventh-color);
          font-size: 0.55rem;
          letter-spacing: 3px;
          overflow: hidden;
          white-space: nowrap;
        }
        .menu-item-price {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--secondary-color);
          white-space: nowrap;
        }
        .menu-item-desc {
          font-size: 0.84rem;
          color: #999;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .menu-items-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
