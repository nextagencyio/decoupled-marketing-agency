import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #be185d 0%, #9f1239 100%)', borderRadius: '20%' }}>
      <svg width="120" height="120" viewBox="0 0 48 48" fill="white">
        <path d="M6 22l36-10v24L6 28V22z" /><path d="M23.2 33.6a6 6 0 1 1-11.6-3.2" fill="none" stroke="white" strokeWidth="3" />
      </svg>
    </div>),
    { ...size }
  )
}
