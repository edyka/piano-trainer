import React from 'react';
import { ScoreData } from '../../types';
import { THEME } from '../../constants/theme';

interface ResultsScreenProps {
  score: ScoreData;
  songTitle: string;
  onReplay: () => void;
  onBack: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  songTitle,
  onReplay,
  onBack,
}) => {
  const grade = score.accuracy >= 95 ? 'S' :
    score.accuracy >= 90 ? 'A' :
    score.accuracy >= 80 ? 'B' :
    score.accuracy >= 70 ? 'C' :
    score.accuracy >= 60 ? 'D' : 'F';

  const gradeColor = grade === 'S' ? '#FFD700' :
    grade === 'A' ? THEME.success :
    grade === 'B' ? THEME.primary :
    grade === 'C' ? THEME.warning :
    THEME.danger;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: THEME.bgGradient,
      color: THEME.text,
      gap: '20px',
    }}>
      {/* Glass card container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 50px',
        borderRadius: '24px',
        background: THEME.glassBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        boxShadow: THEME.shadowLg,
        gap: '16px',
        maxWidth: '420px',
        width: '90%',
      }}>
        <h2 style={{ color: THEME.textBright, fontSize: '24px', margin: 0, fontWeight: 700 }}>
          Song Complete!
        </h2>
        <p style={{ color: THEME.textDim, margin: 0, fontWeight: 500 }}>{songTitle}</p>

        {/* Grade with glow ring */}
        <div style={{
          position: 'relative',
          margin: '10px 0',
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `3px solid ${gradeColor}`,
            boxShadow: `0 0 30px ${gradeColor}40, 0 0 60px ${gradeColor}20, inset 0 0 30px ${gradeColor}10`,
            background: `${gradeColor}08`,
          }}>
            <span style={{
              fontSize: '64px',
              fontWeight: 800,
              color: gradeColor,
              lineHeight: 1,
            }}>
              {grade}
            </span>
          </div>
        </div>

        {/* Score */}
        <div style={{
          fontSize: '36px',
          fontWeight: 800,
          background: THEME.primaryGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {score.score} pts
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          width: '100%',
        }}>
          <StatBox label="Accuracy" value={`${score.accuracy}%`} color={score.accuracy >= 80 ? THEME.success : THEME.warning} />
          <StatBox label="Max Streak" value={`${score.maxStreak}`} color={THEME.warning} />
          <StatBox label="Notes Hit" value={`${score.hitNotes}/${score.totalNotes}`} color={THEME.primary} />
          <StatBox label="Missed" value={`${score.missedNotes}`} color={THEME.danger} />
        </div>

        {/* Timing breakdown */}
        <div style={{
          display: 'flex',
          gap: '20px',
          fontSize: '13px',
          fontWeight: 600,
          padding: '12px 0 4px',
        }}>
          <span style={{ color: '#FFD700' }}>Perfect: {score.perfect}</span>
          <span style={{ color: THEME.success }}>Great: {score.great}</span>
          <span style={{ color: THEME.primary }}>Good: {score.good}</span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
          <button
            onClick={onReplay}
            style={{
              padding: '14px 34px',
              borderRadius: '14px',
              border: 'none',
              background: THEME.primaryGradient,
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: THEME.shadowGlow(THEME.primary),
              transition: 'all 0.3s ease',
            }}
          >
            Play Again
          </button>
          <button
            onClick={onBack}
            style={{
              padding: '14px 30px',
              borderRadius: '14px',
              border: `1px solid ${THEME.glassBorderBright}`,
              backgroundColor: THEME.glassBg,
              color: THEME.text,
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            Song Library
          </button>
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{
    backgroundColor: THEME.glassBg,
    borderRadius: '14px',
    padding: '14px',
    textAlign: 'center',
    border: `1px solid ${THEME.glassBorder}`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  }}>
    <div style={{ fontSize: '11px', color: THEME.textDim, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
      {label}
    </div>
    <div style={{ fontSize: '22px', fontWeight: 700, color, marginTop: '4px' }}>
      {value}
    </div>
  </div>
);
