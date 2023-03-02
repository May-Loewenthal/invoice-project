import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesListComponent } from './components/invoices/invoices-list/invoices-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EditInvoiceComponent } from './components/invoices/edit-invoice/edit-invoice.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditInvoiceComponent } from './components/invoices/edit-invoice/edit-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesListComponent,
    EditInvoiceComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
