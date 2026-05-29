import {
  Component, OnInit, OnDestroy,
  HostListener, NgZone, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BloodDrop  { x: number; y: number; opacity: number; size: number; }
export interface SplashDrop { x: number; y: number; tx: string; ty: string; size: number; id: number; }

@Component({
  selector: 'app-gothic-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gothic-cursor.component.html',
  styleUrl:    './gothic-cursor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GothicCursorComponent implements OnInit, OnDestroy {

  /* ── raw mouse position (dot snaps here instantly) ── */
  mx = -200; my = -200;

  /* ── lerped positions ── */
  gx = -200; gy = -200;   // girl  (slow, haunting)
  rx = -200; ry = -200;   // ring  (medium)

  /* ── state ── */
  isHovered = false;
  isClicked = false;
  splashId  = 0;

  get sprite(): 'idle' | 'hover' | 'click' {
    if (this.isClicked) return 'click';
    if (this.isHovered) return 'hover';
    return 'idle';
  }

  /* ── trail ── */
  trail: BloodDrop[] = Array.from({ length: 10 }, (_, i) => ({
    x: -200, y: -200,
    opacity: +((10 - i) / 10 * 0.45).toFixed(2),
    size:    +(7 - i * 0.6).toFixed(1),
  }));

  /* ── click splash ── */
  splash: SplashDrop[] = [];

  private pos: { x: number; y: number }[] = Array(10).fill({ x: -200, y: -200 });
  private raf!: number;
  private cleanups: (() => void)[] = [];

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  /* ── mouse move ── */
  @HostListener('document:mousemove', ['$event'])
  onMove(e: MouseEvent) { this.mx = e.clientX; this.my = e.clientY; }

  /* ── click ── */
  @HostListener('document:mousedown')
  onDown() {
    this.isClicked = true;
    this.spawnSplash(this.mx, this.my);
    setTimeout(() => { this.isClicked = false; this.cdr.markForCheck(); }, 200);
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => this.loop());
    // Bind hover to ALL interactive elements — runs after view is ready
    setTimeout(() => this.bindHovers(), 300);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    this.cleanups.forEach(fn => fn());
  }

  /* ── animation loop (outside Angular zone for perf) ── */
  private loop() {
    const L = (a: number, b: number, t: number) => a + (b - a) * t;

    this.rx = L(this.rx, this.mx, 0.18);
    this.ry = L(this.ry, this.my, 0.18);
    this.gx = L(this.gx, this.mx, 0.09);
    this.gy = L(this.gy, this.my, 0.09);

    /* shift trail history */
    for (let i = 9; i > 0; i--) this.pos[i] = this.pos[i - 1];
    this.pos[0] = { x: this.mx, y: this.my };
    this.trail.forEach((d, i) => { d.x = this.pos[i].x; d.y = this.pos[i].y; });

    this.cdr.markForCheck();
    this.raf = requestAnimationFrame(() => this.loop());
  }

  /* ── splash particles ── */
  private spawnSplash(x: number, y: number) {
    this.splash = Array.from({ length: 16 }, () => {
      const ang  = Math.random() * Math.PI * 2;
      const dist = 25 + Math.random() * 70;
      return {
        x, y,
        tx:   (Math.cos(ang) * dist).toFixed(1) + 'px',
        ty:   (Math.sin(ang) * dist).toFixed(1) + 'px',
        size: +(3 + Math.random() * 9).toFixed(1),
        id:   this.splashId++,
      };
    });
    setTimeout(() => { this.splash = []; this.cdr.markForCheck(); }, 850);
  }

  /* ── hover binding — covers links, buttons, and [data-hover] ── */
  bindHovers() {
    const sel = 'a, button, input, textarea, select, [data-hover], [routerLink], [href]';
    document.querySelectorAll<Element>(sel).forEach(el => {
      const enter = () => { this.isHovered = true;  this.cdr.markForCheck(); };
      const leave = () => { this.isHovered = false; this.cdr.markForCheck(); };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      this.cleanups.push(() => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    });

    /* MutationObserver — re-bind when DOM changes (router navigation etc.) */
    const observer = new MutationObserver(() => {
      this.cleanups.forEach(fn => fn());
      this.cleanups = [];
      this.bindHovers();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    this.cleanups.push(() => observer.disconnect());
  }

  trackById(_: number, item: SplashDrop) { return item.id; }
}