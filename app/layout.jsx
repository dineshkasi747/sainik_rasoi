export const metadata = {
  title: 'Sainik Rasoi — 100% Pure Vegetarian Restaurant',
  description: 'Experience authentic 100% pure vegetarian culinary delicacies prepared with fresh ingredients, fragrant spices and royal Indian tradition.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
