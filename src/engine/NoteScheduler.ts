import { SongNote, ActiveNote } from '../types';
import { generateNoteId, resetNoteIdCounter } from '../utils/noteUtils';

export class NoteScheduler {
  private songNotes: SongNote[] = [];
  private activeNotes: ActiveNote[] = [];
  private nextIndex = 0;    // next note to activate from songNotes
  private fallTime = 3.0;   // how many seconds before hit time to show note

  load(notes: SongNote[], fallTime: number): void {
    this.songNotes = notes;
    this.fallTime = fallTime;
    this.activeNotes = [];
    this.nextIndex = 0;
    resetNoteIdCounter();
  }

  // Called every frame with the current song time
  update(currentTime: number): void {
    // Activate notes that should now be visible (sliding window)
    const activationTime = currentTime + this.fallTime;
    while (
      this.nextIndex < this.songNotes.length &&
      this.songNotes[this.nextIndex].startTime <= activationTime
    ) {
      const note = this.songNotes[this.nextIndex];
      this.activeNotes.push({
        ...note,
        id: generateNoteId(),
        hit: false,
        missed: false,
        passed: false,
      });
      this.nextIndex++;
    }

    // Mark notes that have passed the hit window as missed
    for (const note of this.activeNotes) {
      if (!note.hit && !note.missed && currentTime > note.startTime + 0.3) {
        note.passed = true;
      }
    }

    // Clean up notes that are far past (keep for a bit for visual feedback)
    this.activeNotes = this.activeNotes.filter(
      n => currentTime - (n.startTime + n.duration) < 2.0
    );
  }

  getActiveNotes(): ActiveNote[] {
    return this.activeNotes;
  }

  // Try to hit a note with the given MIDI number at the current time
  // Returns the matched note and timing delta, or null
  tryHit(midi: number, currentTime: number, windowMs: number): { note: ActiveNote; deltaMs: number } | null {
    const windowSec = windowMs / 1000;
    let bestMatch: ActiveNote | null = null;
    let bestDelta = Infinity;

    for (const note of this.activeNotes) {
      if (note.midi !== midi || note.hit || note.missed) continue;

      const delta = Math.abs(currentTime - note.startTime);
      if (delta <= windowSec && delta < bestDelta) {
        bestMatch = note;
        bestDelta = delta;
      }
    }

    if (bestMatch) {
      bestMatch.hit = true;
      return { note: bestMatch, deltaMs: bestDelta * 1000 };
    }
    return null;
  }

  // Get the next unhit note (for practice mode - to know what to wait for)
  getNextExpectedNote(): ActiveNote | null {
    for (const note of this.activeNotes) {
      if (!note.hit && !note.missed) return note;
    }
    return null;
  }

  // Mark unplayed notes as missed up to a time
  markMissedBefore(time: number): ActiveNote[] {
    const missed: ActiveNote[] = [];
    for (const note of this.activeNotes) {
      if (!note.hit && !note.missed && note.startTime + 0.3 < time) {
        note.missed = true;
        missed.push(note);
      }
    }
    return missed;
  }

  isComplete(): boolean {
    return this.nextIndex >= this.songNotes.length &&
      this.activeNotes.every(n => n.hit || n.missed || n.passed);
  }

  reset(): void {
    this.activeNotes = [];
    this.nextIndex = 0;
    resetNoteIdCounter();
  }
}
