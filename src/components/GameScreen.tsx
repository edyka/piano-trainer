import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { Song, GameMode, GameState, ActiveNote, ScoreData, InstrumentType } from '../types';
import { GameEngine } from '../engine/GameEngine';
import { FallingNotesRenderer } from '../canvas/FallingNotesRenderer';
import { Piano } from './Piano/Piano';
import { GameControls } from './UI/GameControls';
import { CountdownOverlay } from './UI/CountdownOverlay';
import { ResultsScreen } from './UI/ResultsScreen';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { useAudio } from '../hooks/useAudio';
import { THEME } from '../constants/theme';

interface GameScreenProps {
  song: Song | null;
  mode: GameMode;
  speed: number;
  instrument: InstrumentType;
  isListening?: boolean;
  onBack: () => void;
  onSpeedChange: (speed: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  song,
  mode,
  speed,
  instrument,
  isListening = false,
  onBack,
  onSpeedChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<FallingNotesRenderer>(new FallingNotesRenderer());
  const engineRef = useRef<GameEngine>(new GameEngine());

  const [gameState, setGameState] = useState<GameState>('idle');
  const [activeNotes, setActiveNotes] = useState<ActiveNote[]>([]);
  const [score, setScore] = useState<ScoreData>({
    totalNotes: 0, hitNotes: 0, missedNotes: 0, accuracy: 100,
    maxStreak: 0, currentStreak: 0, score: 0, perfect: 0, great: 0, good: 0,
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [pressedMidis, setPressedMidis] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const { initialize: initAudio, playNote, stopNote, isLoaded: audioLoaded } = useAudio(instrument);

  // Eagerly initialize audio on mount (Tone.start() already called from Play button)
  useEffect(() => {
    initAudio();
  }, [initAudio]);

  // Game engine update callback
  useEffect(() => {
    const engine = engineRef.current;
    engine.setUpdateCallback((state) => {
      setGameState(state.gameState);
      setActiveNotes([...state.activeNotes]);
      setScore(state.score);
      setCurrentTime(state.currentTime);
      setCountdown(state.countdown);
      if (state.gameState === 'completed') {
        setShowResults(true);
      }
    });
    return () => engine.destroy();
  }, []);

  // Attach canvas renderer
  useEffect(() => {
    if (canvasRef.current) {
      rendererRef.current.attach(canvasRef.current);
    }
    const handleResize = () => rendererRef.current.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      rendererRef.current.detach();
    };
  }, [showResults]);

  // Render loop
  useEffect(() => {
    let rafId: number;
    const renderer = rendererRef.current;
    const engine = engineRef.current;
    const config = engine.getConfig();

    const renderFrame = () => {
      const notes = engine.getActiveNotes();
      const time = engine.getCurrentTime();
      renderer.render(notes, time, config.fallTimeSeconds / config.speed);
      rafId = requestAnimationFrame(renderFrame);
    };

    if (gameState === 'playing' || gameState === 'countdown' || gameState === 'paused') {
      rafId = requestAnimationFrame(renderFrame);
    }

    return () => cancelAnimationFrame(rafId);
  }, [gameState]);

  // Load song into engine
  useEffect(() => {
    if (song && mode !== 'freeplay') {
      const engine = engineRef.current;
      engine.setConfig({ mode, speed, fallTimeSeconds: 3.0, hitWindowMs: 150 });
      engine.loadSong(song);
      // Auto-start
      engine.start();
    }
  }, [song, mode, speed]);

  // Speed changes
  useEffect(() => {
    engineRef.current.setConfig({ speed });
  }, [speed]);

  // Listen mode: auto-play notes with sound + highlight piano keys
  const listenTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    if (!isListening || !song || gameState !== 'playing') return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Init audio first (may already be loaded), then schedule all notes
    initAudio().then(() => {
      if (cancelled) return;

      const engine = engineRef.current;
      const engineTime = engine.getCurrentTime();

      for (const note of song.notes) {
        const delay = ((note.startTime - engineTime) / speed) * 1000;
        if (delay < -100) continue; // skip notes already passed

        // Schedule note on
        const onTimer = setTimeout(() => {
          playNote(note.midi, note.velocity);
          engine.noteOn(note.midi);
          setPressedMidis(prev => {
            const next = new Set(prev);
            next.add(note.midi);
            return next;
          });
        }, Math.max(0, delay));
        timers.push(onTimer);

        // Schedule note off
        const offDelay = delay + (note.duration / speed) * 1000;
        const offTimer = setTimeout(() => {
          stopNote(note.midi);
          setPressedMidis(prev => {
            const next = new Set(prev);
            next.delete(note.midi);
            return next;
          });
        }, Math.max(0, offDelay));
        timers.push(offTimer);
      }

      listenTimersRef.current = timers;
    });

    return () => {
      cancelled = true;
      for (const t of listenTimersRef.current) clearTimeout(t);
      listenTimersRef.current = [];
    };
  }, [isListening, song, gameState, speed, initAudio, playNote, stopNote]);

