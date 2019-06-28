import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rsvp-report',
  templateUrl: './rsvp-report.component.html',
  styleUrls: ['./rsvp-report.component.css']
})
export class RsvpReportComponent implements OnInit {

  reportData: any = [];
  metaReportData: any = {};
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['userName','guestsAttending','guestsNotAttending','rsvps'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
              comments: rsvpObj.comments
            }
          });
        });
        this.metaReportData = results;
        this.reportData = new MatTableDataSource(results.reportData);
        this.reportData.sort = this.sort;
        this.reportData.paginator = this.paginator;
      }
    }));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  applyFilter(filterValue: string) {
    this.reportData.filter = filterValue.trim().toLowerCase();
  }
}