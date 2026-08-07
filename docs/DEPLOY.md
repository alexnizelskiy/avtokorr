# Деплой Автокорр на GitHub + Vercel

Каркас (Этап 3) собирается и запускается локально. Ниже — как выложить его в прод.

## 1. Залить на GitHub

Репозиторий `origin` уже подключён: `https://github.com/alexnizelskiy/avtokorr.git`.
Убедись, что репозиторий создан на GitHub (пустой, без README), затем:

```bash
cd ~/avtokorr
git push -u origin main
```

Если попросит логин — используй **Personal Access Token** вместо пароля
(GitHub → Settings → Developer settings → Tokens → Generate, права `repo`).

Либо через GitHub CLI:
```bash
brew install gh && gh auth login
git push -u origin main
```

## 2. Подключить к Vercel

1. Зайти на https://vercel.com/alexnizelskiys-projects → **Add New → Project**.
2. Импортировать репозиторий `alexnizelskiy/avtokorr`.
3. Framework — Next.js определится сам. **Deploy**.
   Сборка пройдёт даже без базы (запросов к БД пока нет).

## 3. Домен

Vercel → Project → Settings → **Domains** → добавить `avtokorr.ru` и `www.avtokorr.ru`,
прописать у регистратора домена A/CNAME-записи, которые покажет Vercel.

## 4. Переменные окружения (по мере подключения функций)

Vercel → Settings → **Environment Variables**. Список — в `.env.example`.
Минимум для следующих этапов:

- `DATABASE_URL` — PostgreSQL (Neon / Supabase / Vercel Postgres). После добавления:
  ```bash
  npx prisma db push   # создать таблицы по схеме
  ```
- `BLOB_READ_WRITE_TOKEN` — Vercel Storage → Blob (для фото/видео авто).
- `JWT_SECRET` — длинная случайная строка.
- Далее по мере надобности: VK/Яндекс ID, SMS, Telegram.

## Локальная разработка

```bash
cd ~/avtokorr
cp .env.example .env      # заполнить DATABASE_URL и пр.
npm install
npm run dev               # http://localhost:3000
```
