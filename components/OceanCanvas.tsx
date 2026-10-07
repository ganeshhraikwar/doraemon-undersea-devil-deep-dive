'use client';

import React, { useRef, useEffect } from 'react';
import { getOceanGradient, rgbToCss } from '@/lib/color';
import { TorchState } from '@/hooks/usePointerTorch';

interface OceanCanvasProps {
  progress: number;
  scrollY: number;
  torch: TorchState;
  onPopBubble?: (pitch: number) => void;
  onVibrate?: (ms: number) => void;
}

interface MarineSnow {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  driftX: number;
  alpha: number;
  parallax: number;
}

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetVx: number;
  size: number;
  phase: number;
  colorSurface: string;
  depthMin: number; // 0 to 1
  isDeepSpecies: boolean;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  phase: number;
  isTemp?: boolean;
  life?: number;
  maxLife?: number;
}

export function OceanCanvas({
  progress,
  scrollY,
  torch,
  onPopBubble,
  onVibrate,
}: OceanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep latest props in refs for smooth rAF access
  const progressRef = useRef(progress);
  const scrollYRef = useRef(scrollY);
  const lastScrollYRef = useRef(scrollY);
  const torchRef = useRef(torch);
  const onPopBubbleRef = useRef(onPopBubble);
  const onVibrateRef = useRef(onVibrate);

  useEffect(() => {
    progressRef.current = progress;
    scrollYRef.current = scrollY;
    torchRef.current = torch;
    onPopBubbleRef.current = onPopBubble;
    onVibrateRef.current = onVibrate;
  }, [progress, scrollY, torch, onPopBubble, onVibrate]);

  // Persistent arrays
  const snowRef = useRef<MarineSnow[]>([]);
  const fishRef = useRef<Fish[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const setupDpr = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupDpr();

    // 1. Initialize 90 marine snow particles
    const snowParticles: MarineSnow[] = [];
    for (let i = 0; i < 90; i++) {
      snowParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.6,
        speedY: 0.25 + Math.random() * 0.5,
        driftX: (Math.random() - 0.5) * 0.35,
        alpha: 0.25 + Math.random() * 0.55,
        parallax: 0.2 + Math.random() * 0.8,
      });
    }
    snowRef.current = snowParticles;

    // 2. Initialize 46 fish
    const fishColors = [
      '#f97316', // orange clownfish
      '#38bdf8', // bright cyan
      '#ffd84d', // golden tang
      '#f43f5e', // coral pink
      '#2dd4bf', // teal
      '#a855f7', // violet
    ];

    const fishList: Fish[] = [];
    for (let i = 0; i < 46; i++) {
      const isDeep = i >= 30; // 16 deep species
      const vx = (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 1.2);
      fishList.push({
        x: Math.random() * width,
        y: isDeep ? height * 0.5 + Math.random() * (height * 0.5) : Math.random() * height,
        vx,
        vy: (Math.random() - 0.5) * 0.4,
        targetVx: vx,
        size: 7 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        colorSurface: fishColors[i % fishColors.length],
        depthMin: isDeep ? 0.35 : 0.0,
        isDeepSpecies: isDeep,
      });
    }
    fishRef.current = fishList;

    // 3. Initialize 36 bubbles
    const bubbleList: Bubble[] = [];
    for (let i = 0; i < 36; i++) {
      bubbleList.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 3 + Math.random() * 9,
        speedY: 0.7 + Math.random() * 1.5,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 0.6 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    bubblesRef.current = bubbleList;

    // Slanted light rays configuration
    const rays = [
      { xOffset: 0.15, width: 90, angle: 0.38, alpha: 0.22 },
      { xOffset: 0.32, width: 140, angle: 0.35, alpha: 0.18 },
      { xOffset: 0.52, width: 110, angle: 0.39, alpha: 0.24 },
      { xOffset: 0.72, width: 160, angle: 0.34, alpha: 0.2 },
      { xOffset: 0.88, width: 100, angle: 0.37, alpha: 0.16 },
    ];

    // Main animation loop
    const render = () => {
      const p = progressRef.current;
      const currentScrollY = scrollYRef.current;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      const tTorch = torchRef.current;

      ctx.clearRect(0, 0, width, height);

      // A. Background Gradient lerped through 5 stops
      const gradStops = getOceanGradient(p);
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, rgbToCss(gradStops.top));
      bgGrad.addColorStop(1, rgbToCss(gradStops.bottom));
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // B. 5 Slanted Light Rays (fading out by p = 0.4)
      const rayFade = Math.max(0, 1 - p / 0.4);
      if (rayFade > 0.01) {
        ctx.save();
        for (const ray of rays) {
          const startX = width * ray.xOffset;
          const endX = startX + Math.sin(ray.angle) * height;
          const rayGrad = ctx.createLinearGradient(startX, 0, endX, height * 0.85);

          const rayAlpha = ray.alpha * rayFade;
          rayGrad.addColorStop(0, `rgba(224, 247, 255, ${rayAlpha * 1.5})`);
          rayGrad.addColorStop(0.3, `rgba(165, 230, 255, ${rayAlpha})`);
          rayGrad.addColorStop(1, 'rgba(10, 80, 140, 0)');

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(startX - ray.width * 0.5, 0);
          ctx.lineTo(startX + ray.width * 0.5, 0);
          ctx.lineTo(endX + ray.width * 1.4, height);
          ctx.lineTo(endX - ray.width * 0.8, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // C. 90 Marine-Snow Particles with scroll-delta parallax
      ctx.save();
      for (const snow of snowRef.current) {
        // Natural sink
        snow.y += snow.speedY;
        snow.x += snow.driftX;

        // Parallax movement based on scroll delta
        snow.y -= scrollDelta * snow.parallax * 0.6;

        // Wrap around boundaries
        if (snow.y > height + 20) {
          snow.y = -10;
          snow.x = Math.random() * width;
        } else if (snow.y < -20) {
          snow.y = height + 10;
          snow.x = Math.random() * width;
        }
        if (snow.x > width + 20) snow.x = -10;
        else if (snow.x < -20) snow.x = width + 10;

        // Depth adjusts brightness (glowing marine snow)
        const depthSnowAlpha = Math.min(1, snow.alpha * (0.6 + p * 0.6));
        ctx.fillStyle = `rgba(215, 243, 255, ${depthSnowAlpha})`;
        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // D. 46 Fish (ellipse body, wavy triangle tail, fleeing torch within 150px)
      ctx.save();
      const fishActiveCount = Math.max(12, Math.round(46 * (1 - p * 0.65)));

      for (let i = 0; i < fishRef.current.length; i++) {
        const fish = fishRef.current[i];
        if (i >= fishActiveCount && !fish.isDeepSpecies) continue;

        fish.phase += 0.12;

        // Torch proximity check: flee if within 150 px of torch
        const dxTorch = fish.x - tTorch.x;
        const dyTorch = fish.y - tTorch.y;
        const distTorch = Math.hypot(dxTorch, dyTorch);

        if (distTorch < 150 && distTorch > 0) {
          const repelForce = (150 - distTorch) / 150;
          const angle = Math.atan2(dyTorch, dxTorch);
          fish.vx += Math.cos(angle) * repelForce * 1.4;
          fish.vy += Math.sin(angle) * repelForce * 1.4;
        } else {
          // Return gently to target cruise speed
          fish.vx += (fish.targetVx - fish.vx) * 0.04;
          fish.vy += (0 - fish.vy) * 0.04;
        }

        // Clamp speed
        const speed = Math.hypot(fish.vx, fish.vy);
        const maxSpeed = 3.8;
        if (speed > maxSpeed) {
          fish.vx = (fish.vx / speed) * maxSpeed;
          fish.vy = (fish.vy / speed) * maxSpeed;
        }

        fish.x += fish.vx;
        fish.y += fish.vy;

        // Wrap edges
        if (fish.x > width + 50) {
          fish.x = -50;
          fish.y = Math.random() * height;
        } else if (fish.x < -50) {
          fish.x = width + 50;
          fish.y = Math.random() * height;
        }
        if (fish.y > height + 40) fish.y = -30;
        else if (fish.y < -40) fish.y = height + 30;

        // Direction facing
        const facing = fish.vx >= 0 ? 1 : -1;
        const isBioluminescent = p > 0.45 || fish.isDeepSpecies;
        const fishAlpha = isBioluminescent
          ? 0.5 + Math.sin(fish.phase * 0.5) * 0.3
          : Math.max(0.2, 1 - p * 1.2);

        ctx.save();
        ctx.translate(fish.x, fish.y);
        ctx.scale(facing, 1);

        // Body color
        if (isBioluminescent) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#38bdf8';
          ctx.fillStyle = `rgba(56, 189, 248, ${fishAlpha})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = fish.colorSurface;
          ctx.globalAlpha = fishAlpha;
        }

        // Ellipse body
        ctx.beginPath();
        ctx.ellipse(0, 0, fish.size, fish.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wavy triangle tail
        const tailWag = Math.sin(fish.phase) * (fish.size * 0.35);
        ctx.beginPath();
        ctx.moveTo(-fish.size * 0.7, 0);
        ctx.lineTo(-fish.size * 1.45, -fish.size * 0.45 + tailWag);
        ctx.lineTo(-fish.size * 1.45, fish.size * 0.45 + tailWag);
        ctx.closePath();
        ctx.fill();

        // Eye
        ctx.fillStyle = isBioluminescent ? '#ffd84d' : '#02050f';
        ctx.beginPath();
        ctx.arc(fish.size * 0.5, -fish.size * 0.12, Math.max(1.2, fish.size * 0.12), 0, Math.PI * 2);
        ctx.fill();

        // Bioluminescent strip / highlight
        if (isBioluminescent) {
          ctx.strokeStyle = '#ffd84d';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-fish.size * 0.3, 0);
          ctx.lineTo(fish.size * 0.3, 0);
          ctx.stroke();
        }

        ctx.restore();
      }
      ctx.restore();

      // E. 36 Rising bubbles with highlight & temporary spawned bubbles
      ctx.save();
      const nextBubbles: Bubble[] = [];

      for (const bubble of bubblesRef.current) {
        bubble.phase += bubble.wobbleSpeed;
        bubble.y -= bubble.speedY;
        const currentWobble = Math.sin(bubble.phase) * bubble.wobbleAmp;

        if (bubble.isTemp) {
          bubble.life = (bubble.life || 0) + 1;
          const maxLife = bubble.maxLife || 60;
          const tempAlpha = Math.max(0, 1 - bubble.life / maxLife);

          if (bubble.life < maxLife && bubble.y > -20) {
            nextBubbles.push(bubble);
            drawBubble(ctx, bubble.x + currentWobble, bubble.y, bubble.radius, tempAlpha);
          }
        } else {
          // Wrap permanent bubbles
          if (bubble.y < -30) {
            bubble.y = height + 20 + Math.random() * 40;
            bubble.x = Math.random() * width;
          }
          nextBubbles.push(bubble);
          drawBubble(ctx, bubble.x + currentWobble, bubble.y, bubble.radius, 0.7);
        }
      }
      bubblesRef.current = nextBubbles;
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    const drawBubble = (
      c: CanvasRenderingContext2D,
      bx: number,
      by: number,
      rad: number,
      alpha: number
    ) => {
      c.save();
      // Outer bubble rim
      c.strokeStyle = `rgba(186, 230, 253, ${alpha * 0.85})`;
      c.lineWidth = 1.2;
      c.fillStyle = `rgba(125, 211, 252, ${alpha * 0.18})`;
      c.beginPath();
      c.arc(bx, by, rad, 0, Math.PI * 2);
      c.fill();
      c.stroke();

      // Top-left highlight glint
      c.fillStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
      c.beginPath();
      c.arc(bx - rad * 0.35, by - rad * 0.35, Math.max(1, rad * 0.22), 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    animId = requestAnimationFrame(render);

    const onResize = () => {
      setupDpr();
    };

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Handle click / tap on canvas: spawn 7 temporary bubbles, pop nearby ones, play blip, vibrate
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let poppedAny = false;

    // 1. Pop nearby bubbles (within 45px)
    bubblesRef.current = bubblesRef.current.filter((b) => {
      const dist = Math.hypot(b.x - clickX, b.y - clickY);
      if (dist < 45) {
        poppedAny = true;
        return false;
      }
      return true;
    });

    // 2. Spawn 7 temporary bubbles
    const newTemps: Bubble[] = [];
    for (let i = 0; i < 7; i++) {
      const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
      const speed = 1.2 + Math.random() * 2.2;
      newTemps.push({
        x: clickX + Math.cos(angle) * (10 + Math.random() * 15),
        y: clickY + Math.sin(angle) * (10 + Math.random() * 15),
        radius: 3 + Math.random() * 7,
        speedY: speed,
        wobbleSpeed: 0.05 + Math.random() * 0.05,
        wobbleAmp: 1.0 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        isTemp: true,
        life: 0,
        maxLife: 55 + Math.round(Math.random() * 30),
      });
    }
    bubblesRef.current = [...bubblesRef.current, ...newTemps];

    // 3. Audio & Vibration
    const pitch = poppedAny ? 1100 : 800 + Math.round(Math.random() * 400);
    if (onPopBubbleRef.current) {
      onPopBubbleRef.current(pitch);
    }
    if (onVibrateRef.current) {
      onVibrateRef.current(poppedAny ? 35 : 20);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="fixed inset-0 w-full h-full pointer-events-auto select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
