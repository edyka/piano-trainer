import * as Tone from 'tone';

// Common interface for all instruments
export interface Instrument {
  load(): Promise<void>;
  isLoaded(): boolean;
  triggerAttack(note: string | number, velocity?: number): void;
  triggerRelease(note: string | number): void;
  triggerAttackRelease(note: string | number, duration: number, velocity?: number): void;
  dispose(): void;
}

// Salamander Grand Piano samples (hosted on tonejs GitHub)
const BASE_URL = 'https://tonejs.github.io/audio/salamander/';

// We only need samples for notes we use (C3-C5 range)
// Tone.js Sampler will interpolate between these
const SAMPLE_MAP: Record<string, string> = {
  'C3': 'C3.mp3',
  'D#3': 'Ds3.mp3',
  'F#3': 'Fs3.mp3',
  'A3': 'A3.mp3',
  'C4': 'C4.mp3',
  'D#4': 'Ds4.mp3',
  'F#4': 'Fs4.mp3',
  'A4': 'A4.mp3',
  'C5': 'C5.mp3',
};

export class PianoSampler implements Instrument {
  private sampler: Tone.Sampler | null = null;
  private loaded = false;
  private loadPromise: Promise<void> | null = null;

  async load(): Promise<void> {
    if (this.loaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = new Promise<void>((resolve, reject) => {
      this.sampler = new Tone.Sampler({
        urls: SAMPLE_MAP,
        baseUrl: BASE_URL,
        onload: () => {
          this.loaded = true;
          resolve();
        },
        onerror: (err) => {
          reject(err);
        },
        release: 1.5,
      }).toDestination();
    });

    return this.loadPromise;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  // Play a note by name (e.g., "C4") or MIDI number
  triggerAttack(note: string | number, velocity: number = 0.8): void {
    if (!this.sampler || !this.loaded) return;
    try {
      this.sampler.triggerAttack(note, Tone.now(), velocity);
    } catch (e) {
      console.warn('Failed to trigger note:', note, e);
    }
  }

  triggerRelease(note: string | number): void {
    if (!this.sampler || !this.loaded) return;
    try {
      this.sampler.triggerRelease(note, Tone.now());
    } catch (e) {
      console.warn('Failed to release note:', note, e);
    }
  }

  // Play a note for a specific duration
  triggerAttackRelease(note: string | number, duration: number, velocity: number = 0.8): void {
    if (!this.sampler || !this.loaded) return;
    try {
      this.sampler.triggerAttackRelease(note, duration, Tone.now(), velocity);
    } catch (e) {
      console.warn('Failed to play note:', note, e);
    }
  }

  dispose(): void {
    if (this.sampler) {
      this.sampler.dispose();
      this.sampler = null;
      this.loaded = false;
      this.loadPromise = null;
    }
  }
}
