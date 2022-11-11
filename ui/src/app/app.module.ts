import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./api/api.module";

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: 'http://localhost/api'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
