using Microsoft.EntityFrameworkCore;
using System;
using user_gateway.Domain.Entities;


namespace user_gateway.DAL.Infrastructure.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<GuestUser> GuestUsers { get; set; }
    }
}
