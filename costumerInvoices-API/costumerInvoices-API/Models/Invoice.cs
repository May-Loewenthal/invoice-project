namespace costumerInvoices_API.Models
{
    public class Invoice : InvoiceDTO
    {
        public Guid Id { get; set; }
        public DateTime IssueDate { get; set; }

        public Invoice() { }

        public Invoice(InvoiceDTO invoiceDTO)
        {
            if (!InvoiceStatus.IsStatusValid(invoiceDTO.Status))
            {
                throw new ArgumentException();
            }

            Id = Guid.NewGuid();
            IssueDate = DateTime.Now;
            CustomerName = invoiceDTO.CustomerName;
            Email = invoiceDTO.Email;
            Phone = invoiceDTO.Phone;
            Amount = invoiceDTO.Amount;
            Status = invoiceDTO.Status;
        }
    }
}
