'use client'
import { galleryImages } from '@/data/siteData'


export default function GalleryGrid() {
  return (
    <section className="gallery-grid section-padding-sm">
      <div className="container">
        <div className="gallery-header reveal">
          <span className="section-tag">Our Gallery</span>
          <h2 className="section-title">A Glimpse of Our <span className="accent">World</span></h2>
          <div className="title-line" style={{ margin: '0 auto 0' }} />
        </div>
        <div className="gallery-masonry">
          {galleryImages.map((img, i) => (
            <div className={`gallery-item gallery-item-${i + 1} reveal`} key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
              <img src={img.src} alt={img.alt} />
              <div className="gallery-item-overlay">
                <span className="gallery-zoom">⊕</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .gallery-grid { background: #fff; }

        .gallery-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .gallery-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto;
          gap: 16px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;
        }
        .gallery-item-1 {
          grid-row: span 2;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .gallery-item-1 img { height: 500px; }
        .gallery-item-2 img,
        .gallery-item-3 img,
        .gallery-item-4 img,
        .gallery-item-5 img { height: 240px; }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(200, 105, 58, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .gallery-item:hover .gallery-item-overlay { opacity: 1; }
        .gallery-item:hover img { transform: scale(1.06); }

        .gallery-zoom {
          font-size: 2.5rem;
          color: #fff;
          font-weight: 300;
          transform: scale(0);
          transition: transform 0.3s ease 0.1s;
        }
        .gallery-item:hover .gallery-zoom { transform: scale(1); }

        @media (max-width: 768px) {
          .gallery-masonry { grid-template-columns: repeat(2, 1fr); }
          .gallery-item-1 { grid-row: span 1; }
          .gallery-item img,
          .gallery-item-1 img { height: 200px !important; }
        }
        @media (max-width: 480px) {
          .gallery-masonry { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
