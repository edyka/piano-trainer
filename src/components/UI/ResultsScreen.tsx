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
      backgroundColor: THEME.bg,
      color: THEME.text,
      gap: '20px',
    }}>
      <h2 style={{ color: THEME.textBright, fontSize: '24px', margin: 0 }}>
        Song Complete!
      </h2>
      <p style={{ color: THEME.textDim, margin: 0 }}>{songTitle}</p>

      {/* Grade */}
      <div style={{
        fontSize: '80px',
        fontWeight: 'bold',
        color: gradeColor,
        textShadow: `0 0 30px ${gradeColor}50`,
        lineHeight: 1,
        margin: '10px 0',
      }}>
        {grade}
      </div>

      {/* Score */}
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: THEME.primary }}>
        {score.score} pts
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        padding: '20px',
        maxWidth: '350px',
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
        gap: '24px',
        fontSize: '14px',
      }}>
        <span style={{ color: '#FFD700' }}>Perfect: {score.perfect}</span>
        <span style={{ color: THEME.success }}>Great: {score.great}</span>
        <span style={{ color: THEME.primary }}>Good: {score.good}</span>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
        <button
          onClick={onReplay}
          style={{
            padding: '12px 30px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: THEME.primary,
            color: '#fff',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Play Again
        </button>
        <button
          onClick={onBack}
          style={{
            padding: '12px 30px',
            borderRadius: '8px',
            border: `1px solid ${THEME.textDim}`,
            backgroundColor: 'transparent',
            color: THEME.text,
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          Song Library
        </button>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{
    backgroundColor: THEME.bgLight,
    borderRadius: '10px',
    padding: '14px',
    textAlign: 'center',
  }}>
    <div style={{ fontSize: '11px', color: THEME.textDim, textTransform: 'uppercase', letterSpacing: '1px' }}>
      {label}
    </div>
    <div style={{ fontSize: '22px', fontWeight: 'bold', color, marginTop: '4px' }}>
      {value}
    </div>
  </div>
);
