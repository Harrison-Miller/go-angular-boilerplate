import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessagesComponent} from "./messages/messages.component";
import {ReadmeComponent} from "./readme/readme.component";

const routes: Routes = [
  {
    path: '',
    component: ReadmeComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
