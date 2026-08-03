import {
  Component, ElementRef, Renderer2,
  OnInit, OnDestroy, AfterViewInit,
  Inject, PLATFORM_ID, HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private typed!: Typed;
  private skillObserver!: IntersectionObserver;
  private revealObserver!: IntersectionObserver;

  activeSection: string = 'home';
  scrollPercent: number = 0;

  marqueeSkills = [
    'Docker', 'CI/CD', 'GitLab CI', 'GitHub Actions', 'Terraform',
    'Kubernetes', 'Python', 'AWS Security', 'OWASP Top 10', 'Linux Hardening',
    'Nmap', 'Burp Suite', 'SonarQube', 'Vulnerability Scanners', 'Git'
  ];

  skills = [
    {
      title: 'Security Automation & Tools',
      skills: [
        { name: 'OWASP', icon: 'assets/icons/cybersecurity/owasp.svg', url: 'https://owasp.org' },
        { name: 'Nmap', icon: 'assets/icons/cybersecurity/nmap.svg', url: 'https://nmap.org' },
        { name: 'Burp Suite', icon: 'assets/icons/cybersecurity/burpsuite.svg', url: 'https://portswigger.net/burp' },
        { name: 'Kali Linux', icon: 'assets/icons/cybersecurity/kalilinux.svg', url: 'https://www.kali.org/docs/' },
        { name: 'Wireshark', icon: 'assets/icons/cybersecurity/wireshark.svg', url: 'https://www.wireshark.org' },
        { name: 'Metasploit', icon: 'assets/icons/cybersecurity/metasploit.svg', url: 'https://www.metasploit.com' },
      ],
    },
    {
      title: 'CI/CD & DevSecOps Infrastructure',
      skills: [
        { name: 'Docker', icon: 'assets/icons/tools-workflow/docker.svg', url: 'https://docs.docker.com' },
        { name: 'Linux', icon: 'assets/icons/tools-workflow/linux.svg', url: 'https://docs.kernel.org' },
        { name: 'Git', icon: 'assets/icons/tools-workflow/git.svg', url: 'https://git-scm.com/doc' },
        { name: 'GitHub', icon: 'assets/icons/tools-workflow/github.svg', url: 'https://docs.github.com' },
        { name: 'VS Code', icon: 'assets/icons/tools-workflow/vscode.svg', url: 'https://code.visualstudio.com/docs' },
        { name: 'Postman', icon: 'assets/icons/tools-workflow/postman.svg', url: 'https://learning.postman.com' },
      ],
    },
    {
      title: 'Secure Web Development',
      skills: [
        { name: 'Angular', icon: 'assets/icons/web-dev/angular.svg', url: 'https://angular.dev' },
        { name: 'React', icon: 'assets/icons/web-dev/react.svg', url: 'https://react.dev' },
        { name: 'Node.js', icon: 'assets/icons/web-dev/nodedotjs.svg', url: 'https://nodejs.org' },
        { name: 'Tailwind', icon: 'assets/icons/web-dev/tailwindcss.svg', url: 'https://tailwindcss.com' },
        { name: 'JavaScript', icon: 'assets/icons/web-dev/javascript.svg', url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
        { name: 'TypeScript', icon: 'assets/icons/web-dev/typescript.svg', url: 'https://www.typescriptlang.org' },
      ],
    },
    {
      title: 'Scripting & Databases',
      skills: [
        { name: 'Python', icon: 'assets/icons/ai-ml/python.svg', url: 'https://docs.python.org/3/' },
        { name: 'Java', icon: 'assets/icons/languages/java.svg', url: 'https://dev.java' },
        { name: 'MySQL', icon: 'assets/icons/languages/mysql.svg', url: 'https://dev.mysql.com/doc/' },
        { name: 'MongoDB', icon: 'assets/icons/languages/mongodb.svg', url: 'https://www.mongodb.com/docs/' },
        { name: 'C++', icon: 'assets/icons/languages/cplusplus.svg', url: 'https://isocpp.org' },
        { name: 'Firebase', icon: 'assets/icons/languages/firebase.svg', url: 'https://firebase.google.com/docs' },
      ],
    },
  ];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const sections = ['home', 'skills', 'contact'];
    const scrollPos = window.scrollY + window.innerHeight / 3;
    for (const id of sections) {
      const targetEl = document.getElementById(id);
      if (targetEl && targetEl.offsetTop <= scrollPos && targetEl.offsetTop + targetEl.offsetHeight > scrollPos) {
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

    this.typed = new Typed('.type', {
      strings: [
        'AI & Cybersecurity Student',
        'DevSecOps Engineer',
        'Full Stack Developer',
        'Tech Enthusiast',
      ],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
      backDelay: 1500,
    });

    setTimeout(() => {
      (this.el.nativeElement.querySelectorAll('.hero-item') as NodeListOf<HTMLElement>)
        .forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
    }, 50);

    this.initSkillObserver();
    this.initRevealObserver();
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
    this.skillObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  openDocs(url?: string): void {
    if (url) window.open(url, '_blank', 'noopener noreferrer');
  }

  navigateTo(path: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.router.navigate([path]);
  }

  downloadResume(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.open('assets/resume.pdf', '_blank');
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSection = id;
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
      { threshold: 0.08 }
    );
    (this.el.nativeElement.querySelectorAll('.reveal') as NodeListOf<HTMLElement>)
      .forEach(el => this.revealObserver.observe(el));
  }

  private loadAssets(): void {
    const faHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    if (!document.querySelector(`link[href="${faHref}"]`)) {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', faHref);
      this.renderer.appendChild(document.head, link);
    }
  }
}