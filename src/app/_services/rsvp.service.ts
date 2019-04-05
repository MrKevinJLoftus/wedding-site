import { Injectable } from '@angular/core';
import { Guest } from '../_models/guest.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RSVP, uiRsvp, detailedRsvp } from '../_models/rsvp.model';
import { MessageService } from './message.service';
import { LoadingService } from './loading.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private rsvp: detailedRsvp;
  private rsvpUpdated = new Subject<detailedRsvp>();

  constructor(private http: HttpClient, private router: Router, public messageService: MessageService, public loadingService: LoadingService) {}

  getDetailedRsvp() {
    this.http.get<{ detailedRsvp: detailedRsvp }>('http://localhost:3000/api/rsvp')
      .subscribe(response => {
        this.rsvp = response.detailedRsvp;
        this.rsvpUpdated.next(this.rsvp);
    });
  }

  saveRsvp(newRsvp: uiRsvp) {
    this.loadingService.setIsLoading(true);
    this.http.post<{ message: string, rsvpSaved: boolean }>('http://localhost:3000/api/rsvp/respond', newRsvp)
      .subscribe(response => {
        this.loadingService.setIsLoading(false);
        if (!response.rsvpSaved) {
          this.messageService.setMessage('An error occurred while saving your RSVP. Please try again later or contact Poornima and Kevin.', 'alert-warning');
        } else {
          this.router.navigate(['/wedding-details']);
        }
      });
  }

  rsvpUpdatedListener() {
    return this.rsvpUpdated.asObservable();
  }
}
