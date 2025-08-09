import { Component, ElementRef, Renderer2, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Typed from 'typed.js';
import 'intersection-observer';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule]
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

    // gsap.registerPlugin(ScrollTrigger);
    
    // // Animate cards on scroll
    // gsap.utils.toArray('.category-card').forEach((card: any) => {
    //   gsap.from(card, {
    //     scrollTrigger: {
    //       trigger: card,
    //       start: "top 80%",
    //       toggleActions: "play none none none"
    //     },
    //     y: 30,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: "power2.out"
    //   });
    // });

    // // Button hover effect
    // gsap.to('.back-button', {
    //   '--border-opacity': 0.1,
    //   duration: 0.3
    // });
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




  skills = [
    {
      title: "Frontend",
      skills: [
        {
          name: "Angular",
          image: "https://img.icons8.com/?size=100&id=j9DnICNnlhGk&format=png&color=000000"
        },
        {
          name: "React Js",
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
        },
    
        {
          name: "HTML",
          image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
        },
        {
          name: "CSS",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
        },
        {
          name: "JavaScript",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
        },
        {
          name: "Tailwind ",
          image:
            "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Frontend/tailwindcss-icon.svg",
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "Node Js",
          image: "https://nodejs.org/static/images/logo.svg",
        },    
        {
          name: "MySQL",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
        },
      
        {
          name: "MongoDB",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
        },
        {
          name: "Firebase",
          image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        },
      ],
    },

    {
      title: "Programing Languaes",
      skills: [
        {
          name: "C",
          image: "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/c-original.svg",
        },
        {
          name: "C++",
          image:
            "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/cplusplus-original.svg",
        },
      
        {
          name: "Java",
          image:
            "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/java-original.svg",
        },
        {
          name: "Go",
          image: "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/go-original.svg",
        },
        {
          name: "Python",
          image: "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Languages/python-original.svg",
        },
      ],
    },
   
    {
      title: "Designing & Editing Tools",
      skills: [
        {
          name: "Canva",
          image: "https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png&color=000000",
        },
        {
          name: "Figma",
          image:
            "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Software/figma-icon.svg",
        },
      
        {
          name: "Resolve",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
        },
      ],
    },
    {
      title: "Miscellaneous",
      skills: [
        {
          name: "Git",
          image:
            "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Other/git-scm-icon.svg",
        },
        {
          name: "GitHub",
          image:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },

        {
          name: "VS Code",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
        },
        {
          name: "Arduino",
          image:
          "https://raw.githubusercontent.com/teamedwardforever/Readme-Generator/71f25dd8b98329b168142a6b782a107b75eab178/svg/Skills/Other/arduino-1.svg"
        }
      ],
    },
  ];



  ngOnInit(): void {
    const options = {
      strings: ['AI Researcher','Cyber Security Student','Full-Stack Developer', 'UI Designer', 'Student','Tech Enthusiast'],
      typeSpeed: 150,
      backSpeed: 75,      
      loop: true,
    };

    const typed = new Typed('.type', options);
  }
}
