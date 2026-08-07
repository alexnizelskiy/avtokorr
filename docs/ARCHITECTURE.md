# Avtokorr — Архитектура проекта (Этап 1)

> Маркетплейс автомобилей из Кореи, Японии и Китая «под ключ».
> Домен: **avtokorr.ru** · Деплой: **Vercel** · Репозиторий: **github.com/alexnizelskiy/avtokorr**

Документ — результат **Этапа 1 (архитектура и проектирование)**. Код пишем после согласования.
Структура и инженерные решения повторяют обкатанный проект **floby** (Next.js 15 + Vercel-native), адаптированные под масштаб автомобильного маркетплейса.

---

## 1. Технологический стек и ключевые решения

| Слой | Решение | Обоснование |
|------|---------|-------------|
| Framework | **Next.js 15 (App Router)** | SSR/SSG/Server Components из коробки, деплой на Vercel одним кликом |
| Язык | **TypeScript** (strict) | полная типизация по ТЗ |
| UI | **React 19 + TailwindCSS v4 + shadcn/ui** | как в floby; shadcn — доступные компоненты |
| Анимации | **Framer Motion** | hover, появление карточек, модалки |
| Стейт клиента | **Zustand** | фильтры каталога, избранное, сравнение |
| Данные/кэш | **TanStack Query (React Query)** | серверный стейт, инфинити-скролл каталога |
| Формы | **react-hook-form + zod** | валидация на клиенте и сервере |
| Галереи | **Swiper** | галерея фото/видео авто |
| **Бэкенд** | **Next.js Route Handlers + Server Actions** | «NestJS-заменитель», всё в одном деплое на Vercel |
| **ORM** | **Prisma** | богатая реляционная модель (авто↔заказы↔статусы↔чат) |
| **БД** | **PostgreSQL** (Neon/Supabase/Vercel Postgres) | serverless-friendly Postgres |
| **Файлы/видео** | **Vercel Blob** (S3-совместимый fallback) | фото и видео авто, CDN, публичные URL |
| Авторизация | **JWT + Refresh (httpOnly cookie)** · SMS-OTP · VK ID · Яндекс ID | как в floby, расширено OAuth |
| Чат | **Supabase Realtime** (или Pusher) | реалтайм без постоянного сервера — совместимо с Vercel |
| Уведомления | **Telegram Bot API + Email (Resend/SMTP) + Web Push** | заявки менеджерам, статусы клиентам |
| Аналитика | Vercel Analytics + Яндекс.Метрика | |

### Почему НЕ отдельный NestJS
Vercel — serverless-платформа: она отлично держит Next.js, но не рассчитана на постоянно
работающий NestJS-сервер (WebSocket, cron, длинные соединения). Чтобы «весь проект на Vercel»
работал буквально, бэкенд реализуем на Route Handlers Next.js. **Чистая слоистая архитектура
(domain / application / infrastructure) внутри `lib/` сохраняется**, поэтому при росте команды
бэкенд можно безболезненно вынести в отдельный NestJS без переписывания домена.

---

## 2. Структура директорий (по образцу floby)

