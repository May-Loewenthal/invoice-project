using costumerInvoices_API.Data;
using costumerInvoices_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace costumerInvoices_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : Controller
    {
        private readonly CostumerInvoiceDbContext _costumerInvoiceDbContext;
        public InvoicesController(CostumerInvoiceDbContext costumerInvoiceDbContext) 
        {
            _costumerInvoiceDbContext = costumerInvoiceDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInvoices()
        {
            var invoices = await _costumerInvoiceDbContext.Invoices.ToListAsync();

            return Ok(invoices);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetInvoice([FromRoute] Guid id)
        {
            var invoice = await _costumerInvoiceDbContext.Invoices.FirstOrDefaultAsync(x => x.Id == id);
            
            if (invoice == null)
            {
                return NotFound();
            }

            return Ok(invoice);
        }

        [HttpPost]
        public async Task<IActionResult> AddInvoice([FromBody] InvoiceDTO invoiceRequestDTO)
        {
            Invoice invoiceRequest = new Invoice(invoiceRequestDTO);
            await _costumerInvoiceDbContext.Invoices.AddAsync(invoiceRequest);
            await _costumerInvoiceDbContext.SaveChangesAsync();

            return Ok(invoiceRequest);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateInvoice([FromRoute] Guid id, InvoiceDTO updateInvoice)
        {
            var invoice = await _costumerInvoiceDbContext.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            //check if invoice status is valid
            if (!InvoiceStatus.IsStatusValid(updateInvoice.Status))
            {
                throw new ArgumentException();
            }

            invoice.CustomerName = updateInvoice.CustomerName;
            invoice.Email = updateInvoice.Email;
            invoice.Phone = updateInvoice.Phone;
            invoice.Amount = updateInvoice.Amount;
            invoice.Status = updateInvoice.Status;


            await _costumerInvoiceDbContext.SaveChangesAsync();
            return Ok(invoice);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteInvoice([FromRoute] Guid id)
        {
            var invoice = await _costumerInvoiceDbContext.Invoices.FindAsync(id);
            
            if (invoice == null)
            {
                return NotFound();
            }

            _costumerInvoiceDbContext.Invoices.Remove(invoice);
            await _costumerInvoiceDbContext.SaveChangesAsync();

            return Ok(invoice);
        }
    }
}
