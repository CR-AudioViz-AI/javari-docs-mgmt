import './globals.css'
// app/layout.tsx — javari-docs-mgmt
// CR AudioViz AI · EIN: 39-3646201 · May 2026
import type { Metadata } from 'next'
import { EmbedBridge, EMBED_PREPAINT_SCRIPT } from '@craudioviz/platform-sdk'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Javari Docs',
  description: 'AI document management — organize, search, and analyze your documents.',
  openGraph: { title: 'Javari Docs', description: 'AI document management — organize, search, and analyze your documents.', type: 'website' },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* factory 2026-09-10: marks an embedded page before first paint */}
        <script dangerouslySetInnerHTML={{ __html: EMBED_PREPAINT_SCRIPT }} />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <EmbedBridge />
        <div data-app-chrome style={{ background: 'rgba(0,0,0,0.88)', padding: '6px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 200 }}>
          <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            <span>📄</span>
            <span style={{ color: '#00B4D8' }}>Javari Docs</span>
            <span style={{ color: '#374151', fontSize: 11, marginLeft: 4 }}>· CR AudioViz AI · EIN 39-3646201</span>
          </a>
          <a href="https://craudiovizai.com/auth/signup" style={{ background: '#00B4D8', color: '#000', borderRadius: 6, padding: '4px 14px', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Sign Up Free →</a>
        </div>
        {children}
        <footer data-app-chrome style={{ background: '#050608', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px', textAlign: 'center' }}>
          <p style={{ color: '#1f2937', fontSize: 11, margin: 0 }}>
            © 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida · <a href="https://craudiovizai.com" style={{ color: '#374151', textDecoration: 'none' }}>craudiovizai.com</a> · <a href="https://craudiovizai.com/auth/signup" style={{ color: '#00B4D8', textDecoration: 'none', fontWeight: 600 }}>Sign Up Free</a>
          </p>
        </footer>
      </body>
    </html>
  )
}
