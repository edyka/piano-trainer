import React from 'react';
import { THEME } from '../../constants/theme';

interface CountdownOverlayProps {
  count: number;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ count }) => {
  if (count <= 0) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 100,
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 800,
        background: THEME.primaryGradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'countdownPulse 1s ease-out',
        filter: `drop-shadow(0 0 40px ${THEME.primary}80)`,
      }}>
        {count}
      </div>
    </div>
  );
};
