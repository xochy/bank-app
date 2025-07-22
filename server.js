// server.js
const http = require("http");
const handler = require("serve-handler");

// Log para depuración: qué valor tiene process.env.PORT
console.log(`DEBUG: process.env.PORT raw value: ${process.env.PORT}`);
console.log(`DEBUG: process.env.HOST raw value: ${process.env.HOST}`);

// Lee el puerto de la variable de entorno PORT, o usa 8080 como fallback (para desarrollo local)
// Asegúrate de parsearlo como un entero
const PORT = parseInt(process.env.PORT, 10) || 8080;
// Lee la IP de la variable de entorno HOST, o usa 0.0.0.0 como fallback
const HOST = process.env.HOST || "0.0.0.0";

// Log para depuración: qué valores finales se usarán
console.log(`DEBUG: Using PORT: ${PORT}`);
console.log(`DEBUG: Using HOST: ${HOST}`);

const server = http.createServer((request, response) => {
  // Configuración para servir archivos estáticos desde la carpeta 'dist'
  // y manejar las rutas de SPA (Single Page Application)
  return handler(request, response, {
    public: "dist", // La carpeta donde está tu build de Vue
    // --- CAMBIOS SUGERIDOS AQUÍ ---
    // directoryListing: false evita que se listen los directorios si no se encuentra un archivo
    directoryListing: false,
    cleanUrls: true, // Ayuda con URLs limpias sin .html
    rewrites: [
      { source: "**", destination: "/index.html" }, // Redirige todas las rutas a index.html
    ],
    // --- FIN DE CAMBIOS ---
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Running at http://${HOST}:${PORT}`);
});
