import React from 'react';
import { getNoteColor, THEME } from '../../constants/theme';
import { MIDI_TO_MAPPING } from '../../constants/notes';

interface PianoKeyProps {
  midi: number;
  isBlack: boolean;
  isActive: boolean;
  isNextExpected?: boolean;
}

export const PianoKey: React.FC<PianoKeyProps> = React.memo(({ midi, isBlack, isActive, isNextExpected }) => {
  const mapping = MIDI_TO_MAPPING.get(midi);
  const noteName = mapping?.note.replace(/\d+$/, '') || '';
  const keyHint = mapping?.key?.toUpperCase() || '';
  const noteColor = getNoteColor(mapping?.note || '');

  const style: React.CSSProperties = isBlack ? {
    position: 'absolute',
    width: '60%',
    height: '62%',
    background: isActive
      ? `linear-gradient(180deg, ${noteColor} 0%, ${noteColor}cc 100%)`
      : 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
    border: '1px solid #111',
    borderRadius: '0 0 6px 6px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '6px',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    boxShadow: isActive
      ? `0 0 20px ${noteColor}80, 0 0 40px ${noteColor}40, inset 0 -2px 4px rgba(0,0,0,0.3)`
      : '2px 4px 6px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.3)',
  } : {
    position: 'relative',
    flex: 1,
    height: '100%',
    background: isActive
      ? `linear-gradient(180deg, ${noteColor} 0%, ${noteColor}dd 100%)`
      : 'linear-gradient(180deg, #ffffff 0%, #e8e8e8 60%, #d4d4d4 100%)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '0 0 10px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    boxShadow: isActive
      ? `0 0 20px ${noteColor}60, 0 0 40px ${noteColor}30, inset 0 -2px 6px rgba(0,0,0,0.05)`
      : 'inset 0 -6px 10px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={style}>
      <span style={{
        fontSize: isBlack ? '10px' : '13px',
        fontWeight: 600,
        color: isBlack
          ? (isActive ? '#fff' : '#999')
          : (isActive ? '#fff' : '#666'),
        userSelect: 'none',
      }}>
        {noteName}
      </span>
      <span style={{
        fontSize: isBlack ? '8px' : '10px',
        color: isBlack
          ? (isActive ? '#ddd' : '#555')
          : (isActive ? '#eee' : '#aaa'),
        marginTop: '2px',
        userSelect: 'none',
        fontWeight: 500,
      }}>
        {keyHint}
      </span>
      {isNextExpected && !isActive && (
        <div style={{
          position: 'absolute',
          top: isBlack ? '40%' : '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: noteColor,
          opacity: 0.6,
          animation: 'pulse 1s infinite',
          boxShadow: `0 0 10px ${noteColor}80`,
        }} />
      )}
    </div>
  );
});

PianoKey.displayName = 'PianoKey';
