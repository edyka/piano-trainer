import * as Tone from 'tone';
import { Instrument } from './PianoSampler';
import { InstrumentType } from '../types';

type SynthType = Tone.FMSynth | Tone.AMSynth | Tone.Synth;

function createAccordionSynth(): Tone.PolySynth<Tone.FMSynth> {
  return new Tone.PolySynth(Tone.FMSynth, {
    volume: -6,
    modulationIndex: 12,
    harmonicity: 3.01,
    envelope: { attack: 0.08, decay: 0.3, sustain: 0.9, release: 0.3 },
    modulation: { type: 'square' },
    modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.3 },
  }).toDestination();
}

function createOrganSynth(): Tone.PolySynth<Tone.AMSynth> {
  return new Tone.PolySynth(Tone.AMSynth, {
    volume: -8,
    harmonicity: 2,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.05, decay: 0.1, sustain: 1.0, release: 0.05 },
    modulation: { type: 'square' },
    modulationEnvelope: { attack: 0.02, decay: 0.1, sustain: 1.0, release: 0.1 },
  }).toDestination();
}

function createElectricPianoSynth(): Tone.PolySynth<Tone.FMSynth> {
  return new Tone.PolySynth(Tone.FMSynth, {
    volume: -8,
    modulationIndex: 3,
    harmonicity: 2.01,
    envelope: { attack: 0.01, decay: 1.5, sustain: 0.2, release: 1.0 },
    modulation: { type: 'sine' },
    modulationEnvelope: { attack: 0.01, decay: 0.5, sustain: 0.3, release: 0.8 },
  }).toDestination();
}

function createMusicBoxSynth(): Tone.PolySynth<Tone.Synth> {
  return new Tone.PolySynth(Tone.Synth, {
    volume: -8,
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.001, decay: 1.2, sustain: 0.0, release: 0.8 },
  }).toDestination();
}

export function createSynth(type: InstrumentType): Tone.PolySynth<SynthType> {
  switch (type) {
    case 'accordion': return createAccordionSynth();
    case 'organ': return createOrganSynth();
    case 'electric-piano': return createElectricPianoSynth();
    case 'music-box': return createMusicBoxSynth();
    // harpsichord uses PluckSynth which needs special handling
    case 'harpsichord': return createHarpsichordSynth();
    default: return createElectricPianoSynth();
  }
}

function createHarpsichordSynth(): Tone.PolySynth<Tone.Synth> {
  return new Tone.PolySynth(Tone.Synth, {
    volume: -6,
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.001, decay: 0.8, sustain: 0.0, release: 0.4 },
  }).toDestination();
}

export class SynthInstrument implements Instrument {
  private synth: Tone.PolySynth<SynthType> | null = null;
  private loaded = false;
  private instrumentType: InstrumentType;

  constructor(type: InstrumentType) {
    this.instrumentType = type;
  }

  async load(): Promise<void> {
    if (this.loaded) return;
    this.synth = createSynth(this.instrumentType);
    this.loaded = true;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  triggerAttack(note: string | number, velocity: number = 0.8): void {
    if (!this.synth || !this.loaded) return;
    try {
      this.synth.triggerAttack(note as Tone.Unit.Frequency, Tone.now(), velocity);
    } catch (e) {
      console.warn('Failed to trigger note:', note, e);
    }
  }

  triggerRelease(note: string | number): void {
    if (!this.synth || !this.loaded) return;
    try {
      this.synth.triggerRelease(note as Tone.Unit.Frequency, Tone.now());
    } catch (e) {
      console.warn('Failed to release note:', note, e);
    }
  }

  triggerAttackRelease(note: string | number, duration: number, velocity: number = 0.8): void {
    if (!this.synth || !this.loaded) return;
    try {
      this.synth.triggerAttackRelease(note as Tone.Unit.Frequency, duration, Tone.now(), velocity);
    } catch (e) {
      console.warn('Failed to play note:', note, e);
    }
  }

  dispose(): void {
    if (this.synth) {
      this.synth.dispose();
      this.synth = null;
      this.loaded = false;
    }
  }
}
