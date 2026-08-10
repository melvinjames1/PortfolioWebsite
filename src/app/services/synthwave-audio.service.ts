import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * SynthwaveAudioService
 * Generates a full synthwave track in real-time using Web Audio API:
 *   - Sawtooth bass + sub-sine arpeggio
 *   - Synth piano lead melody (square + triangle, piano-like envelope + reverb)
 *   - Soft pad chords (detuned sawtooth, slow attack/release)
 *   - Kick, snare, and hi-hat drums
 *
 * Key: A minor  |  Progression: Am → F → C → G  |  Tempo: 108 BPM
 */
@Injectable({ providedIn: 'root' })
export class SynthwaveAudioService {
  private audioCtx?: AudioContext;
  private isPlaying = false;
  private timerId: any = null;
  private gainNode?: GainNode;
  private tempo = 112;
  private step = 0;

  // Classic Synthwave 80s Bassline pattern notes (Hz)
  // A1 -> F1 -> C2 -> G1 driving 16th note arp
  private bassNotes = [
    // Measure 1: A1 / A2
    55, 110, 55, 110, 55, 110, 55, 110, 55, 110, 55, 110, 55, 110, 55, 110,
    // Measure 2: F1 / F2
    43.65, 87.31, 43.65, 87.31, 43.65, 87.31, 43.65, 87.31, 43.65, 87.31, 43.65, 87.31, 43.65, 87.31, 43.65, 87.31,
    // Measure 3: C2 / C3
    65.41, 130.81, 65.41, 130.81, 65.41, 130.81, 65.41, 130.81, 65.41, 130.81, 65.41, 130.81, 65.41, 130.81, 65.41, 130.81,
    // Measure 4: G1 / G2
    49.00, 98.00, 49.00, 98.00, 49.00, 98.00, 49.00, 98.00, 49.00, 98.00, 49.00, 98.00, 49.00, 98.00, 49.00, 98.00,
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  public get active(): boolean {
    return this.isPlaying;
  }

  public toggleAudio(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public start(): void {
    if (!isPlatformBrowser(this.platformId) || this.isPlaying) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
    this.gainNode.connect(this.audioCtx.destination);

    this.isPlaying = true;
    this.step = 0;

    const intervalMs = (60 / this.tempo / 4) * 1000;
    this.timerId = setInterval(() => this.playStep(), intervalMs);
  }

  private playStep(): void {
    if (!this.audioCtx || !this.gainNode || !this.isPlaying) return;

    const now = this.audioCtx.currentTime;
    const freq = this.bassNotes[this.step % this.bassNotes.length];

    // Synthwave Sawtooth Oscillator with Low Pass Filter
    const osc = this.audioCtx.createOscillator();
    const subOsc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const noteGain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Sub-bass sine layer
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq / 2, now);

    // Filter sweep
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(140, now + 0.12);
    filter.Q.setValueAtTime(3.5, now);

    // Envelope
    noteGain.gain.setValueAtTime(0.35, now);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.14);
    subOsc.stop(now + 0.14);

    // Synthwave kick on beats 0, 4, 8, 12
    if (this.step % 4 === 0) {
      this.playKick(now);
    }
    // Synthwave snare on beats 4 and 12
    if (this.step % 8 === 4) {
      this.playSnare(now);
    }

    this.step++;
  }

  private playKick(now: number): void {
    if (!this.audioCtx || !this.gainNode) return;
    const kickOsc = this.audioCtx.createOscillator();
    const kickGain = this.audioCtx.createGain();

    kickOsc.type = 'sine';
    kickOsc.frequency.setValueAtTime(130, now);
    kickOsc.frequency.exponentialRampToValueAtTime(30, now + 0.1);

    kickGain.gain.setValueAtTime(0.35, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    kickOsc.connect(kickGain);
    kickGain.connect(this.gainNode);

    kickOsc.start(now);
    kickOsc.stop(now + 0.13);
  }

  private playSnare(now: number): void {
    if (!this.audioCtx || !this.gainNode) return;
    const bufferSize = this.audioCtx.sampleRate * 0.09;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1000, now);

    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.16, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.gainNode);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.1);
  }

  public stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
    this.isPlaying = false;
  }
}
