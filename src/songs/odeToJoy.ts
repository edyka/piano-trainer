import { Song } from '../types';
import { makeNote, calculateDuration } from '../utils/noteUtils';

const notes = [
  // Line 1: E E F G | G F E D
  makeNote(64, 0.0, 0.45),    // E
  makeNote(64, 0.5, 0.45),    // E
  makeNote(65, 1.0, 0.45),    // F
  makeNote(67, 1.5, 0.45),    // G
  makeNote(67, 2.0, 0.45),    // G
  makeNote(65, 2.5, 0.45),    // F
  makeNote(64, 3.0, 0.45),    // E
  makeNote(62, 3.5, 0.45),    // D
  // Line 2: C C D E | E. D D-
  makeNote(60, 4.0, 0.45),    // C
  makeNote(60, 4.5, 0.45),    // C
  makeNote(62, 5.0, 0.45),    // D
  makeNote(64, 5.5, 0.45),    // E
  makeNote(64, 6.0, 0.7),     // E (dotted quarter)
  makeNote(62, 6.75, 0.25),   // D (eighth)
  makeNote(62, 7.0, 0.9),     // D (half note)
  // Line 3: E E F G | G F E D
  makeNote(64, 8.0, 0.45),    // E
  makeNote(64, 8.5, 0.45),    // E
  makeNote(65, 9.0, 0.45),    // F
  makeNote(67, 9.5, 0.45),    // G
  makeNote(67, 10.0, 0.45),   // G
  makeNote(65, 10.5, 0.45),   // F
  makeNote(64, 11.0, 0.45),   // E
  makeNote(62, 11.5, 0.45),   // D
  // Line 4: C C D E | D. C C-
  makeNote(60, 12.0, 0.45),   // C
  makeNote(60, 12.5, 0.45),   // C
  makeNote(62, 13.0, 0.45),   // D
  makeNote(64, 13.5, 0.45),   // E
  makeNote(62, 14.0, 0.7),    // D (dotted quarter)
  makeNote(60, 14.75, 0.25),  // C (eighth)
  makeNote(60, 15.0, 0.9),    // C (half note)
];

export const odeToJoy: Song = {
  id: 'ode-to-joy',
  title: 'Ode to Joy',
  artist: 'Beethoven',
  difficulty: 'easy',
  bpm: 120,
  notes,
  durationSeconds: calculateDuration(notes),
};
