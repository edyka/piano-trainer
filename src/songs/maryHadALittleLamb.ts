import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

const notes = [
  // "Mary had a little lamb"
  makeNote(64, 0.0, 0.45),    // E
  makeNote(62, 0.5, 0.45),    // D
  makeNote(60, 1.0, 0.45),    // C
  makeNote(62, 1.5, 0.45),    // D
  makeNote(64, 2.0, 0.45),    // E
  makeNote(64, 2.5, 0.45),    // E
  makeNote(64, 3.0, 0.9),     // E (half note)
  // "Little lamb, little lamb"
  makeNote(62, 4.0, 0.45),    // D
  makeNote(62, 4.5, 0.45),    // D
  makeNote(62, 5.0, 0.9),     // D (half note)
  makeNote(64, 6.0, 0.45),    // E
  makeNote(67, 6.5, 0.45),    // G
  makeNote(67, 7.0, 0.9),     // G (half note)
  // "Mary had a little lamb" (repeat)
  makeNote(64, 8.0, 0.45),    // E
  makeNote(62, 8.5, 0.45),    // D
  makeNote(60, 9.0, 0.45),    // C
  makeNote(62, 9.5, 0.45),    // D
  makeNote(64, 10.0, 0.45),   // E
  makeNote(64, 10.5, 0.45),   // E
  makeNote(64, 11.0, 0.45),   // E
  makeNote(64, 11.5, 0.45),   // E
  // "Its fleece was white as snow"
  makeNote(62, 12.0, 0.45),   // D
  makeNote(62, 12.5, 0.45),   // D
  makeNote(64, 13.0, 0.45),   // E
  makeNote(62, 13.5, 0.45),   // D
  makeNote(60, 14.0, 0.9),    // C (half note)
];

export const maryHadALittleLamb: Song = {
  id: 'mary-had-a-little-lamb',
  title: 'Mary Had a Little Lamb',
  difficulty: 'easy',
  bpm: 120,
  notes,
  durationSeconds: calculateDuration(notes),
};
