import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { MovieCard } from '@/components/ui';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useAppStore();

  return (
    <main className="min-h-screen py-12">
      <div className="container-max">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair gradient-text mb-3">
          Мои избранные
        </h1>
        <p className="text-gray-400 mb-12">
          Фильмы и сериалы, которые вы сохранили для просмотра позже.
        </p>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-2xl font-bold text-white mb-2">Избранное пусто</h2>
            <p className="text-gray-400 mb-6">
              Вы еще не добавили ни одного фильма. Начните исследование.
            </p>
            <button type="button" onClick={() => navigate('/')} className="button-primary">
              Найти фильмы
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
