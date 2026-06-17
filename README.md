# КиноПоиск 🎬

Полноценное React + TypeScript приложение для поиска и просмотра информации о фильмах и сериалах с использованием **Open Movie Database (OMDb) API**.

## ⚠️ ВАЖНО: API мигрировано с TMDB на OMDb

Это приложение было изначально написано для TMDB API, но **мигрировано на Open Movie Database (OMDb)** для лучшей производительности и доступности.

👉 [Читайте MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) для деталей о том, что изменилось.

---

## 🛠 Технический стек

- **React 18.3.0** с TypeScript 5.4.0 (строгая типизация, никаких `any`)
- **Vite 5.3.0** как сборщик
- **Tailwind CSS 3.4.0** для стилей
- **GSAP 3.12.5** для анимаций
- **React Router v6** для навигации
- **Axios 1.7.0** для запросов к API
- **Zustand 4.5.0** для управления состоянием
- **Open Movie Database (OMDb) API** для данных о фильмах

---

## 🎨 Дизайн и эстетика

**Стиль**: Тёмный кинематографический UI в духе стриминговых сервисов.

**Цветовая палитра**:

- Основной: `#651fff` (фиолетовый)
- Светлый: `#7c40ff`, `#9146ff`
- Очень светлый: `#b99aff`, `#d8c7ff`
- Фон: `#000000` (чёрный)

**Типографика**:

- Заголовки: **Playfair Display** (сериф)
- Основной текст: **DM Sans** (гротеск)
- Код/Рейтинги: **JetBrains Mono** (моноширинный)

---

## 📁 Структура проекта

```
src/
├── api/
│   ├── tmdb.ts           # OMDb API методы (поиск, детали)
│   ├── types.ts          # TypeScript типы (Movie, NormalizedMovie, etc.)
│   └── index.ts
├── components/
│   ├── layout/           # Header, Footer
│   ├── ui/               # MovieCard, Loader, RatingBadge, etc.
│   └── sections/         # TrendingSection, TopRatedSection, GenresSection
├── pages/
│   ├── HomePage.tsx      # Главная
│   ├── SearchPage.tsx    # Поиск
│   ├── FavoritesPage.tsx # Избранное
│   ├── MovieDetailPage.tsx # Детали фильма
│   └── NotFoundPage.tsx  # 404
├── hooks/
│   ├── useMovies.ts      # Загрузка фильмов (3 хука)
│   ├── useSearch.ts      # Поиск с debounce
│   └── index.ts
├── store/
│   └── useAppStore.ts    # Zustand (избранное, история)
├── utils/
│   ├── constants.ts      # OMDb URL, API ключи, жанры
│   ├── formatters.ts     # Форматирование дат, текста
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css             # Глобальные стили и анимации
```

---

## 🚀 Быстрый старт

### Требования

- Node.js 16+ и npm/yarn/pnpm
- **Бесплатный** API ключ от OMDb (получить за 30 секунд)

### Установка

1. **Клонируйте/распакуйте проект**

```bash
cd kinosearch
```

2. **Установите зависимости**

```bash
npm install
```

3. **Получите API ключ**
   - Откройте http://www.omdbapi.com/apikey.aspx
   - Выберите "Free!" план
   - Подтвердите email
   - Скопируйте API ключ

4. **Создайте `.env` файл** (или отредактируйте существующий)

```env
VITE_OMDB_API_KEY=your_api_key_here
VITE_OMDB_BASE_URL=http://www.omdbapi.com/
```

5. **Запустите приложение**

```bash
npm run dev
```

Откроется на `http://localhost:5173` ✅

---

## 📄 Функциональность

### ✅ Реализовано

- Поиск фильмов и сериалов
- Просмотр полной информации о фильме
- Система избранных фильмов (сохранение в localStorage)
- История поиска (сохранение в localStorage)
- Адаптивный дизайн (мобильный, планшет, десктоп)
- Тёмная тема с фиолетовым неоном
- Скелетоны загрузки
- Обработка ошибок с retry
- Плавные GSAP анимации
- Горизонтальные карусели фильмов

### 🔄 Основные API методы

```typescript
// Поиск
omdbService.searchMovies(query, page); // Поиск фильмов
omdbService.searchSeries(query, page); // Поиск сериалов
omdbService.searchMulti(query, page); // Поиск всех типов

// Детали
omdbService.getDetails(imdbID); // Получить детали (автоматическое определение типа)
omdbService.getMovieDetails(imdbID); // Специфично для фильма
omdbService.getSeriesDetails(imdbID); // Специфично для сериала
```

---

## 📱 Страницы

| Страница      | Маршрут         | Функция                                 |
| ------------- | --------------- | --------------------------------------- |
| **Главная**   | `/`             | Hero, "В тренде", "Топ рейтинга", жанры |
| **Поиск**     | `/search?q=...` | Поиск с результатами в сетке            |
| **Детали**    | `/movie/:id`    | Полная информация о фильме/сериале      |
| **Избранное** | `/favorites`    | Сохранённые фильмы                      |
| **404**       | `*`             | Стилизованная страница ошибки           |