```
avtokorr/
├── app/                          # Next.js App Router
│   ├── (site)/                   # публичная витрина
│   │   ├── page.tsx              # Главная (hero + табы + каталог)
│   │   ├── catalog/              # Каталог: /catalog, /catalog/[slug] (карточка авто)
│   │   ├── how-to-buy/           # Как купить
│   │   ├── delivery/             # Доставка + калькуляторы
│   │   ├── reviews/              # Отзывы
│   │   ├── about/                # О компании
│   │   ├── contacts/             # Контакты
│   │   ├── blog/                 # Блог/новости (SEO)
│   │   └── faq/
│   ├── (auth)/                   # Вход/регистрация (SMS, VK, Яндекс)
│   ├── profile/                  # Личный кабинет
│   │   ├── page.tsx              # Профиль
│   │   ├── favorites/            # Избранное
│   │   ├── requests/             # Мои заявки
│   │   ├── orders/               # Заказы + трекинг статусов
│   │   ├── cars/                 # Мои автомобили
│   │   ├── messages/             # Чат с менеджером
│   │   ├── notifications/
│   │   └── settings/
│   ├── admin/                    # CRM (RBAC: manager/admin)
│   │   ├── page.tsx              # Дашборд
│   │   ├── cars/                 # CRUD авто, загрузка фото/видео/док
│   │   ├── orders/               # Управление заказами и статусами
│   │   ├── clients/  managers/   # Пользователи и роли
│   │   ├── reviews/ blog/ news/ files/ settings/
│   ├── api/                      # REST (Route Handlers) — см. §4
│   ├── sitemap.ts robots.ts manifest.ts   # SEO
│   ├── layout.tsx  globals.css  not-found.tsx
├── components/                   # UI по зонам: layout, sections, catalog, car,
│   │                             #   profile, admin, auth, forms, ui(shadcn)
├── features/                     # Фича-модули: catalog-filters, car-gallery,
│   │                             #   compare, calculator-delivery, calculator-customs,
│   │                             #   order-tracker, chat, lead-form
├── lib/                          # Инфраструктура/домен (server-only)
│   ├── db.ts        # Prisma client (singleton)
│   ├── auth.ts      # JWT + сессии + роли + RBAC
│   ├── sms.ts       # SMS-OTP провайдер
│   ├── oauth/       # vk.ts, yandex.ts
│   ├── storage.ts   # Vercel Blob (фото/видео)
│   ├── notify.ts    # Telegram + email + push
│   ├── seo.ts jsonld.ts        # мета + Schema.org
│   ├── calc.ts      # калькуляторы доставки/растаможки
│   └── utils.ts
├── content/                      # Статические данные: nav, brands, faq, company, steps
├── services/                     # Бизнес-сервисы: cars.ts, orders.ts, leads.ts, chat.ts
├── prisma/                       # schema.prisma + миграции + seed
├── types/                        # общие типы
├── middleware.ts                 # защита /admin, /profile, rate-limit
├── public/  docs/
└── next.config.ts vercel.json .env.example
```

---

## 3. Модель данных (Prisma) — см. `prisma/schema.prisma`

Ключевые сущности и связи:

- **User** (роль: `CLIENT | MANAGER | ADMIN`) → заявки, заказы, избранное, сообщения, отзывы.
- **Car** — марка/модель/поколение/год/пробег/двигатель/КПП/привод/цвет/цена/статус
  (`IN_STOCK | IN_TRANSIT | SOLD | ON_ORDER`), VIN, комплектация, аукционная оценка, финансы,
  slug (ЧПУ). Связи: `CarMedia` (фото/видео), `CarDocument`, `Favorite`, `Order`.
- **Order** — заказ клиента на авто; хранит текущий статус и историю.
- **OrderStatusEvent** — 10 этапов трекинга (Заявка → … → Получение), у каждого: дата,
  комментарий менеджера, фото, документы.
- **Lead** — онлайн-заявка/расчёт (может конвертироваться в Order).
- **Message / Conversation** — чат клиент↔менеджер (текст, фото, документы).
- **Review**, **Post** (блог/новости), **Notification**, **Session/RefreshToken**, **OtpCode**.

> Полная схема — в файле `prisma/schema.prisma` (создаётся на Этапе 1, черновик приложен).

---

## 4. REST API (Route Handlers, `app/api/*`)

Конвенция floby: `app/api/<resource>/route.ts` + `[id]/route.ts`. Ответы JSON, zod-валидация,
RBAC-проверка в начале хендлера.

```
Публичные:
  GET  /api/cars                 список + фильтры/сортировка/пагинация
  GET  /api/cars/[slug]          карточка авто + похожие
  GET  /api/reviews  /api/posts  /api/faq
  POST /api/leads                онлайн-заявка / расчёт  → Telegram менеджеру
  POST /api/calc/delivery        калькулятор доставки
  POST /api/calc/customs         калькулятор растаможки

Auth:
  POST /api/auth/otp/request  /api/auth/otp/verify     SMS-вход
  GET  /api/auth/vk  /api/auth/yandex                  OAuth callback
  POST /api/auth/refresh  /api/auth/logout

Кабинет (роль CLIENT):
  GET/POST/DELETE /api/favorites
  GET  /api/profile/orders  /api/profile/orders/[id]   трекинг
  GET/POST /api/messages                               чат

Админ/CRM (роль MANAGER|ADMIN):
  CRUD /api/admin/cars   + /api/admin/cars/[id]/media|documents|status
  CRUD /api/admin/orders + /api/admin/orders/[id]/status
  GET/PATCH /api/admin/users  (роли, блокировка)
  CRUD /api/admin/reviews|posts|files
  GET  /api/admin/analytics
```

