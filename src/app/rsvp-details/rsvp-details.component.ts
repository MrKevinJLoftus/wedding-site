import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { GuestService } from './guest/guest.service';
import { Guest } from './guest/guest.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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
        console.log(`Updating \'${guestEvent.firstName}`);
        console.log(guestEvent);
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

  onSubmit() {
    // validate any attending plus ones have names
    for (let i = 0; i < this.guests.length; i++) {
      if (this.guests[i].isAttending && this.guests[i].isPlusOne && !this.guests[i].isValid) {
        this.guests[i].firstName = '';
        this.isValid = false;
        return;
      }
    }
    const data = {
      guests: this.guests,
      email: this.userEmail,
      comments: this.userComments
    };
    console.log(data);
  }

  constructor(public guestService: GuestService) { }

  ngOnInit() {
    this.guestService.getGuests();
    this.subscriptions.push(this.guestService.guestsUpdatedListener().subscribe(
      updatedGuests => {
        this.guests = updatedGuests;
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