### Главная (`/`)

- Hero слайдер с популярными фильмами
- Секция "В тренде"
- Секция "Топ рейтинга"
- Сетка жанров для быстрого поиска

### Поиск (`/search?q=...`)

- Поисковая строка с историей
- Результаты в адаптивной сетке
- Загрузка информации по клику

### Детали фильма (`/movie/:id`)

- Постер фильма
- Полная информация (название, год, рейтинг, описание)
- Жанры, режиссёр, актёры
- Кнопка "Добавить в избранное"

### Избранное (`/favorites`)

- Список всех добавленных фильмов
- Быстрое удаление из избранного
- Пустое состояние с ссылкой на поиск

---

## 🎬 OMDb vs TMDB

### OMDb ✅ (текущий)

- ✅ Бесплатный
- ✅ Простой API
- ✅ Быстрые запросы
- ✅ 1000 запросов в день (бесплатно)
- ❌ Нет трендов
- ❌ Нет рекомендаций
- ❌ Нет отдельного API для актёров

### TMDB (было раньше)

- ✅ Трендовые фильмы
- ✅ Рекомендации
- ✅ Подробные кредиты
- ❌ Сложнее в использовании
- ❌ Требует более частых запросов

---

## 🔐 Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Open Movie Database API
VITE_OMDB_API_KEY=your_api_key_here
VITE_OMDB_BASE_URL=http://www.omdbapi.com/
```

**Важно!** Никогда не коммитьте `.env` файл с реальными ключами в git.

---

## 📦 Сборка для продакшена

```bash
npm run build
```

Результат в папке `dist/`. Готово к развёртыванию на любом хостинге (Netlify, Vercel, GitHub Pages, и т.д.)

---

## 🧪 Обработка состояний

Каждый компонент правильно обрабатывает:

- **Loading**: Скелетон-анимация (пульсирующие блоки)
- **Error**: Стилизованное сообщение об ошибке с retry
- **Success**: Отображение данных
- **Empty**: Иллюстрированное пустое состояние

---

## 💡 Примеры использования в коде

### Добавление фильма в избранное

```typescript
import { useAppStore } from "@/store/useAppStore";

function MyComponent() {
  const { addToFavorites, removeFromFavorites, isFavorite } = useAppStore();

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
}
```

### Поиск фильмов

```typescript
import { useSearchMovies } from '@/hooks';

function SearchComponent() {
  const { movies, isLoading, error } = useSearchMovies('Матрица');

  return (
    <div>
      {isLoading && <Loader />}
      {error && <Error />}
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  );
}
```

### Загрузка информации о фильме

```typescript
import { useMovieDetails } from '@/hooks';

function MovieDetailsComponent({ movieId }) {
  const { movie, isLoading, error } = useMovieDetails(movieId);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return <MovieDetail movie={movie} />;
}
```

---

## 📚 Полезные ссылки

- [OMDb API документация](http://www.omdbapi.com/)
- [Получить API ключ](http://www.omdbapi.com/apikey.aspx)
- [React документация](https://react.dev/)
- [TypeScript документация](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [GSAP](https://gsap.com/)
- [React Router](https://reactrouter.com/)

---

## 🐛 Troubleshooting

### API ключ не работает

- Убедитесь, что ключ скопирован полностью (без пробелов)
- Проверьте, что вы подтвердили email на OMDb
- Перезагрузите приложение

### Стили не применяются

- Убедитесь, что `tailwindcss` установлен
- Перезагрузите сервер разработки

### Изображения фильмов не загружаются

- Проверьте интернет-соединение
- Убедитесь, что OMDb API доступен
- Проверьте консоль браузера на ошибки

---

## 📝 Заметки разработчика

- Все компоненты написаны с TypeScript (никаких `any`)
- Используется Zustand с persist middleware для localStorage
- Debounce на поиске: 300ms
- Timeout на API запросы: 10 секунд
- Все анимации используют GSAP

---

## 🎓 Что изучить при работе с этим проектом

- React Hooks (useState, useEffect, useCallback, useMemo)
- TypeScript типизация
- React Router для SPA
- API интеграция через Axios
- State management с Zustand
- Tailwind CSS для стилизации
- GSAP для анимаций
- localStorage для персистенции данных

---

## ✨ Благодарности

- **OMDb** за отличное и бесплатное API
- **React** за фреймворк
- **Tailwind** за утилиты CSS
- **GSAP** за анимации

---

**Наслаждайтесь КиноПоиском!** 🍿🎬🎥

Если у вас есть вопросы или идеи для улучшения, создайте issue или pull request!

### 3. `SearchPage` (`/search?q=...`)

- Большая поисковая строка в центре страницы
- Результаты в сетке 4–6 колонок (адаптивно)
- Фильтры: год, жанр, рейтинг (слайдер), тип (фильм/сериал)
- Infinite scroll с useIntersectionObserver
- Пустое состояние с анимированной иллюстрацией

### 4. `GenrePage` (`/genre/:id`)

- Заголовок жанра с фоновым постером случайного фильма жанра
- Сетка фильмов с пагинацией

### 5. `NotFoundPage` (`/404`)

- Кинематографичная 404 страница с GSAP анимацией и надписью "Что-то пошло не так..."

---

## 🔌 API методы (`src/api/tmdb.ts`)

Реализуй следующие методы:

```typescript
// Трендовые фильмы
getTrending(mediaType: 'movie' | 'tv', timeWindow: 'day' | 'week')

