import { KeyMapping } from '../types';

// Note names for display
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// MIDI number to note name
export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
}

// Note name to MIDI number
export function noteNameToMidi(name: string): number {
  const match = name.match(/^([A-G]#?)(\d+)$/);
  if (!match) return -1;
  const [, note, octaveStr] = match;
  const noteIndex = NOTE_NAMES.indexOf(note);
  const octave = parseInt(octaveStr);
  return (octave + 1) * 12 + noteIndex;
}

// Check if a MIDI note is a black key
export function isBlackKey(midi: number): boolean {
  const n = midi % 12;
  return [1, 3, 6, 8, 10].includes(n);
}

// Lower octave: C3(48)-B3(59), Upper octave: C4(60)-C5(72)
export const KEYBOARD_MAP: KeyMapping[] = [
  // Lower octave white keys (Z row)
  { key: 'z', midi: 48, note: 'C3', isBlack: false },
  { key: 'x', midi: 50, note: 'D3', isBlack: false },
  { key: 'c', midi: 52, note: 'E3', isBlack: false },
  { key: 'v', midi: 53, note: 'F3', isBlack: false },
  { key: 'b', midi: 55, note: 'G3', isBlack: false },
  { key: 'n', midi: 57, note: 'A3', isBlack: false },
  { key: 'm', midi: 59, note: 'B3', isBlack: false },
  // Lower octave black keys (S row)
  { key: 's', midi: 49, note: 'C#3', isBlack: true },
  { key: 'd', midi: 51, note: 'D#3', isBlack: true },
  { key: 'g', midi: 54, note: 'F#3', isBlack: true },
  { key: 'h', midi: 56, note: 'G#3', isBlack: true },
  { key: 'j', midi: 58, note: 'A#3', isBlack: true },
  // Upper octave white keys (Q row)
  { key: 'q', midi: 60, note: 'C4', isBlack: false },
  { key: 'w', midi: 62, note: 'D4', isBlack: false },
  { key: 'e', midi: 64, note: 'E4', isBlack: false },
  { key: 'r', midi: 65, note: 'F4', isBlack: false },
  { key: 't', midi: 67, note: 'G4', isBlack: false },
  { key: 'y', midi: 69, note: 'A4', isBlack: false },
  { key: 'u', midi: 71, note: 'B4', isBlack: false },
  { key: 'i', midi: 72, note: 'C5', isBlack: false },
  // Upper octave black keys (number row)
  { key: '2', midi: 61, note: 'C#4', isBlack: true },
  { key: '3', midi: 63, note: 'D#4', isBlack: true },
  { key: '5', midi: 66, note: 'F#4', isBlack: true },
  { key: '6', midi: 68, note: 'G#4', isBlack: true },
  { key: '7', midi: 70, note: 'A#4', isBlack: true },
];

// Lookup: keyboard key -> KeyMapping
export const KEY_TO_MAPPING = new Map<string, KeyMapping>(
  KEYBOARD_MAP.map(km => [km.key, km])
);

// Lookup: MIDI number -> KeyMapping
export const MIDI_TO_MAPPING = new Map<number, KeyMapping>(
  KEYBOARD_MAP.map(km => [km.midi, km])
);

// Range of playable MIDI notes
export const MIN_MIDI = 48; // C3
export const MAX_MIDI = 72; // C5
export const TOTAL_KEYS = MAX_MIDI - MIN_MIDI + 1; // 25 keys
