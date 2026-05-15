'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Lazy-load: defers Firebase + Gemini SDK from the critical path
const AiChatWidget = dynamic(() => import('./AiChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function LazyAiChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const pathname = usePathname();

  // Don't load the chat widget on the booking page — it interferes with the booking flow
  const suppressedPaths = ['/booking'];
  if (suppressedPaths.includes(pathname)) return null;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadWidget = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', loadWidget);
      window.removeEventListener('mousemove', loadWidget);
      window.removeEventListener('touchstart', loadWidget);
    };

    // Load after 5 seconds if no interaction occurs
    timeoutId = setTimeout(loadWidget, 5000);

    // Load immediately on user interaction
    window.addEventListener('scroll', loadWidget, { once: true, passive: true });
    window.addEventListener('mousemove', loadWidget, { once: true, passive: true });
    window.addEventListener('touchstart', loadWidget, { once: true, passive: true });

    return cleanup;
  }, []);

  if (!shouldLoad) return null;

  return <AiChatWidget />;
}
