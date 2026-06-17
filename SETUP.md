# КиноПоиск 🎬

Полнофункциональное React + TypeScript приложение для поиска и просмотра информации о фильмах и сериалах с использованием [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

## 🚀 Быстрый старт

### Требования

- Node.js 16+ и npm/yarn/pnpm
- API ключ от TMDB (получить на https://www.themoviedb.org/settings/api)

### Установка

1. **Клонируйте репозиторий** (или распакуйте архив)

```bash
cd kinosearch
```

2. **Установите зависимости**

```bash
npm install
# или
yarn install
# или
pnpm install
```

3. **Настройте переменные окружения**

Откройте файл `.env` и замените значение `VITE_TMDB_API_KEY`:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

Получить API ключ:

- Зайдите на https://www.themoviedb.org/settings/api
- Зарегистрируйтесь (если ещё не зарегистрированы)
- Создайте новый API ключ для Developer

4. **Запустите приложение**

Для разработки:

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

Для продакшена:

```bash
npm run build
npm run preview
```

## 📁 Структура проекта

```
src/
├── api/                    # TMDB API сервис и типы
│   ├── tmdb.ts            # API методы
│   ├── types.ts           # TypeScript типы
│   └── index.ts
├── components/            # React компоненты
│   ├── ui/                # UI компоненты (MovieCard, Loader, и т.д.)
│   ├── layout/            # Layout (Header, Footer)
│   ├── sections/          # Секции страниц (TrendingSection, и т.д.)
│   └── index.ts
├── pages/                 # Страницы приложения
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── FavoritesPage.tsx
│   ├── MovieDetailPage.tsx
│   ├── NotFoundPage.tsx
│   └── index.ts
├── hooks/                 # Custom хуки
│   ├── useMovies.ts       # Загрузка фильмов
│   ├── useSearch.ts       # Поиск с debounce
│   ├── useInfiniteScroll.ts # Infinite scroll
│   └── index.ts
├── store/                 # Zustand store
│   └── useAppStore.ts     # Состояние приложения
├── utils/                 # Утилиты
│   ├── constants.ts       # Константы
│   ├── formatters.ts      # Функции форматирования
│   └── index.ts
├── App.tsx               # Главный компонент
├── main.tsx              # Точка входа
└── index.css             # Глобальные стили
```

## 🎨 Технический стек

- **React 18** - UI фреймворк
- **TypeScript** - Строгая типизация
- **Vite** - Сборщик проекта
- **Tailwind CSS** - Утилиты для стилизации
- **React Router v6** - Маршрутизация
- **Axios** - HTTP клиент
- **GSAP** - Анимации
- **Zustand** - State management
- **Zustand Persist** - Сохранение состояния в localStorage

## 🎯 Функциональность

### ✅ Реализовано

- [x] Поиск фильмов и сериалов с debounce (300ms)
- [x] Просмотр информации о фильме (название, рейтинг, описание, жанры, актёры)
- [x] Система избранных фильмов (сохранение в localStorage)
- [x] История поиска (сохранение в localStorage)
- [x] Адаптивный дизайн (мобильный, планшет, десктоп)
- [x] Тёмная тема с фиолетовым неоном
- [x] Загрузка и отмена запросов (AbortController)
- [x] Скелетоны загрузки
- [x] Обработка ошибок
- [x] GSAP анимации
- [x] Горизонтальные карусели
- [x] Фильтрация по жанрам

### 🔄 API Методы

- `getTrending()` - Трендовые фильмы
- `getPopular()` - Популярные фильмы
- `getTopRated()` - Фильмы с высоким рейтингом
- `getMovieDetails()` - Детали фильма
- `getMovieCredits()` - Актёры фильма
- `getMovieVideos()` - Видео/трейлеры
- `getSimilar()` - Похожие фильмы
- `searchMulti()` - Поиск по всем типам
- `getGenres()` - Список жанров
- `discoverByGenre()` - Фильмы по жанру

## 🎬 Страницы

### Главная (`/`)

- Героический слайдер с трендовыми фильмами
- Секция "В тренде сейчас"
- Секция "Топ рейтинга"
- Секция "По жанрам"

### Поиск (`/search?q=...`)

- Поисковая строка с историей
- Результаты в сетке
- Фильтры (опционально)
- Infinite scroll

### Избранное (`/favorites`)

- Список добавленных в избранное фильмов
- Возможность удаления
- История поиска

### Детали фильма (`/movie/:id`)

- Полная информация о фильме
- Фоновое изображение с blur эффектом
- Рейтинг, жанры, актёры
- Видео/трейлеры
- Похожие фильмы
- Кнопка добавления в избранное

### 404 (не найдено)

- Стилизованная страница ошибки
- Ссылка на главную

## 🎨 Дизайн

### Цветовая палитра

**Фиолетовый неон:**

- `#651fff` - Основной
- `#7c40ff` - Светлый
- `#9146ff` - Яркий
- `#b99aff` - Блеклый

**Тёмный фон:**

- `#000000` - Основной
- `#1f2937` - Серый

### Типографика

- **Заголовки:** Playfair Display (сериф)
- **Основной текст:** DM Sans (гротеск)
- **Моноширинный:** JetBrains Mono

### Компоненты UI

- Карточки фильмов с hover эффектами
- Рейтинговые бейджи с цветным кодированием
- Таблетки жанров
- Скелетоны загрузки
- Пустые состояния

## 🔧 Развитие

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка для продакшена

```bash
npm run build
```

Результат будет в папке `dist/`.

### Лinting (опционально)

```bash
npm run lint
```

## 📝 Комментирование

Код содержит подробные комментарии на русском языке, особенно в сложных местах.

## 🔐 Безопасность

- ❌ **Никогда не коммитьте** файл `.env` с реальными API ключами
- ✅ Используйте `.env.example` как шаблон
- ✅ Все запросы используют `AbortController` для отмены при размонтировании

## 📖 Примеры использования

### Добавление фильма в избранное

```typescript
import { useAppStore } from "@/store/useAppStore";

const { addToFavorites, removeFromFavorites, isFavorite } = useAppStore();

// Добавить
addToFavorites(movie);

// Проверить
if (isFavorite(movieId)) {
  // Фильм в избранном
}

// Удалить
removeFromFavorites(movieId);
```

### Поиск фильмов

```typescript
import { useSearch } from "@/hooks";

const { results, isLoading, search } = useSearch();

// Выполнить поиск
search("Матрица");

// Результаты будут в state
```

### Загрузка информации о фильме

```typescript
import { useMovieDetails } from '@/hooks';

const { movie, isLoading, error } = useMovieDetails(550); // Fight Club ID

if (isLoading) return <Loader />;
if (error) return <Error />;

return <MovieDetail movie={movie} />;
```

## 🐛 Troubleshooting

### API ключ не работает

- Проверьте, что ключ скопирован полностью
- Убедитесь, что в `.env` нет пробелов
- Перезагрузите приложение (`npm run dev`)

### Стили не применяются

- Убедитесь, что `tailwindcss` установлен
- Проверьте `tailwind.config.js`
- Перезагрузите сервер разработки

### Изображения не загружаются

- Проверьте интернет-соединение
- Убедитесь, что TMDB API доступен
- Проверьте консоль браузера на ошибки CORS

## 📝 Лицензия

MIT License - используйте свободно

## 🙏 Благодарности

- TMDB за отличное API
- React community за инструменты
- Вам за использование этого приложения!

## 📞 Контакты

Есть вопросы? Создайте issue или pull request!

---

**Удачи в использовании КиноПоиска!** 🍿🎬
