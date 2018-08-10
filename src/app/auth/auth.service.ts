import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAdmin = false;
  private authStatusListener = new Subject<boolean>();
  private authAdminStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    // note: this is only for front end logic. actual admin authorization happens on the back end
    return this.isAdmin;
  }

  getAuthAdminStatusListener() {
    return this.authAdminStatusListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: AuthData = {username: username, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, isAdmin: string}>('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.loginSetup(expiresInDuration, response.userId, token, response.isAdmin);
        }
    }, error => {
      console.log(error);
    });
  }

  login(username: string, password: string) {
    const authData: AuthData = {username: username, password: password};
    this.http.post<{token: string, expiresIn: number, username: string, userId: string, isAdmin: Boolean}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        if (response.token) {
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.loginSetup(expiresInDuration, response.userId, token, response.isAdmin);
        } else {
          this.logout();
        }
    }, error => {
      this.logout();
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
      this.isAdmin = authInformation.isAdmin;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.authAdminStatusListener.next(this.isAdmin);
    }
  }

  logout() {
    console.log("logging out");
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.isAdmin = false;
    this.authAdminStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private loginSetup(expiresInDuration, userId, token, isAdmin) {
    this.setAuthTimer(expiresInDuration);
    this.isAuthenticated = true;
    this.isAdmin = isAdmin;
    this.userId = userId;
    this.authStatusListener.next(true);
    this.authAdminStatusListener.next(isAdmin);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(token, expirationDate, this.userId, this.isAdmin);
    this.router.navigate(['/rsvp-details']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, isAdmin: Boolean) {
    console.log("saving auth data");
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      isAdmin: (isAdmin === 'true')
    };
  }

}
