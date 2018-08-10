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
  private days: number;
  private hours: number;
  private minutes: number;
  private seconds: number;


  constructor() { }

  ngOnInit() {
    this.endDate = "2019-08-17";
    const timer = interval(1000);
    timer.subscribe((x) => {
      this.diff = Date.parse(this.endDate) - Date.parse(new Date().toString());
      this.days = Math.floor(this.diff/(1000*60*60*24));
      this.hours = Math.floor((this.diff/(1000*60*60)) % 24);
      this.minutes = Math.floor((this.diff/(1000*60)) % 60);
      this.seconds = Math.floor((this.diff/(1000)) % 60);
    });
  }

}
