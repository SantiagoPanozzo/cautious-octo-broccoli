"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from 'lucide-react'
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    stock: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    })
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {product.stock < 5 && (
            <Badge className="absolute top-2 right-2 bg-destructive">
              ¡Últimas unidades!
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
        <CardDescription className="mb-4 line-clamp-2">
          {product.description}
        </CardDescription>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-2xl text-primary">
            ${product.price.toLocaleString('es-UY')}
          </span>
          <span className="text-muted-foreground text-sm">UYU</span>
        </div>
        <p className="mt-2 text-muted-foreground text-sm">
          Stock: {product.stock} unidades
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="default" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
