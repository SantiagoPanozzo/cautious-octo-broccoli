namespace TechStoreApi.Models
{
    public class OrderResponse
    {
        public bool Success { get; set; }
        public int OrderId { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }
}
