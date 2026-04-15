import {
  Component, ElementRef, Renderer2,
  OnInit, OnDestroy, AfterViewInit,
  Inject, PLATFORM_ID, HostListener // Added HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import Typed from 'typed.js';

const si = (slug: string, hex = 'f87171') =>
  `https://cdn.simpleicons.org/${slug}/${hex}`;

const di = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

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

  // Track the current section for the Side Nav highlight
  activeSection: string = 'home';

  marqueeSkills = [
    'Angular','React','Python','Node.js','Cybersecurity',
    'AI/ML','JavaScript','TypeScript','Java','Tailwind CSS',
    'MongoDB','Git','Figma','Firebase','Arduino',
  ];

skills = [
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Python',       icon: 'assets/icons/ai-ml/python.svg',      url: 'https://docs.python.org/3/' },
      { name: 'PyTorch',      icon: 'assets/icons/ai-ml/pytorch.svg',     url: 'https://pytorch.org' },
      { name: 'TensorFlow',   icon: 'assets/icons/ai-ml/tensorflow.svg',  url: 'https://www.tensorflow.org' },
      { name: 'NumPy',        icon: 'assets/icons/ai-ml/numpy.svg',       url: 'https://numpy.org' },
      { name: 'Scikit-Learn', icon: 'assets/icons/ai-ml/scikitlearn.svg', url: 'https://scikit-learn.org' },
      { name: 'Pandas',       icon: 'assets/icons/ai-ml/pandas.svg',      url: 'https://pandas.pydata.org' },
    ],
  },
  {
    title: 'Cybersecurity',
    skills: [
      { name: 'Kali Linux', icon: 'assets/icons/cybersecurity/kalilinux.svg',  url: 'https://www.kali.org/docs/' },
      { name: 'Wireshark',  icon: 'assets/icons/cybersecurity/wireshark.svg',  url: 'https://www.wireshark.org' },
      { name: 'Metasploit', icon: 'assets/icons/cybersecurity/metasploit.svg', url: 'https://www.metasploit.com' },
      { name: 'Burp Suite', icon: 'assets/icons/cybersecurity/burpsuite.svg',  url: 'https://portswigger.net/burp' },
      { name: 'Nmap',       icon: 'assets/icons/cybersecurity/nmap.svg',       url: 'https://nmap.org' },
      { name: 'OWASP',      icon: 'assets/icons/cybersecurity/owasp.svg',      url: 'https://owasp.org' },
    ],
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'Angular',    icon: 'assets/icons/web-dev/angular.svg',    url: 'https://angular.dev' },
      { name: 'React',      icon: 'assets/icons/web-dev/react.svg',      url: 'https://react.dev' },
      { name: 'Node.js',    icon: 'assets/icons/web-dev/nodedotjs.svg',  url: 'https://nodejs.org' },
      { name: 'Tailwind',   icon: 'assets/icons/web-dev/tailwindcss.svg',url: 'https://tailwindcss.com' },
      { name: 'JavaScript', icon: 'assets/icons/web-dev/javascript.svg', url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
      { name: 'TypeScript', icon: 'assets/icons/web-dev/typescript.svg', url: 'https://www.typescriptlang.org' },
    ],
  },
  {
    title: 'Languages & DB',
    skills: [
      { name: 'C',        icon: 'assets/icons/languages/c.svg',        url: 'https://en.cppreference.com/w/c' },
      { name: 'C++',      icon: 'assets/icons/languages/cplusplus.svg',url: 'https://isocpp.org' },
      { name: 'Java',     icon: 'assets/icons/languages/java.svg',     url: 'https://dev.java' },
      { name: 'MySQL',    icon: 'assets/icons/languages/mysql.svg',    url: 'https://dev.mysql.com/doc/' },
      { name: 'MongoDB',  icon: 'assets/icons/languages/mongodb.svg',  url: 'https://www.mongodb.com/docs/' },
      { name: 'Firebase', icon: 'assets/icons/languages/firebase.svg', url: 'https://firebase.google.com/docs' },
    ],
  },
  {
    title: 'Tools & Workflow',
    skills: [
      { name: 'VS Code', icon: 'assets/icons/tools-workflow/vscode.svg', url: 'https://code.visualstudio.com/docs' },
      { name: 'Git',     icon: 'assets/icons/tools-workflow/git.svg',               url: 'https://git-scm.com/doc' },
      { name: 'GitHub',  icon: 'assets/icons/tools-workflow/github.svg',            url: 'https://docs.github.com' },
      { name: 'Postman', icon: 'assets/icons/tools-workflow/postman.svg',           url: 'https://learning.postman.com' },
      { name: 'Linux',   icon: 'assets/icons/tools-workflow/linux.svg',             url: 'https://docs.kernel.org' },
      { name: 'Docker',  icon: 'assets/icons/tools-workflow/docker.svg',            url: 'https://docs.docker.com' },
    ],
  },
  {
    title: 'Design & Editing',
    skills: [
      { name: 'Figma',   icon: 'assets/icons/design-editing/figma.svg',          url: 'https://help.figma.com' },
      { name: 'Canva',   icon: 'assets/icons/design-editing/canva.png',          url: 'https://www.canva.com' },
      { name: 'DaVinci', icon: 'assets/icons/design-editing/davinciresolve.svg', url: 'https://www.blackmagicdesign.com/products/davinciresolve' },
      { name: 'Arduino', icon: 'assets/icons/design-editing/arduino.svg',        url: 'https://www.arduino.cc/en/Guide' },
    ],
  },
];

