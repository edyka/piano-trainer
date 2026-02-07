import React, { useMemo } from 'react';
import { PianoKey } from './PianoKey';
import { MIN_MIDI, MAX_MIDI, isBlackKey } from '../../constants/notes';
import { THEME } from '../../constants/theme';

interface PianoProps {
  activeNotes: Set<number>;
  nextExpectedMidi?: number;
}

interface KeyInfo {
  midi: number;
  isBlack: boolean;
}

export const Piano: React.FC<PianoProps> = React.memo(({ activeNotes, nextExpectedMidi }) => {
  // Build key layout
  const keys = useMemo(() => {
    const allKeys: KeyInfo[] = [];
    for (let midi = MIN_MIDI; midi <= MAX_MIDI; midi++) {
      allKeys.push({ midi, isBlack: isBlackKey(midi) });
    }
    return allKeys;
  }, []);

  const whiteKeys = keys.filter(k => !k.isBlack);
  const blackKeys = keys.filter(k => k.isBlack);

  // Calculate black key positions relative to white keys
  const getBlackKeyLeft = (midi: number): string => {
    // Find which white key this black key sits between
    let whiteIndex = 0;
    for (let m = MIN_MIDI; m < midi; m++) {
      if (!isBlackKey(m)) whiteIndex++;
    }
    // Position it overlapping the boundary between two white keys
    const whiteKeyPercent = 100 / whiteKeys.length;
    return `${whiteIndex * whiteKeyPercent - whiteKeyPercent * 0.3}%`;
  };

  const blackKeyWidth = `${(100 / whiteKeys.length) * 0.6}%`;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '180px',
      display: 'flex',
      backgroundColor: THEME.bgDark,
      borderTop: '3px solid transparent',
      borderImage: `${THEME.primaryGradient} 1`,
      boxShadow: `inset 0 6px 20px rgba(0,0,0,0.4), 0 -4px 16px rgba(77, 171, 247, 0.15)`,
      userSelect: 'none',
    }}>
      {/* White keys */}
      {whiteKeys.map(k => (
        <PianoKey
          key={k.midi}
          midi={k.midi}
          isBlack={false}
          isActive={activeNotes.has(k.midi)}
          isNextExpected={nextExpectedMidi === k.midi}
        />
      ))}
      {/* Black keys (absolutely positioned) */}
      {blackKeys.map(k => (
        <div
          key={k.midi}
          style={{
            position: 'absolute',
            left: getBlackKeyLeft(k.midi),
            top: 0,
            width: blackKeyWidth,
            height: '62%',
            zIndex: 2,
          }}
        >
          <PianoKey
            midi={k.midi}
            isBlack={true}
            isActive={activeNotes.has(k.midi)}
            isNextExpected={nextExpectedMidi === k.midi}
          />
        </div>
      ))}
    </div>
  );
});

Piano.displayName = 'Piano';
