# Usa una imagen base de Node.js. Puedes ajustar la versión si necesitas una específica (ej: node:18-alpine)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias primero para aprovechar el cache de Docker
COPY package.json yarn.lock* ./

# Instala las dependencias de Node.js
# --production=false asegura que las devDependencies también se instalen para el build
RUN npm install --production=false

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Ejecuta el comando de construcción de tu aplicación Vue
# Esto creará la carpeta 'dist' con tus archivos estáticos
RUN npm run build

# --- PASO DE DEPURACIÓN AÑADIDO ---
# Lista el contenido de la carpeta 'dist' para verificar que los archivos se generaron correctamente
RUN ls -l dist
# --- FIN DEL PASO DE DEPURACIÓN ---

# Expone el puerto en el que la aplicación escuchará.
# Railway mapeará este puerto al puerto dinámico externo.
EXPOSE 8080

# Comando para iniciar la aplicación.
# Aquí, Node.js leerá la variable de entorno PORT que Railway inyecta en el contenedor.
CMD ["node", "server.js"]
