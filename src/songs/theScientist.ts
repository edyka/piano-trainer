import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

// Coldplay - The Scientist (vocal melody, simplified for piano)
// Transposed to fit C3-C5 range
const notes = [
  // "Come up to meet you"
  makeNote(65, 0.0, 0.4),     // F4
  makeNote(69, 0.5, 0.4),     // A4
  makeNote(69, 1.0, 0.4),     // A4
  makeNote(69, 1.5, 0.3),     // A4
  makeNote(67, 1.9, 0.3),     // G4
  makeNote(65, 2.3, 0.6),     // F4

  // "tell you I'm sorry"
  makeNote(65, 3.2, 0.4),     // F4
  makeNote(69, 3.7, 0.4),     // A4
  makeNote(67, 4.2, 0.3),     // G4
  makeNote(65, 4.6, 0.3),     // F4
  makeNote(62, 5.0, 0.8),     // D4

  // "you don't know how lovely you are"
  makeNote(60, 6.2, 0.4),     // C4
  makeNote(62, 6.7, 0.3),     // D4
  makeNote(65, 7.1, 0.4),     // F4
  makeNote(65, 7.6, 0.3),     // F4
  makeNote(64, 8.0, 0.3),     // E4
  makeNote(62, 8.4, 0.3),     // D4
  makeNote(60, 8.8, 0.9),     // C4

  // "I had to find you"
  makeNote(65, 10.2, 0.4),    // F4
  makeNote(69, 10.7, 0.4),    // A4
  makeNote(69, 11.2, 0.4),    // A4
  makeNote(69, 11.7, 0.3),    // A4
  makeNote(67, 12.1, 0.3),    // G4
  makeNote(65, 12.5, 0.6),    // F4

  // "tell you I need you"
  makeNote(65, 13.4, 0.4),    // F4
  makeNote(69, 13.9, 0.4),    // A4
  makeNote(67, 14.4, 0.3),    // G4
  makeNote(65, 14.8, 0.3),    // F4
  makeNote(62, 15.2, 0.8),    // D4

  // "tell you I'll set you apart"
  makeNote(60, 16.4, 0.4),    // C4
  makeNote(62, 16.9, 0.3),    // D4
  makeNote(65, 17.3, 0.4),    // F4
  makeNote(65, 17.8, 0.3),    // F4
  makeNote(64, 18.2, 0.3),    // E4
  makeNote(62, 18.6, 0.3),    // D4
  makeNote(60, 19.0, 0.9),    // C4

  // Chorus: "Nobody said it was easy"
  makeNote(72, 20.5, 0.5),    // C5
  makeNote(72, 21.1, 0.3),    // C5
  makeNote(69, 21.5, 0.3),    // A4
  makeNote(67, 21.9, 0.3),    // G4
  makeNote(65, 22.3, 0.3),    // F4
  makeNote(67, 22.7, 0.8),    // G4

  // "it's such a shame for us to part"
  makeNote(72, 23.8, 0.5),    // C5
  makeNote(72, 24.4, 0.3),    // C5
  makeNote(69, 24.8, 0.3),    // A4
  makeNote(67, 25.2, 0.3),    // G4
  makeNote(65, 25.6, 0.3),    // F4
  makeNote(65, 26.0, 0.9),    // F4

  // "Nobody said it was easy"
  makeNote(72, 27.4, 0.5),    // C5
  makeNote(72, 28.0, 0.3),    // C5
  makeNote(69, 28.4, 0.3),    // A4
  makeNote(67, 28.8, 0.3),    // G4
  makeNote(65, 29.2, 0.3),    // F4
  makeNote(67, 29.6, 0.8),    // G4

  // "no one ever said it would be this hard"
  makeNote(69, 30.8, 0.3),    // A4
  makeNote(69, 31.2, 0.3),    // A4
  makeNote(67, 31.6, 0.3),    // G4
  makeNote(65, 32.0, 0.3),    // F4
  makeNote(64, 32.4, 0.3),    // E4
  makeNote(62, 32.8, 0.3),    // D4
  makeNote(60, 33.2, 1.2),    // C4
];

export const theScientist: Song = {
  id: 'the-scientist',
  title: 'The Scientist',
  artist: 'Coldplay',
  difficulty: 'medium',
  bpm: 75,
  notes,
  durationSeconds: calculateDuration(notes),
};
