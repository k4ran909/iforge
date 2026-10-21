// Server-safe copy of the contribution-skyline sample generator.
//
// The skyline component is a Client Component ("use client"), so its exported
// generateContributions() can't be called from a server route handler. This
// plain module mirrors that logic for use on the server (the API fallback).

export type ContributionDay = { date: string; count: number };

const DAY_MS = 86400000;

const toKey = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

/** mulberry32 — small, fast, deterministic. */
const rng = (seed: number) => {
  let a = seed >>> 0;
  return (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** A believable year for the API fallback when GitHub isn't configured. */
export const generateSampleContributions = (
  endMs: number,
  seed = 7,
  days = 371,
): ContributionDay[] => {
  const r = rng(seed);
  const bursts = Array.from({ length: 4 }, () => ({
    at: r(),
    width: 0.035 + r() * 0.07,
    gain: 0.6 + r() * 1.1,
  }));
  const out: ContributionDay[] = [];
  let mood = 0.5;
  for (let i = 0; i < days; i++) {
    const ms = endMs - (days - 1 - i) * DAY_MS;
    const x = i / Math.max(1, days - 1);
    const dow = new Date(ms).getUTCDay();
    const weekend = dow === 0 || dow === 6;
    let heat = 0.2;
    for (const b of bursts) heat += b.gain * Math.exp(-((x - b.at) ** 2) / (2 * b.width ** 2));
    mood = mood * 0.85 + r() * 0.15;
    heat *= 0.55 + mood * 0.9;
    const pActive = Math.min(0.94, (weekend ? 0.22 : 0.5) + heat * 0.4);
    let count = 0;
    if (r() < pActive) count = 1 + Math.floor(-Math.log(1 - r()) * (1.2 + heat * 7) * (weekend ? 0.5 : 1));
    if (r() < 0.01) count += 18 + Math.floor(r() * 24);
    out.push({ date: toKey(ms), count });
  }
  return out;
};
