import { Component, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {

  // ── Nav ───────────────────────────────────────────────────────────────────
  navItems = [
    { id: 'about',      icon: 'fas fa-user',           label: 'About'      },
    { id: 'education',  icon: 'fas fa-graduation-cap', label: 'Education'  },
    { id: 'experience', icon: 'fas fa-briefcase',      label: 'Experience' },
    { id: 'hobbies',    icon: 'fas fa-guitar',         label: 'Hobbies'    },
    { id: 'contact',    icon: 'fas fa-envelope',       label: 'Contact'    },
  ];

  quickNav = [
    { id: 'education',  label: 'Education'  },
    { id: 'experience', label: 'Experience' },
    { id: 'hobbies',    label: 'Hobbies'    },
    { id: 'contact',    label: 'Contact'    },
  ];

  activeSection = 'about';

  // ── About content ─────────────────────────────────────────────────────────
  chips = ['AI / ML', 'Cybersecurity', 'Full Stack', 'Angular', 'Python', 'LLMs', 'Pen Testing'];

  skills = [
    { name: 'Python',                      pct: 88 },
    { name: 'Angular / TypeScript',        pct: 82 },
    { name: 'AI / ML (sklearn, LangChain)',pct: 75 },
    { name: 'Cybersecurity & Pen Testing', pct: 70 },
    { name: 'React / JavaScript',          pct: 65 },
  ];

  stats = [
    { value: '5', suffix: '+', label: 'Projects shipped' },
    { value: '3', suffix: '+', label: 'Years coding'     },
    { value: '2', suffix: 'x', label: 'Hackathons'       },
    { value: '∞', suffix: '',  label: 'Curiosity'        },
  ];

  currently = [
    { active: true,  title: 'MSc AI & Cybersecurity',  body: 'Christ University, Bangalore — 2025 to present' },
    { active: true,  title: 'Building',                body: 'Local RAG systems, web vulnerability scanners, and ML classifiers' },
    { active: false, title: 'Learning',                body: 'Advanced cryptography, adversarial ML & red-team methodologies' },
    { active: false, title: 'Listening to',            body: 'Blues guitar jams — anything with a good riff' },
  ];

  // ── Skill bar trigger ─────────────────────────────────────────────────────
  skillsVisible = false;
  private skillsObserver!: IntersectionObserver;

  // ── Timeline data ─────────────────────────────────────────────────────────
  education = [
    {
      year: '2025 – Present',
      title: 'MSc AI & Cybersecurity — Christ University, Bangalore',
      body: 'Exploring network security, cryptography, and AI algorithms. Actively involved in club activities and ongoing research.',
      tags: ['Cryptography', 'Network Security', 'AI Algorithms'],
    },
    {
      year: '2022 – 2025',
      title: 'BCA — Kristu Jayanti College',
      body: 'Deepened skills in C, Java, Python, DSA, OS, Software Engineering, and Git through hands-on projects and club involvement.',
      tags: ['Java', 'Python', 'DSA', 'Git'],
    },
    {
      year: '2022',
      title: "2nd PUC CEBA — St. Joseph's Pre-University College",
      body: 'Studied C++, HTML, SQL basics alongside Accounts, Economics, and Business Studies.',
      tags: ['C++', 'HTML', 'SQL'],
    },
    {
      year: '2020',
      title: '10th Grade — ICSE',
      body: "St. Germain's Academy. Built strong interpersonal and communication foundations.",
      tags: ['Communication', 'Academics'],
    },
  ];

  experience = [
    {
      year: 'Jun 2024 – Jul 2024',
      title: 'Front-End Developer — Kristu Jayanti SDC',
      body: 'Built scalable layouts with Angular routing, implemented authentication guards, and established an efficient Git workflow and version control system for the team.',
      tags: ['Angular', 'Auth Guards', 'Git', 'UI Design'],
    },
    {
      year: 'Nov 2023 – Jun 2024',
      title: 'Google Developer Student Club — Member',
      body: "Participated in Blitz Code, Angular Study Jam, and React Study Jam. Part of the organizing team for Velocity — a national-level coding competition. Joined Google's Generative AI Jam program.",
      tags: ['Angular', 'React', 'Gen AI', 'Event Org'],
    },
  ];

  hobbies = [
    {
      index: '01', chip: 'Creative', icon: 'fas fa-music', title: 'Music',
      statusLabel: 'Practice streak', statusPct: 85,
      items: ['Electric guitar — rock & blues', 'Keyboard & music theory', 'Singing & vocal training', 'DAW production & sound design'],
      tags: ['Guitar', 'Keyboard', 'Singing', 'DAW']
    },
    {
      index: '02', chip: 'Active', icon: 'fas fa-gamepad', title: 'Gaming',
      statusLabel: 'Weekly hrs', statusPct: 75,
      items: ['Open-world RPG exploration', 'Indie puzzle & strategy games', 'Casual FPS & battle royale', 'Game modding & community builds'],
      tags: ['Open World', 'RPG', 'Indie', 'FPS']
    },
    {
      index: '03', chip: 'Outdoor', icon: 'fas fa-person-biking', title: 'Biking',
      statusLabel: 'Rides / month', statusPct: 55,
      items: ['Mountain trail riding', 'Road cycling & long routes', 'Urban commute & city rides', 'Bike maintenance & upgrades'],
      tags: ['Bike', 'Road', 'Urban']
    }
  ];

  // ── Internals ─────────────────────────────────────────────────────────────
  private revealObserver!: IntersectionObserver;
  private readonly sectionIds = ['about', 'education', 'experience', 'hobbies', 'contact'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadAssets();
    setTimeout(() => {
      this.initReveal();
      this.initSectionTracker();
      this.initSkillsObserver();
    }, 150);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.skillsObserver?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
  }

  // Scroll-based section tracker — works regardless of section height
  private onScroll = (): void => {
    const offsets = this.sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Infinity };
      return { id, top: Math.abs(el.getBoundingClientRect().top) };
    });
    offsets.sort((a, b) => a.top - b.top);
    if (offsets[0]) this.activeSection = offsets[0].id;
  };

  private initSectionTracker(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  private initReveal(): void {
    const els = this.el.nativeElement.querySelectorAll('.reveal') as NodeListOf<HTMLElement>;
    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
        } else {
          (e.target as HTMLElement).classList.add('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => this.revealObserver.observe(el));
  }

  // Trigger skill bars when the skills card scrolls into view
  private initSkillsObserver(): void {
    const skillCard = this.el.nativeElement.querySelector('.skill-row')?.closest('.ab-skill-card')
      ?? this.el.nativeElement.querySelectorAll('.reveal')[2]; // skills card is 3rd reveal
    if (!skillCard) { this.skillsVisible = true; return; }
    this.skillsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.skillsVisible = true;
        this.skillsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    this.skillsObserver.observe(skillCard);
  }

  private loadAssets(): void {
    const assets = [
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    ];
    assets.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = this.renderer.createElement('link');
        this.renderer.setAttribute(link, 'rel', 'stylesheet');
        this.renderer.setAttribute(link, 'href', href);
        this.renderer.appendChild(document.head, link);
      }
    });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  downloadResume(): void {
    window.location.href = 'assets/resume.pdf';
  }
}