# Usar la imagen oficial de Node.js 14
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar nodemon y cross-env globalmente
RUN npm install -g cross-env

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend
EXPOSE 9000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]
