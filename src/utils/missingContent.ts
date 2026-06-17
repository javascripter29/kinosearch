export const MISSING_CONTENT_MESSAGES = {
  poster: 'Постер сейчас недоступен',
  description: 'Описание сейчас недоступно',
  genres: 'Жанры сейчас недоступны',
  released: 'Дата выхода сейчас недоступна',
  runtime: 'Длительность сейчас недоступна',
  country: 'Страна сейчас недоступна',
  rating: 'Рейтинг сейчас недоступен',
  director: 'Информация о режиссере сейчас недоступна',
  actors: 'Информация об актерах сейчас недоступна',
  awards: 'Информация о наградах сейчас недоступна',
  metascore: 'Metascore сейчас недоступен',
  year: 'Год сейчас недоступен',
  title: 'Название сейчас недоступно',
} as const;

export type MissingContentKey = keyof typeof MISSING_CONTENT_MESSAGES;

const PLACEHOLDER_POSTER_PATHS = ['/placeholder-image.svg', 'N/A'];

export const getMissingMessage = (key: MissingContentKey): string =>
  MISSING_CONTENT_MESSAGES[key];

export const isMissingValue = (
  value: string | number | undefined | null | string[]
): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'number') return value <= 0;
  if (Array.isArray(value)) return value.length === 0;

  const trimmed = value.trim();
  if (!trimmed) return true;

  const legacyMessages = [
    'N/A',
    'Неизвестна',
    'Неизвестно',
    'Неизвестен',
    'Описание недоступно',
  ];

  return legacyMessages.includes(trimmed);
};

export const isMissingPoster = (poster?: string): boolean => {
  if (!poster) return true;
  const trimmed = poster.trim();
  return !trimmed || PLACEHOLDER_POSTER_PATHS.includes(trimmed);
};

export const getDisplayValue = (
  value: string | number | undefined | null | string[],
  missingKey: MissingContentKey
): string => {
  if (isMissingValue(value)) {
    return getMissingMessage(missingKey);
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return String(value);
};
