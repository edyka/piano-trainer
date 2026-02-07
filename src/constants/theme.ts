// Colors for white key notes (by note name)
export const NOTE_COLORS: Record<string, string> = {
  'C': '#FF6B6B',   // red
  'D': '#FFA94D',   // orange
  'E': '#FFD93D',   // yellow
  'F': '#69DB7C',   // green
  'G': '#4DABF7',   // blue
  'A': '#9775FA',   // purple
  'B': '#F783AC',   // pink
};

// Black key notes get slightly darker versions
export const BLACK_NOTE_COLORS: Record<string, string> = {
  'C#': '#E05555',
  'D#': '#E09040',
  'F#': '#55C065',
  'G#': '#3D95DB',
  'A#': '#8060E0',
};

export function getNoteColor(noteName: string): string {
  // Extract just the note letter(s) without octave
  const note = noteName.replace(/\d+$/, '');
  return BLACK_NOTE_COLORS[note] || NOTE_COLORS[note] || '#888';
}

// App theme
export const THEME = {
  bg: '#1a1a2e',
  bgLight: '#16213e',
  bgDark: '#0f0f1a',
  primary: '#4DABF7',
  primaryDark: '#1971c2',
  text: '#e0e0e0',
  textDim: '#888',
  textBright: '#fff',
  success: '#69DB7C',
  warning: '#FFD93D',
  danger: '#FF6B6B',
  whiteKey: '#f0f0f0',
  whiteKeyActive: '#ddd',
  blackKey: '#2a2a2a',
  blackKeyActive: '#444',
  hitLine: '#FFD93D',
  canvasBg: '#0a0a1a',
};
