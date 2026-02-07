import { ActiveNote } from '../types';
import { NoteDrawer } from './NoteDrawer';

export class FallingNotesRenderer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private noteDrawer: NoteDrawer | null = null;
  private hitLineRatio = 0.85; // hit line at 85% from top

  attach(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.noteDrawer = new NoteDrawer(this.ctx);
    this.resize();
  }

  resize(): void {
    if (!this.canvas || !this.ctx || !this.noteDrawer) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.noteDrawer.setSize(rect.width, rect.height);
  }

  render(notes: ActiveNote[], currentTime: number, fallTime: number): void {
    if (!this.canvas || !this.ctx || !this.noteDrawer) return;

    const rect = this.canvas.getBoundingClientRect();
    const hitLineY = rect.height * this.hitLineRatio;

    // Clear
    this.noteDrawer.setSize(rect.width, rect.height);
    this.noteDrawer.clear();

    // Draw hit line
    this.noteDrawer.drawHitLine(hitLineY);

    // Draw all active notes
    for (const note of notes) {
      this.noteDrawer.drawNote(note, currentTime, fallTime, hitLineY);
    }
  }

  detach(): void {
    this.canvas = null;
    this.ctx = null;
    this.noteDrawer = null;
  }
}
