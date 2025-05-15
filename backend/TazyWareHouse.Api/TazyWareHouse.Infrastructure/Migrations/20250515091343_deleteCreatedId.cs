using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TazyWareHouse.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class deleteCreatedId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offices_Users_CreatedAtId",
                table: "Offices");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_Users_CreatedAtId",
                table: "Warehouses");

            migrationBuilder.DropIndex(
                name: "IX_Warehouses_CreatedAtId",
                table: "Warehouses");

            migrationBuilder.DropIndex(
                name: "IX_Offices_CreatedAtId",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "CreatedAtId",
                table: "Warehouses");

            migrationBuilder.DropColumn(
                name: "CreatedAtId",
                table: "Offices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CreatedAtId",
                table: "Warehouses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedAtId",
                table: "Offices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Warehouses_CreatedAtId",
                table: "Warehouses",
                column: "CreatedAtId");

            migrationBuilder.CreateIndex(
                name: "IX_Offices_CreatedAtId",
                table: "Offices",
                column: "CreatedAtId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_Users_CreatedAtId",
                table: "Offices",
                column: "CreatedAtId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_Users_CreatedAtId",
                table: "Warehouses",
                column: "CreatedAtId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
