import { useState, useEffect, useCallback, useRef } from 'react';
import { omdbService } from '@/api';
import { NormalizedMovie, NormalizedSearchResult } from '@/api/types';

interface UseMoviesResult {
  movies: NormalizedSearchResult[];
  isLoading: boolean;
  error: Error | null;
  search: (query: string) => void;
}

interface UseMovieDetailsResult {
  movie: NormalizedMovie | null;
  isLoading: boolean;
  error: Error | null;
}

export const useMovies = (initialQuery: string = ''): UseMoviesResult => {
  const [movies, setMovies] = useState<NormalizedSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestId = useRef(0);

  const fetchMovies = useCallback(async (searchQuery: string) => {
    const currentRequestId = ++requestId.current;
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await omdbService.searchMulti(trimmedQuery);
      if (currentRequestId === requestId.current) {
        setMovies(results);
      }
    } catch (err) {
      if (currentRequestId === requestId.current) {
        setMovies([]);
        setError(err instanceof Error ? err : new Error('Ошибка загрузки'));
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      fetchMovies(initialQuery);
    }
  }, [initialQuery, fetchMovies]);

  return {
    movies,
    isLoading,
    error,
    search: fetchMovies,
  };
};

export const useMovieDetails = (imdbID: string | undefined): UseMovieDetailsResult => {
  const [movie, setMovie] = useState<NormalizedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(imdbID));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!imdbID) {
      setMovie(null);
      setIsLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await omdbService.getDetails(imdbID);
        if (!cancelled) {
          setMovie(data);
        }
      } catch (err) {
        if (!cancelled) {
          setMovie(null);
          setError(err instanceof Error ? err : new Error('Ошибка загрузки'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [imdbID]);

  return { movie, isLoading, error };
};

export const useSearchMovies = (query: string) => {
  const [movies, setMovies] = useState<NormalizedSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await omdbService.searchMovies(trimmedQuery);
        if (!cancelled) {
          setMovies(results);
        }
      } catch (err) {
        if (!cancelled) {
          setMovies([]);
          setError(err instanceof Error ? err : new Error('Ошибка поиска'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return { movies, isLoading, error };
};
