📋 **MIGRATION GUIDE: TMDB → OMDb**

## Что было изменено?

### 1. **API Сервис** (`src/api/tmdb.ts`)

**ДО (TMDB):**

```typescript
// Трендовые фильмы
tmdbService.getTrending("movie", "week");

// Популярные
tmdbService.getPopular("movie", 1);

// Детали с рекомендациями
tmdbService.getMovieDetails(550);
```

**ПОСЛЕ (OMDb):**

```typescript
// Поиск по названию
omdbService.searchMovies("Матрица", 1);
omdbService.searchSeries("Breaking Bad", 1);
omdbService.searchMulti("Криминальное чтиво", 1);

// Детали по IMDb ID
omdbService.getDetails("tt0111161");
```

### 2. **Типы данных** (`src/api/types.ts`)

**Переименованы интерфейсы:**

- `Movie` → используется как OMDb Movie, но структура изменилась
- Добавлены `NormalizedMovie` и `NormalizedSearchResult` для единообразной работы

**Структуры:**

TMDB:

```typescript
movie.id: 550
movie.title: "Fight Club"
movie.vote_average: 8.8
movie.genre_ids: [28, 18]
```

OMDb:

```typescript
movie.imdbID: "tt0137523"
movie.Title: "Fight Club"
movie.imdbRating: "8.8"
movie.Genre: "Drama, Thriller"
```

### 3. **Утилиты** (`src/utils/constants.ts`)

**ДО:**

```typescript
export const TMDB_BASE_URL = ...
export const TMDB_IMAGE_BASE_URL = ...
export const IMAGE_SIZES = { POSTER: {...}, BACKDROP: {...} }
export const GENRES_MOVIE = { ACTION: 28, COMEDY: 35, ... }
```

**ПОСЛЕ:**

```typescript
export const OMDB_BASE_URL = "http://www.omdbapi.com/"
export const OMDB_API_KEY = ...
export const POPULAR_GENRES = ["Action", "Comedy", "Drama", ...]
```

### 4. **Хуки** (`src/hooks/`)

**Переименованы функции:**

| Было                         | Стало                          | Примечание                          |
| ---------------------------- | ------------------------------ | ----------------------------------- |
| `useTrendingMovies('movie')` | `useSearchMovies('popular')`   | Поиск вместо трендов                |
| `useTopRatedMovies('movie')` | `useSearchMovies('best')`      | Поиск вместо топа                   |
| `useMovieDetails(550)`       | `useMovieDetails('tt0137523')` | Теперь принимает строку (IMDb ID)   |
| `useSimilarMovies(550)`      | ~~Удалён~~                     | OMDb не поддерживает похожие фильмы |

### 5. **Хранилище** (`src/store/useAppStore.ts`)

**Изменено:**

```typescript
// ДО
isFavorite(id: number)
removeFromFavorites(id: number)

// ПОСЛЕ
isFavorite(id: string)      // Теперь строка (IMDb ID)
removeFromFavorites(id: string)
```

### 6. **Компоненты**

**MovieCard** (`src/components/ui/MovieCard.tsx`):

```typescript
// ДО
tmdbService.getImageUrl(posterPath, "w500");

// ПОСЛЕ
// Используем прямой URL из OMDb (или placeholder)
movie.poster; // "https://m.media-amazon.com/..."
```

### 7. **Страницы**

**MovieDetailPage** (`src/pages/MovieDetailPage.tsx`):

- Удалены: трейлеры (YouTube iframe), актёры (нет отдельного запроса), похожие фильмы
- Добавлены: режиссёр, предложение, страна

**HomePage** (`src/pages/HomePage.tsx`):

- Изменена логика загрузки "трендовых" на простой поиск популярных фильмов

**SearchPage** остался тем же

## Переменные окружения

```env
# ДО
VITE_TMDB_API_KEY=...
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# ПОСЛЕ
VITE_OMDB_API_KEY=...
VITE_OMDB_BASE_URL=http://www.omdbapi.com/
```

## Что потеряли?

- ❌ Трендовые фильмы
- ❌ Топ рейтинга (есть только поиск)
- ❌ Рекомендации/похожие фильмы
- ❌ Отдельные запросы на актёров и видео
- ❌ Фоновые изображения (backdrop)

## Что получили?

- ✅ Более простое API
- ✅ Бесплатный доступ
- ✅ Быстрые запросы
- ✅ Базовая информация о фильмах

## Как использовать OMDb в коде?

```typescript
import { omdbService } from "@/api";

// Поиск фильмов
const results = await omdbService.searchMulti("Avatar", 1);
// Результат: NormalizedSearchResult[]

// Получить детали
const details = await omdbService.getDetails("tt0468569");
// Результат: NormalizedMovie | null

// Рейтинг преобразуется автоматически
// "8.5" → 8.5
// "N/A" → 0
```

## Запуск после миграции

```bash
# 1. Обновите .env
VITE_OMDB_API_KEY=your_key

# 2. Очистите кэш
npm cache clean --force

# 3. Установите зависимости (на случай если что-то изменилось)
npm install

# 4. Запустите dev сервер
npm run dev
```

---

**Готово!** Приложение теперь использует OMDb API вместо TMDB. 🎬
