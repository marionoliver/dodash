import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './components/containers/containers.component';
import { ContainerCreateComponent } from './components/container-create/container-create.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageComponent } from './components/image/image.component';
import { ContainerDetailComponent } from './components/container-detail/container-detail.component';
import { ContainerLogsComponent } from './components/container-logs/container-logs.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'containers', component: ContainersComponent },
  { path: 'container/create', component: ContainerCreateComponent },
  { path: 'container/:id', component: ContainerDetailComponent },
  { path: 'container/:id/logs', component: ContainerLogsComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'image/:id', component: ImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 }
