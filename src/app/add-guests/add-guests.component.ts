import { Component, OnInit, OnDestroy } from '@angular/core';
import { Guest } from '../_models/guest.model';
import { GuestService } from '../_services/guest.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add-guests',
  templateUrl: './add-guests.component.html',
  styleUrls: ['./add-guests.component.css']
})
export class AddGuestsComponent implements OnInit, OnDestroy {

  user = '';
  subscriptions = [];
  guests: Guest[] = [];

  addGuest() {
    this.guests.push({_id: '', firstName: '', lastName: '', isPlusOne: false,
    isAttending: false, hasRSVPd: false, isValid: true});
  }

  saveGuests() {
    this.guestService.saveGuests(this.guests);
  }

  constructor(public guestService: GuestService, public authService: AuthService) { }

  ngOnInit() {
    this.subscriptions.push(this.guestService.guestsUpdatedListener().subscribe(
      updatedGuests => {
        this.guests = updatedGuests;
      }
    ));
    this.user = this.authService.getUserId();
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
