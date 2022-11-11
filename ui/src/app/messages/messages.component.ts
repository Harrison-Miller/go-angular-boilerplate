import { Component, OnInit } from '@angular/core';
import {MessageServiceService} from "../api/services/message-service.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages?: string[];

  constructor(private messageService: MessageServiceService) { }

  ngOnInit(): void {
    this.messageService.MessageServiceListMessages().subscribe(resp => {
      this.messages = resp.messages!;
    })
  }

}
