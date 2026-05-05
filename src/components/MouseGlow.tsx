'use client';
import React, { useState, useEffect } from 'react';

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[100]" 
      style={{ background: `radial-gradient(220px at ${mousePos.x}px ${mousePos.y}px, rgba(57, 210, 55, 0.08), transparent 80%)` }} 
    />
  );
};

export default MouseGlow;
