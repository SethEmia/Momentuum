using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Momentuum.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddHabitLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Tasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Tasks",
                type: "text",
                nullable: true);
        }
    }
}
