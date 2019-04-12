import { Component, OnInit } from '@angular/core';
import { RsvpService } from '../_services/rsvp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email: string;
  emailBody: string;
  subscriptions: Subscription[] = [];
  isLoading = false;

  constructor(public rsvpService: RsvpService) { }

  onSubmit() {
    if (this.email && this.emailBody) {
      this.isLoading = true;
    }
  }

  ngOnInit() {
    this.rsvpService.getDetailedRsvp();
    this.subscriptions.push(this.rsvpService.rsvpUpdatedListener().subscribe((userRsvp) => {
      this.email = userRsvp.email;
    }));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
