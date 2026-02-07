import React, { useCallback, useState } from 'react';
import { Song, GameMode, InstrumentType } from '../../types';
import { THEME } from '../../constants/theme';

const INSTRUMENTS: { type: InstrumentType; label: string }[] = [
  { type: 'piano', label: 'Piano' },
  { type: 'electric-piano', label: 'Electric Piano' },
  { type: 'organ', label: 'Organ' },
  { type: 'accordion', label: 'Accordion' },
  { type: 'harpsichord', label: 'Harpsichord' },
  { type: 'music-box', label: 'Music Box' },
];

interface SongLibraryProps {
  songs: Song[];
  selectedSong: Song | null;
  onSelectSong: (song: Song) => void;
  onStart: () => void;
  onListen: (song: Song) => void;
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onImportMidi: (file: File) => void;
  instrument: InstrumentType;
  onInstrumentChange: (instrument: InstrumentType) => void;
}

export const SongLibrary: React.FC<SongLibraryProps> = ({
  songs,
  selectedSong,
  onSelectSong,
  onStart,
  onListen,
  mode,
  onModeChange,
  onImportMidi,
  instrument,
  onInstrumentChange,
}) => {
  const [hoveredSong, setHoveredSong] = useState<string | null>(null);
  const [dropHover, setDropHover] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDropHover(false);
    const file = e.dataTransfer.files[0];
    if (file && /\.(mid|midi)$/i.test(file.name)) {
      onImportMidi(file);
    }
  }, [onImportMidi]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImportMidi(file);
  }, [onImportMidi]);

  const difficultyColor = (d: string) => {
    if (d === 'easy') return THEME.success;
    if (d === 'medium') return THEME.warning;
    return THEME.danger;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: THEME.bgGradient,
      color: THEME.text,
    }}>
      {/* Header */}
      <div style={{
        padding: '32px 40px 20px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '24px 48px',
          borderRadius: '20px',
          background: THEME.headerGradient,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${THEME.glassBorder}`,
        }}>
          <h1 style={{
            fontSize: '38px',
            fontWeight: 800,
            background: THEME.primaryGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-0.5px',
          }}>
            Piano Trainer
          </h1>
          <p style={{ color: THEME.textDim, marginTop: '8px', fontSize: '14px', fontWeight: 500 }}>
            Learn to play piano with falling notes
          </p>
        </div>
      </div>

      {/* Instrument selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        padding: '0 40px 16px',
        flexWrap: 'wrap',
      }}>
        {INSTRUMENTS.map(inst => {
          const active = instrument === inst.type;
          return (
            <button
              key={inst.type}
              onClick={() => onInstrumentChange(inst.type)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: active ? 'none' : `1px solid ${THEME.glassBorder}`,
                background: active ? THEME.primaryGradient : THEME.glassBg,
                color: active ? '#fff' : THEME.textDim,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: active ? 600 : 500,
                transition: 'all 0.25s ease',
                boxShadow: active ? THEME.shadowGlow(THEME.primary) : 'none',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {inst.label}
            </button>
          );
        })}
      </div>

      {/* Mode selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        padding: '0 40px 24px',
      }}>
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '4px',
          borderRadius: '16px',
          backgroundColor: THEME.glassBg,
          border: `1px solid ${THEME.glassBorder}`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}>
          {(['freeplay', 'practice', 'performance'] as GameMode[]).map(m => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                style={{
                  padding: '8px 22px',
                  borderRadius: '12px',
                  border: 'none',
                  background: active ? THEME.primaryGradient : 'transparent',
                  color: active ? '#fff' : THEME.textDim,
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 500,
                  transition: 'all 0.25s ease',
                  boxShadow: active ? THEME.shadowSm : 'none',
                }}
              >
                {m === 'freeplay' ? 'Free Play' : m === 'practice' ? 'Practice' : 'Performance'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Free play hint */}
      {mode === 'freeplay' && (
        <div style={{ textAlign: 'center', padding: '0 40px 20px' }}>
          <button
            onClick={onStart}
            style={{
              padding: '16px 48px',
              borderRadius: '14px',
              border: 'none',
              background: THEME.primaryGradient,
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: THEME.shadowGlow(THEME.primary),
              transition: 'all 0.3s ease',
              letterSpacing: '0.3px',
            }}
          >
            Start Free Play
          </button>
          <p style={{ color: THEME.textDim, fontSize: '12px', marginTop: '10px', fontWeight: 500 }}>
            Use your keyboard to play piano freely
          </p>
        </div>
      )}

      {/* Song list */}
      {mode !== 'freeplay' && (
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '0 40px',
        }}>
          <h3 style={{
            color: THEME.textDim,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '14px',
            fontWeight: 600,
          }}>
            Song Library
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {songs.map(song => {
              const selected = selectedSong?.id === song.id;
              const hovered = hoveredSong === song.id;
              return (
                <div
                  key={song.id}
                  onClick={() => onSelectSong(song)}
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    backgroundColor: selected ? THEME.glassBgHover : hovered ? THEME.glassBg : 'transparent',
                    border: selected ? `1px solid ${THEME.primary}50` : `1px solid ${hovered ? THEME.glassBorder : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: hovered ? 'translateX(4px)' : 'none',
                    boxShadow: selected ? THEME.shadowMd : 'none',
                    backdropFilter: (selected || hovered) ? 'blur(10px)' : 'none',
                    WebkitBackdropFilter: (selected || hovered) ? 'blur(10px)' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Left accent bar */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: '3px',
                    borderRadius: '0 3px 3px 0',
                    backgroundColor: selected ? THEME.primary : 'transparent',
                    transition: 'background-color 0.2s',
                  }} />
                  <div style={{ flex: 1, paddingLeft: '8px' }}>
                    <div style={{ fontWeight: 600, color: THEME.textBright, fontSize: '15px' }}>
                      {song.title}
                    </div>
                    {song.artist && (
                      <div style={{ color: THEME.textDim, fontSize: '12px', marginTop: '3px', fontWeight: 500 }}>
                        {song.artist}
                      </div>
                    )}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: `${difficultyColor(song.difficulty)}15`,
                    color: difficultyColor(song.difficulty),
                    fontWeight: 600,
                    border: `1px solid ${difficultyColor(song.difficulty)}30`,
                  }}>
                    {song.difficulty}
                  </span>
                  <span style={{ color: THEME.textDim, fontSize: '12px', marginLeft: '14px', fontWeight: 500 }}>
                    {song.notes.length} notes
                  </span>
                </div>
              );
            })}
          </div>

          {/* MIDI Import */}
          <div
            onDragOver={e => { e.preventDefault(); setDropHover(true); }}
            onDragLeave={() => setDropHover(false)}
            onDrop={handleDrop}
            style={{
              marginTop: '20px',
              padding: '28px',
              borderRadius: '14px',
              border: `2px dashed ${dropHover ? THEME.primary : THEME.glassBorder}`,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: dropHover ? `${THEME.primary}10` : THEME.glassBg,
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onClick={() => document.getElementById('midi-input')?.click()}
          >
            <p style={{ color: dropHover ? THEME.primary : THEME.textDim, fontSize: '13px', margin: 0, fontWeight: 500 }}>
              Drop a MIDI file here or click to import
            </p>
            <input
              id="midi-input"
              type="file"
              accept=".mid,.midi"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
          </div>
        </div>
      )}

      {/* Start / Listen buttons */}
      {mode !== 'freeplay' && selectedSong && (
        <div style={{
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '14px',
        }}>
          <button
            onClick={() => onListen(selectedSong)}
            style={{
              padding: '14px 36px',
              borderRadius: '14px',
              border: `1px solid ${THEME.warning}60`,
              background: `${THEME.warning}10`,
              color: THEME.warning,
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            Listen First
          </button>
          <button
            onClick={onStart}
            style={{
              padding: '14px 54px',
              borderRadius: '14px',
              border: 'none',
              background: THEME.primaryGradient,
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: THEME.shadowGlow(THEME.primary),
              transition: 'all 0.3s ease',
              letterSpacing: '0.3px',
            }}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
};
