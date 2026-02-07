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
      padding: '10px 20px',
      background: THEME.glassBg,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${THEME.glassBorder}`,
      gap: '16px',
      minHeight: '52px',
    }}>
      {/* Back button */}
      <button
        onClick={onStop}
        style={{
          padding: '6px 14px',
          borderRadius: '8px',
          border: `1px solid ${THEME.glassBorder}`,
          backgroundColor: THEME.glassBg,
          color: THEME.textDim,
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        Back
      </button>

      {/* Song title */}
      <span style={{ color: THEME.textBright, fontWeight: 600, fontSize: '14px' }}>
        {songTitle}
      </span>

      {/* Progress bar */}
      <div style={{
        flex: 1,
        height: '6px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: THEME.primaryGradient,
          borderRadius: '3px',
          transition: 'width 0.3s',
          boxShadow: `0 0 8px ${THEME.primary}60`,
        }} />
      </div>

      {/* Time */}
      <span style={{ color: THEME.textDim, fontSize: '12px', fontFamily: "'Inter', monospace", fontWeight: 500 }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      {/* Pause/Resume */}
      {gameState === 'playing' && (
        <button
          onClick={onPause}
          style={{
            padding: '6px 16px',
            borderRadius: '8px',
            border: 'none',
            background: THEME.warningGradient,
            color: '#000',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            boxShadow: THEME.shadowSm,
          }}
        >
          Pause
        </button>
      )}
      {gameState === 'paused' && (
        <button
          onClick={onResume}
          style={{
            padding: '6px 16px',
            borderRadius: '8px',
            border: 'none',
            background: THEME.successGradient,
            color: '#000',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            boxShadow: THEME.shadowSm,
          }}
        >
          Resume
        </button>
      )}

      {/* Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: THEME.textDim, fontSize: '11px', fontWeight: 500 }}>Speed:</span>
        <select
          value={speed}
          onChange={e => onSpeedChange(parseFloat(e.target.value))}
          style={{
            padding: '4px 8px',
            borderRadius: '6px',
            border: `1px solid ${THEME.glassBorder}`,
            backgroundColor: THEME.glassBg,
            color: THEME.text,
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          {SPEED_OPTIONS.map(s => (
            <option key={s} value={s}>{s}x</option>
          ))}
        </select>
      </div>

      {/* Score display */}
      <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
        <span style={{
          color: THEME.primary,
          padding: '4px 10px',
          borderRadius: '8px',
          backgroundColor: `${THEME.primary}15`,
          fontWeight: 600,
        }}>
          {score.score}
        </span>
        <span style={{
          color: score.accuracy >= 80 ? THEME.success : score.accuracy >= 50 ? THEME.warning : THEME.danger,
          padding: '4px 10px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          fontWeight: 600,
        }}>
          {score.accuracy}%
        </span>
        <span style={{
          color: THEME.warning,
          padding: '4px 10px',
          borderRadius: '8px',
          backgroundColor: `${THEME.warning}10`,
          fontWeight: 600,
        }}>
          {score.currentStreak}x
        </span>
      </div>
    </div>
  );
};
