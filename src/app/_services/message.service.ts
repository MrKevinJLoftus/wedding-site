import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private currentMessage: {message: string, type: string};
  private messageListener = new Subject<{message: string, type: string}>();

  constructor() { }

  getMessageListener() {
    return this.messageListener.asObservable();
  }

  setMessage(message: string, type: string) {
    this.currentMessage = {
      message,
      type
    };
    this.messageListener.next(this.currentMessage);
  }

  clearMessage() {
    this.currentMessage = null;
    this.messageListener.next();
  }
}
