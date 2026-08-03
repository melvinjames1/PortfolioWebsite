import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;
  scrollProgress = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateScroll();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScroll();
  }

  private updateScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 20;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  /** Navigate to a different page route */
  navigateTo(path: string): void {
    this.closeMenu();
    if (!isPlatformBrowser(this.platformId)) return;
    this.router.navigate([path]);
  }

  /** Scroll to an anchor on the current page (or navigate home first) */
  scrollToSection(id: string): void {
    this.closeMenu();
    if (!isPlatformBrowser(this.platformId)) return;

    const currentPath = this.router.url.split('#')[0].split('?')[0];
    if (currentPath !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scroll(id), 120);
      });
    } else {
      this.scroll(id);
    }
  }

  private scroll(id: string): void {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
}