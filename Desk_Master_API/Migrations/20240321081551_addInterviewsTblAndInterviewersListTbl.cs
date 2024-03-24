using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Desk_Master_API.Migrations
{
    /// <inheritdoc />
    public partial class addInterviewsTblAndInterviewersListTbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InterviewsTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CandidateName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CandidateEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CandidatePhoneNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewsTbl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InterviewersListTbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    InterviewId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewersListTbl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewersListTbl_InterviewsTbl_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "InterviewsTbl",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_InterviewersListTbl_InterviewId",
                table: "InterviewersListTbl",
                column: "InterviewId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InterviewersListTbl");

            migrationBuilder.DropTable(
                name: "InterviewsTbl");
        }
    }
}
