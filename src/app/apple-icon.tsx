import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  const logoPath = path.join(process.cwd(), 'src', 'Global Cafe Logo@3x.jpg.jpeg')
  const logoData = fs.readFileSync(logoPath)

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
          src={logoData.buffer as any}
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
