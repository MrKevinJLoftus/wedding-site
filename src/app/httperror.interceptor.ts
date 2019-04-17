import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MessageService } from './_services/message.service';
import { LoadingService } from './_services/loading.service';

@Injectable() export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public messageService: MessageService, public loadingService: LoadingService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.loadingService.setIsLoading(false);
                console.log(error);
                let m = 'Unknown error has occurred.';
                switch(error.status) {
                    case 400:
                        m = 'Bad Request';
                        break;
                    case 401:
                        m = 'Your username or password was incorrect. Please try again.';
                        break;
                    case 403:
                        m = 'Forbidden';
                        break;
                    case 404:
                        m = 'Not found';
                        break;
                    case 500:
                        m = 'Internal Server Error';
                        break;
                    case 502:
                        m = 'Bad Gateway';
                        break;
                    case 503:
                        m = 'Service Unavailable';
                        break;
                    case 504:
                        m = 'Gateway Timeout';
                        break;
                    default:
                        break;
                }
                this.messageService.setMessage(m, 'danger');
                return throwError(error);
            })
        );
    }
}

