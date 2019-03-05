import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guest } from './guest.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Guest[] = [];
  private guestsUpdated = new Subject<Guest[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getGuests() {
    this.http.get<{ guests: any[] }>('http://localhost:3000/api/guest')
      .subscribe(response => {
        this.guests = response.guests.map(g => {
          return {
            _id: g._id,
            firstName: g.firstName,
            lastName: g.lastName,
            isPlusOne: g.isPlusOne,
            isAttending: g.isAttending,
            canSeeHotel: g.canSeeHotel,
            hasRSVPd: g.hasRSVPd,
            isValid: true
          };
        });
        this.guestsUpdated.next([...this.guests]);
    });
  }

  saveGuests(newGuests: Guest[]) {
    this.http.post<{ guests: Guest[] }>('http://localhost:3000/api/guest', newGuests)
      .subscribe(response => {
        this.guests = response.guests;
        this.guestsUpdated.next([...this.guests]);
      });
  }

  guestsUpdatedListener() {
    return this.guestsUpdated.asObservable();
  }
}
