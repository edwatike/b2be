# B2B Platform - OAuth Configuration

## 🚀 Быстрый запуск

1. Скопируй `.env.example` в `.env.local`:
```bash
cp .env.example .env.local
```

2. Вставь свои OAuth данные в `.env.local`:
- `YANDEX_CLIENT_ID` - твой Client ID
- `YANDEX_CLIENT_SECRET` - твой Secret

## 🔗 OAuth Настройки

### Яндекс OAuth
- **Callback URL:** `https://hobnailed-ballistically-jolie.ngrok-free.dev/api/yandex/callback`
- **Scope:** `login:email login:info mail:imap_full mail:smtp`
- **Host:** оставить пустым для ngrok

### Текущие рабочие данные
```
Client ID: f13aa94092e74191ab90ac908df3c42b
Client Secret: 170746997c17407bb388dd7872d2666a
```

## 🌐 Ngrok URL
```
https://hobnailed-ballistically-jolie.ngrok-free.dev
```

## 📱 Запуск
```bash
# Frontend
npm run dev

# Backend  
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Или через B2BLauncher.exe
```

## ✅ Проверка
Открой `https://hobnailed-ballistically-jolie.ngrok-free.dev/login` и войди через Яндекс.
