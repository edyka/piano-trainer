import React, { useCallback } from 'react';
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
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
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
      backgroundColor: THEME.bg,
      color: THEME.text,
    }}>
      {/* Header */}
      <div style={{
        padding: '30px 40px 20px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: THEME.textBright,
          margin: 0,
          letterSpacing: '1px',
        }}>
          Piano Trainer
        </h1>
        <p style={{ color: THEME.textDim, marginTop: '8px', fontSize: '14px' }}>
          Learn to play piano with falling notes
        </p>
      </div>

      {/* Instrument selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        padding: '0 40px 16px',
        flexWrap: 'wrap',
      }}>
        {INSTRUMENTS.map(inst => (
          <button
            key={inst.type}
            onClick={() => onInstrumentChange(inst.type)}
            style={{
              padding: '6px 14px',
              borderRadius: '16px',
              border: instrument === inst.type ? `1px solid ${THEME.primary}` : `1px solid ${THEME.textDim}40`,
              backgroundColor: instrument === inst.type ? THEME.primary : 'transparent',
              color: instrument === inst.type ? '#fff' : THEME.textDim,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: instrument === inst.type ? 'bold' : 'normal',
              transition: 'all 0.2s',
            }}
          >
            {inst.label}
          </button>
        ))}
      </div>

      {/* Mode selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '0 40px 20px',
      }}>
        {(['freeplay', 'practice', 'performance'] as GameMode[]).map(m => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: mode === m ? THEME.primary : THEME.bgLight,
              color: mode === m ? '#fff' : THEME.textDim,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: mode === m ? 'bold' : 'normal',
              transition: 'all 0.2s',
            }}
          >
            {m === 'freeplay' ? 'Free Play' : m === 'practice' ? 'Practice' : 'Performance'}
          </button>
        ))}
      </div>

      {/* Free play hint */}
      {mode === 'freeplay' && (
        <div style={{ textAlign: 'center', padding: '0 40px 20px' }}>
          <button
            onClick={onStart}
            style={{
              padding: '14px 40px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: THEME.primary,
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Start Free Play
          </button>
          <p style={{ color: THEME.textDim, fontSize: '12px', marginTop: '8px' }}>
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
          <h3 style={{ color: THEME.textDim, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
            Song Library
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {songs.map(song => (
              <div
                key={song.id}
                onClick={() => onSelectSong(song)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  backgroundColor: selectedSong?.id === song.id ? THEME.bgLight : 'transparent',
                  border: selectedSong?.id === song.id ? `1px solid ${THEME.primary}` : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: THEME.textBright, fontSize: '15px' }}>
                    {song.title}
                  </div>
                  {song.artist && (
                    <div style={{ color: THEME.textDim, fontSize: '12px', marginTop: '2px' }}>
                      {song.artist}
                    </div>
                  )}
                </div>
                <span style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  backgroundColor: `${difficultyColor(song.difficulty)}20`,
                  color: difficultyColor(song.difficulty),
                  fontWeight: 'bold',
                }}>
                  {song.difficulty}
                </span>
                <span style={{ color: THEME.textDim, fontSize: '12px', marginLeft: '14px' }}>
                  {song.notes.length} notes
                </span>
              </div>
            ))}
          </div>

          {/* MIDI Import */}
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            style={{
              marginTop: '20px',
              padding: '24px',
              borderRadius: '10px',
              border: `2px dashed ${THEME.textDim}40`,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('midi-input')?.click()}
          >
            <p style={{ color: THEME.textDim, fontSize: '13px', margin: 0 }}>
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
          gap: '12px',
        }}>
          <button
            onClick={() => onListen(selectedSong)}
            style={{
              padding: '14px 36px',
              borderRadius: '8px',
              border: `1px solid ${THEME.warning}`,
              backgroundColor: 'transparent',
              color: THEME.warning,
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Listen First
          </button>
          <button
            onClick={onStart}
            style={{
              padding: '14px 50px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: THEME.primary,
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
};
