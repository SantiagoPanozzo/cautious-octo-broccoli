import { Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-bold text-lg">TechStore UY</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu tienda de confianza para tecnología y gaming en Uruguay desde 2020.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Productos</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-foreground">Gaming</a></li>
              <li><a href="#" className="hover:text-foreground">Componentes</a></li>
              <li><a href="#" className="hover:text-foreground">Periféricos</a></li>
              <li><a href="#" className="hover:text-foreground">Notebooks</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Información</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-foreground">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-foreground">Envíos</a></li>
              <li><a href="#" className="hover:text-foreground">Garantía</a></li>
              <li><a href="#" className="hover:text-foreground">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Seguinos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>© 2025 TechStore UY. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
