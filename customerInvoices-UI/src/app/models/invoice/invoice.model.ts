import { InvoiceDTO } from "./invoiceDTO.model";

export interface Invoice extends InvoiceDTO{
    id: string;
    issueDate: Date;
}
