using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TazyWareHouse.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Ed3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offices_Users_ResponsibleId",
                table: "Offices");

            migrationBuilder.DropIndex(
                name: "IX_Offices_ResponsibleId",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Addres",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Offices");

            migrationBuilder.DropColumn(
                name: "ResponsibleId",
                table: "Offices");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Offices",
                newName: "Responsible");

            migrationBuilder.AddColumn<Guid>(
                name: "OfficeId",
                table: "Equipments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_OfficeId",
                table: "Equipments",
                column: "OfficeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_Offices_OfficeId",
                table: "Equipments",
                column: "OfficeId",
                principalTable: "Offices",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_Offices_OfficeId",
                table: "Equipments");

            migrationBuilder.DropIndex(
                name: "IX_Equipments_OfficeId",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "OfficeId",
                table: "Equipments");

            migrationBuilder.RenameColumn(
                name: "Responsible",
                table: "Offices",
                newName: "Phone");

            migrationBuilder.AddColumn<string>(
                name: "Addres",
                table: "Offices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Offices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ResponsibleId",
                table: "Offices",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Offices_ResponsibleId",
                table: "Offices",
                column: "ResponsibleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offices_Users_ResponsibleId",
                table: "Offices",
                column: "ResponsibleId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
