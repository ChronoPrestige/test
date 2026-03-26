# test_project

Сервис работы с пользователями на `Express` и `MongoDB`.

## Переменные окружения
скопировать из .env


## Запуск MongoDB через Docker

```bash
docker compose up -d
```

После запуска MongoDB будет доступна на `mongodb://127.0.0.1:27017/test`.

## Запуск проекта

Установка зависимостей:

```bash
npm install
```

Создание администратора:

```bash
npm run create:admin
```

Запуск проекта:

```bash
npm start
```

Запуск в dev-режиме:

```bash
npm run start:dev
```
