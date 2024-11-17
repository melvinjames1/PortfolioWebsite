import { Component, ElementRef, Renderer2, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'intersection-observer';
import { NavbarComponent } from "../navbar/navbar.component"; 
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})


export class HomeComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if IntersectionObserver is supported
      if ('IntersectionObserver' in window) {
     
        this.initIntersectionObserver(); // Initialize IntersectionObserver
      } else {
        console.warn('IntersectionObserver is not supported in this browser.');
      
      }
    }
  }



  private initIntersectionObserver(): void {
    const sections = this.el.nativeElement.querySelectorAll('.section-content') as NodeListOf<HTMLElement>;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-in');
        } else {
          this.renderer.removeClass(entry.target, 'fade-in');
        }
      });
    });

    sections.forEach((section) => observer.observe(section));
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
