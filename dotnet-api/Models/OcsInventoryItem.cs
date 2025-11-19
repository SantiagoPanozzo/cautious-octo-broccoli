namespace TechStoreAPI.Models
{
    // Model representing data from OCS Inventory database
    public class OcsInventoryItem
    {
        public int Id { get; set; }
        public string? DeviceId { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Manufacturer { get; set; }
        public string? Model { get; set; }
        public string? SerialNumber { get; set; }
        public DateTime? LastInventoryDate { get; set; }
        public string? Status { get; set; }
    }
}
