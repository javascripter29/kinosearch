import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from('.error-text', {
      duration: 0.6,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: 'power3.out',
    });

    tl.from(
      '.error-button',
      {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: 'power3.out',
      },
      '-=0.3'
    );
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="error-text">
          <h1 className="text-9xl md:text-[15rem] font-bold font-playfair gradient-text leading-none">
            404
          </h1>
        </div>

        <div className="error-text space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Что-то пошло не так...
          </h2>
          <p className="text-xl text-gray-400">
            Возможно, страница не найдена или ссылка больше не работает.
          </p>
        </div>

        <div className="error-button">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="button-primary text-lg px-8 py-4"
          >
            Вернуться на главную
          </button>
        </div>

        <div className="text-6xl animate-float">🎞️</div>
      </div>
    </main>
  );
};
