import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Javari Docs Mgmt' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
