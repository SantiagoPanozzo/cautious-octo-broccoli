namespace TechStoreApi.Models
{
    public class PurchaseRequest
    {
        public List<PurchaseItem> Items { get; set; } = new();
        public decimal TotalAmount { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class PurchaseItem
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
