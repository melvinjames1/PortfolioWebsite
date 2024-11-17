import { Component, ElementRef, Renderer2 , Input } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    imports: [CommonModule]
})
export class ProjectsComponent {
  constructor(private el: ElementRef, private renderer: Renderer2){

  }
 
  projects = [
    {
      title: "Pomodoro Timer",
      image: "assets/pt.png",
      description: "A productivity tool built using JavaScript and HTML. It helps users manage their time efficiently by breaking work into intervals.This tool allows you to set Pomodoro intervals with breaks in between and tracks your focus time for increased productivity.",
      link: "https://pomodoro-timer12.netlify.app/",
      repoLink: "https://github.com/melvinjames1/pomodoro-timer",

    },
    {
      title: "Favourite Movie Blog",
      image: "assets/fmb.png",
      description: "This is a simple website built using Angular that displays all of my favourite movies from Hollywood, Bollywood, and Anime.It features a responsive design with a categorized list of movies, each with descriptions.",
      link: "https://main--myfavouritemoviesblog1.netlify.app/Favourite-Movies-Blog/",
      repoLink: "https://github.com/melvinjames1/FMB",
      
    },
    {
      title: "Joke Generator",
      image: "assets/JokeGen.png",
      description: "A simple website built using React and Random Joke API to render random jokes from the API database using Axios.With a click of a button, you can generate random jokes fetched from an API and displayed on the page.",
      link: "https://main--jokegenarator.netlify.app/",
      repoLink: "https://github.com/melvinjames1/joke-generator",
      details: "With a click of a button, you can generate random jokes fetched from an API and displayed on the page.",
    },
    {
      title: "Travellers Guide",
      image: "assets/Tg.png",
      description: "A simple Website Built Using HTML, CSS, JavaScript to allow users to gt details of a entered Country that they  want to travell to or are currently in, Th Details are fetched from  3rd party country api",
      link: "https://main--travellersguide576.netlify.app/",
      repoLink: "https://github.com/melvinjames1",
      details: "With a click of a button, you can generate random jokes fetched from an API and displayed on the page.",
    }
  ];
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
