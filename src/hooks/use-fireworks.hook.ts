import { useCallback, useState } from "react";

const COLORS = [
  "#ff4757",
  "#ffa502",
  "#2ed573",
  "#1e90ff",
  "#eccc68",
  "#a29bfe",
  "#ff6b81",
];
const PARTICLE_COUNT = 20;

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
}

export const useFireworks = () => {
  const [bursts, setBursts] = useState<{ id: number; particles: Particle[] }[]>(
    [],
  );

  const trigger = useCallback(() => {
    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      (_, i) => ({
        id: i,
        angle: (360 / PARTICLE_COUNT) * i + Math.random() * 10,
        distance: 30 + Math.random() * 35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 4,
      }),
    );

    const id = Date.now();
    setBursts((prev) => [...prev, { id, particles }]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 700);
  }, []);

  return { bursts, trigger };
};
