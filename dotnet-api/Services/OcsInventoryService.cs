using Microsoft.EntityFrameworkCore;
using TechStoreAPI.Data;
using TechStoreAPI.Models;

namespace TechStoreAPI.Services
{
    public class OcsInventoryService : IOcsInventoryService
    {
        private readonly OcsDbContext _ocsContext;
        private readonly ILogger<OcsInventoryService> _logger;

        public OcsInventoryService(OcsDbContext ocsContext, ILogger<OcsInventoryService> logger)
        {
            _ocsContext = ocsContext;
            _logger = logger;
        }

        public async Task<List<OcsInventoryItem>> GetInventoryItemsAsync()
        {
            try
            {
                // This is a simplified query - adjust based on your OCS Inventory schema
                // OCS Inventory typically uses tables like 'hardware', 'bios', etc.
                var items = await _ocsContext.OcsInventoryItems.ToListAsync();
                return items;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching OCS Inventory items");
                return new List<OcsInventoryItem>();
            }
        }

        public async Task<OcsInventoryItem?> GetInventoryItemByIdAsync(int id)
        {
            try
            {
                return await _ocsContext.OcsInventoryItems.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching OCS Inventory item by id: {Id}", id);
                return null;
            }
        }

        public async Task<bool> UpdateInventoryAsync(int productId, int quantityChange)
        {
            try
            {
                var item = await _ocsContext.OcsInventoryItems.FindAsync(productId);
                
                if (item == null)
                {
                    _logger.LogWarning("Product {ProductId} not found in inventory", productId);
                    return false;
                }

                // Update the quantity
                item.Quantity += quantityChange;

                if (item.Quantity < 0)
                {
                    _logger.LogWarning("Insufficient stock for product {ProductId}", productId);
                    return false;
                }

                await _ocsContext.SaveChangesAsync();
                _logger.LogInformation("Updated inventory for product {ProductId}: {QuantityChange}", productId, quantityChange);
                
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating inventory for product {ProductId}", productId);
                return false;
            }
        }
    }
}
