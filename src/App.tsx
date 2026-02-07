import { useState, useCallback } from 'react';
import * as Tone from 'tone';
import { Song, GameMode, InstrumentType } from './types';
import { BUILT_IN_SONGS } from './songs';
import { parseMidiFile } from './midi/MidiParser';
import { SongLibrary } from './components/UI/SongLibrary';
import { GameScreen } from './components/GameScreen';

type Screen = 'library' | 'game';

function App() {
  const [screen, setScreen] = useState<Screen>('library');
  const [songs, setSongs] = useState<Song[]>(BUILT_IN_SONGS);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [mode, setMode] = useState<GameMode>('performance');
  const [speed, setSpeed] = useState(1.0);
  const [isListening, setIsListening] = useState(false);
  const [instrument, setInstrument] = useState<InstrumentType>('piano');

  const handleListen = useCallback(async (song: Song) => {
    setSelectedSong(song);
    setIsListening(true);
    await Tone.start();
    setScreen('game');
  }, []);

  const handleStart = useCallback(async () => {
    setIsListening(false);
    // Start AudioContext from this click handler (user gesture required)
    await Tone.start();
    setScreen('game');
  }, []);

  const handleBack = useCallback(() => {
    setIsListening(false);
    setScreen('library');
  }, []);

  const handleImportMidi = useCallback(async (file: File) => {
    try {
      const imported = await parseMidiFile(file);
      setSongs(prev => {
        if (prev.some(s => s.id === imported.id)) return prev;
        return [...prev, imported];
      });
      setSelectedSong(imported);
    } catch (err) {
      console.error('Failed to import MIDI:', err);
      alert(err instanceof Error ? err.message : 'Failed to import MIDI file');
    }
  }, []);

  if (screen === 'game') {
    return (
      <GameScreen
        song={mode === 'freeplay' ? null : selectedSong}
        mode={mode}
        speed={speed}
        instrument={instrument}
        isListening={isListening}
        onBack={handleBack}
        onSpeedChange={setSpeed}
      />
    );
  }

  return (
    <SongLibrary
      songs={songs}
      selectedSong={selectedSong}
      onSelectSong={setSelectedSong}
      onStart={handleStart}
      onListen={handleListen}
      mode={mode}
      onModeChange={setMode}
      onImportMidi={handleImportMidi}
      instrument={instrument}
      onInstrumentChange={setInstrument}
    />
  );
}

export default App;
