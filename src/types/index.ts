// Note as stored in a song
export interface SongNote {
  midi: number;        // MIDI number 0-127
  name: string;        // e.g. "C4", "F#3"
  startTime: number;   // seconds from song start
  duration: number;    // seconds
  velocity: number;    // 0-1
}

// Runtime note state during gameplay
export interface ActiveNote extends SongNote {
  id: string;
  hit: boolean;
  missed: boolean;
  passed: boolean;     // scrolled past hit zone
}

export interface Song {
  id: string;
  title: string;
  artist?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bpm: number;
  notes: SongNote[];
  durationSeconds: number;
}

export type GameMode = 'freeplay' | 'practice' | 'performance';
export type InstrumentType = 'piano' | 'accordion' | 'organ' | 'electric-piano' | 'harpsichord' | 'music-box';
export type GameState = 'idle' | 'loading' | 'countdown' | 'playing' | 'paused' | 'completed';

export interface ScoreData {
  totalNotes: number;
  hitNotes: number;
  missedNotes: number;
  accuracy: number;      // 0-100
  maxStreak: number;
  currentStreak: number;
  score: number;
  perfect: number;       // within 50ms
  great: number;         // within 100ms
  good: number;          // within 150ms
}

export interface GameConfig {
  mode: GameMode;
  speed: number;          // 0.25 - 2.0
  fallTimeSeconds: number; // how long a note is visible before hitting
  hitWindowMs: number;     // timing tolerance in ms
}

// Keyboard key to MIDI mapping entry
export interface KeyMapping {
  key: string;        // keyboard key (lowercase)
  midi: number;       // MIDI note number
  note: string;       // note name like "C4"
  isBlack: boolean;
}
