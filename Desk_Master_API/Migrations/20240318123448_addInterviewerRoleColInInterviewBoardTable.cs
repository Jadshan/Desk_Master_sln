using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Desk_Master_API.Migrations
{
    /// <inheritdoc />
    public partial class addInterviewerRoleColInInterviewBoardTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InterviewerRole",
                table: "InterviewBoardTbl",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InterviewerRole",
                table: "InterviewBoardTbl");
        }
    }
}
