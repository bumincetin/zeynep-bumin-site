import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Local Travel Guide - Experience Cities Like a Local',
  description: 'Discover authentic local experiences, hidden gems, and cultural insights for the adventurous traveler.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
} 