"use client"

import { Search, ShoppingCart, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { CartSheet } from "@/components/cart-sheet"
import { useState } from "react"

export function Header() {
  const { totalItems } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <a href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="font-mono text-lg font-bold text-primary-foreground">T</span>
                </div>
                <span className="hidden text-lg font-bold md:inline-block">TechStore UY</span>
              </a>
            </div>

            <nav className="hidden items-center gap-6 md:flex">
              <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Inicio
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Gaming
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Componentes
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Periféricos
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="w-[200px] pl-8 lg:w-[300px]"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 md:hidden" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
