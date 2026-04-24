import { ImageResponse } from 'next/og'
import logo from '../Global Cafe Logo@3x.jpg.jpeg'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1f1512',
        }}
      >
        <img
          src={logo.src}
          alt="Global Cafe Business School"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    },
  )
}
