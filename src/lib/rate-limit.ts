/**
 * src/lib/rate-limit.ts
 *
 * Fast in-process sliding-window rate limiter.
 * Serves as Tier 1 protection to drop rapid bursts in RAM before hitting
 * Turnstile, Firestore, or Gmail SMTP.
 */

interface WindowEntry {
  timestamps: number[];
  lastSeen: number;
}

const store = new Map<string, WindowEntry>();

const PRUNE_AGE_MS = 60 * 60 * 1000; // 1 hour
const MAX_STORE_ENTRIES = 10_000;
let lastPruned = Date.now();

function prune(now: number) {
  if (now - lastPruned < 60_000 && store.size < MAX_STORE_ENTRIES) return;
  lastPruned = now;
  for (const [key, entry] of store.entries()) {
    if (now - entry.lastSeen > PRUNE_AGE_MS) {
      store.delete(key);
    }
  }
  // Safety cap against memory exhaustion under distributed IP floods
  if (store.size > MAX_STORE_ENTRIES) {
    const excess = store.size - MAX_STORE_ENTRIES;
    let removed = 0;
    for (const key of store.keys()) {
      store.delete(key);
      removed += 1;
      if (removed >= excess) break;
    }
  }
}

export interface RateLimitOptions {
  /** Rolling window size in milliseconds (default: 60_000 = 1 minute) */
  windowMs?: number;
  /** Maximum number of requests allowed within the window (default: 5) */
  max?: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  { windowMs = 60_000, max = 5 }: RateLimitOptions = {}
): RateLimitResult {
  const now = Date.now();
  prune(now);

  const cutoff = now - windowMs;
  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [], lastSeen: now };
    store.set(key, entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
  entry.lastSeen = now;

  if (entry.timestamps.length >= max) {
    const oldest = entry.timestamps[0];
    return {
      ok: false,
      remaining: 0,
      resetAt: oldest + windowMs,
    };
  }

  entry.timestamps.push(now);
  return {
    ok: true,
    remaining: Math.max(0, max - entry.timestamps.length),
    resetAt: entry.timestamps[0] + windowMs,
  };
}
