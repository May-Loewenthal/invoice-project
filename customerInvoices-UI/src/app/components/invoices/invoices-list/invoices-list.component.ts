import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Invoice } from 'src/app/models/invoice/invoice.model';
import { InvoicesService } from 'src/app/services/invoices.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent {

  invoices: Invoice[] = [];
  constructor(private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.getAllInvoices()
  }

  getAllInvoices() {
    this.invoicesService.getAllInvoices()
      .subscribe(invoices => this.invoices = invoices);
  }
}
