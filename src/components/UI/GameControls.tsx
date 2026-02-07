import React from 'react';
import { GameState, ScoreData } from '../../types';
import { SPEED_OPTIONS } from '../../constants/gameConfig';
import { THEME } from '../../constants/theme';
import { formatTime } from '../../utils/noteUtils';

interface GameControlsProps {
  gameState: GameState;
  score: ScoreData;
  speed: number;
  currentTime: number;
  duration: number;
  songTitle: string;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSpeedChange: (speed: number) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  score,
  speed,
  currentTime,
  duration,
  songTitle,
  onPause,
  onResume,
  onStop,
  onSpeedChange,
}) => {
  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px 20px',
      backgroundColor: THEME.bgLight,
      borderBottom: `1px solid ${THEME.bgDark}`,
      gap: '16px',
      minHeight: '48px',
    }}>
      {/* Back button */}
      <button
        onClick={onStop}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: THEME.bgDark,
          color: THEME.textDim,
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        Back
      </button>

      {/* Song title */}
      <span style={{ color: THEME.textBright, fontWeight: 'bold', fontSize: '14px' }}>
        {songTitle}
      </span>

      {/* Progress bar */}
      <div style={{
        flex: 1,
        height: '4px',
        backgroundColor: THEME.bgDark,
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: THEME.primary,
          transition: 'width 0.3s',
        }} />
      </div>

      {/* Time */}
      <span style={{ color: THEME.textDim, fontSize: '12px', fontFamily: 'monospace' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      {/* Pause/Resume */}
      {gameState === 'playing' && (
        <button
          onClick={onPause}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: THEME.warning,
            color: '#000',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          Pause
        </button>
      )}
      {gameState === 'paused' && (
        <button
          onClick={onResume}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: THEME.success,
            color: '#000',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          Resume
        </button>
      )}

      {/* Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: THEME.textDim, fontSize: '11px' }}>Speed:</span>
        <select
          value={speed}
          onChange={e => onSpeedChange(parseFloat(e.target.value))}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: THEME.bgDark,
            color: THEME.text,
            fontSize: '12px',
          }}
        >
          {SPEED_OPTIONS.map(s => (
            <option key={s} value={s}>{s}x</option>
          ))}
        </select>
      </div>

      {/* Score display */}
      <div style={{ display: 'flex', gap: '14px', fontSize: '13px' }}>
        <span style={{ color: THEME.primary }}>
          Score: <strong>{score.score}</strong>
        </span>
        <span style={{ color: score.accuracy >= 80 ? THEME.success : score.accuracy >= 50 ? THEME.warning : THEME.danger }}>
          {score.accuracy}%
        </span>
        <span style={{ color: THEME.warning }}>
          Streak: {score.currentStreak}
        </span>
      </div>
    </div>
  );
};
