import React from 'react';

export interface ChipProps {
  label: string;
  sublabel?: string;
  variant?: 'blue' | 'gold' | 'cyan' | 'red';
  onClick?: () => void;
  active?: boolean;
}

export function Chip({ label, sublabel, variant = 'blue', onClick, active }: ChipProps) {
  const variantStyles = {
    blue: 'border-sky-400/30 text-sky-200 bg-sky-950/40 hover:bg-sky-900/50 hover:border-sky-400/60',
    gold: 'border-amber-400/40 text-amber-200 bg-amber-950/40 hover:bg-amber-900/50 hover:border-amber-400/70',
    cyan: 'border-teal-400/40 text-teal-200 bg-teal-950/40 hover:bg-teal-900/50 hover:border-teal-400/70',
    red: 'border-red-400/40 text-red-200 bg-red-950/40 hover:bg-red-900/50 hover:border-red-400/70',
  };

  const activeStyles = active ? 'ring-2 ring-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.4)]' : '';

  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium tracking-wide transition-all backdrop-blur-sm select-none ${
        onClick ? 'cursor-pointer active:scale-95' : ''
      } ${variantStyles[variant]} ${activeStyles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 animate-pulse" />
      <span>{label}</span>
      {sublabel && <span className="opacity-60 text-[11px] font-normal">({sublabel})</span>}
    </Tag>
  );
}
