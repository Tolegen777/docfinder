# Устанавливаем базовый образ с Node.js
FROM node:18-alpine AS base

# Устанавливаем необходимые системные зависимости
RUN apk add --no-cache libc6-compat

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и lock файлы
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Устанавливаем зависимости
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Устанавливаем sharp для оптимизации изображений
RUN npm install sharp

# Копируем весь проект в рабочую директорию
COPY . .

# Устанавливаем переменную окружения для продакшн-окружения
ENV NODE_ENV production

# Собираем проект
RUN npm run build

# Экспонируем порт 3000 для доступа к приложению
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
