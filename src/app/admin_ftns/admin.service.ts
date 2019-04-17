import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { LoadingService } from '../_services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router, public messageService: MessageService, public loadingService: LoadingService) { }

  
}
