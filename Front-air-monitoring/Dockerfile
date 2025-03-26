FROM node:16-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "start"]
