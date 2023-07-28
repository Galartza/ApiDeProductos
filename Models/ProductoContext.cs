using Microsoft.EntityFrameworkCore;

namespace ProductoApi.Models;

public class ProductoContext : DbContext
{
    public ProductoContext(DbContextOptions<ProductoContext> options)
        : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set; } = null!;
}