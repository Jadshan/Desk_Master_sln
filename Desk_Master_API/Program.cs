using Desk_Master_API.Data;
using Desk_Master_API.Interfaces;
using Desk_Master_API.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers().AddNewtonsoftJson(options => {
	options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddDbContext<ApplicationDBContext>(options => {
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultSqlConnection"));
});

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeFullViewRepository, EmployeeFullViewRepository>();

builder.Services.AddScoped<IContactDetailRepository, ContactDetailRepository>();

builder.Services.AddCors(p => p.AddDefaultPolicy(build =>{
	build.AllowAnyOrigin();
	build.AllowAnyMethod();
	build.AllowAnyHeader();
}));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
