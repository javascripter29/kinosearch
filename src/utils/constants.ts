/**
 * ��������� ����������
 */

export const OMDB_BASE_URL = import.meta.env.VITE_OMDB_BASE_URL ?? 'https://www.omdbapi.com/';
export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY ?? '';

// Debounce ����� ��� ������
export const SEARCH_DEBOUNCE_MS = 300;

// �������� �� ��������
export const ITEMS_PER_PAGE = 10;

// ������������ ���������
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
};

// ���������� ����� � OMDb
export const POPULAR_GENRES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Animation',
  'Adventure',
  'Crime',
  'Fantasy',
  'Mystery',
  'Romance',
  'War',
  'History',
  'Documentary',
];
