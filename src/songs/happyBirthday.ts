import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

// Happy Birthday in 3/4 time, dotted rhythms
const notes = [
  // "Happy birthday to you"
  makeNote(60, 0.0, 0.35),    // C (pickup)
  makeNote(60, 0.4, 0.2),     // C
  makeNote(62, 0.65, 0.55),   // D
  makeNote(60, 1.25, 0.55),   // C
  makeNote(65, 1.85, 0.55),   // F
  makeNote(64, 2.45, 0.9),    // E (half note)
  // "Happy birthday to you"
  makeNote(60, 3.5, 0.35),    // C
  makeNote(60, 3.9, 0.2),     // C
  makeNote(62, 4.15, 0.55),   // D
  makeNote(60, 4.75, 0.55),   // C
  makeNote(67, 5.35, 0.55),   // G
  makeNote(65, 5.95, 0.9),    // F (half note)
  // "Happy birthday dear ___"
  makeNote(60, 7.0, 0.35),    // C
  makeNote(60, 7.4, 0.2),     // C
  makeNote(72, 7.65, 0.55),   // C5 (high)
  makeNote(69, 8.25, 0.55),   // A
  makeNote(65, 8.85, 0.55),   // F
  makeNote(64, 9.45, 0.55),   // E
  makeNote(62, 10.05, 0.9),   // D
  // "Happy birthday to you"
  makeNote(70, 11.1, 0.35),   // A#
  makeNote(70, 11.5, 0.2),    // A#
  makeNote(69, 11.75, 0.55),  // A
  makeNote(65, 12.35, 0.55),  // F
  makeNote(67, 12.95, 0.55),  // G
  makeNote(65, 13.55, 0.9),   // F (held)
];

export const happyBirthday: Song = {
  id: 'happy-birthday',
  title: 'Happy Birthday',
  difficulty: 'medium',
  bpm: 100,
  notes,
  durationSeconds: calculateDuration(notes),
};
