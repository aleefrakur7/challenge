Challenge
Este repositorio contiene una aplicación con frontend en React y backend en .NET. A continuación, se detallan las instrucciones para ejecutar ambos entornos y realizar pruebas básicas.

Requisitos
Node.js (versión recomendada: 18 o superior)
.NET 7 SDK
Git
Base de datos (SQL Server o en memoria, según configuración del backend)

Instalación y ejecución
Backend (.NET 7)

Navegar a la carpeta del backend:
cd backend

Restaurar paquetes:
dotnet restore

Ejecutar migraciones (si usa Entity Framework y SQL Server):
dotnet ef database update

Iniciar el backend:
dotnet run

El backend estará disponible en: http://localhost:5164
Endpoint de reservas: http://localhost:5164/api/reservations

Frontend (React + Vite)
Navegar a la carpeta del frontend:
cd frontend

Instalar dependencias:
npm install

Instalar React Toastify:
npm install react-toastify

Iniciar el servidor de desarrollo:
npm run dev

El frontend estará disponible en: http://localhost:5173

Pruebas

Abrir http://localhost:5173 en el navegador.
Verificar que la lista de servicios se cargue correctamente.
Crear una reserva y confirmar que aparezca en la lista.

Pruebas API (Postman o cURL)
Ejemplo para probar la API con cURL:
curl -X GET http://localhost:5164/api/services

Ejemplo de creación de una reserva:
curl -X POST http://localhost:5164/api/reservations \
     -H "Content-Type: application/json" \
     -d '{"client":"Juan Perez", "service":"Corte de cabello", "date":"2025-03-15"}'
