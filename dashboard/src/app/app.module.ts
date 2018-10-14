import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerCreateComponent } from './components/container-create/container-create.component';
import { ContainersComponent } from './components/containers/containers.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageComponent } from './components/image/image.component';
import { RouterModule } from '@angular/router';
import { ContainerDetailComponent } from './components/container-detail/container-detail.component';
import { ContainerLogsComponent } from './components/container-logs/container-logs.component';
import { HomeComponent } from './components/home/home.component';
import { NgHttpLoaderModule } from 'ng-http-loader'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    ContainerCreateComponent,
    ContainersComponent,
    ImagesComponent,
    ImageComponent,
    ContainerDetailComponent,
    ContainerLogsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgHttpLoaderModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
