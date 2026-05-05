import {
  Component, ElementRef, Renderer2, ViewChild,
  OnInit, OnDestroy, AfterViewInit,
  Inject, PLATFORM_ID, HostListener
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
  @ViewChild('geoCanvas')   geoCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('avatarPhoto') avatarPhotoRef!: ElementRef<HTMLImageElement>;

  private typed!: Typed;
  private skillObserver!: IntersectionObserver;
  private revealObserver!: IntersectionObserver;
  private geoAnimId!: number;
  private tiltAnimId!: number;

  // Current tilt target (set by mouse, lerped toward)
  private tiltTargetX = 0;
  private tiltTargetY = 0;
  private tiltCurrentX = 0;
  private tiltCurrentY = 0;
  private isHoveringAvatar = false;

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
        { name: 'Angular',    icon: 'assets/icons/web-dev/angular.svg',     url: 'https://angular.dev' },
        { name: 'React',      icon: 'assets/icons/web-dev/react.svg',       url: 'https://react.dev' },
        { name: 'Node.js',    icon: 'assets/icons/web-dev/nodedotjs.svg',   url: 'https://nodejs.org' },
        { name: 'Tailwind',   icon: 'assets/icons/web-dev/tailwindcss.svg', url: 'https://tailwindcss.com' },
        { name: 'JavaScript', icon: 'assets/icons/web-dev/javascript.svg',  url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
        { name: 'TypeScript', icon: 'assets/icons/web-dev/typescript.svg',  url: 'https://www.typescriptlang.org' },
      ],
    },
    {
      title: 'Languages & DB',
      skills: [
        { name: 'C',        icon: 'assets/icons/languages/c.svg',         url: 'https://en.cppreference.com/w/c' },
        { name: 'C++',      icon: 'assets/icons/languages/cplusplus.svg', url: 'https://isocpp.org' },
        { name: 'Java',     icon: 'assets/icons/languages/java.svg',      url: 'https://dev.java' },
        { name: 'MySQL',    icon: 'assets/icons/languages/mysql.svg',     url: 'https://dev.mysql.com/doc/' },
        { name: 'MongoDB',  icon: 'assets/icons/languages/mongodb.svg',   url: 'https://www.mongodb.com/docs/' },
        { name: 'Firebase', icon: 'assets/icons/languages/firebase.svg',  url: 'https://firebase.google.com/docs' },
      ],
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { name: 'VS Code', icon: 'assets/icons/tools-workflow/vscode.svg',  url: 'https://code.visualstudio.com/docs' },
        { name: 'Git',     icon: 'assets/icons/tools-workflow/git.svg',     url: 'https://git-scm.com/doc' },
        { name: 'GitHub',  icon: 'assets/icons/tools-workflow/github.svg',  url: 'https://docs.github.com' },
        { name: 'Postman', icon: 'assets/icons/tools-workflow/postman.svg', url: 'https://learning.postman.com' },
        { name: 'Linux',   icon: 'assets/icons/tools-workflow/linux.svg',   url: 'https://docs.kernel.org' },
        { name: 'Docker',  icon: 'assets/icons/tools-workflow/docker.svg',  url: 'https://docs.docker.com' },
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

  openDocs(url?: string): void {
    if (url) window.open(url, '_blank', 'noopener noreferrer');
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const sections = ['home', 'skills'];
    const scrollPos = window.pageYOffset + window.innerHeight / 3;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        this.activeSection = id;
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

    this.initGeometricCanvas();
    this.initAvatarTiltLoop();
    this.initSkillObserver();
    this.initRevealObserver();
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
    this.skillObserver?.disconnect();
    this.revealObserver?.disconnect();
    cancelAnimationFrame(this.geoAnimId);
    cancelAnimationFrame(this.tiltAnimId);
  }

  // ── Avatar mouse handlers ────────────────────────────────────────────────

  onAvatarMouseMove(event: MouseEvent): void {
    const rig = event.currentTarget as HTMLElement;
    const r   = rig.getBoundingClientRect();
    const dx  = (event.clientX - (r.left + r.width  / 2)) / (r.width  / 2); // -1 to 1
    const dy  = (event.clientY - (r.top  + r.height / 2)) / (r.height / 2); // -1 to 1

    this.tiltTargetX = -dy * 22;  // rotateX (negate so tilt follows cursor naturally)
    this.tiltTargetY =  dx * 22;  // rotateY
    this.isHoveringAvatar = true;

    const photo = this.avatarPhotoRef?.nativeElement;
    if (photo) photo.classList.add('js-tilt');
  }

  onAvatarMouseLeave(): void {
    this.tiltTargetX = 0;
    this.tiltTargetY = 0;
    this.isHoveringAvatar = false;

    const photo = this.avatarPhotoRef?.nativeElement;
    if (photo) photo.classList.remove('js-tilt');
  }

  // Smooth lerp loop for 3D tilt — runs every frame
  private initAvatarTiltLoop(): void {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      this.tiltCurrentX = lerp(this.tiltCurrentX, this.tiltTargetX, 0.1);
      this.tiltCurrentY = lerp(this.tiltCurrentY, this.tiltTargetY, 0.1);

      const photo = this.avatarPhotoRef?.nativeElement;
      if (photo && this.isHoveringAvatar) {
        // Combine tilt with a gentle float offset so they don't fight
        photo.style.transform =
          `rotateX(${this.tiltCurrentX}deg) rotateY(${this.tiltCurrentY}deg) scale(1.05)`;
      } else if (photo && (Math.abs(this.tiltCurrentX) > 0.05 || Math.abs(this.tiltCurrentY) > 0.05)) {
        // Still lerping back to zero
        photo.style.transform =
          `rotateX(${this.tiltCurrentX}deg) rotateY(${this.tiltCurrentY}deg) scale(1)`;
      } else if (photo) {
        // Back to CSS animation
        photo.style.transform = '';
      }

      this.tiltAnimId = requestAnimationFrame(tick);
    };
    tick();
  }

  // ── Geometric canvas background ──────────────────────────────────────────

  private initGeometricCanvas(): void {
    const canvas = this.geoCanvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 60;
    const MAX_DIST   = 160;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220,38,38,${(1 - dist / MAX_DIST) * 0.35})`;
            ctx.lineWidth   = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220,38,38,0.5)';
        ctx.fill();
      }
      this.geoAnimId = requestAnimationFrame(draw);
    };
    draw();
  }

  // ── Skill card glow ──────────────────────────────────────────────────────

  onCardMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (!glow) return;
    const r = card.getBoundingClientRect();
    glow.style.setProperty('--mx', ((event.clientX - r.left) / r.width  * 100) + '%');
    glow.style.setProperty('--my', ((event.clientY - r.top)  / r.height * 100) + '%');
  }

  // ── Observers ────────────────────────────────────────────────────────────

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

  // ── Helpers ──────────────────────────────────────────────────────────────

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
  }
}