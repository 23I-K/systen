# STAGE 1: Build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Копируем файлы зависимостей и устанавливаем их
COPY package.json package-lock.json ./
RUN npm ci

# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build:ssr

# STAGE 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

# Копируем только production-зависимости и собранное приложение
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=build /usr/src/app/dist ./dist

# Убираем права root для безопасности
USER node

EXPOSE 4000

CMD ["npm", "run", "serve:ssr"]
