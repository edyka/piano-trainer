import { ActiveNote } from '../types';
import { isBlackKey, MIN_MIDI, TOTAL_KEYS } from '../constants/notes';
import { getNoteColor, THEME } from '../constants/theme';

export class NoteDrawer {
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  // Get x position and width for a given MIDI note
  getNotePosition(midi: number): { x: number; w: number } {
    // Count white keys up to this note
    const whiteKeys = this.countWhiteKeys();
    const keyWidth = this.width / whiteKeys;

    if (isBlackKey(midi)) {
      // Position black key between its neighboring white keys
      const whiteIndex = this.getWhiteKeyIndex(midi);
      const x = whiteIndex * keyWidth - keyWidth * 0.15;
      return { x, w: keyWidth * 0.6 };
    } else {
      const whiteIndex = this.getWhiteKeyIndex(midi);
      return { x: whiteIndex * keyWidth, w: keyWidth };
    }
  }

  private countWhiteKeys(): number {
    let count = 0;
    for (let m = MIN_MIDI; m <= TOTAL_KEYS + MIN_MIDI - 1; m++) {
      if (!isBlackKey(m)) count++;
    }
    return count;
  }

  private getWhiteKeyIndex(midi: number): number {
    // For black keys, return the index of the white key to the left + offset
    let whiteCount = 0;
    const targetMidi = isBlackKey(midi) ? midi : midi;

    for (let m = MIN_MIDI; m < targetMidi; m++) {
      if (!isBlackKey(m)) whiteCount++;
    }

    if (isBlackKey(midi)) {
      return whiteCount; // Position after the preceding white key
    }
    return whiteCount;
  }

  drawNote(
    note: ActiveNote,
    currentTime: number,
    fallTime: number,
    hitLineY: number
  ): void {
    const { x, w } = this.getNotePosition(note.midi);
    const color = getNoteColor(note.name);

    // Calculate Y position: note falls from top to hitLine
    // At startTime, note should be at hitLineY
    // fallTime seconds before startTime, note should be at top (y=0)
    const timeUntilHit = note.startTime - currentTime;
    const progress = 1 - (timeUntilHit / fallTime); // 0 = top, 1 = hit line
    const noteTop = progress * hitLineY;

    // Note height based on duration
    const pixelsPerSecond = hitLineY / fallTime;
    const noteHeight = Math.max(note.duration * pixelsPerSecond, 12);

    const y = noteTop - noteHeight;

    // Don't draw if completely off screen
    if (y + noteHeight < 0 || y > this.height) return;

    const ctx = this.ctx;
    const radius = 6;
    const padding = 2;

    // Draw note rectangle with rounded corners
    ctx.save();

    if (note.hit) {
      // Hit note: bright glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.globalAlpha = 0.7;
    } else if (note.missed || note.passed) {
      ctx.globalAlpha = 0.3;
    } else {
      ctx.globalAlpha = 0.9;
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x + padding, y, w - padding * 2, noteHeight, radius);
    ctx.fill();

    // Draw note name label inside the note if tall enough
    if (noteHeight > 20) {
      ctx.shadowBlur = 0;
      ctx.globalAlpha = note.hit ? 0.9 : 1;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const baseName = note.name.replace(/\d+$/, '');
      ctx.fillText(baseName, x + w / 2, y + noteHeight / 2);
    }

    ctx.restore();
  }

  drawHitLine(y: number): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = THEME.hitLine;
    ctx.lineWidth = 2;
    ctx.shadowColor = THEME.hitLine;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(this.width, y);
    ctx.stroke();
    ctx.restore();
  }

  clear(): void {
    this.ctx.fillStyle = THEME.canvasBg;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
