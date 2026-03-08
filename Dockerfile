FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# NestJS necesita construir el proyecto
RUN npm run build

EXPOSE 3000

# Usamos el modo de inicio de Nest
CMD ["npm", "run", "start:dev"]
