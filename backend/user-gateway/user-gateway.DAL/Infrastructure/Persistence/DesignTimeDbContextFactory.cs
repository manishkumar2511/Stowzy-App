using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace user_gateway.DAL.Infrastructure.Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server=ANSHU\\SQLEXPRESS;Initial Catalog=user_gateway;User Id=Anshu;Password=admin;TrustServerCertificate=True;");

            return new DataContext(optionsBuilder.Options);
        }
    }
}
