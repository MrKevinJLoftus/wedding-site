import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guest } from '../_models/guest.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Guest[] = [];
  private guestsUpdated = new Subject<Guest[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getGuests() {
    this.http.get<{ guests: any[] }>(`${environment.apiUrl}/guest`)
      .subscribe(response => {
        if (response.guests) {
          this.guests = response.guests.map(g => {
            return {
              _id: g._id,
              firstName: g.firstName,
              lastName: g.lastName,
              isPlusOne: g.isPlusOne,
              isAttending: g.isAttending,
              hasRSVPd: g.hasRSVPd,
              isValid: true,
              sortOrder: g.sortOrder
            };
          }).sort((a, b) => a.sortOrder > b.sortOrder ? 1 : -1);
        }
        this.guestsUpdated.next([...this.guests]);
    });
  }

  saveGuests(newGuests: Guest[]) {
    this.http.post<{ guestsAdded: Guest[] }>(`${environment.apiUrl}/guest`, newGuests)
      .subscribe(response => {
        this.guests = response.guestsAdded;
        this.guestsUpdated.next([...this.guests]);
      });
  }

  addExtraGuests(newGuests: Guest[]) {
    this.http.post<{ guestsAdded: Guest[] }>(`${environment.apiUrl}/guest/extra`, newGuests)
      .subscribe(response => {
        console.log(response);
        this.getGuests();
      });
  }

  guestsUpdatedListener() {
    return this.guestsUpdated.asObservable();
  }
}
