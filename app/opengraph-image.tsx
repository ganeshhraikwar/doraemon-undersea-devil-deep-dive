import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Doraemon: New Nobita and the Castle of the Undersea Devil - Fan Experience';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #0a4b78 0%, #03142e 60%, #02050f 100%)',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            fontSize: '20px',
            color: '#38bdf8',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          45th Feature Film Tribute
        </div>

        {/* Tagline badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            border: '2px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '9999px',
            padding: '10px 28px',
            fontSize: '24px',
            color: '#bae6fd',
            marginBottom: '24px',
            fontWeight: 600,
          }}
        >
          Dive to 10,928 Meters Depth
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            color: '#ffd84d',
            textAlign: 'center',
            lineHeight: 1.15,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            marginBottom: '16px',
          }}
        >
          New Nobita &amp; the Castle of the Undersea Devil
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#a9cbe6',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Procedural Canvas 2D Ocean • Web Audio Synthesizer • Voiced Story
        </div>

        {/* Footer Note */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '18px',
            color: 'rgba(169, 203, 230, 0.6)',
          }}
        >
          Unofficial fan experience • Code-generated artwork
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
