import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { LoadingService } from '../_services/loading.service';
import { RsvpService } from '../_services/rsvp.service';
import { detailedRsvp } from '../_models/rsvp.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    public messageService: MessageService,
    public loadingService: LoadingService,
    public rsvpService: RsvpService) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(username: string, password: string) {
    const authData: AuthData = {username: username, password: password};
    this.http.post<{token: string, expiresIn: number, username: string, userId: string}>(
      `${environment.apiUrl}/user/login`, authData)
      .subscribe(response => {
        if (response.token) {
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.loginSetup(expiresInDuration, response.userId, token);
        } else {
          this.logout(false);
          this.messageService.setMessage('Your username or password was incorrect. Please try again.','alert-danger');
        }
    }, error => {
      this.messageService.setMessage('Your username or password was incorrect. Please try again.','alert-danger');
      this.logout(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(navigateAway: Boolean) {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.loadingService.setIsLoading(false);
    if (navigateAway) {
      this.router.navigate(['/']);
    }
  }

  private loginSetup(expiresInDuration, userId, token) {
    this.setAuthTimer(expiresInDuration);
    this.isAuthenticated = true;
    this.userId = userId;
    this.authStatusListener.next(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(token, expirationDate, this.userId);
    this.loadingService.setIsLoading(false);
    this.postLoginNavigation();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout(true);
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  private postLoginNavigation() {
    this.http.get<{ detailedRsvp: detailedRsvp }>(`${environment.apiUrl}/rsvp`)
      .pipe(take(1))
      .subscribe(response => {
        if (response.detailedRsvp && response.detailedRsvp.rsvp) {
          this.router.navigate(['/wedding-details']);
        } else {
          this.router.navigate(['/rsvp-details']);
        }
    });
  }
}
