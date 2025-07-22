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
    directoryListing: false, // Evita que se listen los directorios si no se encuentra un archivo
    cleanUrls: true, // Ayuda con URLs limpias sin .html
    // --- CAMBIO CLAVE AQUÍ ---
    // Asegura que index.html se sirva para la raíz y para rutas no encontradas.
    // Esto es una alternativa o complemento a 'rewrites' para el caso de SPA.
    // Si una URL no coincide con un archivo estático, se intentará servir index.html.
    rewrites: [
      { source: "**", destination: "/index.html" }, // Redirige todas las rutas a index.html
    ],
    // También puedes probar añadiendo 'index: "index.html"' si el problema persiste,
    // pero 'rewrites' con '**' debería ser suficiente para SPAs.
    // index: "index.html",
    // --- FIN DE CAMBIO ---
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Running at http://${HOST}:${PORT}`);
});
