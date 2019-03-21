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
  isAnyoneComing = false;
  showHotel = false;

  constructor(public rsvpService: RsvpService,
    private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.rsvpService.rsvpUpdatedListener().subscribe(
      (savedRsvp) => {
        this.rsvpDetails = savedRsvp;
        this.isAnyoneComing = this.rsvpDetails.guests.filter(g => g.isAttending).length > 0;
        this.showHotel = this.rsvpDetails.guests[0].canSeeHotel;
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
