using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechStoreAPI.Data;
using TechStoreAPI.Models;
using TechStoreAPI.Services;

namespace TechStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IOcsInventoryService _ocsService;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(
            ApplicationDbContext context, 
            IOcsInventoryService ocsService,
            ILogger<ProductsController> logger)
        {
            _context = context;
            _ocsService = ocsService;
            _logger = logger;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] string? category = null)
        {
            try
            {
                var query = _context.Products.AsQueryable();

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(p => p.Category == category);
                }

                var products = await query.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching products");
                return StatusCode(500, "Error al obtener productos");
            }
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            product.UpdatedAt = DateTime.UtcNow;
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/products/sync-ocs
        [HttpPost("sync-ocs")]
        public async Task<ActionResult> SyncWithOcsInventory()
        {
            try
            {
                var ocsItems = await _ocsService.GetInventoryItemsAsync();
                
                // Logic to sync OCS inventory with products
                // This is a basic example - customize based on your needs
                foreach (var item in ocsItems)
                {
                    var existingProduct = await _context.Products
                        .FirstOrDefaultAsync(p => p.OcsHardwareId == item.Id);

                    if (existingProduct == null)
                    {
                        // Create new product from OCS data
                        var newProduct = new Product
                        {
                            Name = $"{item.Manufacturer} {item.Model}",
                            Description = $"{item.Type} - {item.Name}",
                            Category = MapOcsTypeToCategory(item.Type),
                            Stock = item.Status == "Active" ? 1 : 0,
                            OcsHardwareId = item.Id,
                            OcsDeviceType = item.Type,
                            Price = 0, // Set default or calculate price
                            Image = "/placeholder.svg",
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };

                        _context.Products.Add(newProduct);
                    }
                    else
                    {
                        // Update existing product stock
                        existingProduct.Stock = item.Status == "Active" ? 1 : 0;
                        existingProduct.UpdatedAt = DateTime.UtcNow;
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sincronización completada" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error syncing with OCS Inventory");
                return StatusCode(500, "Error al sincronizar con OCS Inventory");
            }
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

        private static string MapOcsTypeToCategory(string? ocsType)
        {
            return ocsType?.ToLower() switch
            {
                "computer" => "componentes",
                "monitor" => "perifericos",
                "keyboard" => "perifericos",
                "mouse" => "perifericos",
                _ => "otros"
            };
        }
    }
}
