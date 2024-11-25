import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, Renderer2 , Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  posts = [
    { id: 1, title: 'DevOps: Bridging the Gap Between Development and Operationst Post', summary: 'In today’s fast-paced digital world, delivering high-quality software rapidly and reliably is no longer optional—it’s a necessity. This is where DevOps shines. By uniting development and operations teams, DevOps transforms how organizations build, test, deploy, and monitor applications.' ,link:'https://medium.com/@saranipeiris17/an-introduction-to-devops-bridging-development-and-operations-for-faster-reliable-software-c94046c624e5' },
    { id: 2, title: 'The Transformative Power of AI: Shaping the Future', summary: 'Artificial Intelligence (AI) is no longer a concept confined to science fiction or research labs. It has emerged as a powerful force driving change across industries, reshaping the way we work, live, and interact with the world. From chatbots assisting customers online to algorithms predicting natural disasters, AI is a technological revolution with profound implications.', link: 'https://blogs.nvidia.com/blog/2024-ai-predictions/' },
    { id: 3, title: 'Web Development Trends for 2024', summary: 'In 2024, web development is embracing several key trends that improve both user experience and performance. Single-page applications (SPAs) and Progressive Web Apps (PWAs) are popular for offering fast, seamless browsing, while Accelerated Mobile Pages (AMP) continue to optimize mobile speed. Additionally, serverless architecture and edge computing are enhancing scalability and reducing latency. Security is also a growing concern, with Zero Trust Architecture (ZTA) helping protect sensitive data. These advancements allow developers to build more efficient, secure, and user-friendly websites', link: 'https://blog.hubspot.com/website/web-development-trends' },
  ];
  currentPost: any = null;

  constructor(private el: ElementRef, private renderer: Renderer2){

  }

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

