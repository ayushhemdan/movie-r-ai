import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Movie R AI - AI-Powered Movie Recommendations',
  description: 'Get personalized movie recommendations based on your preferences using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

