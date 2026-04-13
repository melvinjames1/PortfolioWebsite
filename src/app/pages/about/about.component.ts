import { Component, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ["./about.component.css"],   // no CSS file needed — pure Tailwind
})
export class AboutComponent implements OnInit, OnDestroy {
  hobbies = [
  {
    index: '01', chip: 'Active', icon: 'fas fa-gamepad', title: 'Gaming',
    statusLabel: 'Weekly hrs', statusPct: 75,
    items: ['Competitive FPS & battle royale', 'Open-world RPG exploration', 'Indie puzzle & strategy games', 'Game modding & community builds'],
    tags: ['FPS', 'RPG', 'Indie']
  },
  {
    index: '02', chip: 'Creative', icon: 'fas fa-music', title: 'Music',
    statusLabel: 'Practice streak', statusPct: 65,
    items: ['Electric guitar — rock & blues', 'Keyboard & music theory', 'Singing & vocal training', 'DAW production & sound design'],
    tags: ['Guitar', 'Keyboard', 'Singing', 'DAW']
  },
  {
    index: '03', chip: 'Outdoor', icon: 'fas fa-person-biking', title: 'Biking',
    statusLabel: 'Rides / month', statusPct: 55,
    items: ['Biking', 'Road cycling & long routes', 'Urban commute & city rides', 'Bike maintenance & upgrades'],
    tags: ['Bike', 'Road', 'Urban']
  }
];
  activeSection = 'about';

  chips = ['AI', 'Cybersecurity', 'Full Stack', 'Angular', 'Python'];

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



  private revealObserver!: IntersectionObserver;
  private sectionObserver!: IntersectionObserver;
  private readonly sectionIds = ['about', 'education', 'experience', 'hobbies', 'contact'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadAssets();
    setTimeout(() => {
      this.initReveal();
      this.initSectionTracker();
    }, 100);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.sectionObserver?.disconnect();
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
    }, { threshold: 0.1 });
    els.forEach(el => this.revealObserver.observe(el));
  }

  private initSectionTracker(): void {
    this.sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) this.activeSection = e.target.id;
      });
    }, { threshold: 0.35 });
    this.sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    });
  }

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadResume(): void {
    window.location.href = 'assets/resume.pdf';
  }
}