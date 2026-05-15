'use client';
import React, { useState, useEffect } from 'react';

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isFinePointer, setIsFinePointer] = useState(false);
  
  useEffect(() => {
    // Only enable on devices with a mouse (pointer: fine) — not touch screens
    const mq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mq.matches);
    if (!mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  if (!isFinePointer) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[100]" 
      style={{ background: `radial-gradient(220px at ${mousePos.x}px ${mousePos.y}px, rgba(15, 23, 42, 0.08), transparent 80%)` }} 
    />
  );
};

export default MouseGlow;
