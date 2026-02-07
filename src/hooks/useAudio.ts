import { useRef, useState, useCallback, useEffect } from 'react';
import { AudioEngine } from '../audio/AudioEngine';
import { InstrumentType } from '../types';

export function useAudio(instrumentType: InstrumentType = 'piano') {
  const engineRef = useRef<AudioEngine | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    engineRef.current = new AudioEngine(instrumentType);
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  // Switch instrument when type changes
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (engine.getInstrumentType() === instrumentType) return;

    engine.setInstrument(instrumentType).then(() => {
      // If we were already loaded, the new instrument is now loaded too
      if (engine.isReady()) {
        setIsLoaded(true);
      }
    });
  }, [instrumentType]);

  const initialize = useCallback(async () => {
    if (!engineRef.current) return;
    // Already loaded
    if (engineRef.current.isReady()) {
      setIsLoaded(true);
      return;
    }
    // Already loading — return same promise
    if (initPromiseRef.current) return initPromiseRef.current;

    setIsLoading(true);
    initPromiseRef.current = engineRef.current.initialize().then(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Failed to initialize audio:', err);
      setIsLoading(false);
      initPromiseRef.current = null;
    });

    return initPromiseRef.current;
  }, []);

  const playNote = useCallback((midi: number, velocity?: number) => {
    engineRef.current?.playNote(midi, velocity);
  }, []);

  const stopNote = useCallback((midi: number) => {
    engineRef.current?.stopNote(midi);
  }, []);

  return {
    initialize,
    isLoaded,
    isLoading,
    playNote,
    stopNote,
    engine: engineRef,
  };
}