---

## 5. Роли и RBAC

| Роль | Доступ |
|------|--------|
| **CLIENT** | витрина, кабинет, заявки, заказы, чат, избранное |
| **MANAGER** | всё выше + CRM: авто, заказы, статусы, клиенты, чат, контент |
| **ADMIN** | всё + управление ролями, менеджерами, настройками сайта |

Реализация: JWT (access ~15 мин) + Refresh (httpOnly cookie), проверка роли в `middleware.ts`
(защита `/admin`, `/profile`) и в каждом admin-хендлере. Rate-limit на `/api/auth/*` и `/api/leads`.

---

## 6. Пользовательские сценарии (User Flow)

1. **Покупка авто:** Главная → Каталог (фильтры) → Карточка авто → «Оставить заявку» →
   SMS-вход → Lead создан → Telegram менеджеру → менеджер создаёт Order → клиент видит трекинг в ЛК.
2. **Трекинг заказа:** ЛК → Заказы → карточка с 10 статусами, у каждого дата/комментарий/фото/док.
3. **Чат:** ЛК → Сообщения → реалтайм-диалог с менеджером (файлы, уведомления).
4. **Менеджер (CRM):** Админка → создать авто (фото/видео/VIN/аукцион/цены) → публикация →
   заявки → создать/вести заказ → менять статусы → писать клиенту.

---

## 7. Дизайн-система (детально — Этап 2)

- **Тема:** светлая, минимализм, много воздуха, крупные изображения, аккуратные тени.
- **Референс по UX:** auto.ru (структура/карточки/поиск), без копирования дизайна.
- **Цвета (черновик):** нейтральная база (white / zinc), акцент — глубокий синий `#1E56E0`,
  статусы: в наличии (зелёный), в пути (синий), под заказ (янтарный), продан (серый).
- **Типографика:** один гротеск (напр. Inter / Manrope), крупные заголовки, чёткая иерархия.
- **Компоненты:** CarCard, Filters, Gallery, StatusBadge, OrderTracker, Calculator, Chat, forms.

Прототипы страниц (Главная, Каталог, Карточка авто, ЛК, Админка) готовим на **Этапе 2**.

---

## 8. SEO / Производительность / Безопасность

- **SEO:** per-page Title/Description/OG, Schema.org (`Vehicle`, `Product`, `BreadcrumbList`),
  ЧПУ (`/catalog/toyota-crown-2023`), `sitemap.ts`, `robots.ts`.
- **Performance:** Server Components, `next/image`, lazy-load, infinite scroll, ISR/SSG для
  каталога и статики, кэш React Query.
- **Security:** RBAC, JWT+Refresh, rate-limit, CSRF (double-submit), XSS (санитизация),
  Prisma (защита от SQL-инъекций), zod-валидация всех входов.

---

## 9. Дорожная карта (этапы, ждём подтверждения после каждого)

- [x] **Этап 1 — Архитектура** (этот документ + черновик Prisma-схемы)
- [ ] **Этап 2 — Дизайн-система + прототипы** ключевых страниц
- [ ] **Этап 3 — Каркас:** scaffold Next.js, Prisma, БД, деплой пустого сайта на Vercel + GitHub
- [ ] **Этап 4 — Витрина:** Главная, Каталог, Карточка авто, фильтры, калькуляторы
- [ ] **Этап 5 — Auth + Личный кабинет** (SMS/VK/Яндекс, избранное, заявки, заказы, трекинг)
- [ ] **Этап 6 — CRM/Админка** (CRUD авто, заказы, статусы, пользователи, контент)
- [ ] **Этап 7 — Чат + уведомления** (Telegram, email, push)
- [ ] **Этап 8 — SEO, тесты, оптимизация, продакшн-деплой**

### Что понадобится от тебя (внешние доступы; я их создать не могу)
PostgreSQL URL · Vercel Blob token · VK ID и Яндекс ID app credentials · SMS-провайдер (ключ) ·
Telegram bot token + chat_id менеджеров · (опц.) Supabase/Pusher для чата · GitHub/Vercel доступ для деплоя.
