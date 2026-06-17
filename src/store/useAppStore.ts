/**
 * Zustand store ��� ���������� ���������� ����������
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MovieReview, NormalizedMovie } from '@/api/types';
import { getSeedReviewsByMovieId } from '@/data/seedReviews';

interface AppStore {
  // ��������� ������
  favorites: NormalizedMovie[];
  addToFavorites: (movie: NormalizedMovie) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;

  // ������� ������
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;

  // ��������� ������������� �����
  lastViewed: NormalizedMovie | null;
  setLastViewed: (movie: NormalizedMovie) => void;

  // ������ � �������
  reviews: Record<string, MovieReview[]>;
  getMovieReviews: (movieId: string) => MovieReview[];
  addReview: (review: Omit<MovieReview, 'id' | 'createdAt'>) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // ��������� ������
      favorites: [],

      addToFavorites: (movie: NormalizedMovie) => {
        set((state) => {
          const isFav = state.favorites.some((m) => m.id === movie.id);
          if (isFav) return state;

          return {
            favorites: [...state.favorites, movie],
          };
        });
      },

      removeFromFavorites: (id: string) => {
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        }));
      },

      isFavorite: (id: string) => {
        return get().favorites.some((m) => m.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      // ������� ������
      searchHistory: [],

      addToHistory: (query: string) => {
        set((state) => {
          const trimmedQuery = query.trim().toLowerCase();
          if (!trimmedQuery) return state;

          // ������� �������� ���� ���� � ��������� � ������
          const filtered = state.searchHistory.filter(
            (q) => q.toLowerCase() !== trimmedQuery
          );

          return {
            searchHistory: [trimmedQuery, ...filtered].slice(0, 10), // �������� 10 ���������
          };
        });
      },

      removeFromHistory: (query: string) => {
        set((state) => ({
          searchHistory: state.searchHistory.filter(
            (q) => q.toLowerCase() !== query.toLowerCase()
          ),
        }));
      },

      clearHistory: () => {
        set({ searchHistory: [] });
      },

      // ��������� ������������� �����
      lastViewed: null,

      setLastViewed: (movie: NormalizedMovie) => {
        set({ lastViewed: movie });
      },

      // ������
      reviews: {},

      getMovieReviews: (movieId: string) => {
        const userReviews = get().reviews[movieId] ?? [];
        const seedReviews = getSeedReviewsByMovieId(movieId);

        return [...seedReviews, ...userReviews].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      addReview: (review) => {
        const newReview: MovieReview = {
          ...review,
          id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          reviews: {
            ...state.reviews,
            [review.movieId]: [...(state.reviews[review.movieId] ?? []), newReview],
          },
        }));
      },
    }),
    {
      name: 'kinosearch-store',
      version: 2,
    }
  )
);
