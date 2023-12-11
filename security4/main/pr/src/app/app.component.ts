import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from "@angular/common/http";

interface Message {
  username: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username = 'username';
  message = '';
  messages: Message[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('6b75d2757ba8398d7a72', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: Message) => {
      this.messages.push(data);
    });
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => {
      this.message = '';
    });
  }
}
