import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

const notes = [
  // "Twinkle twinkle little star"
  makeNote(60, 0.0, 0.45),    // C
  makeNote(60, 0.5, 0.45),    // C
  makeNote(67, 1.0, 0.45),    // G
  makeNote(67, 1.5, 0.45),    // G
  makeNote(69, 2.0, 0.45),    // A
  makeNote(69, 2.5, 0.45),    // A
  makeNote(67, 3.0, 0.9),     // G (half note)
  // "How I wonder what you are"
  makeNote(65, 4.0, 0.45),    // F
  makeNote(65, 4.5, 0.45),    // F
  makeNote(64, 5.0, 0.45),    // E
  makeNote(64, 5.5, 0.45),    // E
  makeNote(62, 6.0, 0.45),    // D
  makeNote(62, 6.5, 0.45),    // D
  makeNote(60, 7.0, 0.9),     // C (half note)
  // "Up above the world so high"
  makeNote(67, 8.0, 0.45),    // G
  makeNote(67, 8.5, 0.45),    // G
  makeNote(65, 9.0, 0.45),    // F
  makeNote(65, 9.5, 0.45),    // F
  makeNote(64, 10.0, 0.45),   // E
  makeNote(64, 10.5, 0.45),   // E
  makeNote(62, 11.0, 0.9),    // D (half note)
  // "Like a diamond in the sky"
  makeNote(67, 12.0, 0.45),   // G
  makeNote(67, 12.5, 0.45),   // G
  makeNote(65, 13.0, 0.45),   // F
  makeNote(65, 13.5, 0.45),   // F
  makeNote(64, 14.0, 0.45),   // E
  makeNote(64, 14.5, 0.45),   // E
  makeNote(62, 15.0, 0.9),    // D (half note)
  // "Twinkle twinkle little star" (repeat)
  makeNote(60, 16.0, 0.45),   // C
  makeNote(60, 16.5, 0.45),   // C
  makeNote(67, 17.0, 0.45),   // G
  makeNote(67, 17.5, 0.45),   // G
  makeNote(69, 18.0, 0.45),   // A
  makeNote(69, 18.5, 0.45),   // A
  makeNote(67, 19.0, 0.9),    // G (half note)
  // "How I wonder what you are"
  makeNote(65, 20.0, 0.45),   // F
  makeNote(65, 20.5, 0.45),   // F
  makeNote(64, 21.0, 0.45),   // E
  makeNote(64, 21.5, 0.45),   // E
  makeNote(62, 22.0, 0.45),   // D
  makeNote(62, 22.5, 0.45),   // D
  makeNote(60, 23.0, 0.9),    // C (half note)
];

export const twinkleTwinkle: Song = {
  id: 'twinkle-twinkle',
  title: 'Twinkle Twinkle Little Star',
  difficulty: 'easy',
  bpm: 120,
  notes,
  durationSeconds: calculateDuration(notes),
};
