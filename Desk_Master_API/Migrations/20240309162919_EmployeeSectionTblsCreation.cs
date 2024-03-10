using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Desk_Master_API.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeSectionTblsCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeesTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AlternativeContactNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonalEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalYears = table.Column<int>(type: "int", nullable: false),
                    TotalMonths = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PinCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Per_City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Per_State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Per_PinCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Per_Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeesTbl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BankDetailsTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountHolderName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Branch = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankDetailsTbl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BankDetailsTbl_EmployeesTbl_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "EmployeesTbl",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ContactDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactDetails_EmployeesTbl_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "EmployeesTbl",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ExperienceTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Project = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExperienceTbl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExperienceTbl_EmployeesTbl_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "EmployeesTbl",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SkillsTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Skill = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Proficiency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Technology = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CertificationFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillsTbl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SkillsTbl_EmployeesTbl_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "EmployeesTbl",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BankDetailsTbl_EmployeeId",
                table: "BankDetailsTbl",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ContactDetails_EmployeeId",
                table: "ContactDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ExperienceTbl_EmployeeId",
                table: "ExperienceTbl",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SkillsTbl_EmployeeId",
                table: "SkillsTbl",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BankDetailsTbl");

            migrationBuilder.DropTable(
                name: "ContactDetails");

            migrationBuilder.DropTable(
                name: "ExperienceTbl");

            migrationBuilder.DropTable(
                name: "SkillsTbl");

            migrationBuilder.DropTable(
                name: "EmployeesTbl");
        }
    }
}
