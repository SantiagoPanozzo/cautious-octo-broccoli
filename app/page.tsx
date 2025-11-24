import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, UserCheck, Calendar, BookOpen, CreditCard, Download } from "lucide-react"

export default function BedeliasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#003366] font-bold text-xl">UCU</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Universidad Católica del Uruguay</h1>
                <p className="text-sm text-cyan-200">Bedelías - Gestión Académica</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-3 text-sm">
            <Link href="#" className="text-[#003366] font-medium hover:text-cyan-600 transition-colors">
              Inicio
            </Link>
            <Link href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
              Estudiantes
            </Link>
            <Link href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
              Alumni
            </Link>
            <Link href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
              Profesores
            </Link>
            <Link href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">
              Funcionarios
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#004d99] text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Bedelías</h2>
          <p className="text-lg text-cyan-100 max-w-2xl">
            Gestión de trámites académicos y administrativos para estudiantes de la UCU
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Quick Actions */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-[#003366] mb-6">Trámites y Servicios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-[#003366]">Inscripciones</CardTitle>
                <CardDescription>Inscripción a cursos y materias del semestre actual</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#003366] hover:bg-[#004d99] text-white">Acceder</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <UserCheck className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-[#003366]">Certificados</CardTitle>
                <CardDescription>Solicitud de certificados de estudios y constancias</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#003366] hover:bg-[#004d99] text-white">Solicitar</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-[#003366]">Exámenes</CardTitle>
                <CardDescription>Cronograma de exámenes y período de inscripción</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#003366] hover:bg-[#004d99] text-white">Ver Calendario</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-[#003366]">Escolaridad</CardTitle>
                <CardDescription>Consulta tu historial académico y calificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#003366] hover:bg-[#004d99] text-white">Consultar</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <CreditCard className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-[#003366]">Pagos</CardTitle>
                <CardDescription>Consulta de estado de cuenta y pagos pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#003366] hover:bg-[#004d99] text-white">Ver Estado</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <Download className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-[#003366]">Documentos</CardTitle>
                <CardDescription>Descarga de formularios y documentación oficial</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#003366] hover:bg-[#004d99] text-white">Descargar</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Information Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-cyan-50 border-cyan-200">
              <CardHeader>
                <CardTitle className="text-[#003366]">Horarios de Atención</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-[#003366]">Campus Montevideo</p>
                  <p className="text-sm text-gray-700">Lunes a Viernes: 9:00 - 18:00</p>
                </div>
                <div>
                  <p className="font-semibold text-[#003366]">Campus Salto</p>
                  <p className="text-sm text-gray-700">Lunes a Viernes: 9:00 - 17:00</p>
                </div>
                <div>
                  <p className="font-semibold text-[#003366]">Atención Virtual</p>
                  <p className="text-sm text-gray-700">Lunes a Viernes: 8:00 - 20:00</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#003366] text-white">
              <CardHeader>
                <CardTitle>Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-cyan-100">bedelias@ucu.edu.uy</p>
                </div>
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p className="text-sm text-cyan-100">+598 2487 2717</p>
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-cyan-100">+598 92 123 456</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Announcements */}
        <section>
          <h3 className="text-2xl font-bold text-[#003366] mb-6">Avisos Importantes</h3>
          <div className="space-y-4">
            <div className="bg-white border-l-4 border-l-orange-500 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 px-3 py-1 rounded text-sm font-semibold text-orange-700">IMPORTANTE</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#003366] mb-2">Período de Inscripciones - Semestre 1/2025</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    El período de inscripción a cursos estará abierto desde el 1 al 15 de marzo. Recuerda verificar los
                    requisitos y cupos disponibles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-l-cyan-500 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-cyan-100 px-3 py-1 rounded text-sm font-semibold text-cyan-700">NOVEDAD</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#003366] mb-2">Nuevos Servicios Digitales</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Ya está disponible la descarga de certificados digitales con firma electrónica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#003366] text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-3">Universidad Católica del Uruguay</h4>
              <p className="text-sm text-cyan-100 leading-relaxed">
                Institución de educación superior comprometida con la excelencia académica.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                    Portal del Estudiante
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                    Biblioteca
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-cyan-100 hover:text-white transition-colors">
                    Campus Virtual
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Sedes</h4>
              <ul className="space-y-2 text-sm text-cyan-100">
                <li>Campus Montevideo</li>
                <li>Campus Salto</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyan-800 mt-8 pt-6 text-center text-sm text-cyan-100">
            <p>© 2025 Universidad Católica del Uruguay - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
