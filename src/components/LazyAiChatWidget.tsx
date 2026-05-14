'use client';
import dynamic from 'next/dynamic';

// Lazy-load: defers Firebase + Gemini SDK from the critical path
const AiChatWidget = dynamic(() => import('./AiChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function LazyAiChatWidget() {
  return <AiChatWidget />;
}
