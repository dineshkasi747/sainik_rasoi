'use client'

export default function IFramePage({ src }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999, backgroundColor: '#FAF3ED' }}>
      <iframe
        src={src}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          display: 'block'
        }}
        title="HungryBuzz Page"
      />
    </div>
  )
}
