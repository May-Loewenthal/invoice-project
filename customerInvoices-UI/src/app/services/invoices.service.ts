import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice/invoice.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { ErrorHandlingService } from './error-handling.service';
import { LoggingService } from './logging.service';
import { InvoiceDTO } from '../models/invoice/invoiceDTO.model';


@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  // baseApiUrl: string = environment.baseApiUrl;
  baseApiUrl: string = "https://localhost:7251";
  
  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService,
    private loggingService: LoggingService) { }

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseApiUrl}/api/invoices`).pipe(
      tap(_ => this.loggingService.log('fetched invoices')),
      catchError(this.errorHandlingService.handleError<Invoice[]>('getInvoices', []))
    );
  }

  getInvoice(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(this.baseApiUrl + '/api/invoices/' + id).pipe(
      tap(_ => this.loggingService.log('fetched invoice')),
      catchError(this.errorHandlingService.handleError<Invoice>('getInvoices'))
    );
  }

  addInvoice(addInvoiceRequest: InvoiceDTO): Observable<Invoice> {
    // !!!!! fix it without empty id, delete the line and check in the server !!!!!
    return this.http.post<Invoice>(this.baseApiUrl + "/api/invoices", addInvoiceRequest).pipe(
      tap((newInvoice: Invoice) => this.loggingService.log(`added invoice w/ id=${newInvoice.id}`)),
      catchError(this.errorHandlingService.handleError<Invoice>('addInvoice'))
    );
  }

  updateInvoice(id: string, updateInvoiceRequest: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(this.baseApiUrl + "/api/invoices/" + id, updateInvoiceRequest).pipe(
      tap(_ => this.loggingService.log(`updated invoice id=${id}`)),
      catchError(this.errorHandlingService.handleError<Invoice>('updateInvoice'))
    );
  }

  deleteInvoice(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(this.baseApiUrl + "/api/invoices/" + id).pipe(
      tap(_ => this.loggingService.log(`deleted invoice id=${id}`)),
      catchError(this.errorHandlingService.handleError<Invoice>('deleteInvoice'))
    );
  }
}


