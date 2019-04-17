import { Component, OnInit, OnDestroy } from '@angular/core';
import { RsvpService } from '../_services/rsvp.service';
import { Subscription } from 'rxjs';
import { detailedRsvp } from '../_models/rsvp.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wedding-details',
  templateUrl: './wedding-details.component.html',
  styleUrls: ['./wedding-details.component.css']
})
export class WeddingDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  rsvpDetails: detailedRsvp;
  isAnyoneComing = true;
  guestsAttending = [];
  guestsNotAttending = [];
  hasRsvpd = false;

  constructor(public rsvpService: RsvpService,
    private router: Router) { }

  ngOnInit() {
    this.rsvpService.getDetailedRsvp();
    this.subscriptions.push(this.rsvpService.rsvpUpdatedListener().subscribe(
      (savedRsvp) => {
        if (savedRsvp && savedRsvp.rsvp) {
          this.hasRsvpd = true;
          this.rsvpDetails = savedRsvp;
          this.guestsAttending = this.rsvpDetails.guests.filter(g => g.isAttending);
          this.guestsNotAttending = this.rsvpDetails.guests.filter(g => !g.isAttending).map((g) => {
            if (!g.isPlusOne) {
              return g;
            } else {
              g.firstName = 'Your';
              g.lastName = 'Plus One';
            }
          });
          this.isAnyoneComing = this.guestsAttending.length > 0;
        } else {
          this.hasRsvpd = false;
        }
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

  rsvpAgain() {
    this.router.navigate(['/rsvp-details']);
  }
}
