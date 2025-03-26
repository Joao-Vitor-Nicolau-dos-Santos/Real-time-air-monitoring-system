FROM node:16-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 8000
CMD ["pnpm", "start"]
