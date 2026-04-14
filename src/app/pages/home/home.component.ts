import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private typed!: Typed;
  private skillObserver!: IntersectionObserver;
  private revealObserver!: IntersectionObserver;

  marqueeSkills = [
    'Angular', 'React', 'Python', 'Node.js', 'Cybersecurity',
    'AI/ML', 'JavaScript', 'TypeScript', 'Java', 'Tailwind CSS',
    'MongoDB', 'Git', 'Figma', 'Firebase', 'Arduino',
  ];

  skills = [
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular',    image: 'https://img.icons8.com/?size=100&id=j9DnICNnlhGk&format=png&color=000000' },
        { name: 'React',      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png' },
        { name: 'HTML',       image: 'https://www.w3.org/html/logo/badge/html5-badge-h-solo.png' },
        { name: 'CSS',        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png' },
        { name: 'JavaScript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png' },
        { name: 'Tailwind',   image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Frontend/tailwindcss-icon.svg' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js',  image: 'https://nodejs.org/static/images/logo.svg' },
        { name: 'MySQL',    image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg' },
        { name: 'MongoDB',  image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg' },
        { name: 'Firebase', image: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
      ],
    },
    {
      title: 'Languages',
      skills: [
        { name: 'C',      image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/c-original.svg' },
        { name: 'C++',    image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/cplusplus-original.svg' },
        { name: 'Java',   image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/java-original.svg' },
        { name: 'Python', image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/python-original.svg' },
        { name: 'Go',     image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/go-original.svg' },
      ],
    },
    {
      title: 'Design & Editing',
      skills: [
        { name: 'Canva',   image: 'https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png&color=000000' },
        { name: 'Figma',   image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Software/figma-icon.svg' },
        { name: 'DaVinci', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png' },
      ],
    },
    {
      title: 'Miscellaneous',
      skills: [
        { name: 'Git',     image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Other/git-scm-icon.svg' },
        { name: 'GitHub',  image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
        { name: 'VS Code', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png' },
        { name: 'Arduino', image: 'https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Other/arduino-1.svg' },
      ],
    },
  ];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.loadAssets();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Typed.js
    this.typed = new Typed('.type', {
      strings: [
        'AI Researcher',
        'Cybersecurity Student',
        'Full-Stack Developer',
        'UI Designer',
        'Tech Enthusiast',
      ],
      typeSpeed: 110,
      backSpeed: 55,
      loop: true,
    });

    // Staggered hero entrance
    setTimeout(() => {
      const items = this.el.nativeElement.querySelectorAll(
        '.hero-item'
      ) as NodeListOf<HTMLElement>;
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 130);
      });
    }, 80);

    this.initSkillObserver();
    this.initRevealObserver();
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
    this.skillObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  // ── 3D tilt on avatar ──────────────────────────────────────────────────────
  onMouseMove(event: MouseEvent): void {
    const wrap = (event.currentTarget as HTMLElement);
    const avatar = wrap.querySelector('.avatar-3d') as HTMLElement;
    if (!avatar) return;
    const rect = wrap.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    avatar.style.transform = `rotateX(${-dy * 18}deg) rotateY(${dx * 18}deg) scale(1.04)`;
    avatar.style.animation = 'none';
  }

  onMouseLeave(): void {
    const avatar = this.el.nativeElement.querySelector('.avatar-3d') as HTMLElement;
    if (!avatar) return;
    avatar.style.transform = '';
    avatar.style.animation = '';
  }

  // ── Mouse-tracking radial glow on skill cards ──────────────────────────────
  onCardMouseMove(event: MouseEvent, index: number): void {
    const card = event.currentTarget as HTMLElement;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (!glow) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    glow.style.setProperty('--mx', `${x}%`);
    glow.style.setProperty('--my', `${y}%`);
  }

  onCardMouseLeave(index: number): void {
    // glow fades via CSS opacity transition — nothing extra needed
  }

  // ── Observers ─────────────────────────────────────────────────────────────
  private initSkillObserver(): void {
    const cards = this.el.nativeElement.querySelectorAll(
      '.skill-card'
    ) as NodeListOf<HTMLElement>;
    this.skillObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach(c => this.skillObserver.observe(c));
  }

  private initRevealObserver(): void {
    const els = this.el.nativeElement.querySelectorAll(
      '.reveal-left'
    ) as NodeListOf<HTMLElement>;
    this.revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
          } else {
            (e.target as HTMLElement).classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => this.revealObserver.observe(el));
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}