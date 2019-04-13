import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { GuestService } from '../_services/guest.service';
import { Guest } from '../_models/guest.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { RsvpService } from '../_services/rsvp.service';
import { uiRsvp, detailedRsvp } from '../_models/rsvp.model';
import { LoadingService } from '../_services/loading.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-rsvp-details',
  templateUrl: './rsvp-details.component.html',
  styleUrls: ['./rsvp-details.component.css']
})
export class RsvpDetailsComponent implements OnInit, OnDestroy {

  subscriptions: any[] = [];
  userEmail = '';
  userComments = '';
  guests: Guest[] = [];
  isLoading = false;
  isValid = true;

  updateGuest(guestEvent) {
    for (let i = 0; i < this.guests.length; i++) {
      if (this.guests[i]._id === guestEvent._id) {
        this.guests[i].isAttending = guestEvent.isAttending;
        if (this.guests[i].isPlusOne) {
          this.guests[i].firstName = guestEvent.firstName;
          this.guests[i].lastName = guestEvent.lastName;
          this.guests[i].isValid = guestEvent.isValid;
          this.isValid = guestEvent.isValid;
        }
      }
    }
  }

  clearMessage() {
    this.messageService.clearMessage();
  }

  onSubmit() {
    this.clearMessage();
    // validate any attending plus ones have names
    for (let i = 0; i < this.guests.length; i++) {
      if (this.guests[i].isAttending && this.guests[i].isPlusOne && !this.guests[i].isValid) {
        this.guests[i].firstName = '';
        this.isValid = false;
        this.messageService.setMessage('First and last names are required for attending Plus Ones.','danger');
        return;
      }
    }
    const data: uiRsvp = {
      guests: this.guests,
      email: this.userEmail,
      comments: this.userComments
    };
    this.rsvpService.saveRsvp(data);
  }

  constructor(public guestService: GuestService,
    public rsvpService: RsvpService,
    public loadingService: LoadingService,
    public messageService: MessageService) { }

  ngOnInit() {
    this.guestService.getGuests();
    this.subscriptions.push(this.guestService.guestsUpdatedListener().subscribe(
      updatedGuests => {
        this.guests = updatedGuests;
      }
    ));
    this.rsvpService.getDetailedRsvp();
    this.subscriptions.push(this.rsvpService.rsvpUpdatedListener().subscribe(
      updatedRsvp => {
        if (updatedRsvp && updatedRsvp.rsvp && updatedRsvp.email) {
          this.userEmail = updatedRsvp.email;
          this.userComments = decodeURI(updatedRsvp.rsvp.comments);
        }
      }
    ));
    this.subscriptions.push(this.loadingService.getIsLoadingListener().subscribe((b) => {
      this.isLoading = b;
    }));
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
