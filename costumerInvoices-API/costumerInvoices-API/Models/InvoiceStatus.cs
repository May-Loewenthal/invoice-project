using System.Reflection;
using System;

namespace costumerInvoices_API.Models
{
    public class InvoiceStatus
    {
        public static readonly string Active = "ACTIVE";
        public static readonly string Void = "VOID";
        public static readonly string Paid = "PAID";
        public static readonly string NotPaid = "NOT PAID";
        public static bool IsStatusValid(string status)
        {
            return status == Active || status == Void || status == Paid || status == NotPaid;

        }

    }
}
