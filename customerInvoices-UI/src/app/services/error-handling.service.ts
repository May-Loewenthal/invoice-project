import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private  notificationService: NotificationService) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.notificationService.showError(error.name, operation + " failed")

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
