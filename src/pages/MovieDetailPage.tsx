import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '@/hooks';
import { useAppStore } from '@/store/useAppStore';
import { Loader, DetailField, MissingPoster } from '@/components/ui';
import { RatingBadge } from '@/components/ui/RatingBadge';
import { getDisplayValue, isMissingPoster, isMissingValue } from '@/utils';
import { MovieReviewsSection } from '@/components/sections';
import gsap from 'gsap';

export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movie, isLoading, error } = useMovieDetails(id);
  const { isFavorite, addToFavorites, removeFromFavorites, setLastViewed } = useAppStore();
  const [posterError, setPosterError] = useState(false);

  const isFav = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    setPosterError(false);
  }, [movie?.id]);

  useEffect(() => {
    if (!movie) return;

    setLastViewed(movie);

    gsap.from('.detail-info', {
      duration: 0.6,
      opacity: 0,
      y: 30,
      ease: 'power3.out',
    });
  }, [movie, setLastViewed]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Ошибка загрузки</h1>
          <p className="text-gray-400 mb-6">
            Не удалось загрузить информацию о фильме. Проверьте API-ключ и подключение.
          </p>
          <button type="button" onClick={() => navigate(-1)} className="button-primary">
            Вернуться назад
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Фильм не найден</h1>
          <button type="button" onClick={() => navigate(-1)} className="button-primary">
            Вернуться назад
          </button>
        </div>
      </main>
    );
  }

  const hasPoster = !isMissingPoster(movie.poster) && !posterError;

  const toggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="container-max py-12">
        <div className="detail-info flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-48">
            {hasPoster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl shadow-primary-500/20 border border-primary-700/30"
                onError={() => setPosterError(true)}
              />
            ) : (
              <MissingPoster className="w-full min-h-72 rounded-lg shadow-2xl shadow-primary-500/20" />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-playfair">
              {getDisplayValue(movie.title, 'title')}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <DetailField label="Жанры" value={movie.genres} missingKey="genres" />
              <DetailField label="Дата выхода" value={movie.released} missingKey="released" />
              <DetailField label="Длительность" value={movie.runtime} missingKey="runtime" />
              <DetailField label="Страна" value={movie.country} missingKey="country" />
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {isMissingValue(movie.rating) ? (
                <p className="text-gray-500 italic">{getDisplayValue(movie.rating, 'rating')}</p>
              ) : (
                <div className="flex items-center gap-3">
                  <RatingBadge rating={movie.rating} size="lg" />
                  <div>
                    <p className="text-primary-300 font-semibold">
                      {movie.rating.toFixed(1)}/10
                    </p>
                    <p className="text-sm text-gray-500">
                      {movie.ratingCount.toLocaleString()} оценок
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={toggleFavorite}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isFav
                    ? 'bg-primary-600 hover:bg-primary-500 text-white'
                    : 'bg-dark-800 border border-primary-600 text-primary-300 hover:bg-primary-600/20'
                }`}
              >
                {isFav ? 'В избранном' : 'Добавить в избранное'}
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-700/30">
              <h3 className="text-lg font-semibold text-white mb-3">О фильме</h3>
              <p
                className={`leading-relaxed ${
                  isMissingValue(movie.description) ? 'text-gray-500 italic' : 'text-gray-300'
                }`}
              >
                {getDisplayValue(movie.description, 'description')}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-700/30 grid grid-cols-2 gap-6">
              <DetailField label="Режиссер" value={movie.director} missingKey="director" truncate={50} />
              <DetailField
                label="В ролях"
                value={movie.actors}
                missingKey="actors"
                truncate={50}
                className="text-sm"
              />
              <DetailField label="Награды" value={movie.awards} missingKey="awards" className="col-span-2" />
              <DetailField
                label="Metascore"
                value={movie.metascore ? `${movie.metascore}/100` : undefined}
                missingKey="metascore"
              />
            </div>
          </div>
        </div>

        <MovieReviewsSection movieId={movie.id} movieTitle={movie.title} />

        <div className="mt-16 pt-12 border-t border-primary-700/20">
          <h2 className="text-3xl font-bold font-playfair gradient-text mb-8">
            Похожие фильмы и сериалы
          </h2>
          <div className="text-center text-gray-400 py-12">
            <p>Рекомендации пока недоступны для этого фильма</p>
          </div>
        </div>
      </div>
    </main>
  );
};
