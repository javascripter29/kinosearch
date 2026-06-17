import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SearchBar } from '@/components/ui';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 glass border-b border-primary-700/20">
      <div className="container-max">
        <div className="flex items-center justify-between py-4 md:py-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl md:text-3xl font-bold font-playfair gradient-text"
          >
            <span className="text-primary-500">🎬</span>
            <span>KinoSearch</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/') ? 'text-primary-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Главная
            </Link>
            <Link
              to="/favorites"
              className={`transition-colors ${
                isActive('/favorites') ? 'text-primary-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Избранное
            </Link>
          </nav>

          <div className="hidden lg:block flex-1 mx-8 max-w-md">
            <SearchBar onSearch={handleSearch} placeholder="Поиск..." />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-700/20 transition-colors"
            aria-label="Открыть меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        <div className="lg:hidden mb-4">
          <SearchBar onSearch={handleSearch} placeholder="Поиск..." showHistory={false} />
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-primary-700/20 transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-primary-700/20 transition-colors"
            >
              Избранное
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
