import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  message: {message: string, type: string};
  subscriptions: any[] = [];

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.subscriptions.push(this.messageService.getMessageListener().subscribe(
      (m) => {
        if (m) {
          this.message = {
            message: m.message,
            type: m.type
          };
        } else {
          this.message = null;
        }
      }
    ));
  }
  
  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach((s: Subscription) => {
      s.unsubscribe();
    });
    this.subscriptions = [];
  }
}
