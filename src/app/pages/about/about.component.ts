import {
  Component, ElementRef, Renderer2,
  OnInit, OnDestroy, AfterViewInit,
  Inject, PLATFORM_ID, HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {

  private revealObserver!: IntersectionObserver;

  navItems = [
    { id: 'about', label: 'BIO_CORE' },
    { id: 'education', label: 'BACKGROUND' },
    { id: 'experience', label: 'SERVICE_LOG' },
    { id: 'certifications', label: 'CERT_LOG' },
    { id: 'hobbies', label: 'OFF_DUTY' },
  ];

  chips = [
    'CI/CD Hardening', 'Security Automation', 'Container Hardening',
    'Infrastructure as Code', 'Vulnerability Scanners', 'Threat Modeling'
  ];

  skills = [
    { name: 'CI/CD Security Automation', pct: 90 },
    { name: 'Container Hardening & Orchestration', pct: 85 },
    { name: 'Penetration Testing & Auditing', pct: 80 },
    { name: 'Secure Software Development', pct: 82 },
  ];

  skillsVisible = false;

  stats = [
    { value: '2', suffix: '+', label: 'Years MSc Experience' },
    { value: '15', suffix: '+', label: 'Security & Dev Automation Projects' },
    { value: '10', suffix: '+', label: 'SecOps Pipelines Hardened' },
    { value: '99', suffix: '%', label: 'Pipeline Build Success' },
  ];

  currently = [
    { active: true, title: 'MSc AI & Cybersecurity', body: 'Writing security scanners, studying cryptography, and training ML models that catch intruders.' },
    { active: true, title: 'Securing Deployments', body: 'Plugging automated security checks into git pipelines so bad code never ships.' },
    { active: false, title: 'CTF Competitive Prep', body: 'Sharpening web exploitation skills in private labs — legally, of course.' },
    { active: false, title: 'Infrastructure Hardening', body: 'Locking down Docker containers and writing isolation policies that actually hold up.' }
  ];

  // ─── EDUCATION (from resume) ──────────────────────────────────────────────
  education = [
    {
      year: '2025 — Present',
      title: 'MSc, Artificial Intelligence and Cybersecurity',
      body: 'Currently pursuing a master\'s specializing in Artificial Intelligence and Cybersecurity at CHRIST (Deemed to be University), Bengaluru.',
      tags: ['Bengaluru', 'Artificial Intelligence', 'Cybersecurity', 'CHRIST University']
    },
    {
      year: '2022 — 2025',
      title: 'Bachelor of Computer Applications (CGPA: 7.77)',
      body: 'Completed a Bachelor of Computer Applications at Kristu Jayanti College (Autonomous), Bengaluru.',
      tags: ['Bengaluru', 'Kristu Jayanti College', 'CGPA 7.77']
    }
  ];

  // ─── EXPERIENCE (from resume) ─────────────────────────────────────────────
  experience = [
    {
      year: 'Jun 2024 — Jul 2024',
      title: 'Angular Developer Intern',
      body: 'Developed a secure, responsive web application using Angular and Tailwind CSS at Kristu Jayanti Software Development Centre, Bengaluru. Implemented role-based access control using Auth Guards to restrict unauthorized route access, and designed a session scheduling system that improved usability and workflow efficiency for end users.',
      tags: ['Angular', 'Tailwind CSS', 'Auth Guards', 'RBAC', 'Kristu Jayanti SDC']
    }
  ];

  // ─── CERTIFICATIONS (from resume) ─────────────────────────────────────────
  certifications = [
    {
      year: 'Expected Sep 2026',
      title: 'CompTIA Security+',
      body: 'Vendor-neutral certification covering core security concepts, threats, risk management, and cryptography fundamentals.',
      tags: ['CompTIA', 'Security Fundamentals'],
      status: 'upcoming'
    },
    {
      year: 'Mar 2026',
      title: 'Deloitte Cyber Job Simulation',
      body: 'Forage-hosted simulation of Deloitte\'s cybersecurity practice, covering identity and access management and forensic investigation tasks.',
      tags: ['Forage', 'Deloitte', 'IAM'],
      status: 'completed'
    },
    {
      year: 'Feb 2026',
      title: 'OWASP API Security Top 10',
      body: 'LinkedIn Learning course covering the most critical API security risks and how to identify and remediate them.',
      tags: ['LinkedIn Learning', 'OWASP', 'API Security'],
      status: 'completed'
    },
    {
      year: 'Jul 2023',
      title: 'Network Fundamentals',
      body: 'Infosys Springboard course covering core networking concepts, protocols, and infrastructure fundamentals.',
      tags: ['Infosys Springboard', 'Networking'],
      status: 'completed'
    }
  ];

  hobbies = [
    {
      icon: 'fas fa-music',
      chip: 'Music',
      title: 'Guitarist & Improviser',
      items: [
        'Electric guitar — rock & blues',
        'Keyboard & music theory',
        'Experimenting with effects loops'
      ],
      tags: ['Guitar', 'Keyboard', 'Music Theory'],
      statusLabel: 'Practice Routine',
      statusPct: 85
    },
    {
      icon: 'fas fa-gamepad',
      chip: 'Gaming',
      title: 'RPG Enthusiast',
      items: [
        'Open-world RPG exploration',
        'Casual FPS & battle royale',
        'Game modding & community builds'
      ],
      tags: ['ARPGs', 'Co-op', 'Strategy'],
      statusLabel: 'Campaign Progress',
      statusPct: 60
    },
    {
      icon: 'fas fa-motorcycle',
      chip: 'Riding',
      title: 'Touring & Exploration',
      items: [
        'Weekend highway expeditions',
        'Urban commute & city rides',
        'Bike maintenance & upgrades'
      ],
      tags: ['Highways', 'Maintenance', 'Gear Tuning'],
      statusLabel: 'Trip Preparedness',
      statusPct: 95
    }
  ];

  quickNav = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Edu' },
    { id: 'experience', label: 'Exp' },
    { id: 'certifications', label: 'Certs' },
    { id: 'hobbies', label: 'Hobbies' }
  ];

  activeSection = 'about';
  scrollPercent = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  // NOTE: the 3D background in app.component.ts already listens to
  // window:scroll globally and reads element IDs to pick a camera pose.
  // We just track activeSection locally here for the side-nav highlight —
  // app.component.ts does the actual scene manipulation, and its own
  // sections list / camera branches must include 'certifications' too.
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const sections = ['about', 'education', 'experience', 'certifications', 'hobbies'];
    const scrollPos = window.scrollY + window.innerHeight / 3;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        this.activeSection = id;
      }
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAssets();
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => this.initReveal(), 100);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  private loadAssets(): void {
    const href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', href);
      this.renderer.appendChild(document.head, link);
    }
  }

  private initReveal(): void {
    const els = this.el.nativeElement.querySelectorAll('.reveal') as NodeListOf<HTMLElement>;
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
            if ((e.target as HTMLElement).id === 'about') {
              this.skillsVisible = true;
            }
          } else {
            (e.target as HTMLElement).classList.add('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => this.revealObserver.observe(el));
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: y, behavior: 'smooth' });
    this.activeSection = id;
  }

  downloadResume(): void {
    window.location.href = 'assets/resume.pdf';
  }
}