"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  stock: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: { id: number; name: string; price: number; image: string; stock: number }) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: { id: number; name: string; price: number; image: string; stock: number }) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        // Check if we can add more
        if (existingItem.quantity >= product.stock) {
          alert("No hay más stock disponible")
          return currentItems
        }
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          if (quantity > item.stock) {
            alert("No hay suficiente stock disponible")
            return item
          }
          return { ...item, quantity }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
