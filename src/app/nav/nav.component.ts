import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isHomeSelected = false;
  navbarOpen = false;
  userIsAuthenticated = false;
  userIsAdmin = false;

  private authListenerSub: Subscription;
  private authAdminListenerSub: Subscription;

  onChangedRoute() {
   this.isHomeSelected = this.router.url === '/home' || this.router.url === '/';
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  logout() {
    this.authService.logout();
  }

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((val) => {
      this.onChangedRoute();
    })
   }

  ngOnInit() {
    console.log("nav Init");
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.userIsAdmin = this.authService.getIsAdmin();
    this.authAdminListenerSub = this.authService
      .getAuthAdminStatusListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
      })
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
