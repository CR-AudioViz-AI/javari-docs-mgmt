// app/page.tsx — javari-docs-mgmt
'use client'
import { useState, useRef } from 'react'
const getFeatures = () => [
  { e: '📁', t: 'Document Hub', d: 'Centralize all your documents in one intelligent workspace' },
  { e: '🤖', t: 'AI Assistant', d: 'Javari AI helps you draft, summarize, and manage docs' },
  { e: '🔍', t: 'Smart Search', d: 'Find any document instantly with AI-powered search' },
  { e: '🔗', t: 'Platform', d: 'Connected to all 150+ Javari apps' },
]
export default function Page() {
  const features = getFeatures()
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#e2e8f0', fontFamily: 'system-ui' }}>
      <div style={{ height: 60 }} />
      <section style={{ textAlign: 'center', padding: '64px 24px 40px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📁</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, margin: '0 0 16px', color: '#6366f1' }}>Javari Docs</h1>
        <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.65 }}>AI-powered document management — create, organize, and find any document instantly.</p>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: '#6366f1', color: '#fff', borderRadius: 10, padding: '13px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>Start Free →</a>
      </section>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
        {features.map(f => (
          <div key={f.t} style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 16px' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{f.e}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#e2e8f0', marginBottom: 4 }}>{f.t}</div>
            <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{f.d}</div>
          </div>
        ))}
      </section>
      <footer style={{ background: '#050609', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#374151', fontSize: 11, margin: 0 }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · <a href="https://craudiovizai.com/auth/signup" style={{ color: '#6366f1', textDecoration: 'none' }}>Sign Up Free</a></p>
      </footer>
    </div>
  )
}
