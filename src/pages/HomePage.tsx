import React, { useEffect } from 'react';
import { useSearchMovies } from '@/hooks';
import { TrendingSection, TopRatedSection, GenresSection } from '@/components/sections';
import { MovieCard, Loader, GalaxyBackground } from '@/components/ui';
import { POPULAR_GENRES } from '@/utils';
import gsap from 'gsap';

export const HomePage: React.FC = () => {
  const { movies: popularMovies, isLoading: moviesLoading } = useSearchMovies('movie');

  useEffect(() => {
    gsap.from('.hero-title', {
      duration: 0.8,
      y: 30,
      ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
      duration: 0.8,
      y: 30,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, []);

  const genres = POPULAR_GENRES.map((name, index) => ({
    id: index,
    name,
  }));

  return (
    <main className="min-h-screen">
      <section className="relative py-20 md:py-32 overflow-hidden min-h-[70vh]">
        <GalaxyBackground />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <h1 className="hero-title text-5xl md:text-7xl font-bold font-playfair gradient-text mb-6">
              Откройте мир кинематографа
            </h1>
            <p className="hero-subtitle text-lg text-gray-300 mb-8 max-w-xl">
              Находите фильмы и сериалы, изучайте детали, читайте отзывы и собирайте избранное.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#trending" className="button-primary">
                Начать исследование
              </a>
              <a href="/favorites" className="button-secondary">
                Мои избранные
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="trending" className="relative z-20">
        <TrendingSection />
        <TopRatedSection />
        <GenresSection genres={genres} />
      </div>

      {!moviesLoading && popularMovies.length > 0 && (
        <section className="py-12 md:py-16 container-max">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair gradient-text mb-8">
            Смотрят прямо сейчас
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {popularMovies.slice(0, 10).map((movie) => (
              <div key={movie.id} className="animate-slide-up">
                <MovieCard movie={movie} size="md" />
              </div>
            ))}
          </div>
        </section>
      )}

      {moviesLoading && (
        <section className="py-12 container-max flex justify-center">
          <Loader size="lg" />
        </section>
      )}
    </main>
  );
};
