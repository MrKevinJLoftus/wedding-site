import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { uiRsvp, detailedRsvp } from '../_models/rsvp.model';
import { MessageService } from './message.service';
import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private rsvp: detailedRsvp;
  private rsvpUpdated = new Subject<detailedRsvp>();
  private rsvpDeadline: string;
  private rsvpDeadlineUpdated = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, public messageService: MessageService, public loadingService: LoadingService) {}

  getDetailedRsvp() {
    this.http.get<{ detailedRsvp: detailedRsvp }>(`${environment.apiUrl}/rsvp`)
      .subscribe(response => {
        this.rsvp = response.detailedRsvp;
        this.rsvpUpdated.next(this.rsvp);
    });
  }

  saveRsvp(newRsvp: uiRsvp) {
    this.loadingService.setIsLoading(true);
    this.http.post<{ message: string, rsvpSaved: boolean }>(`${environment.apiUrl}/rsvp/respond`, newRsvp)
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

  getRsvpDeadline() {
    this.http.get<{ rsvpDeadline: string }>(`${environment.apiUrl}/rsvp/deadline`)
      .subscribe(response => {
        this.rsvpDeadline = response.rsvpDeadline;
        this.rsvpDeadlineUpdated.next(this.rsvpDeadline);
      })
  }
}
