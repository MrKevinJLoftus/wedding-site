import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-guest-text',
  templateUrl: './guest-text.component.html',
  styleUrls: ['./guest-text.component.css']
})
export class GuestTextComponent implements OnInit {

  // reportData: any = [];
  hasRsvpd: any = [];
  hasNotRsvpd: any = [];
  subscriptions: Subscription[] = [];

  constructor(public adminService: AdminService) {
    this.subscriptions.push(this.adminService.getReportDataListener().subscribe((results) => {
      this.hasRsvpd = results.filter((g) => g.hasRSVPd);
      this.hasNotRsvpd = results.filter((g) => !g.hasRSVPd);
    }));
  }

  ngOnInit() {
    this.adminService.runGuestReport();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
