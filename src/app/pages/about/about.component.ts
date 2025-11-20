import { Component , ElementRef, Renderer2 } from '@angular/core';


@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    
})
export class AboutComponent {

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }



  downloadResume() {
    window.location.href = 'assets/resume.pdf'; // Path to your resume PDF file
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const sections = this.el.nativeElement.querySelectorAll('.section-content') as NodeListOf<HTMLElement>;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target as HTMLElement, 'fade-in');
        } else {
          this.renderer.removeClass(entry.target as HTMLElement, 'fade-in');
        }
      });
    });

    sections.forEach((section: HTMLElement) => observer.observe(section));
  }

}
