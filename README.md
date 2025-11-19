# TechStore UY - Tienda de Tecnología

Una tienda moderna de tecnología y gaming para Uruguay con estética Tokyo Night.

## Frontend (Next.js)

### Tecnologías
- Next.js 16
- React 19
- Tailwind CSS v4
- TypeScript
- shadcn/ui

### Instalación

El frontend está listo para usar. Solo necesitás:

1. Instalar dependencias (automático en v0)
2. Ejecutar el proyecto

### Características
- Diseño moderno con tema Tokyo Night (púrpura, cyan, rosa neón)
- Completamente responsive
- Filtrado de productos por categoría
- Interfaz en español
- Optimizado para Uruguay
- Carrito de compras con gestión de cantidades
- Validación de stock en tiempo real
- Proceso de compra integrado con backend

### Funcionalidades del Carrito

1. **Agregar Productos**: Click en "Agregar al Carrito" en cualquier producto
2. **Gestión de Cantidades**: Incrementar/decrementar cantidad con validación de stock
3. **Eliminar Productos**: Remover productos individuales del carrito
4. **Completar Compra**: Envía la orden al backend .NET para actualizar inventario
5. **Validación de Stock**: Previene agregar más unidades de las disponibles

El carrito se abre desde el botón en el header y muestra un badge con la cantidad total de items.

## Backend (.NET 8 API)

### Requisitos
- .NET 8 SDK
- SQL Server o SQL Server Express
- OCS Inventory instalado

### Instalación

1. Navegá a la carpeta `dotnet-api`:
\`\`\`bash
cd dotnet-api
\`\`\`

2. Restaurá los paquetes:
\`\`\`bash
dotnet restore
\`\`\`

3. Configurá las cadenas de conexión en `appsettings.json`:
   - `DefaultConnection`: Tu base de datos de productos
   - `OcsInventoryConnection`: Tu base de datos de OCS Inventory

4. Creá la base de datos:
\`\`\`bash
dotnet ef migrations add InitialCreate
dotnet ef database update
\`\`\`

5. Ejecutá la API:
\`\`\`bash
dotnet run
\`\`\`

La API estará disponible en `http://localhost:5000`

### Endpoints Principales

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener un producto
- `GET /api/products?category=gaming` - Filtrar por categoría
- `POST /api/products` - Crear producto
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto
- `POST /api/products/sync-ocs` - Sincronizar con OCS Inventory
- `POST /api/orders` - Procesar compra y actualizar inventario

### Integración con OCS Inventory

El servicio `OcsInventoryService` se conecta a la base de datos de OCS Inventory para:
- Leer inventario de hardware
- Sincronizar stock automáticamente
- Mapear dispositivos a productos
- Actualizar cantidades cuando se procesa una compra

Ajustá el mapeo de tablas en `OcsDbContext.cs` según tu esquema de OCS Inventory.

## Flujo de Compra

1. Usuario navega productos en el frontend
2. Agrega productos al carrito (validando stock disponible)
3. Click en "Completar Compra" en el carrito
4. Frontend envía POST a `/api/purchase`
5. Next.js API route reenvía a backend .NET `/api/orders`
6. Backend actualiza inventario en OCS Inventory (decrementa stock)
7. Backend retorna confirmación con número de orden
8. Frontend muestra mensaje de éxito y limpia el carrito

## Conectar Frontend con Backend

En el archivo `.env.local` del frontend, configurá:

\`\`\`env
DOTNET_API_URL=http://localhost:5000/api
\`\`\`

En `components/product-grid.tsx`, descomentá la línea:

\`\`\`typescript
const response = await fetch('http://localhost:5000/api/products')
\`\`\`

Y comentá los datos mock.

## Personalización

### Colores Tokyo Night
Los colores están definidos en `app/globals.css`:
- Primary: Púrpura vibrante
- Secondary: Cyan brillante  
- Accent: Rosa neón
- Background: Azul oscuro profundo

### Productos
Agregá productos a través de la API o directamente en la base de datos.

### Categorías
Las categorías actuales son:
- gaming
- componentes
- perifericos

Podés agregar más en el backend y actualizar el filtro en el frontend.
