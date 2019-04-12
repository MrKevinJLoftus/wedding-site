import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private emailHasBeenSent = false;
  private emailHasBeenSentListener = new Subject<boolean>();

  constructor(public loadingService: LoadingService, public http: HttpClient, public messageService: MessageService) { }

  sendEmail(email: {userEmail: string, emailBody: string}) {
    this.loadingService.setIsLoading(true);
    this.http.post<{ message: string, emailSent: boolean }>('http://localhost:3000/api/contact', email)
      .subscribe(response => {
        this.loadingService.setIsLoading(false);
        if (!response.emailSent) {
          this.messageService.setMessage('An error occurred while saving your RSVP. Please try again later or contact Poornima and Kevin.', 'alert-warning');
        } else {
          this.emailHasBeenSent = true;

        }
      });
  }

  getEmailSentListener() {
    return this.emailHasBeenSentListener.asObservable();
  }
}
