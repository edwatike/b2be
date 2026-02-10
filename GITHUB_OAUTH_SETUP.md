# GitHub OAuth Setup

## 🚀 Быстрая настройка GitHub OAuth

### 1. Создай GitHub OAuth приложение

1. Зайди в https://github.com/settings/applications/new
2. Заполни:
   - **Application name**: `B2B Moderator Dashboard`
   - **Homepage URL**: `https://vm-ud98seh88ok3cwc7xqcmxm.vusercontent.net`
   - **Authorization callback URL**: `https://vm-ud98seh88ok3cwc7xqcmxm.vusercontent.net/api/github/callback`

3. Нажми **"Register application"**

### 2. Скопируй данные

После создания получи:
- **Client ID**
- **Client Secret**

### 3. Настрой ENV переменные

В Vercel добавь:
```env
GITHUB_CLIENT_ID=твой_client_id
GITHUB_CLIENT_SECRET=твой_client_secret
NEXT_PUBLIC_API_URL=https://hobnailed-ballistically-jolie.ngrok-free.dev
```

### 4. Перезапусти деплой

После добавления ENV Vercel автоматически переразвернется.

## 🎯 Результат

- ✅ Кнопка "Войти через GitHub"
- ✅ Автоматическая регистрация/авторизация
- ✅ Доступ в `/moderator` для master email

## 📧 Master Email

По умолчанию: `edwatik@yandex.ru` (можно изменить через `MODERATOR_MASTER_EMAIL`)

---

## 🔧 Локальное тестирование

Для локального тестирования:
```env
GITHUB_CLIENT_ID=твой_client_id
GITHUB_CLIENT_SECRET=твой_client_secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```
