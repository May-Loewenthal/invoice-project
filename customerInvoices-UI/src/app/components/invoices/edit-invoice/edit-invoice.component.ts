import { Component, Directive } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice/invoice.model';
import { InvoiceDTO } from 'src/app/models/invoice/invoiceDTO.model';
import { InvoiceStatus } from 'src/app/models/invoice/invoiceStatus.model';
import { InvoicesService } from 'src/app/services/invoices.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})

export class EditInvoiceComponent {
  statusOptions = Object.values(InvoiceStatus);
  invoiceForm: FormGroup = this.formBuilder.group({
    customerName: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', Validators.email),
    phone: this.formBuilder.control(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
    amount: this.formBuilder.control(0, Validators.required),
    status: this.formBuilder.control(InvoiceStatus.Void, Validators.required)
  });

  public invoiceId?: string | null;
  public issueDate?: Date | null;

  constructor(private route: ActivatedRoute,
    private invoicesService: InvoicesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.invoiceId = id;

        if (id) {
          this.invoicesService.getInvoice(id)
            .subscribe({
              next: (invoice) => {
                this.issueDate = invoice.issueDate;
                this.invoiceForm.setValue({
                  customerName: invoice.customerName,
                  email: invoice.email,
                  phone: invoice.phone,
                  amount: invoice.amount,
                  status: invoice.status
                })
              }
            })
        }
      }
    })


  }

  onSubmit() {
    if (this.invoiceId) {
      this.updateInvoice()
    }
    else {
      this.addInvoice()
    }
  }



  addInvoice() {
    if (this.invoiceForm.valid)
      this.invoicesService.addInvoice(this.invoiceForm.value as InvoiceDTO)
        .subscribe(invoice => {
          this.notificationService.showSuccess("Invoice added", "Success")
          this.router.navigate(["/invoices"])
        })
  }

  updateInvoice() {
    if (!this.invoiceId) return;

    this.invoicesService.updateInvoice(this.invoiceId, this.invoiceForm.value as Invoice)
      .subscribe(invoice => {
        this.notificationService.showSuccess("Invoice updated", "Success")
        this.router.navigate(["/invoices"])
      })
  }

  deleteInvoice(){
    if(this.invoiceId){
      this.invoicesService.deleteInvoice(this.invoiceId).subscribe(_ => {
        this.notificationService.showSuccess("Invoice Deleted", "Success")
        this.router.navigate(["/invoices"])
      })
    }
    }
}
