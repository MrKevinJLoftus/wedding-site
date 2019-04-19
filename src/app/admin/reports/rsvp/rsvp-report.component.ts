import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp-report.component.html',
  styleUrls: ['./rsvp-report.component.css']
})
export class RsvpReportComponent implements OnInit {

  reportData = {};
  subscriptions: Subscription[] = [];

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.runRsvpReport();
    this.subscriptions.push(this.adminService.getReportDataListener().subscribe((results) => {
      if (results) {
        results.reportData.sort((a, b) => {
          if (a.rsvps.length > 0 && b.rsvps.length === 0) {
            return -1;
          } else if (b.rsvps.length > 0 && a.rsvps.length === 0) {
            return 1;
          } else {
            return 0;
          }
        });
        results.reportData.forEach((row) => {
          row.rsvps = row.rsvps.map((rsvpObj) => {
            return {
              dateSubmitted: rsvpObj.dateSubmitted,
              comments: decodeURI(rsvpObj.comments)
            }
          });
        });
        this.reportData = results;
      }
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