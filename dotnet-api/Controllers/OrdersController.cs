using Microsoft.AspNetCore.Mvc;
using TechStoreApi.Models;
using TechStoreApi.Services;

namespace TechStoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOcsInventoryService _ocsService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(IOcsInventoryService ocsService, ILogger<OrdersController> logger)
        {
            _ocsService = ocsService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<OrderResponse>> CreateOrder([FromBody] PurchaseRequest request)
        {
            try
            {
                _logger.LogInformation("Processing order with {ItemCount} items", request.Items.Count);

                // Update inventory in OCS Inventory for each product
                foreach (var item in request.Items)
                {
                    var success = await _ocsService.UpdateInventoryAsync(item.ProductId, -item.Quantity);
                    if (!success)
                    {
                        _logger.LogWarning("Failed to update inventory for product {ProductId}", item.ProductId);
                        return BadRequest(new { message = $"Error actualizando inventario para producto {item.ProductId}" });
                    }
                }

                var orderId = GenerateOrderId();
                
                _logger.LogInformation("Order {OrderId} completed successfully", orderId);

                return Ok(new OrderResponse
                {
                    Success = true,
                    OrderId = orderId,
                    Message = "Compra procesada exitosamente",
                    Timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing order");
                return StatusCode(500, new { message = "Error al procesar la compra" });
            }
        }

        private int GenerateOrderId()
        {
            return new Random().Next(100000, 999999);
        }
    }
}
