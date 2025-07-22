# Usa una imagen base de Node.js. Puedes ajustar la versión si necesitas una específica (ej: node:18-alpine)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias primero para aprovechar el cache de Docker
COPY package.json yarn.lock* ./

# Instala las dependencias de Node.js
RUN npm install --production=false

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Ejecuta el comando de construcción de tu aplicación Vue
# Esto creará la carpeta 'dist' con tus archivos estáticos
RUN npm run build

# Expone el puerto en el que la aplicación escuchará.
# Railway mapeará este puerto al puerto dinámico externo.
EXPOSE 8080

# Comando para iniciar la aplicación.
# Aquí pasamos explícitamente la variable de entorno PORT al script server.js.
# Railway inyectará el valor de $PORT en el entorno del contenedor,
# y este comando lo usará para iniciar tu servidor.
CMD ["node", "server.js"]