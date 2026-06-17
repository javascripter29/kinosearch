import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NormalizedMovie, NormalizedSearchResult } from '@/api/types';
import { RatingBadge } from './RatingBadge';
import { useAppStore } from '@/store/useAppStore';
import { truncateText, getDisplayValue, isMissingPoster } from '@/utils';
import { MissingPoster } from './MissingContent';

interface MovieCardProps {
  movie: NormalizedMovie | NormalizedSearchResult;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  showTitle?: boolean;
}

const posterHeights = {
  sm: 'h-32',
  md: 'h-48',
  lg: 'h-64',
};

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  size = 'md',
  showRating = true,
  showTitle = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useAppStore();
  const isFav = isFavorite(movie.id);
  const rating = 'rating' in movie ? movie.rating : 0;
  const hasPoster = !isMissingPoster(movie.poster) && !imageError;

  const toggleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();

    if (isFav) {
      removeFromFavorites(movie.id);
      return;
    }

    const favoriteMovie: NormalizedMovie = 'rating' in movie
      ? movie
      : {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          type: movie.type,
          poster: movie.poster,
          rating: 0,
          ratingCount: 0,
          description: '',
          genres: [],
        };

    addToFavorites(favoriteMovie);
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg">
        <div className={`relative w-full ${posterHeights[size]} overflow-hidden rounded-lg`}>
          {!hasPoster ? (
            <MissingPoster className={`w-full ${posterHeights[size]} rounded-lg`} />
          ) : (
            <>
              {!imageLoaded && <div className="skeleton w-full h-full absolute inset-0" />}

              <img
                src={movie.poster}
                alt={movie.title}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {showRating && rating > 0 && (
            <div className="absolute top-2 right-2 z-10">
              <RatingBadge rating={rating} size="sm" />
            </div>
          )}

          <button
            type="button"
            onClick={toggleFavorite}
            className="absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
            title={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
            aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            {isFav ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {showTitle && (
          <div className="mt-2 space-y-1">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-primary-300 transition-colors">
              {truncateText(getDisplayValue(movie.title, 'title'), 20)}
            </h3>
            <p className="text-xs text-gray-400">{getDisplayValue(movie.year, 'year')}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

interface MovieCarouselProps {
  movies: (NormalizedMovie | NormalizedSearchResult)[];
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  movies,
  isLoading = false,
  size = 'md',
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-32">
            <div className="skeleton w-full h-48 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
    >
      {movies.map((movie) => (
        <div key={movie.id} className="flex-shrink-0 w-32">
          <MovieCard movie={movie} size={size} />
        </div>
      ))}
    </div>
  );
};
