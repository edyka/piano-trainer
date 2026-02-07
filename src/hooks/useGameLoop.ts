import { useRef, useCallback, useEffect } from 'react';

type FrameCallback = (timestamp: number) => void;

export function useGameLoop(callback: FrameCallback, running: boolean) {
  const rafRef = useRef<number>(0);
  const callbackRef = useRef<FrameCallback>(callback);

  // Keep callback ref fresh without causing re-subscription
  callbackRef.current = callback;

  const loop = useCallback((timestamp: number) => {
    callbackRef.current(timestamp);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    if (running) {
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [running, loop]);
}
