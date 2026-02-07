import { Midi } from '@tonejs/midi';
import { Song, SongNote } from '../types';
import { midiToNoteName, MIN_MIDI, MAX_MIDI } from '../constants/notes';
import { calculateDuration } from '../utils/noteUtils';

export async function parseMidiFile(file: File): Promise<Song> {
  const arrayBuffer = await file.arrayBuffer();
  const midi = new Midi(arrayBuffer);

  const allNotes: SongNote[] = [];

  // Collect notes from all tracks
  for (const track of midi.tracks) {
    for (const note of track.notes) {
      // Only include notes in our playable range
      if (note.midi >= MIN_MIDI && note.midi <= MAX_MIDI) {
        allNotes.push({
          midi: note.midi,
          name: midiToNoteName(note.midi),
          startTime: note.time,
          duration: note.duration,
          velocity: note.velocity,
        });
      }
    }
  }

  // Sort by start time
  allNotes.sort((a, b) => a.startTime - b.startTime);

  if (allNotes.length === 0) {
    throw new Error('No playable notes found in MIDI file (notes must be in C3-C5 range)');
  }

  // Determine difficulty based on note density
  const duration = calculateDuration(allNotes);
  const notesPerSecond = allNotes.length / duration;
  let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
  if (notesPerSecond < 2) difficulty = 'easy';
  else if (notesPerSecond > 4) difficulty = 'hard';

  // Get BPM from MIDI tempo
  const bpm = midi.header.tempos.length > 0
    ? Math.round(midi.header.tempos[0].bpm)
    : 120;

  // Generate ID from filename
  const baseName = file.name.replace(/\.(mid|midi)$/i, '');
  const id = `imported-${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return {
    id,
    title: baseName,
    difficulty,
    bpm,
    notes: allNotes,
    durationSeconds: duration,
  };
}
