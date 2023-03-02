namespace costumerInvoices_API.Models
{
    public class InvoiceDTO
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public long Phone { get; set; }
        public long Amount { get; set; }
        public string Status { get; set; }
    }
}
