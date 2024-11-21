import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogComponent } from './blog/blog.component';


export const routes: Routes = [
    {'path':'',component:HomeComponent},
    {'path':'\projects',component:ProjectsComponent},
    {'path':'\blog',component:AboutComponent},
    { 'path': 'blog/:id', component: BlogComponent },
    {'path':'\about',component:BlogComponent},
];
