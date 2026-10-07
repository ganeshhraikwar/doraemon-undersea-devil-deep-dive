'use client';

import React from 'react';

interface CastleSvgProps {
  className?: string;
  isMoving?: boolean;
}

export function CastleSvg({ className = '', isMoving = true }: CastleSvgProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 600 480"
        className="w-full max-w-2xl h-auto drop-shadow-[0_0_50px_rgba(255,74,61,0.3)] transition-transform duration-700"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="rockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="trenchWall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="50%" stopColor="#0b1329" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <radialGradient id="eyeGlowGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe066" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffd84d" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#ff4a3d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff4a3d" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="coreAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4a3d" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#991b1b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="gateGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4a3d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.2" />
          </linearGradient>

          {/* Filter for glowing elements */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Abyssal trench cliff backdrop */}
        <path
          d="M 10 470 L 60 260 L 120 330 L 190 220 L 230 470 Z"
          fill="url(#trenchWall)"
          opacity="0.65"
        />
        <path
          d="M 590 470 L 530 250 L 460 340 L 400 230 L 370 470 Z"
          fill="url(#trenchWall)"
          opacity="0.65"
        />

        {/* Central Core Ambient Glow */}
        <circle cx="300" cy="270" r="140" fill="url(#coreAura)" />

        {/* Fortress Base - Basalt Oceanic Terrace */}
        <polygon
          points="80,470 120,380 480,380 520,470"
          fill="url(#rockGradient)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Lower Buttresses */}
        <polygon points="120,380 150,290 220,290 240,380" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
        <polygon points="360,380 380,290 450,290 480,380" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

        {/* Left Spire Tower */}
        <g className={isMoving ? 'animate-pulse' : ''} style={{ animationDuration: '4s' }}>
          <polygon points="130,290 145,150 175,150 190,290" fill="#0b1329" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
          {/* Spire needle */}
          <polygon points="160,70 145,150 175,150" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="160" cy="65" r="4" fill="#38bdf8" filter="url(#neonGlow)" />
          {/* Tower slit windows */}
          <line x1="160" y1="180" x2="160" y2="210" stroke="#ffd84d" strokeWidth="3" filter="url(#neonGlow)" />
          <line x1="160" y1="230" x2="160" y2="255" stroke="#ffd84d" strokeWidth="3" filter="url(#neonGlow)" />
        </g>

        {/* Right Spire Tower */}
        <g className={isMoving ? 'animate-pulse' : ''} style={{ animationDuration: '4.5s' }}>
          <polygon points="410,290 425,150 455,150 470,290" fill="#0b1329" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
          {/* Spire needle */}
          <polygon points="440,70 425,150 455,150" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="440" cy="65" r="4" fill="#38bdf8" filter="url(#neonGlow)" />
          {/* Tower slit windows */}
          <line x1="440" y1="180" x2="440" y2="210" stroke="#ffd84d" strokeWidth="3" filter="url(#neonGlow)" />
          <line x1="440" y1="230" x2="440" y2="255" stroke="#ffd84d" strokeWidth="3" filter="url(#neonGlow)" />
        </g>

        {/* Central Citadel Keep */}
        <polygon
          points="210,380 230,200 370,200 390,380"
          fill="url(#rockGradient)"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Grand Crown Spire */}
        <polygon points="260,200 300,100 340,200" fill="#0b1329" stroke="#94a3b8" strokeWidth="2" />
        <line x1="300" y1="100" x2="300" y2="35" stroke="#ff4a3d" strokeWidth="3" />
        <circle cx="300" cy="30" r="7" fill="#ff4a3d" filter="url(#neonGlow)" />

        {/* Citadel Battlements */}
        <path
          d="M 230 200 L 245 200 L 245 215 L 265 215 L 265 200 L 285 200 L 285 215 L 315 215 L 315 200 L 335 200 L 335 215 L 355 215 L 355 200 L 370 200"
          stroke="#64748b"
          strokeWidth="2"
          fill="none"
        />

        {/* Barred Arched Gate of Poseidon */}
        <g id="undersea-gate">
          {/* Arched entrance opening */}
          <path
            d="M 255 380 L 255 305 Q 300 270 345 305 L 345 380 Z"
            fill="url(#gateGlow)"
            stroke="#ff4a3d"
            strokeWidth="3"
          />
          {/* Heavy iron bars */}
          <line x1="272" y1="290" x2="272" y2="380" stroke="#020617" strokeWidth="5" />
          <line x1="290" y1="275" x2="290" y2="380" stroke="#020617" strokeWidth="5" />
          <line x1="310" y1="275" x2="310" y2="380" stroke="#020617" strokeWidth="5" />
          <line x1="328" y1="290" x2="328" y2="380" stroke="#020617" strokeWidth="5" />
          {/* Horizontal crossbeams */}
          <line x1="255" y1="320" x2="345" y2="320" stroke="#020617" strokeWidth="4" />
          <line x1="255" y1="350" x2="345" y2="350" stroke="#020617" strokeWidth="4" />
        </g>

        {/* Pulsing Gold Sensor Eyes of the Ancient Sentinel AI */}
        <g className="animate-pulse" style={{ animationDuration: '2.2s' }}>
          {/* Left Eye */}
          <circle cx="270" cy="235" r="14" fill="url(#eyeGlowGold)" filter="url(#neonGlow)" />
          <circle cx="270" cy="235" r="6" fill="#ffd84d" />
          <circle cx="270" cy="235" r="2.5" fill="#ffffff" />

          {/* Right Eye */}
          <circle cx="330" cy="235" r="14" fill="url(#eyeGlowGold)" filter="url(#neonGlow)" />
          <circle cx="330" cy="235" r="6" fill="#ffd84d" />
          <circle cx="330" cy="235" r="2.5" fill="#ffffff" />
        </g>

        {/* Center Tri-Eye / Command Sensor */}
        <circle cx="300" cy="170" r="10" fill="url(#eyeGlowGold)" filter="url(#neonGlow)" />
        <circle cx="300" cy="170" r="4.5" fill="#ff4a3d" />

        {/* Tectonic Fissure Base with Molten / Crimson Geothermal Energy */}
        <path
          d="M 60 470 L 180 460 L 250 475 L 350 465 L 440 472 L 540 470"
          stroke="#ff4a3d"
          strokeWidth="3.5"
          filter="url(#neonGlow)"
          fill="none"
          strokeDasharray="8 6"
        />

        {/* Sonar Pulse Ripple rings */}
        <circle
          cx="300"
          cy="270"
          r="190"
          stroke="rgba(255, 74, 61, 0.25)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="10 12"
          className="animate-spin"
          style={{ animationDuration: '24s', transformOrigin: '300px 270px' }}
        />
        <circle
          cx="300"
          cy="270"
          r="230"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6 8"
          className="animate-spin"
          style={{ animationDuration: '32s', animationDirection: 'reverse', transformOrigin: '300px 270px' }}
        />
      </svg>
    </div>
  );
}
