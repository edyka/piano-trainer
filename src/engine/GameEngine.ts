import { Song, GameMode, GameState, GameConfig, ScoreData, ActiveNote } from '../types';
import { NoteScheduler } from './NoteScheduler';
import { ScoreTracker } from './ScoreTracker';
import { DEFAULT_CONFIG, COUNTDOWN_SECONDS } from '../constants/gameConfig';

export type GameUpdateCallback = (state: {
  gameState: GameState;
  currentTime: number;
  activeNotes: ActiveNote[];
  score: ScoreData;
  countdown: number;
}) => void;

export class GameEngine {
  private config: GameConfig;
  private scheduler: NoteScheduler;
  private scoreTracker: ScoreTracker;
  private state: GameState = 'idle';
  private currentSong: Song | null = null;
  private currentTime = 0;
  private startTimestamp = 0;
  private pausedAt = 0;
  private animFrameId = 0;
  private countdown = 0;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;
  private onUpdate: GameUpdateCallback | null = null;
  private practiceWaiting = false;

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.scheduler = new NoteScheduler();
    this.scoreTracker = new ScoreTracker(0);
  }

  setUpdateCallback(cb: GameUpdateCallback): void {
    this.onUpdate = cb;
  }

  setConfig(config: Partial<GameConfig>): void {
    Object.assign(this.config, config);
  }

  getConfig(): GameConfig {
    return { ...this.config };
  }

  getState(): GameState {
    return this.state;
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  loadSong(song: Song): void {
    this.currentSong = song;
    this.state = 'idle';
    this.currentTime = 0;
    this.practiceWaiting = false;
    this.scoreTracker.reset(song.notes.length);
    this.scheduler.load(song.notes, this.config.fallTimeSeconds / this.config.speed);
    this.emitUpdate();
  }

  start(): void {
    if (!this.currentSong) return;

    this.state = 'countdown';
    this.countdown = COUNTDOWN_SECONDS;
    this.emitUpdate();

    this.countdownTimer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        if (this.countdownTimer) clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.beginPlaying();
      }
      this.emitUpdate();
    }, 1000);
  }

  private beginPlaying(): void {
    this.state = 'playing';
    this.startTimestamp = performance.now();
    this.currentTime = 0;
    this.tick();
  }

  private tick = (): void => {
    if (this.state !== 'playing') return;

    if (!this.practiceWaiting) {
      const elapsed = performance.now() - this.startTimestamp;
      this.currentTime = (elapsed / 1000) * this.config.speed;
    }

    this.scheduler.update(this.currentTime);

    // In performance mode, mark missed notes
    if (this.config.mode === 'performance') {
      const missed = this.scheduler.markMissedBefore(this.currentTime - 0.3);
      for (const _ of missed) {
        this.scoreTracker.registerMiss();
      }
    }

    // In practice mode, check if we need to pause/wait
    if (this.config.mode === 'practice') {
      const nextNote = this.scheduler.getNextExpectedNote();
      if (nextNote && this.currentTime > nextNote.startTime + 0.15 && !this.practiceWaiting) {
        this.practiceWaiting = true;
      }
    }

    // Check completion
    if (this.scheduler.isComplete() && this.currentSong &&
        this.currentTime > this.currentSong.durationSeconds) {
      this.complete();
      return;
    }

    this.emitUpdate();
    this.animFrameId = requestAnimationFrame(this.tick);
  };

  noteOn(midi: number): void {
    if (this.state !== 'playing') return;

    const result = this.scheduler.tryHit(midi, this.currentTime, this.config.hitWindowMs);
    if (result) {
      this.scoreTracker.registerHit(result.deltaMs);

      // Resume from practice pause
      if (this.practiceWaiting && this.config.mode === 'practice') {
        this.practiceWaiting = false;
        // Reset time reference so time continues from where the note was
        this.startTimestamp = performance.now() - (result.note.startTime / this.config.speed) * 1000;
      }
    }
  }

  pause(): void {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pausedAt = performance.now();
    cancelAnimationFrame(this.animFrameId);
    this.emitUpdate();
  }

  resume(): void {
    if (this.state !== 'paused') return;
    const pauseDuration = performance.now() - this.pausedAt;
    this.startTimestamp += pauseDuration;
    this.state = 'playing';
    this.tick();
  }

  private complete(): void {
    this.state = 'completed';
    cancelAnimationFrame(this.animFrameId);
    // Mark any remaining notes as missed
    if (this.config.mode === 'performance') {
      const missed = this.scheduler.markMissedBefore(Infinity);
      for (const _ of missed) {
        this.scoreTracker.registerMiss();
      }
    }
    this.emitUpdate();
  }

  stop(): void {
    this.state = 'idle';
    cancelAnimationFrame(this.animFrameId);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.countdownTimer = null;
    this.currentTime = 0;
    this.practiceWaiting = false;
    this.emitUpdate();
  }

  getScore(): ScoreData {
    return this.scoreTracker.getScore();
  }

  getActiveNotes(): ActiveNote[] {
    return this.scheduler.getActiveNotes();
  }

  private emitUpdate(): void {
    if (this.onUpdate) {
      this.onUpdate({
        gameState: this.state,
        currentTime: this.currentTime,
        activeNotes: this.scheduler.getActiveNotes(),
        score: this.scoreTracker.getScore(),
        countdown: this.countdown,
      });
    }
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }
}
