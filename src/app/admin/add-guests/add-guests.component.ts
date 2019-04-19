import { Component, OnInit, OnDestroy } from '@angular/core';
import { Guest } from '../../_models/guest.model';
import { GuestService } from '../../_services/guest.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-add-guests',
  templateUrl: './add-guests.component.html',
  styleUrls: ['./add-guests.component.css']
})
export class AddGuestsComponent implements OnInit, OnDestroy {

  user = '';
  subscriptions = [];
  guests: Guest[] = [];
  databaseGuests: Guest[] = [];
  numGuests = 0;

  addGuest() {
    this.numGuests++;
    this.guests.push({_id: '', firstName: '', lastName: '', isPlusOne: false,
    isAttending: false, hasRSVPd: false, isValid: true, sortOrder: this.numGuests});
  }

  addExtraGuests() {
    this.guestService.addExtraGuests(this.guests);
  }

  saveGuests() {
    this.guestService.saveGuests(this.guests);
  }

  constructor(public guestService: GuestService, public authService: AuthService) { }

  ngOnInit() {
    this.guestService.getGuests();
    this.subscriptions.push(this.guestService.guestsUpdatedListener().subscribe(
      updatedGuests => {
        this.databaseGuests = updatedGuests;
        this.numGuests = this.databaseGuests.length;
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