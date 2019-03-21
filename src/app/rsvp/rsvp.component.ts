import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../_services/loading.service';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit, OnDestroy {

  isLoading = false;
  isReleased = true;
  subscriptions: Subscription[] = [];

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.messageService.setMessage('Please enter your username and password.','alert-danger');
      return;
    }
    // this.isLoading = true;
    this.loadingService.setIsLoading(true);
    console.log('just set loadingService loading to true');
    this.authService.login(form.value.username, form.value.password);
  }

  clearMessage() {
    this.messageService.clearMessage();
  }

  constructor(public authService: AuthService, 
    public loadingService: LoadingService, 
    public router: Router,
    public messageService: MessageService) { }

  ngOnInit() {
    this.subscriptions.push(this.loadingService.getIsLoadingListener().subscribe((loading) => {
      console.log(`rsvp component isLoading: ${loading}`);
      this.isLoading = loading;
    }));
    this.subscriptions.push(this.authService.getAuthStatusListener().subscribe((authStatus) => {
      if (authStatus) {
        this.router.navigate(['/rsvp-details']);
      }
    }));
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
}
