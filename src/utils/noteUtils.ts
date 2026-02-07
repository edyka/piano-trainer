import { SongNote } from '../types';
import { NOTE_NAMES, MIN_MIDI, MAX_MIDI, midiToNoteName } from '../constants/notes';

// Generate unique ID for active notes
let noteIdCounter = 0;
export function generateNoteId(): string {
  return `note_${++noteIdCounter}`;
}

export function resetNoteIdCounter(): void {
  noteIdCounter = 0;
}

// Check if a MIDI note is within our playable range
export function isInRange(midi: number): boolean {
  return midi >= MIN_MIDI && midi <= MAX_MIDI;
}

// Get the base note name without octave (e.g., "C#" from "C#4")
export function getBaseNoteName(noteName: string): string {
  return noteName.replace(/\d+$/, '');
}

// Get the letter name for display on keys (e.g., "C" from 60)
export function getDisplayName(midi: number): string {
  const noteIndex = midi % 12;
  return NOTE_NAMES[noteIndex];
}

// Sort notes by start time
export function sortNotesByTime(notes: SongNote[]): SongNote[] {
  return [...notes].sort((a, b) => a.startTime - b.startTime);
}

// Get song duration from notes
export function calculateDuration(notes: SongNote[]): number {
  if (notes.length === 0) return 0;
  return Math.max(...notes.map(n => n.startTime + n.duration));
}

// Helper to create a SongNote from minimal data
export function makeNote(midi: number, startTime: number, duration: number = 0.5, velocity: number = 0.8): SongNote {
  return {
    midi,
    name: midiToNoteName(midi),
    startTime,
    duration,
    velocity,
  };
}

// Clamp a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Format time as M:SS
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
