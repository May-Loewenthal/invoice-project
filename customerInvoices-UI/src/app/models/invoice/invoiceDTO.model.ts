import { InvoiceStatus } from "./invoiceStatus.model";

export interface InvoiceDTO {
    customerName: string;
    email: string;
    phone: number;
    amount: number;
    status: InvoiceStatus;
}