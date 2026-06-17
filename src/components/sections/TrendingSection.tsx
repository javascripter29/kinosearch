import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchMovies } from '@/hooks';
import { MovieCarousel } from '@/components/ui';

export const TrendingSection: React.FC = () => {
  const { movies, isLoading } = useSearchMovies('action');

  return (
    <section className="py-12">
      <div className="container-max">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair gradient-text">
            Подборка боевиков
          </h2>
          <Link
            to="/search?q=action"
            className="text-primary-400 hover:text-primary-300 transition-colors text-sm"
          >
            Посмотреть все &gt;
          </Link>
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-32">
                <div className="skeleton w-full h-48 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <MovieCarousel movies={movies.slice(0, 12)} />
        )}
      </div>
    </section>
  );
};

export const TopRatedSection: React.FC = () => {
  const { movies, isLoading } = useSearchMovies('popular');

  return (
    <section className="py-12">
      <div className="container-max">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair gradient-text">
            Популярные находки
          </h2>
          <Link
            to="/search?q=popular"
            className="text-primary-400 hover:text-primary-300 transition-colors text-sm"
          >
            Посмотреть все &gt;
          </Link>
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-32">
                <div className="skeleton w-full h-48 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <MovieCarousel movies={movies.slice(0, 12)} />
        )}
      </div>
    </section>
  );
};

interface GenresSectionProps {
  genres: Array<{ id: number; name: string }>;
}

export const GenresSection: React.FC<GenresSectionProps> = ({ genres }) => {
  return (
    <section className="py-12">
      <div className="container-max">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair gradient-text mb-8">
          Исследуйте по жанрам
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/search?q=${encodeURIComponent(genre.name)}`}
              className="group relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-primary-700/20 to-primary-900/20 border border-primary-700/30 hover:border-primary-500 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
                {genre.name}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/0 to-primary-600/0 group-hover:from-primary-600/10 group-hover:to-primary-600/20 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