  // Note handlers
  const handleNoteOn = useCallback((midi: number) => {
    // Play immediately if audio is ready, otherwise init first
    if (audioLoaded) {
      playNote(midi);
    } else {
      initAudio().then(() => playNote(midi));
    }

    setPressedMidis(prev => {
      const next = new Set(prev);
      next.add(midi);
      return next;
    });

    engineRef.current.noteOn(midi);
  }, [initAudio, playNote, audioLoaded]);

  const handleNoteOff = useCallback((midi: number) => {
    stopNote(midi);
    setPressedMidis(prev => {
      const next = new Set(prev);
      next.delete(midi);
      return next;
    });
  }, [stopNote]);

  useKeyboardInput({
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
    enabled: !isListening,
  });

  // Merged active notes for piano highlighting
  const pianoActiveNotes = useMemo(() => {
    const set = new Set(pressedMidis);
    // Also highlight notes currently being hit in the game
    for (const note of activeNotes) {
      if (note.hit && currentTime - note.startTime < 0.3) {
        set.add(note.midi);
      }
    }
    return set;
  }, [pressedMidis, activeNotes, currentTime]);

  // Next expected note for practice mode
  const nextExpectedMidi = useMemo(() => {
    if (mode !== 'practice') return undefined;
    const next = activeNotes.find(n => !n.hit && !n.missed);
    return next?.midi;
  }, [mode, activeNotes]);

  const handlePause = useCallback(() => engineRef.current.pause(), []);
  const handleResume = useCallback(() => engineRef.current.resume(), []);
  const handleStop = useCallback(() => {
    engineRef.current.stop();
    setShowResults(false);
    onBack();
  }, [onBack]);

  const handleReplay = useCallback(() => {
    setShowResults(false);
    if (song) {
      const engine = engineRef.current;
      engine.loadSong(song);
      engine.start();
    }
  }, [song]);

  // In listen mode, go back when song completes
  useEffect(() => {
    if (isListening && showResults) {
      for (const t of listenTimersRef.current) clearTimeout(t);
      onBack();
    }
  }, [isListening, showResults, onBack]);

  if (showResults && mode !== 'freeplay' && !isListening) {
    return (
      <ResultsScreen
        score={score}
        songTitle={song?.title || ''}
        onReplay={handleReplay}
        onBack={handleStop}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: THEME.bgDark,
      position: 'relative',
    }}>
      {/* Top controls */}
      <GameControls
        gameState={gameState}
        score={score}
        speed={speed}
        currentTime={currentTime}
        duration={song?.durationSeconds || 0}
        songTitle={mode === 'freeplay' ? 'Free Play' : isListening ? `Listening: ${song?.title || ''}` : (song?.title || '')}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onSpeedChange={onSpeedChange}
      />

      {/* Canvas for falling notes */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
        {/* Countdown overlay */}
        {gameState === 'countdown' && <CountdownOverlay count={countdown} />}
        {/* Paused overlay */}
        {gameState === 'paused' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 50,
          }}>
            <div style={{ color: THEME.textBright, fontSize: '36px', fontWeight: 'bold' }}>
              PAUSED
            </div>
          </div>
        )}
      </div>

      {/* Piano keyboard */}
      <Piano
        activeNotes={pianoActiveNotes}
        nextExpectedMidi={nextExpectedMidi}
      />
    </div>
  );
};
