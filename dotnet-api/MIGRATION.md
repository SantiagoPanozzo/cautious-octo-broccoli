# Migración de SQL Server a PostgreSQL

Este documento detalla los cambios realizados para migrar de SQL Server a PostgreSQL.

## Cambios Realizados

### 1. Paquetes NuGet
- **Eliminado**: `Microsoft.EntityFrameworkCore.SqlServer`
- **Agregado**: `Npgsql.EntityFrameworkCore.PostgreSQL` (versión 8.0.0)

### 2. Cadenas de Conexión

#### SQL Server (Anterior)
\`\`\`
Server=localhost;Database=TechStoreDB;User Id=sa;Password=YourPassword123;TrustServerCertificate=True;
\`\`\`

#### PostgreSQL (Actual)
\`\`\`
Host=localhost;Port=5432;Database=techstoredb;Username=postgres;Password=YourPassword123;
\`\`\`

### 3. Configuración de DbContext

#### Program.cs
Cambio de `UseSqlServer()` a `UseNpgsql()`:

```csharp
// Antes
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))

// Ahora
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