// Navigation function
openDocs(url?: string): void {
  if (url) {
    window.open(url, '_blank', 'noopener noreferrer');
  }
}

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  // ── Scroll Listener for Nav ──────────────────────────────────────────────
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const sections = ['home', 'skills', 'projects', 'about', 'contact'];
    const scrollPosition = window.pageYOffset + (window.innerHeight / 3);

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        if (element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          this.activeSection = section;
        }
      }
    }
  }

  ngOnInit(): void { this.loadAssets(); }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.typed = new Typed('.type', {
      strings: ['AI Researcher','Cybersecurity Student','Full-Stack Developer','UI Designer','Tech Enthusiast'],
      typeSpeed: 110, backSpeed: 55, loop: true,
    });

    setTimeout(() => {
      (this.el.nativeElement.querySelectorAll('.hero-item') as NodeListOf<HTMLElement>)
        .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 130));
    }, 80);

    this.initSkillObserver();
    this.initRevealObserver();
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
    this.skillObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  onMouseMove(event: MouseEvent): void {
    const wrap = event.currentTarget as HTMLElement;
    const avatar = wrap.querySelector('.avatar-3d') as HTMLElement;
    if (!avatar) return;
    const r = wrap.getBoundingClientRect();
    const dx = (event.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (event.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    avatar.style.transform = `rotateX(${-dy * 18}deg) rotateY(${dx * 18}deg) scale(1.04)`;
    avatar.style.animation = 'none';
  }

  onMouseLeave(): void {
    const avatar = this.el.nativeElement.querySelector('.avatar-3d') as HTMLElement;
    if (avatar) { avatar.style.transform = ''; avatar.style.animation = ''; }
  }

  onCardMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (!glow) return;
    const r = card.getBoundingClientRect();
    glow.style.setProperty('--mx', ((event.clientX - r.left) / r.width * 100) + '%');
    glow.style.setProperty('--my', ((event.clientY - r.top)  / r.height * 100) + '%');
  }

  private initSkillObserver(): void {
    this.skillObserver = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    (this.el.nativeElement.querySelectorAll('.skill-card') as NodeListOf<HTMLElement>)
      .forEach(c => this.skillObserver.observe(c));
  }

  private initRevealObserver(): void {
    this.revealObserver = new IntersectionObserver(
      entries => entries.forEach(e => {
        (e.target as HTMLElement).classList.toggle('visible', e.isIntersecting);
      }),
      { threshold: 0.1 }
    );
    (this.el.nativeElement.querySelectorAll('.reveal-left') as NodeListOf<HTMLElement>)
      .forEach(el => this.revealObserver.observe(el));
  }

  private loadAssets(): void {
    ['https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css']
      .forEach(href => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = this.renderer.createElement('link');
          this.renderer.setAttribute(link, 'rel', 'stylesheet');
          this.renderer.setAttribute(link, 'href', href);
          this.renderer.appendChild(document.head, link);
        }
      });
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = id; // Update immediately on click for better UX
    }
  }
}