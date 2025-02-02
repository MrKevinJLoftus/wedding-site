import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MessageService } from './_services/message.service';
import { RsvpService } from './_services/rsvp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Poornima & Kevin';
  fixed = false;
  isHomeSelected = false;

  onChangedRoute() {
   this.isHomeSelected = this.router.url === '/home' || this.router.url === '/';
   this.messageService.clearMessage();
  }

  constructor(private authService: AuthService, 
    private router: Router, 
    public messageService: MessageService) {
    router.events.subscribe((val) => {
      this.onChangedRoute();
    });
   }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
      const number = $event.target.scrollTop;
      if (number > 40) {
        this.fixed = true;
      } else if (this.fixed && number < 10) {
        this.fixed = false;
      }
    }
}
