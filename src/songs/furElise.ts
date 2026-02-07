import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

const notes = [
  // Theme: E5-D#5-E5-D#5-E5-B4-D5-C5-A4 (transposed down to our range)
  // Using E4-D#4-E4-D#4-E4-B3-D4-C4-A3
  makeNote(64, 0.0, 0.3),     // E4
  makeNote(63, 0.35, 0.3),    // D#4
  makeNote(64, 0.7, 0.3),     // E4
  makeNote(63, 1.05, 0.3),    // D#4
  makeNote(64, 1.4, 0.3),     // E4
  makeNote(59, 1.75, 0.3),    // B3
  makeNote(62, 2.1, 0.3),     // D4
  makeNote(60, 2.45, 0.3),    // C4
  makeNote(57, 2.8, 0.55),    // A3 (longer)
  // C E A B
  makeNote(48, 3.5, 0.3),     // C3
  makeNote(52, 3.85, 0.3),    // E3
  makeNote(57, 4.2, 0.3),     // A3
  makeNote(59, 4.55, 0.55),   // B3 (longer)
  // E G# B C
  makeNote(52, 5.25, 0.3),    // E3
  makeNote(56, 5.6, 0.3),     // G#3
  makeNote(59, 5.95, 0.3),    // B3
  makeNote(60, 6.3, 0.55),    // C4 (longer)
  // Theme repeat: E D# E D# E B D C A
  makeNote(64, 7.0, 0.3),     // E4
  makeNote(63, 7.35, 0.3),    // D#4
  makeNote(64, 7.7, 0.3),     // E4
  makeNote(63, 8.05, 0.3),    // D#4
  makeNote(64, 8.4, 0.3),     // E4
  makeNote(59, 8.75, 0.3),    // B3
  makeNote(62, 9.1, 0.3),     // D4
  makeNote(60, 9.45, 0.3),    // C4
  makeNote(57, 9.8, 0.55),    // A3
  // C E A B
  makeNote(48, 10.5, 0.3),    // C3
  makeNote(52, 10.85, 0.3),   // E3
  makeNote(57, 11.2, 0.3),    // A3
  makeNote(59, 11.55, 0.55),  // B3
  // E C B A
  makeNote(52, 12.25, 0.3),   // E3
  makeNote(60, 12.6, 0.3),    // C4
  makeNote(59, 12.95, 0.3),   // B3
  makeNote(57, 13.3, 0.9),    // A3 (held)
];

export const furElise: Song = {
  id: 'fur-elise',
  title: 'Für Elise',
  artist: 'Beethoven',
  difficulty: 'medium',
  bpm: 140,
  notes,
  durationSeconds: calculateDuration(notes),
};
