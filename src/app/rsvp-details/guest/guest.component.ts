import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Guest } from 'src/app/_models/guest.model';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  @Input() details: Guest;
  @Output() guestUpdated = new EventEmitter<Guest>();
  firstName = '';
  lastName = '';
  isAttending = true;
  isPlusOne = false;
  isValid = true;

  toggleAccept(attending: boolean) {
    this.isAttending = attending;
    this.emitUpdatedGuestInfo();
  }

  emitUpdatedGuestInfo() {
    if (this.isPlusOne && this.isAttending && !(this.firstName.length > 0 && this.lastName.length > 0)) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
    this.guestUpdated.emit({
      _id: this.details._id,
      firstName: this.firstName,
      lastName: this.lastName,
      isPlusOne: this.details.isPlusOne,
      isAttending: this.isAttending,
      canSeeHotel: this.details.canSeeHotel,
      hasRSVPd: this.details.hasRSVPd,
      isValid: this.isValid
    });
    console.log(`${this.firstName} isValid: ${this.isValid}`);
  }

  constructor() { }

  ngOnInit() {
    if (this.details) {
      this.isPlusOne = this.details.isPlusOne;
      this.firstName = this.details.firstName;
      this.lastName = this.details.lastName;
      this.isValid = this.details.isValid;
      if (this.details.hasRSVPd) {
        this.isAttending = this.details.isAttending;
      }
      if (this.isPlusOne) {
        this.isValid = false;
      }
    }
    this.emitUpdatedGuestInfo();
  }
}
