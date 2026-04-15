# vite-plugin-tuna

[![NPM](https://nodei.co/npm/vite-plugin-tuna.png?mini=true)](https://npmjs.org/package/vite-plugin-tuna)

Плагин для разработки приложений с сервисом Tuna.am. 

Подходит для разработки VK Mini Apps и Telegram Web Apps.

## Требования

1. Установить [tuna-cli](https://tuna.am/docs/guides/install/)
2. Пройти [авторизацию](https://tuna.am/docs/guides/install/)
3. Установить Vite в проект - `pnpm add -D vite`

## Установка

```shell
pnpm add -D vite-plugin-tuna
```

## Применение

Добавьте плагин в `vite.config.ts`

```typescript
import tunaPlugin from '@receipt-app/vite-plugin-tuna'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tunaPlugin(),
  ]
})
```

## Конфигурация

Плагин поддерживает следующие настройки:

| Имя параметра | Тип    | Обязательно |
|---------------|--------|-------------|
| domain        | string | fasle       |

## Запуск

Запустите `Vite` в  режиме dev-сборки, `tuna` запустится автоматически

```text
  VITE v8.0.8  ready in 1944 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  tuna:   https://{domain}.ru.tuna.am
  ➜  press h + enter to show help
```