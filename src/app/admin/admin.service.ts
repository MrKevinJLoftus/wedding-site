import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../_services/message.service';
import { LoadingService } from '../_services/loading.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private reportData = [];
  private reportDataListener = new Subject<any>();

  constructor(private http: HttpClient, public messageService: MessageService, public loadingService: LoadingService) { }

  runRsvpReport() {
    this.http.get<{ results: any }>(`${environment.apiUrl}/report/rsvp`)
    .subscribe(response => {
      this.reportData = response.results;
      this.reportDataListener.next(this.reportData);
    });
  }

  getReportDataListener() {
    return this.reportDataListener.asObservable();
  }

}
