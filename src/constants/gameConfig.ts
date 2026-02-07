import { GameConfig } from '../types';

export const DEFAULT_CONFIG: GameConfig = {
  mode: 'performance',
  speed: 1.0,
  fallTimeSeconds: 3.0,
  hitWindowMs: 150,
};

export const TIMING_WINDOWS = {
  perfect: 50,   // ms
  great: 100,
  good: 150,
};

export const SCORE_MULTIPLIERS = {
  perfect: 100,
  great: 75,
  good: 50,
};

export const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

export const COUNTDOWN_SECONDS = 3;
