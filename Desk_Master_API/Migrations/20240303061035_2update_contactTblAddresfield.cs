using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Desk_Master_API.Migrations
{
    /// <inheritdoc />
    public partial class _2update_contactTblAddresfield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Adress",
                table: "ContactDetails");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "ContactDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "ContactDetails");

            migrationBuilder.AddColumn<long>(
                name: "Adress",
                table: "ContactDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
