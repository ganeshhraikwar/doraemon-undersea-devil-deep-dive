'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'gold',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 shadow-sm',
    md: 'text-sm px-5 py-2.5 gap-2 shadow-md',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-lg',
  };

  const variants = {
    gold: 'bg-[#ffd84d] text-[#02050f] hover:bg-[#ffe37a] hover:shadow-[0_0_20px_rgba(255,216,77,0.45)] focus-visible:outline-[#ffd84d]',
    ghost:
      'bg-transparent border border-[rgba(160,230,255,0.4)] text-[#eaf6ff] hover:bg-[rgba(160,230,255,0.12)] hover:border-[#a0e6ff] focus-visible:outline-[#a0e6ff]',
    danger:
      'bg-[#ff4a3d] text-white hover:bg-[#ff6459] hover:shadow-[0_0_20px_rgba(255,74,61,0.5)] focus-visible:outline-[#ff4a3d]',
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
