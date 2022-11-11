import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./api/api.module";
import { MessagesComponent } from './messages/messages.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ReadmeComponent } from './readme/readme.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ReadmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: 'http://localhost/api'}),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
