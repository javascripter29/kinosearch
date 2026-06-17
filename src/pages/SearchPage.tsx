import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSearch } from '@/hooks';
import { SearchBar, MovieCard, MovieGridSkeleton } from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { results, isLoading, error, search, clear, query } = useSearch();
  const { addToHistory } = useAppStore();
  const [noResults, setNoResults] = useState(false);

  const initialQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (initialQuery) {
      search(initialQuery);
      addToHistory(initialQuery);
    } else {
      clear();
    }
  }, [initialQuery, search, clear, addToHistory]);

  useEffect(() => {
    setNoResults(Boolean(!isLoading && !error && query.trim() && results.length === 0));
  }, [isLoading, error, query, results]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      const trimmedQuery = newQuery.trim();

      if (!trimmedQuery) {
        navigate('/search', { replace: true });
        return;
      }

      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`, { replace: true });
      addToHistory(trimmedQuery);
    },
    [navigate, addToHistory]
  );

  return (
    <main className="min-h-screen py-8">
      <div className="container-max">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-playfair gradient-text mb-6">
            Поиск фильмов и сериалов
          </h1>
          <div className="max-w-2xl">
            <SearchBar
              value={query}
              onSearch={handleSearch}
              placeholder="Найти фильм, сериал или актера..."
            />
          </div>
        </div>

        {query && (
          <div>
            <div className="mb-6">
              <p className="text-gray-400">
                Результаты поиска для{' '}
                <span className="text-primary-300 font-semibold">"{query}"</span>
              </p>
              {!isLoading && results.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Найдено результатов: {results.length}
                </p>
              )}
            </div>

            {isLoading ? (
              <MovieGridSkeleton count={12} />
            ) : error ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Не удалось загрузить результаты
                </h2>
                <p className="text-gray-400 mb-6">
                  Проверьте API-ключ и подключение, а затем попробуйте еще раз.
                </p>
                <button type="button" onClick={() => search(query)} className="button-primary">
                  Повторить
                </button>
              </div>
            ) : noResults ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-white mb-2">Ничего не найдено</h2>
                <p className="text-gray-400 mb-6">
                  По запросу "{query}" ничего не найдено. Попробуйте другой запрос.
                </p>
                <button type="button" onClick={() => navigate('/')} className="button-primary">
                  Вернуться на главную
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Начните поиск</h2>
            <p className="text-gray-400">
              Введите название фильма, сериала или имя актера в поле поиска выше.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
