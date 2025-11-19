import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-balance font-bold text-4xl text-foreground leading-tight md:text-6xl">
            Tecnología Gaming de{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Última Generación
            </span>
          </h1>
          <p className="mb-8 text-balance text-muted-foreground text-lg md:text-xl leading-relaxed">
            Descubrí las mejores ofertas en hardware, gaming y tecnología en Uruguay.
            Envíos a todo el país.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Ver Productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Ofertas Especiales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
