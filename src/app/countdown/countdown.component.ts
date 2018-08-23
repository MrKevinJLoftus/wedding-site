import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  private endDate;
  private diff: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;


  constructor() { }

  ngOnInit() {
    this.endDate = new Date('Sat, 17 Aug 2019 15:00:00 EST');
    const timer = interval(1000);
    timer.subscribe((x) => {
      const startDate = Date.now();
      this.diff = this.endDate - startDate;
      this.days = Math.floor(this.diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.diff / (1000 * 60 * 60)) % 24);
      this.minutes = Math.floor((this.diff / (1000 * 60)) % 60);
      this.seconds = Math.floor((this.diff / (1000)) % 60);
    });
  }

}
