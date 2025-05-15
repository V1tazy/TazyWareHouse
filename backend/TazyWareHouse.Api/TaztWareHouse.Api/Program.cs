using Microsoft.EntityFrameworkCore;
using TazyWareHouse.Application.Services;
using TazyWareHouse.Core.Interfaces;
using TazyWareHouse.Infrastructure.Data;
using TazyWareHouse.Infrastructure.Data.Repositories;
using TazyWareHouse.Infrastructure.Services;

namespace TazyWareHouse.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Конфигурация DbContext
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Регистрация репозиториев
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            // Регистрация других сервисов
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();
            builder.Services.AddSingleton<ITokenService, TokenService>();

            // Добавление контроллеров
            builder.Services.AddControllers();

            // Добавление сервисов Swagger (OpenAPI)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // ASP.NET Core
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://localhost:3000") // Укажите ваш фронтенд URL
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });

            



            var app = builder.Build();

            // Конфигурация middleware pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TazyWareHouse API V1");
                });
            }


            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.UseCors("AllowSpecificOrigin");
            app.Run();
        }
    }
}