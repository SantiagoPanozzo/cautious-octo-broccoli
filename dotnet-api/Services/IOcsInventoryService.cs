using TechStoreAPI.Models;

namespace TechStoreAPI.Services
{
    public interface IOcsInventoryService
    {
        Task<List<OcsInventoryItem>> GetInventoryItemsAsync();
        Task<OcsInventoryItem?> GetInventoryItemByIdAsync(int id);
        Task<bool> UpdateInventoryAsync(int productId, int quantityChange);
    }
}
