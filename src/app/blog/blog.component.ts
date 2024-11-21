import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  posts = [
    { id: 1, title: 'First Post', summary: 'Summary of the first post', content: 'Content of the first post.' },
    { id: 2, title: 'Second Post', summary: 'Summary of the second post', content: 'Content of the second post.' },
    { id: 3, title: 'Third Post', summary: 'Summary of the third post', content: 'Content of the third post.' },
  ];
  currentPost: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentPost = this.posts.find((post) => post.id === +id);
    }
  }

  viewPost(id: number) {
    this.router.navigate(['/blog', id]);
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}