// Популярные/топ рейтинга
getPopular(mediaType: 'movie' | 'tv', page: number)
getTopRated(mediaType: 'movie' | 'tv', page: number)

// Детали
getMovieDetails(id: number)
getTVDetails(id: number)
getMovieCredits(id: number)
getMovieVideos(id: number)
getSimilar(id: number, mediaType: 'movie' | 'tv')

// Поиск
searchMulti(query: string, page: number)
searchMovies(query: string, page: number)

// Жанры
getGenres(mediaType: 'movie' | 'tv')
discoverByGenre(genreId: number, page: number)

// Конфигурация изображений
getImageUrl(path: string, size: 'w200' | 'w500' | 'w780' | 'original')
```

---

## ✨ Анимации (GSAP + React Bits)

### React Bits компоненты — используй МАКСИМАЛЬНО:

| Компонент                 | Применение                                |
| ------------------------- | ----------------------------------------- |
| `<BlurText>`              | Анимированное появление заголовков        |
| `<SplitText>`             | Разбивка букв в Hero секции               |
| `<TextPressure>`          | Hover-эффект на названиях жанров          |
| `<CountUp>`               | Анимация рейтинга и чисел                 |
| `<ScrollProgress>`        | Прогресс-бар скролла вверху страницы      |
| `<Magnet>`                | Кнопки "В избранное" и "Смотреть трейлер" |
| `<SpotlightCard>`         | Основа для MovieCard                      |
| `<TiltCard>`              | 3D-наклон постеров на ховере              |
| `<Dock>`                  | Нижняя навигация на мобильных             |
| `<CircularText>`          | Декоративный элемент на странице деталей  |
| `<InfiniteScroll>`        | Ленты контента                            |
| `<Noise>` / `<Particles>` | Фоновые эффекты на Hero секции            |
| `<PixelTransition>`       | Переход между страницами                  |

### GSAP анимации:

```javascript
// Stagger reveal карточек при загрузке страницы
gsap.from(".card", { stagger: 0.05, y: 30, opacity: 0 })

// Параллакс backdrop на MovieDetailPage
ScrollTrigger.create({ ... })

// Плавный переход Hero слайдера
gsap.timeline()

// Анимация появления модального окна с трейлером
// Hover-анимация рейтингового бейджа (пульс)
```

---

## 💾 Состояние (Zustand)

```typescript
interface AppStore {
  favorites: Movie[];
  searchHistory: string[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}
```

> Сохраняй `favorites` и `searchHistory` в `localStorage` через Zustand **persist** middleware.

---

## 📱 Адаптивность

- Mobile first подход
- Брейкпоинты Tailwind: `sm` (640) / `md` (768) / `lg` (1024) / `xl` (1280)
- Горизонтальные карусели на всех экранах (touch-scroll на мобильных)
- Сетка карточек: 2 колонки на мобильном → 4 на десктопе
- Header: гамбургер-меню на мобильном с GSAP анимацией появления

---

## 🔑 Переменные окружения

Используй `.env` файл:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

---

## 🧪 Обработка состояний

Для каждого запроса реализуй:

- **Loading**: скелетон-анимация (серые пульсирующие блоки в форме карточек)
- **Error**: стилизованное сообщение об ошибке с кнопкой "Повторить"
- **Empty**: иллюстрированное пустое состояние

---

## 📦 Зависимости (`package.json`)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.24.0",
    "axios": "^1.7.0",
    "gsap": "^3.12.5",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.3.0",
    "vite": "^5.3.0"
  }
}
```

> React Bits устанавливается покомпонентно через CLI:
>
> ```bash
> npx jsrepo add https://reactbits.dev/[component-name]
> ```

---

## ✅ Требования к коду

1. Строгая TypeScript типизация (никаких `any`, только типы из `api/types.ts`)
2. Все компоненты — функциональные с хуками
3. Кастомные хуки для логики загрузки данных
4. Мемоизация там, где необходимо (`useMemo`, `useCallback`)
5. Lazy loading изображений с placeholder
6. Debounce 300ms на поиске
7. Отмена запросов через `AbortController` при размонтировании
8. Семантическая HTML-разметка (`article`, `section`, `nav`, `main`)
9. ARIA-атрибуты для доступности
10. Комментарии на русском языке к сложной логике

> **Начни с создания структуры проекта, затем реализуй по порядку:**
> API слой → типы → хуки → компоненты → страницы → анимации
#   k i n o s e a r c h  
 #   k i n o s e a r c h  
 