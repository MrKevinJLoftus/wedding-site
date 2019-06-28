import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-guest-report',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestReportComponent implements OnInit, OnDestroy {

  reportData: any = [];
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['name', 'isAttending', 'hasRSVPd'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public adminService: AdminService) {
    this.subscriptions.push(this.adminService.getReportDataListener().subscribe((results) => {
      this.reportData = new MatTableDataSource(results);
      this.reportData.sort = this.sort;
      this.reportData.paginator = this.paginator;
    }));
  }

  ngOnInit() {
    this.adminService.runGuestReport();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  applyFilter(filterValue: string) {
    this.reportData.filter = filterValue.trim().toLowerCase();
  }

}
