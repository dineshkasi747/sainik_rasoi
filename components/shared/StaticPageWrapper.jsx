'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function StaticPageWrapper({ htmlContent }) {
  const containerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (!containerRef.current) return

    // Intercept clicks on links to clean up .html URLs and use Next.js routing
    const handleLinkClick = (e) => {
      const target = e.target.closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Handle internal theme link rewrites dynamically
      if (href.includes('home-03') || href === '/') {
        e.preventDefault()
        router.push('/')
      } else if (href.includes('menu-02') || href.includes('menu')) {
        e.preventDefault()
        router.push('/menu')
      } else if (href.includes('about')) {
        e.preventDefault()
        router.push('/about')
      } else if (href.includes('contact-02') || href.includes('contact')) {
        e.preventDefault()
        router.push('/contact')
      }
    }

    const containerEl = containerRef.current
    containerEl.addEventListener('click', handleLinkClick)

    // Execute scripts contained in the injected HTML so Elementor and animations function properly
    const scripts = containerEl.querySelectorAll('script')
    scripts.forEach((oldScript) => {
      if (oldScript.src || oldScript.innerHTML.trim().length > 0) {
        const newScript = document.createElement('script')
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value)
        })
        if (oldScript.innerHTML) {
          newScript.innerHTML = oldScript.innerHTML
        }
        try {
          oldScript.parentNode.replaceChild(newScript, oldScript)
        } catch (err) {
          // Fallback if parent node is detached
        }
      }
    })

    return () => {
      containerEl.removeEventListener('click', handleLinkClick)
    }
  }, [htmlContent, router])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
