import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/_services/loading.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  isLoading = false;
  isReleased = true;
  subscriptions: Subscription[] = [];

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.messageService.setMessage('Please enter your username and password.','info');
      return;
    }
    this.loadingService.setIsLoading(true);
    this.authService.createUser(form.value.username, form.value.password);
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
      this.isLoading = loading;
    }));
    this.subscriptions.push(this.authService.getAuthStatusListener().subscribe((authStatus) => {
      if (authStatus) {
        this.router.navigate(['/add-guests']);
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
