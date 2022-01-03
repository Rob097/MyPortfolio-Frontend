import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { AlertsService } from 'src/app/services/alerts.service';

@Injectable()
export class MessagesInterceptor implements HttpInterceptor {
  constructor(public alertsService: AlertsService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        tap(evt => {
            if (evt instanceof HttpResponse) {
                if(evt.body && evt.body.success){
                     this.alertsService.showSuccess(evt.body.success.message, evt.body.success.title);
                }
            }
        }),
        catchError((err: any) => {
            if(err instanceof HttpErrorResponse) {
                try {
                     this.alertsService.showError(err.error.message, err.error.title);
                } catch(e) {
                     this.alertsService.showError('An error occurred', '');
                }
                //log error
            }
            return of(err);
        }));

  }
}
