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
  // Base colors
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

  // Gradients
  bgGradient: 'radial-gradient(ellipse at 50% 0%, #1e2a4a 0%, #1a1a2e 50%, #12121f 100%)',
  primaryGradient: 'linear-gradient(135deg, #4DABF7 0%, #3b82f6 50%, #6366f1 100%)',
  primaryGradientHover: 'linear-gradient(135deg, #60b8ff 0%, #4f8ff7 50%, #7c7ff5 100%)',
  warningGradient: 'linear-gradient(135deg, #FFD93D 0%, #FFA94D 100%)',
  successGradient: 'linear-gradient(135deg, #69DB7C 0%, #40c057 100%)',
  headerGradient: 'linear-gradient(135deg, rgba(77, 171, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',

  // Glass effects
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBgHover: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassBorderBright: 'rgba(255, 255, 255, 0.15)',

  // Shadows
  shadowSm: '0 2px 8px rgba(0, 0, 0, 0.2)',
  shadowMd: '0 4px 16px rgba(0, 0, 0, 0.3)',
  shadowLg: '0 8px 32px rgba(0, 0, 0, 0.4)',
  shadowGlow: (color: string) => `0 0 20px ${color}40, 0 0 40px ${color}20`,
};
