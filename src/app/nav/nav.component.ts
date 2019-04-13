import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RsvpService } from '../_services/rsvp.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isHomeSelected = false;
  navbarOpen = false;
  userIsAuthenticated = false;
  userHasRsvpdBefore = false;
  private subscriptions: Subscription[] = [];

  onChangedRoute() {
   this.isHomeSelected = this.router.url === '/home' || this.router.url === '/';
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout(true);
  }

  constructor(private authService: AuthService, private router: Router, public rsvpService: RsvpService) {
    this.subscriptions.push(router.events.subscribe((val) => {
      this.onChangedRoute();
    }));
   }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.subscriptions.push(this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.rsvpService.getDetailedRsvp();
      }
    }));
    
    this.subscriptions.push(this.rsvpService.rsvpUpdatedListener().subscribe(
      (savedRsvp) => {
        (savedRsvp && savedRsvp.rsvp) ? this.userHasRsvpdBefore = true : this.userHasRsvpdBefore = false;
      }));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

}
