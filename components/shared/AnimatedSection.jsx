'use client'

import { useEffect, useRef, useState } from 'react'

export default function AnimatedSection({ 
  children, 
  className = '', 
  animationClass = 'animate-fadeInUp', 
  delayClass = '',
  rootMargin = '0px 0px -100px 0px',
  threshold = 0.1
}) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const currentRef = domRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Optional: stop observing once it's visible if we only want it to animate once
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [rootMargin, threshold])

  return (
    <div
      ref={domRef}
      className={`animated-wrapper ${className} ${isVisible ? `${animationClass} ${delayClass}` : ''}`}
      style={{ opacity: isVisible ? '' : 0 }}
    >
      {children}
    </div>
  )
}
