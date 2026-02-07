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
    backgroundColor: isActive ? noteColor : THEME.blackKey,
    border: '1px solid #111',
    borderRadius: '0 0 5px 5px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.08s',
    boxShadow: isActive ? `0 0 15px ${noteColor}` : '2px 2px 4px rgba(0,0,0,0.5)',
  } : {
    position: 'relative',
    flex: 1,
    height: '100%',
    backgroundColor: isActive ? noteColor : THEME.whiteKey,
    border: '1px solid #ccc',
    borderRadius: '0 0 8px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.08s',
    boxShadow: isActive ? `0 0 15px ${noteColor}` : 'inset 0 -4px 6px rgba(0,0,0,0.08)',
  };

  return (
    <div style={style}>
      <span style={{
        fontSize: isBlack ? '10px' : '13px',
        fontWeight: 'bold',
        color: isBlack
          ? (isActive ? '#fff' : '#aaa')
          : (isActive ? '#fff' : '#555'),
        userSelect: 'none',
      }}>
        {noteName}
      </span>
      <span style={{
        fontSize: isBlack ? '8px' : '10px',
        color: isBlack
          ? (isActive ? '#ddd' : '#666')
          : (isActive ? '#eee' : '#999'),
        marginTop: '2px',
        userSelect: 'none',
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
        }} />
      )}
    </div>
  );
});

PianoKey.displayName = 'PianoKey';
