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
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 100,
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 'bold',
        color: THEME.primary,
        textShadow: `0 0 40px ${THEME.primary}`,
        animation: 'countdownPulse 1s ease-out',
      }}>
        {count}
      </div>
    </div>
  );
};
