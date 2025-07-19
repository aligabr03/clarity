export function parseTimeToMs(time: string): number {
  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1), 10);

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * (multipliers[unit] || 0);
}
