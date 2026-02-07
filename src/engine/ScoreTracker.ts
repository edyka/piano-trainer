import { ScoreData } from '../types';
import { TIMING_WINDOWS, SCORE_MULTIPLIERS } from '../constants/gameConfig';

export class ScoreTracker {
  private data: ScoreData;

  constructor(totalNotes: number) {
    this.data = {
      totalNotes,
      hitNotes: 0,
      missedNotes: 0,
      accuracy: 100,
      maxStreak: 0,
      currentStreak: 0,
      score: 0,
      perfect: 0,
      great: 0,
      good: 0,
    };
  }

  registerHit(timingDeltaMs: number): 'perfect' | 'great' | 'good' {
    const abs = Math.abs(timingDeltaMs);
    let rating: 'perfect' | 'great' | 'good';

    if (abs <= TIMING_WINDOWS.perfect) {
      rating = 'perfect';
      this.data.perfect++;
      this.data.score += SCORE_MULTIPLIERS.perfect;
    } else if (abs <= TIMING_WINDOWS.great) {
      rating = 'great';
      this.data.great++;
      this.data.score += SCORE_MULTIPLIERS.great;
    } else {
      rating = 'good';
      this.data.good++;
      this.data.score += SCORE_MULTIPLIERS.good;
    }

    this.data.hitNotes++;
    this.data.currentStreak++;
    if (this.data.currentStreak > this.data.maxStreak) {
      this.data.maxStreak = this.data.currentStreak;
    }

    // Streak bonus
    if (this.data.currentStreak > 10) {
      this.data.score += Math.floor(this.data.currentStreak / 10) * 10;
    }

    this.updateAccuracy();
    return rating;
  }

  registerMiss(): void {
    this.data.missedNotes++;
    this.data.currentStreak = 0;
    this.updateAccuracy();
  }

  private updateAccuracy(): void {
    const total = this.data.hitNotes + this.data.missedNotes;
    this.data.accuracy = total === 0 ? 100 : Math.round((this.data.hitNotes / total) * 100);
  }

  getScore(): ScoreData {
    return { ...this.data };
  }

  reset(totalNotes: number): void {
    this.data = {
      totalNotes,
      hitNotes: 0,
      missedNotes: 0,
      accuracy: 100,
      maxStreak: 0,
      currentStreak: 0,
      score: 0,
      perfect: 0,
      great: 0,
      good: 0,
    };
  }
}
