import { useEffect, useCallback, useRef } from 'react';
import { KEY_TO_MAPPING } from '../constants/notes';

interface UseKeyboardInputOptions {
  onNoteOn: (midi: number) => void;
  onNoteOff: (midi: number) => void;
  enabled?: boolean;
}

export function useKeyboardInput({ onNoteOn, onNoteOff, enabled = true }: UseKeyboardInputOptions) {
  const pressedKeys = useRef<Set<string>>(new Set());

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    // Ignore repeated events (key held down)
    if (e.repeat) return;
    // Ignore if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    const key = e.key.toLowerCase();
    const mapping = KEY_TO_MAPPING.get(key);
    if (mapping && !pressedKeys.current.has(key)) {
      pressedKeys.current.add(key);
      onNoteOn(mapping.midi);
    }
  }, [onNoteOn, enabled]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const mapping = KEY_TO_MAPPING.get(key);
    if (mapping && pressedKeys.current.has(key)) {
      pressedKeys.current.delete(key);
      onNoteOff(mapping.midi);
    }
  }, [onNoteOff]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      pressedKeys.current.clear();
    };
  }, [handleKeyDown, handleKeyUp]);

  return pressedKeys;
}
