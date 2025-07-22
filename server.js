// server.js
const http = require("http"); // Usamos require
const handler = require("serve-handler"); // Usamos require

// Lee el puerto de la variable de entorno PORT, o usa 8080 como fallback (para desarrollo local)
const PORT = process.env.PORT || 8080;
// Lee la IP de la variable de entorno HOST, o usa 0.0.0.0 como fallback
const HOST = process.env.HOST || "0.0.0.0";

const server = http.createServer((request, response) => {
  // Configuración para servir archivos estáticos desde la carpeta 'dist'
  // y manejar las rutas de SPA (Single Page Application)
  return handler(request, response, {
    public: "dist", // La carpeta donde está tu build de Vue
    rewrites: [
      { source: "**", destination: "/index.html" }, // Redirige todas las rutas a index.html
    ],
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Running at http://${HOST}:${PORT}`);
});
