import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-primary-700/20 mt-20">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold font-playfair gradient-text mb-4">KinoSearch</h3>
            <p className="text-sm text-gray-400">
              Удобный поиск фильмов и сериалов с деталями, отзывами и избранным.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-primary-400 transition-colors">
                  Избранное
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-primary-400 transition-colors">
                  Поиск
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Проект</h4>
            <p className="text-sm text-gray-400">
              Данные загружаются из OMDb API. Избранное и отзывы хранятся локально.
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-primary-900/0 via-primary-700/50 to-primary-900/0 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} KinoSearch. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
