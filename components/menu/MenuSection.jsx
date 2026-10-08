'use client'
import { useState } from 'react'
import { menuCategories } from '@/data/menuData'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]?.id || 'starters')
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)
  const activeData = menuCategories.find((c) => c.id === activeCategory)

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId)
    setIsCategorySheetOpen(false)
    window.scrollTo({ top: 120, behavior: 'smooth' })
  }

  return (
    <section className="menu-section section-padding">
      <div className="container">
        {/* Category Tabs */}
        <div className="menu-tabs reveal">
          <button
            type="button"
            className="menu-tab-browse-btn"
            onClick={() => setIsCategorySheetOpen(true)}
            title="Browse all categories"
          >
            ☰ Browse Menu ({menuCategories.length})
          </button>
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
                    <button
                      type="button"
                      className="sainik-add-btn"
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.sainikCart) {
                          window.sainikCart.add(item.name, item.img)
                        }
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating MENU Button */}
      <div
        className="sainik-react-menu-floating-btn"
        onClick={() => setIsCategorySheetOpen(true)}
        role="button"
        aria-label="Browse Menu Categories"
      >
        <div className="sainik-menu-pill">
          <span className="sainik-menu-icon">🍽️</span>
          <span className="sainik-menu-pill-text">MENU</span>
          <span className="sainik-menu-pill-count">{menuCategories.length}</span>
        </div>
      </div>

      {/* Category Bottom Sheet / Modal (Matching Swiggy/Zomato reference) */}
      {isCategorySheetOpen && (
        <>
          <div
            className="sainik-react-overlay"
            onClick={() => setIsCategorySheetOpen(false)}
          />
          <div className="sainik-react-sheet" role="dialog" aria-modal="true">
            <div className="sainik-cat-drag-bar" />
            <div className="sainik-react-sheet-header">
              <div className="sainik-header-left">
                <span className="sainik-header-icon">🍽️</span>
                <div>
                  <h3 className="sainik-sheet-title">Browse Menu</h3>
                  <span className="sainik-sheet-sub">{menuCategories.length} categories</span>
                </div>
              </div>
              <button
                type="button"
                className="sainik-sheet-close"
                onClick={() => setIsCategorySheetOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="sainik-react-sheet-list">
              {menuCategories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <div
                    key={cat.id}
                    className={`sainik-react-sheet-row ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectCategory(cat.id)}
                  >
                    <div className="sainik-row-left">
                      <span className="sainik-row-name">{cat.title}</span>
                      {cat.id === 'rice' && <span className="sainik-new-badge">NEW</span>}
                    </div>
                    <span className="sainik-row-count">{cat.items.length}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .menu-section {
          background: #fff;
          position: relative;
        }

        .menu-tabs {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }
        .menu-tab-browse-btn {
          padding: 8px 18px;
          font-size: 0.85rem;
          font-weight: 700;
          border: 1.5px solid var(--secondary-color, #c8693a);
          border-radius: 30px;
          background: #181311;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(200, 105, 58, 0.2);
        }
        .menu-tab-browse-btn:hover {
          background: var(--secondary-color, #c8693a);
          transform: translateY(-1px);
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
        .menu-tab:hover {
          border-color: var(--secondary-color);
          color: var(--secondary-color);
        }
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
          padding-top: 75%;
          border-radius: 12px;
          overflow: hidden;
          background: #f8f8f8;
        }
        .sainik-food-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .sainik-food-card:hover .sainik-food-img {
          transform: scale(1.08);
        }

        .sainik-bestseller-tag {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(200, 105, 58, 0.95);
          backdrop-filter: blur(4px);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 12px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .sainik-card-content {
          padding: 10px 4px 4px 4px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .sainik-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .sainik-veg-badge {
          width: 16px;
          height: 16px;
          border: 1.5px solid #0f8a3c;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1px;
        }
        .sainik-veg-dot {
          width: 8px;
          height: 8px;
          background: #0f8a3c;
          border-radius: 50%;
        }

        .sainik-rating-badge {
          font-size: 11px;
          font-weight: 700;
          color: #444;
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .sainik-rating-badge .star {
          color: #f5a623;
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

        /* Floating Menu Button */
        .sainik-react-menu-floating-btn {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1030;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .sainik-menu-pill {
          background: #15100e;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid var(--secondary-color, #c8693a);
          border-radius: 35px;
          padding: 9px 20px 9px 18px;
          display: flex;
          align-items: center;
          gap: 9px;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
          color: #ffffff;
          transition: all 0.25s ease;
        }
        .sainik-react-menu-floating-btn:hover .sainik-menu-pill {
          transform: scale(1.05);
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.55), 0 0 20px rgba(200, 105, 58, 0.4);
        }
        .sainik-menu-icon {
          font-size: 1.1rem;
        }
        .sainik-menu-pill-text {
          font-family: var(--font-heading, serif);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .sainik-menu-pill-count {
          background: var(--secondary-color, #c8693a);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 12px;
        }

        /* Overlay & Bottom Sheet */
        .sainik-react-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 8, 7, 0.75);
          backdrop-filter: blur(8px);
          z-index: 1050;
        }
        .sainik-react-sheet {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          max-width: 440px;
          background: #110d0c;
          border-radius: 24px;
          border: 1px solid rgba(200, 105, 58, 0.3);
          box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.65), 0 0 25px rgba(200, 105, 58, 0.15);
          z-index: 1060;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }

        .sainik-cat-drag-bar {
          width: 40px;
          height: 4px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 4px;
          margin: 10px auto 4px;
        }

        .sainik-react-sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 22px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sainik-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sainik-header-icon {
          font-size: 1.3rem;
        }
        .sainik-sheet-title {
          margin: 0;
          font-family: var(--font-heading, serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
        }
        .sainik-sheet-sub {
          font-size: 0.78rem;
          color: #bfaea9;
        }
        .sainik-sheet-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .sainik-sheet-close:hover {
          background: var(--secondary-color, #c8693a);
        }

        .sainik-react-sheet-list {
          padding: 8px 10px 18px;
          overflow-y: auto;
          max-height: 60vh;
        }
        .sainik-react-sheet-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 18px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }
        .sainik-react-sheet-row:hover {
          background: rgba(200, 105, 58, 0.12);
          transform: translateX(3px);
        }
        .sainik-react-sheet-row.active {
          background: rgba(200, 105, 58, 0.16);
          border-left-color: var(--secondary-color, #c8693a);
        }
        .sainik-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sainik-row-name {
          font-size: 1.04rem;
          font-weight: 600;
          color: #f5ebe6;
        }
        .sainik-react-sheet-row:hover .sainik-row-name,
        .sainik-react-sheet-row.active .sainik-row-name {
          color: #ffaa7d;
        }
        .sainik-new-badge {
          background: #392b23;
          color: #f7a278;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 5px;
          border: 1px solid rgba(247, 162, 120, 0.4);
        }
        .sainik-row-count {
          font-size: 1.05rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.85);
        }
        .sainik-react-sheet-row.active .sainik-row-count {
          color: var(--secondary-color, #c8693a);
        }
      `}</style>
    </section>
  )
}
