using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace costumerInvoices_API.Migrations
{
    /// <inheritdoc />
    public partial class initalmigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CostumerName",
                table: "Invoices",
                newName: "CustomerName");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "IssueDate",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "IssueDate",
                table: "Invoices");

            migrationBuilder.RenameColumn(
                name: "CustomerName",
                table: "Invoices",
                newName: "CustomerName");
        }
    }
}
