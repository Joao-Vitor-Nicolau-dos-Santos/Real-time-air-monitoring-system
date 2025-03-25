# Backend-air-monitoring/Dockerfile
FROM node:16-alpine

# Instale o pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copia os arquivos de package e instala as dependências usando pnpm
COPY package*.json ./
RUN pnpm install

# Copia o restante do código
COPY . .

EXPOSE 8000

# Inicia a aplicação
CMD ["pnpm", "start"]
