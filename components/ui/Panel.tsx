import React from 'react';

export interface PanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  id?: string;
}

export function Panel({ children, className = '', glow = false, id }: PanelProps) {
  return (
    <div
      id={id}
      className={`relative backdrop-blur-md bg-[rgba(3,14,36,0.78)] border border-[rgba(160,230,255,0.28)] rounded-[22px] p-6 sm:p-8 md:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-all duration-300 ${
        glow ? 'shadow-[0_0_35px_rgba(56,189,248,0.25)] border-[rgba(160,230,255,0.45)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
