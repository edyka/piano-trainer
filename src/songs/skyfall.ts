import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

// Adele - Skyfall (vocal melody, simplified for piano)
// Original in Cm, transposed to fit C3-C5 range
const notes = [
  // "This is the end"
  makeNote(60, 0.0, 0.5),     // C4
  makeNote(60, 0.6, 0.4),     // C4
  makeNote(60, 1.1, 0.4),     // C4
  makeNote(63, 1.6, 0.4),     // Eb4
  makeNote(62, 2.1, 0.8),     // D4

  // "Hold your breath and count to ten"
  makeNote(60, 3.3, 0.5),     // C4
  makeNote(60, 3.9, 0.4),     // C4
  makeNote(60, 4.4, 0.4),     // C4
  makeNote(63, 4.9, 0.3),     // Eb4
  makeNote(62, 5.3, 0.3),     // D4
  makeNote(60, 5.7, 0.3),     // C4
  makeNote(58, 6.1, 0.8),     // Bb3

  // "Feel the earth move and then"
  makeNote(58, 7.3, 0.5),     // Bb3
  makeNote(58, 7.9, 0.4),     // Bb3
  makeNote(58, 8.4, 0.4),     // Bb3
  makeNote(62, 8.9, 0.3),     // D4
  makeNote(60, 9.3, 0.3),     // C4
  makeNote(58, 9.7, 0.3),     // Bb3
  makeNote(56, 10.1, 0.8),    // Ab3

  // "Hear my heart burst again"
  makeNote(56, 11.3, 0.5),    // Ab3
  makeNote(56, 11.9, 0.4),    // Ab3
  makeNote(56, 12.4, 0.4),    // Ab3
  makeNote(60, 12.9, 0.3),    // C4
  makeNote(58, 13.3, 0.3),    // Bb3
  makeNote(56, 13.7, 0.3),    // Ab3
  makeNote(55, 14.1, 0.9),    // G3

  // Chorus: "Let the sky fall"
  makeNote(60, 15.6, 0.6),    // C4
  makeNote(63, 16.3, 0.4),    // Eb4
  makeNote(67, 16.8, 0.5),    // G4
  makeNote(68, 17.4, 1.0),    // Ab4

  // "When it crumbles"
  makeNote(67, 18.8, 0.5),    // G4
  makeNote(63, 19.4, 0.4),    // Eb4
  makeNote(62, 19.9, 0.9),    // D4

  // "We will stand tall"
  makeNote(60, 21.2, 0.6),    // C4
  makeNote(63, 21.9, 0.4),    // Eb4
  makeNote(67, 22.4, 0.5),    // G4
  makeNote(68, 23.0, 1.0),    // Ab4

  // "Face it all together"
  makeNote(67, 24.4, 0.4),    // G4
  makeNote(68, 24.9, 0.4),    // Ab4
  makeNote(67, 25.4, 0.4),    // G4
  makeNote(63, 25.9, 0.4),    // Eb4
  makeNote(62, 26.4, 0.9),    // D4

  // "Let the sky fall"  (repeat)
  makeNote(60, 27.8, 0.6),    // C4
  makeNote(63, 28.5, 0.4),    // Eb4
  makeNote(67, 29.0, 0.5),    // G4
  makeNote(68, 29.6, 1.0),    // Ab4

  // "When it crumbles"
  makeNote(67, 31.0, 0.5),    // G4
  makeNote(63, 31.6, 0.4),    // Eb4
  makeNote(62, 32.1, 0.9),    // D4

  // "We will stand tall"
  makeNote(60, 33.4, 0.6),    // C4
  makeNote(63, 34.1, 0.4),    // Eb4
  makeNote(67, 34.6, 0.5),    // G4
  makeNote(68, 35.2, 1.0),    // Ab4

  // "at the skyfall"
  makeNote(67, 36.6, 0.5),    // G4
  makeNote(63, 37.2, 0.5),    // Eb4
  makeNote(60, 37.8, 1.2),    // C4
];

export const skyfall: Song = {
  id: 'skyfall',
  title: 'Skyfall',
  artist: 'Adele',
  difficulty: 'medium',
  bpm: 75,
  notes,
  durationSeconds: calculateDuration(notes),
};
