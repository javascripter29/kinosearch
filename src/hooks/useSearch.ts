import { useState, useEffect, useCallback, useRef } from 'react';
import { omdbService } from '@/api';
import { NormalizedSearchResult } from '@/api/types';
import { SEARCH_DEBOUNCE_MS } from '@/utils';

interface UseSearchResult {
  results: NormalizedSearchResult[];
  isLoading: boolean;
  error: Error | null;
  search: (query: string) => void;
  clear: () => void;
  query: string;
}

export const useSearch = (): UseSearchResult => {
  const [results, setResults] = useState<NormalizedSearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();
  const requestId = useRef(0);

  const performSearch = useCallback(async (searchQuery: string) => {
    const currentRequestId = ++requestId.current;
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await omdbService.searchMulti(trimmedQuery);
      if (currentRequestId === requestId.current) {
        setResults(response);
      }
    } catch (err) {
      if (currentRequestId === requestId.current) {
        setResults([]);
        setError(err instanceof Error ? err : new Error('Ошибка поиска'));
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(searchQuery);
    }, SEARCH_DEBOUNCE_MS);
  }, [performSearch]);

  const clear = useCallback(() => {
    requestId.current += 1;
    setQuery('');
    setResults([]);
    setError(null);
    setIsLoading(false);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      requestId.current += 1;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    results,
    isLoading,
    error,
    search,
    clear,
    query,
  };
};
