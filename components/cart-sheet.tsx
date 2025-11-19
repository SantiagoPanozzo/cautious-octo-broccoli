"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useState } from "react"

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCompletePurchase = async () => {
    if (items.length === 0) return

    setIsProcessing(true)

    try {
      const purchaseData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalPrice,
        timestamp: new Date().toISOString(),
      }

      // Send to .NET API
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      })

      if (!response.ok) {
        throw new Error('Error al procesar la compra')
      }

      const result = await response.json()
      
      // Clear cart on success
      clearCart()
      onOpenChange(false)
      
      // Show success message
      alert(`¡Compra confirmada! Orden #${result.orderId}\nGracias por tu compra.`)
    } catch (error) {
      console.error('[v0] Error completing purchase:', error)
      alert('Hubo un error al procesar tu compra. Por favor, intenta de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Tu carrito está vacío' : `${items.length} producto${items.length !== 1 ? 's' : ''} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">No hay productos en tu carrito</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-sm">
                          ${(item.price * item.quantity).toLocaleString('es-UY')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col gap-4">
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-2xl text-primary">
                  ${totalPrice.toLocaleString('es-UY')} UYU
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleCompletePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Completar Compra'}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
