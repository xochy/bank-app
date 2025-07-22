// server.js
const http = require("http");
const handler = require("serve-handler");
const httpProxy = require("http-proxy"); // Importa http-proxy

// Crea una instancia del proxy
const proxy = httpProxy.createProxyServer({});

// Define la URL base de tu backend de Python en Railway
// ¡IMPORTANTE! Reemplaza 'https://python-auth-app-production.up.railway.app'
// con la URL real de tu backend de Python en Railway.
const BELVO_API_URL = "https://python-auth-app-production.up.railway.app";

// Log para depuración: qué valor tiene process.env.PORT
console.log(`DEBUG: process.env.PORT raw value: ${process.env.PORT}`);
console.log(`DEBUG: process.env.HOST raw value: ${process.env.HOST}`);

// Lee el puerto de la variable de entorno PORT, o usa 8080 como fallback (para desarrollo local)
const PORT = parseInt(process.env.PORT, 10) || 8080;
// Lee la IP de la variable de entorno HOST, o usa 0.0.0.0 como fallback
const HOST = process.env.HOST || "0.0.0.0";

// Log para depuración: qué valores finales se usarán
console.log(`DEBUG: Using PORT: ${PORT}`);
console.log(`DEBUG: Using HOST: ${HOST}`);
console.log(`DEBUG: Belvo API Proxy Target: ${BELVO_API_URL}`);

const server = http.createServer((request, response) => {
  // --- Lógica del Proxy ---
  // Si la solicitud comienza con '/belvo', la proxy a tu backend de Python
  if (request.url.startsWith("/belvo")) {
    console.log(`Proxying request for ${request.url} to ${BELVO_API_URL}`);
    // No eliminamos '/belvo' del path aquí, porque la URL de tu backend ya lo incluye.
    // Si tu backend espera '/belvo/institutions', entonces el proxy debe enviar '/belvo/institutions'.
    // Si tu backend espera solo '/institutions' después del dominio, entonces sí eliminarías '/belvo'.
    // Basado en tu ejemplo, parece que tu backend espera la ruta completa.
    proxy.web(request, response, { target: BELVO_API_URL, changeOrigin: true });
    return; // Importante: detiene el procesamiento para que serve-handler no actúe
  }
  // --- Fin Lógica del Proxy ---

  // Si no es una solicitud de API, sirve los archivos estáticos de Vue
  return handler(request, response, {
    public: "dist",
    directoryListing: false,
    cleanUrls: true,
    rewrites: [{ source: "**", destination: "/index.html" }],
  });
});

// Manejo de errores del proxy (opcional pero recomendado)
proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Something went wrong with the proxy.");
});

server.listen(PORT, HOST, () => {
  console.log(`Running at http://${HOST}:${PORT}`);
});
