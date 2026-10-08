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
        {/* Category Tabs (Matching Image 1) */}
        <div className="sainik-sticky-cat-bar">
          <div className="sainik-cat-pills-scroll">
            <button
              type="button"
              className={`sainik-cat-pill-all ${!activeCategory || activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setIsCategorySheetOpen(true)}
              title="Browse all categories"
            >
              <span className="sainik-pill-all-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <circle cx="4" cy="6" r="1.5" fill="currentColor"></circle>
                  <circle cx="4" cy="12" r="1.5" fill="currentColor"></circle>
                  <circle cx="4" cy="18" r="1.5" fill="currentColor"></circle>
                </svg>
              </span>
              <span className="sainik-pill-all-text">All</span>
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`sainik-cat-pill-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleSelectCategory(cat.id)}
              >
                <span className="sainik-cat-pill-icon">
                  {cat.id === 'starters' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 11h16a1 1 0 0 1 1 1 7 7 0 0 1-14 0 1 1 0 0 1 1-1z"></path>
                      <path d="M7 8V4"></path>
                      <path d="M12 7V3"></path>
                      <path d="M17 8V4"></path>
                    </svg>
                  )}
                  {cat.id === 'snacks' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l9 16H3L12 3z"></path>
                      <path d="M9 14h.01"></path>
                      <path d="M15 15h.01"></path>
                      <path d="M12 11h.01"></path>
                    </svg>
                  )}
                  {cat.id !== 'starters' && cat.id !== 'snacks' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9"></circle>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </span>
                <span className="sainik-cat-pill-name">{cat.title}</span>
                <span className="cat-pill-count">{cat.items.length}</span>
              </button>
            ))}
          </div>
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

      {/* Unified Floating Cart & WhatsApp Order Bar with Theme Switcher (Matching Image 2) */}
      <div
        className="sainik-floating-bar"
        onClick={() => {
          if (typeof window !== 'undefined' && window.sainikCart) {
            window.sainikCart.open()
          }
        }}
        role="button"
        aria-label="View Order Selection"
      >
        <div className="sainik-float-pill">
          <div className="sainik-float-info">
            <svg className="sainik-float-cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="sainik-float-count-badge" id="sainik-float-count">1 Item</span>
          </div>
          <div className="sainik-float-sep"></div>
          <button
            type="button"
            className="sainik-float-cta"
            onClick={(e) => {
              e.stopPropagation()
              if (typeof window !== 'undefined' && window.sainikCart) {
                window.sainikCart.open()
              }
            }}
          >
            <svg className="sainik-float-wa-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.892.812 2.796.812 3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.107-.063-.267-.086-.599-.214-1.028-.399-1.815-.783-3.003-2.617-3.094-2.739-.091-.122-.741-.986-.741-1.881 0-.895.469-1.334.636-1.517.167-.183.365-.228.487-.228.122 0 .243.002.349.007.113.005.263-.043.411.312.153.365.518 1.263.563 1.355.045.091.076.198.015.32-.061.122-.091.198-.183.305-.091.107-.193.239-.275.32-.092.091-.188.19-.081.373.107.183.475.783 1.019 1.268.701.625 1.291.819 1.474.91.183.091.29.076.396-.046.107-.122.457-.533.579-.716.122-.183.244-.152.411-.091.167.061 1.065.502 1.248.594.183.091.305.137.35.213.046.076.046.442-.098.847zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.442 5.177L2 22l4.981-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.636 0-3.151-.487-4.423-1.326l-.317-.208-2.955.775.789-2.88-.228-.363A8.118 8.118 0 013.846 12c0-4.496 3.658-8.154 8.154-8.154s8.154 3.658 8.154 8.154-3.658 8.154-8.154 8.154z"/>
            </svg>
            <span>Order on WhatsApp</span>
            <span className="sainik-float-arrow">→</span>
          </button>
          <div
            className="sainik-float-theme-toggle"
            onClick={(e) => {
              e.stopPropagation()
              if (typeof window !== 'undefined' && window.sainikCart) {
                window.sainikCart.toggleTheme()
              }
            }}
            role="button"
            aria-label="Toggle Dark/Light Mode"
          >
            <div className="sainik-theme-pill-track">
              <span className="sainik-theme-icon sainik-theme-sun active">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="12" y1="2" x2="12" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="22"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="2" y1="12" x2="4" y2="12"></line>
                  <line x1="20" y1="12" x2="22" y2="12"></line>
                </svg>
              </span>
              <span className="sainik-theme-icon sainik-theme-moon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Popup Card (Matching Swiggy/Zomato reference) */}
      {isCategorySheetOpen && (
        <>
          <div
            className="sainik-react-overlay"
            onClick={() => setIsCategorySheetOpen(false)}
          />
          <div className="sainik-react-sheet" role="dialog" aria-modal="true" aria-label="Select Menu Category">
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

        /* Sticky Category Pills Bar (Matching Image 1) */
        .sainik-sticky-cat-bar {
          position: sticky;
          top: 70px;
          z-index: 1000;
          background: rgba(250, 245, 237, 0.95);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(200, 105, 58, 0.15);
          padding: 12px 0 14px;
          margin-bottom: 30px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
        }
        .sainik-cat-pills-scroll {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow-x: auto;
          padding: 4px 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .sainik-cat-pills-scroll::-webkit-scrollbar {
          display: none;
        }

        /* "All" Pill */
        .sainik-cat-pill-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          border-radius: 40px;
          background: #c8693a;
          color: #ffffff !important;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(200, 105, 58, 0.35);
          transition: all 0.22s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .sainik-cat-pill-all:hover {
          background: #b0562b;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(200, 105, 58, 0.45);
        }
        .sainik-pill-all-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sainik-pill-all-text {
          font-family: var(--font-heading, "Cormorant", serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.3px;
        }

        /* Category Item Pill */
        .sainik-cat-pill-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px 8px 14px;
          border-radius: 40px;
          background: #fbf6ee;
          color: #2a2423 !important;
          border: 1px solid rgba(200, 105, 58, 0.22);
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(42, 36, 35, 0.04);
          transition: all 0.22s cubic-bezier(0.25, 0.8, 0.25, 1);
          white-space: nowrap;
        }
        .sainik-cat-pill-item:hover {
          background: #ffffff;
          border-color: #c8693a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(200, 105, 58, 0.2);
        }
        .sainik-cat-pill-item.active {
          background: #c8693a !important;
          color: #ffffff !important;
          border-color: #c8693a !important;
          box-shadow: 0 6px 18px rgba(200, 105, 58, 0.4);
          transform: translateY(-1px);
        }
        .sainik-cat-pill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2a2423;
          stroke: #2a2423;
        }
        .sainik-cat-pill-item.active .sainik-cat-pill-icon {
          color: #ffffff !important;
          stroke: #ffffff !important;
        }
        .sainik-cat-pill-name {
          font-family: var(--font-heading, "Cormorant", serif);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        .sainik-cat-pill-item .cat-pill-count {
          background: #f5dfd3;
          color: #9e4b24;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 12px;
          margin-left: 2px;
          line-height: 1.1;
        }
        .sainik-cat-pill-item.active .cat-pill-count {
          background: rgba(255, 255, 255, 0.28) !important;
          color: #ffffff !important;
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

        /* Unified Floating Cart & WhatsApp Bar (Matching Image 2) */
        .sainik-floating-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1040;
          display: flex;
          align-items: center;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          white-space: nowrap !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          max-width: 95vw;
        }
        .sainik-float-pill {
          background: #181311;
          border-radius: 50px;
          padding: 5px 8px 5px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55), 0 0 1px rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        .sainik-floating-bar:hover .sainik-float-pill {
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.65), 0 0 20px rgba(200, 105, 58, 0.25);
          transform: translateY(-2px);
        }
        .sainik-float-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-family: var(--font-heading, "Cormorant", serif);
          cursor: pointer;
        }
        .sainik-float-cart-icon {
          stroke: #ffffff;
          flex-shrink: 0;
        }
        .sainik-float-count-badge {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.3px;
        }
        .sainik-float-sep {
          width: 1px;
          height: 22px;
          background: rgba(255, 255, 255, 0.16);
          flex-shrink: 0;
          margin: 0 2px;
        }
        .sainik-float-cta {
          background: #c8693a;
          color: #ffffff;
          border: none;
          padding: 9px 20px;
          border-radius: 40px;
          font-family: var(--font-heading, "Cormorant", serif);
          font-size: 1.08rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(200, 105, 58, 0.4);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .sainik-float-cta:hover {
          background: #b0562b;
          box-shadow: 0 5px 16px rgba(200, 105, 58, 0.55);
        }
        .sainik-float-wa-icon {
          fill: #ffffff;
          flex-shrink: 0;
        }
        .sainik-float-arrow {
          font-size: 1.15rem;
          line-height: 1;
        }
        .sainik-float-theme-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .sainik-theme-pill-track {
          background: #27201d;
          border-radius: 30px;
          padding: 3px 5px;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sainik-theme-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          stroke: rgba(255, 255, 255, 0.5);
          transition: all 0.25s ease;
        }
        .sainik-theme-icon.active {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
          stroke: #ffffff;
        }

        @media (max-width: 600px) {
          .sainik-floating-bar {
            bottom: 14px;
            max-width: calc(100vw - 20px);
          }
          .sainik-float-pill {
            padding: 5px 6px 5px 12px;
            gap: 8px;
          }
          .sainik-float-count-badge {
            font-size: 1.02rem;
          }
          .sainik-float-cta {
            padding: 8px 14px;
            font-size: 0.96rem;
            gap: 6px;
          }
          .sainik-theme-icon {
            width: 24px;
            height: 24px;
          }
        }

        /* Overlay & Bottom Sheet */
        .sainik-react-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          z-index: 1050;
        }
        .sainik-react-sheet {
          position: fixed;
          bottom: 84px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 44px);
          max-width: 320px;
          background: #0c0d10;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.2);
          z-index: 1060;
          display: flex;
          flex-direction: column;
          max-height: 380px;
          overflow: hidden;
          animation: popIn 0.24s cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        @keyframes popIn {
          from { transform: translateX(-50%) scale(0.92) translateY(12px); opacity: 0; }
          to { transform: translateX(-50%) scale(1) translateY(0); opacity: 1; }
        }

        .sainik-react-sheet-list {
          padding: 8px 0;
          overflow-y: auto;
          max-height: 364px;
        }
        .sainik-react-sheet-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 22px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .sainik-react-sheet-row:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .sainik-react-sheet-row.active {
          background: rgba(200, 105, 58, 0.15);
        }
        .sainik-row-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sainik-row-name {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.1px;
          line-height: 1.3;
        }
        .sainik-new-badge {
          background: #392b23;
          color: #f7a278;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(247, 162, 120, 0.4);
          text-transform: uppercase;
        }
        .sainik-row-count {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.3px;
          padding-left: 12px;
        }
        .sainik-react-sheet-row.active .sainik-row-count {
          color: var(--secondary-color, #c8693a);
          font-weight: 700;
        }
      `}</style>
    </section>
  )
}
