import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInvoiceComponent } from './components/invoices/edit-invoice/edit-invoice.component';
import { InvoicesListComponent } from './components/invoices/invoices-list/invoices-list.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  {
    path: 'invoices',
    component: InvoicesListComponent
  },
  {
    path: 'invoices/add',
    component: EditInvoiceComponent
  },
  {
    path: 'invoices/edit/:id',
    component: EditInvoiceComponent
  },
  {
    path: '',
    redirectTo: "/invoices",
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
