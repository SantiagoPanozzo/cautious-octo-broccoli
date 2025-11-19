"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("todos")

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        // Replace with your .NET API endpoint
        // const response = await fetch('http://localhost:5000/api/products')
        // const data = await response.json()
        // setProducts(data)
        
        // Mock data for demonstration
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "RTX 4080 SUPER",
            description: "Tarjeta gráfica de alto rendimiento para gaming 4K",
            price: 45990,
            category: "componentes",
            image: "/nvidia-rtx-4080.png",
            stock: 5
          },
          {
            id: 2,
            name: "AMD Ryzen 9 7950X",
            description: "Procesador de 16 núcleos para máximo rendimiento",
            price: 32990,
            category: "componentes",
            image: "/amd-ryzen-processor.jpg",
            stock: 8
          },
          {
            id: 3,
            name: "Logitech G Pro X Superlight",
            description: "Mouse gaming inalámbrico profesional",
            price: 7990,
            category: "perifericos",
            image: "/gaming-mouse-logitech.jpg",
            stock: 12
          },
          {
            id: 4,
            name: "PlayStation 5",
            description: "Consola de última generación con SSD ultra rápido",
            price: 29990,
            category: "gaming",
            image: "/playstation-5-console.png",
            stock: 3
          },
          {
            id: 5,
            name: "Samsung Odyssey G7",
            description: "Monitor curvo 240Hz 1440p QLED",
            price: 24990,
            category: "perifericos",
            image: "/curved-gaming-monitor.png",
            stock: 6
          },
          {
            id: 6,
            name: "Corsair K95 RGB",
            description: "Teclado mecánico gaming con switches Cherry MX",
            price: 9990,
            category: "perifericos",
            image: "/mechanical-keyboard-rgb.jpg",
            stock: 15
          }
        ]
        
        setProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = selectedCategory === "todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2 font-bold text-3xl">Nuestros Productos</h2>
        <p className="text-muted-foreground">Explorá nuestra selección de tecnología premium</p>
      </div>

      <Tabs defaultValue="todos" className="mb-8" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="componentes">Componentes</TabsTrigger>
          <TabsTrigger value="perifericos">Periféricos</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No se encontraron productos en esta categoría</p>
        </div>
      )}
    </section>
  )
}
