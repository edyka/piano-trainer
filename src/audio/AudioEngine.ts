import * as Tone from 'tone';
import { PianoSampler, Instrument } from './PianoSampler';
import { SynthInstrument } from './SynthInstrument';
import { midiToNoteName } from '../constants/notes';
import { InstrumentType } from '../types';

function createInstrument(type: InstrumentType): Instrument {
  if (type === 'piano') return new PianoSampler();
  return new SynthInstrument(type);
}

export class AudioEngine {
  private instrument: Instrument;
  private instrumentType: InstrumentType;
  private started = false;

  constructor(type: InstrumentType = 'piano') {
    this.instrumentType = type;
    this.instrument = createInstrument(type);
  }

  // Must be called from a user gesture (click/keypress)
  async initialize(): Promise<void> {
    if (!this.started) {
      await Tone.start();
      this.started = true;
    }
    await this.instrument.load();
  }

  isReady(): boolean {
    return this.started && this.instrument.isLoaded();
  }

  async setInstrument(type: InstrumentType): Promise<void> {
    if (type === this.instrumentType) return;
    this.instrument.dispose();
    this.instrumentType = type;
    this.instrument = createInstrument(type);
    if (this.started) {
      await this.instrument.load();
    }
  }

  getInstrumentType(): InstrumentType {
    return this.instrumentType;
  }

  playNote(midi: number, velocity: number = 0.8): void {
    const noteName = midiToNoteName(midi);
    this.instrument.triggerAttack(noteName, velocity);
  }

  stopNote(midi: number): void {
    const noteName = midiToNoteName(midi);
    this.instrument.triggerRelease(noteName);
  }

  playNoteForDuration(midi: number, duration: number, velocity: number = 0.8): void {
    const noteName = midiToNoteName(midi);
    this.instrument.triggerAttackRelease(noteName, duration, velocity);
  }

  dispose(): void {
    this.instrument.dispose();
  }
}
