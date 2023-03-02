using costumerInvoices_API.Models;
using Microsoft.EntityFrameworkCore;

namespace costumerInvoices_API.Data
{
    public class CostumerInvoiceDbContext : DbContext
    {
        public CostumerInvoiceDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Invoice> Invoices { get; set; }
    }
}
