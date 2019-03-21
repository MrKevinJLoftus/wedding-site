import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean;
  private isLoadingListener = new Subject<boolean>();

  constructor() { }

  public setIsLoading(b) {
    this.isLoading = b;
    this.isLoadingListener.next(b);
  }

  public getIsLoadingListener() {
    return this.isLoadingListener.asObservable();
  }

}
