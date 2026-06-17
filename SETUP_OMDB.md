# КиноПоиск 🎬 (OMDb версия)

Полнофункциональное React + TypeScript приложение для поиска и просмотра информации о фильмах и сериалах с использованием **Open Movie Database (OMDb) API**.

## 🚀 Быстрый старт

### Требования

- Node.js 16+ и npm/yarn/pnpm
- API ключ от OMDb (получить на http://www.omdbapi.com/apikey.aspx)

### Установка

1. **Установите зависимости**

```bash
npm install
# или yarn install
```

2. **Получите API ключ:**
   - Зайдите на http://www.omdbapi.com/apikey.aspx
   - Выберите Free или платный план
   - Подтвердите email
   - Скопируйте API ключ

3. **Настройте `.env` файл:**

```env
VITE_OMDB_API_KEY=your_api_key_here
VITE_OMDB_BASE_URL=http://www.omdbapi.com/
```

4. **Запустите приложение**

```bash
npm run dev
```

Откроется на `http://localhost:5173`

## 📝 Что изменилось от TMDB к OMDb?

### API Методы

- **OMDb** предоставляет поиск (search) и детали по IMDb ID
- **OMDb** не имеет трендовых/популярных листов, рекомендаций или отдельных запросов на актёров
- **OMDb** бесплатный план имеет ограничение в 1000 запросов в день

### Типы данных

- **TMDB**: числовые ID (`id: number`)
- **OMDb**: строковые IMDb ID (`imdbID: string`)

- **TMDB**: массивы объектов жанров
- **OMDb**: жанры в одной строке (`"Action, Crime, Drama"`)

- **TMDB**: отдельные рейтинги (IMDb, TMDB, etc.)
- **OMDb**: все рейтинги приходят в массиве `Ratings`

### Типы данных (TypeScript)

```typescript
// OMDb Movie
interface Movie {
  imdbID: string; // Уникальный ID
  Title: string; // Название
  Year: string; // Год
  Poster: string; // URL постера
  imdbRating: string; // Рейтинг (строка: "8.5")
  imdbVotes: string; // Количество голосов
  Plot: string; // Описание
  Genre: string; // Жанры через запятую
  Director: string; // Режиссёры
  Actors: string; // Актёры через запятую
  // ... другие поля
}

// NormalizedMovie (приложение)
interface NormalizedMovie {
  id: string; // imdbID
  title: string; // Title
  year: string; // Year
  poster: string; // Poster
  rating: number; // Преобразованный рейтинг
  ratingCount: number; // Количество оценок
  description: string; // Plot
  genres: string[]; // Разделённые жанры
  // ... другие поля
}
```

## 🎯 Функциональность

✅ **Реализовано:**

- Поиск фильмов и сериалов с debounce 300ms
- Информация о фильме (название, рейтинг, описание, режиссёр, актёры)
- Система избранных (localStorage)
- История поиска (localStorage)
- Адаптивный дизайн
- Тёмная тема с фиолетовым неоном
- Скелетоны загрузки
- Обработка ошибок
- GSAP анимации

## 🔄 API Методы

```typescript
// src/api/tmdb.ts (переименован, но работает с OMDb)

omdbService.searchMovies(query: string, page: number)
omdbService.searchSeries(query: string, page: number)
omdbService.searchMulti(query: string, page: number)

omdbService.getMovieDetails(imdbID: string)
omdbService.getSeriesDetails(imdbID: string)
omdbService.getDetails(imdbID: string)
```

## 📱 Страницы

| Страница  | Маршрут         | Функция              |
| --------- | --------------- | -------------------- |
| Главная   | `/`             | Hero, тренды, жанры  |
| Поиск     | `/search?q=...` | Поиск с результатами |
| Детали    | `/movie/:id`    | Информация о фильме  |
| Избранное | `/favorites`    | Сохранённые фильмы   |
| 404       | `*`             | Ошибка 404           |

## 🎨 Дизайн

- **Тема**: Тёмная с фиолетовым неоном (#651fff, #7c40ff, #9146ff)
- **Типографика**: Playfair Display (заголовки), DM Sans (текст), JetBrains Mono (код)
- **Адаптивность**: Mobile-first, Tailwind CSS

## 🔐 Ограничения OMDb

- **Бесплатный план**: 1000 запросов в день
- **Нет трендов**: Нужно искать конкретные названия
- **Нет рекомендаций**: Похожие фильмы не доступны через API
- **Постеры**: Для некоторых фильмов может быть `"N/A"`

## 💡 Совет

Если вам нужны расширенные функции (тренды, рекомендации, актёры), используйте **TMDB API** вместо OMDb. OMDb лучше всего подходит для простого поиска и просмотра деталей.

## 📚 Полезные ссылки

- [OMDb API Документация](http://www.omdbapi.com/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [GSAP](https://gsap.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Наслаждайтесь КиноПоиском!** 🍿🎬
