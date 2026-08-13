'use client'
import { useState, useEffect, useRef } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'

const slides = [
  {
    id: 1,
    subtitle: 'Enjoy delicious Food with friends & Family',
    title: 'Welcome to our Hungrybuzz',
    desc: "We hope you're hungry because our brand new Buzz Poke Bowls are both delicious and packed with feel good nutrients!",
    buttonText: 'Check Our Menu',
    img: '/assets/product-light.png',
  },
  {
    id: 2,
    subtitle: 'Enjoy delicious Food with friends & Family',
    title: 'Get The Taste of Multicuisines',
    desc: "We hope you're hungry because our brand new Buzz Poke Bowls are both delicious and packed with feel good nutrients!",
    buttonText: 'Check Our Menu',
    img: '/assets/Layer-791.png',
  },
  {
    id: 3,
    subtitle: 'Enjoy delicious Food with friends & Family',
    title: 'Enjoy great Food with loved ones',
    desc: "We hope you're hungry because our brand new Buzz Poke Bowls are both delicious and packed with feel good nutrients!",
    buttonText: 'Check Our Menu',
    img: '/assets/Layer-837.png',
  }
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (i) => {
    clearInterval(intervalRef.current)
    setCurrent(i)
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
  }

  const slide = slides[current]

  return (
    <section className="hero-light">
      {/* Background Texture */}
      <div className="hero-texture-bg" style={{ backgroundImage: 'url(/assets/light3.jpg)' }} />

      {/* Main Content Area */}
      <div className="container hero-inner">
        
        {/* Slide indicators / Arrows on the left */}
        <div className="hero-left-nav">
          <span className="nav-arrow" onClick={() => goTo((current - 1 + slides.length) % slides.length)}>↑</span>
          <div className="nav-numbers">
            {slides.map((_, i) => (
              <span 
                key={i} 
                className={`nav-number ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
              >
                0{i + 1}
              </span>
            ))}
          </div>
          <span className="nav-arrow" onClick={() => goTo((current + 1) % slides.length)}>↓</span>
        </div>

        {/* Slide Content */}
        <div className="hero-main-content" key={current}>
          
          {/* Left Text Column */}
          <div className="hero-text-col">
            <AnimatedSection animationClass="animate-fadeInDown">
              <span className="hero-subtitle">{slide.subtitle}</span>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-fadeInUp">
              <h1 className="hero-title">{slide.title}</h1>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-fadeIn" delayClass="delay-200">
              <p className="hero-desc">{slide.desc}</p>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-fadeInUp" delayClass="delay-300">
              <div className="hero-button-wrapper">
                <a href="#menu" className="btn btn-menu">
                  {slide.buttonText}
                  <span className="btn-line-top-bottom"></span>
                  <span className="btn-line-left-right"></span>
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Product Column */}
          <div className="hero-product-col">
            {/* Banana Leaf Background */}
            <AnimatedSection animationClass="animate-zoomIn" className="hero-leaf-bg">
              <img src="/assets/close-up-leave-banana-plant.jpg" alt="Banana leaf" />
            </AnimatedSection>

            {/* Food Plate */}
            <AnimatedSection animationClass="animate-fadeInRight" delayClass="delay-200" className="hero-plate">
              <img src={slide.img} alt="Delicious Poke Bowl" />
              
              {/* Rotating curved text overlay */}
              <div className="rotating-text-wrapper">
                <svg viewBox="0 0 150 150" className="rotating-svg">
                  <path id="curvePath" d="M75,10 A65,65 0 1,1 74.9,10" fill="transparent" />
                  <text>
                    <textPath href="#curvePath" startOffset="0%" className="curved-text">
                      Enjoy Deliciousness! • Enjoy Deliciousness! •
                    </textPath>
                  </text>
                </svg>
              </div>
            </AnimatedSection>

          </div>
        </div>

      </div>

      <style jsx>{`
        .hero-light {
          position: relative;
          height: 100vh;
          min-height: 800px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #f7f3ed;
        }

        .hero-texture-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.85;
          z-index: 1;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          width: 100%;
          padding-top: 80px;
        }

        /* Left Nav */
        .hero-left-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-right: 50px;
          font-family: var(--font-heading);
          color: var(--primary-color);
          z-index: 10;
        }
        .nav-arrow {
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.3s;
          user-select: none;
        }
        .nav-arrow:hover {
          color: var(--secondary-color);
        }
        .nav-numbers {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .nav-number {
          font-size: 0.95rem;
          cursor: pointer;
          opacity: 0.4;
          transition: all 0.3s;
          position: relative;
          padding: 2px 0;
        }
        .nav-number.active {
          opacity: 1;
          color: var(--secondary-color);
          font-weight: 700;
        }

        /* Main Content */
        .hero-main-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          width: 100%;
        }

        .hero-text-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hero-subtitle {
          font-family: var(--font-heading);
          font-style: italic;
          font-size: 1.25rem;
          color: var(--secondary-color);
          letter-spacing: 0.5px;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 5.5vw, 4.8rem);
          font-weight: 700;
          color: var(--primary-color);
          line-height: 1.15;
        }

        .hero-desc {
          font-size: 0.98rem;
          color: rgba(42, 36, 35, 0.7);
          line-height: 1.8;
          max-width: 480px;
        }

        .hero-button-wrapper {
          margin-top: 12px;
        }

        /* Border animated button */
        .btn-menu {
          display: inline-flex;
          align-items: center;
          padding: 15px 36px;
          background: var(--secondary-color);
          color: #fff;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .btn-menu:hover {
          background: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200, 105, 58, 0.35);
        }

        /* Right Product Col */
        .hero-product-col {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 600px;
        }

        /* Banana Leaf Mask/Background */
        .hero-leaf-bg {
          position: absolute;
          width: 450px;
          height: 550px;
          border-radius: 200px 200px 0 0;
          overflow: hidden;
          z-index: 1;
          right: 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .hero-leaf-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Product Plate */
        .hero-plate {
          position: relative;
          z-index: 2;
          width: 380px;
          height: 380px;
          right: 35px;
          top: 30px;
        }
        .hero-plate img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
        }

        /* Rotating Curved Text */
        .rotating-text-wrapper {
          position: absolute;
          inset: -35px;
          z-index: 3;
          pointer-events: none;
          animation: spinText 20s linear infinite;
        }
        .rotating-svg {
          width: 100%;
          height: 100%;
        }
        .curved-text {
          font-family: var(--font-heading);
          font-size: 8.5px;
          letter-spacing: 2px;
          fill: rgba(42, 36, 35, 0.6);
          text-transform: uppercase;
          font-weight: 600;
        }

        @keyframes spinText {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .hero-inner { padding-top: 100px; }
          .hero-main-content { grid-template-columns: 1fr; text-align: center; gap: 30px; }
          .hero-left-nav { display: none; }
          .hero-desc { margin: 0 auto; }
          .hero-product-col { height: 420px; }
          .hero-leaf-bg { width: 320px; height: 380px; left: 50%; transform: translateX(-50%); }
          .hero-plate { width: 280px; height: 280px; right: 0; top: 20px; }
          .rotating-text-wrapper { inset: -25px; }
        }
      `}</style>
    </section>
  )
}
