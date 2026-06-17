import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value?: string;
  placeholder?: string;
  showHistory?: boolean;
  onHistorySelect?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  value,
  placeholder = 'Поиск фильмов и сериалов...',
  showHistory = true,
  onHistorySelect,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchHistory } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = internalValue;

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(currentValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentValue, onSearch]);

  const updateValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    } else {
      setInternalValue(nextValue);
    }
  };

  const handleSelect = (query: string) => {
    updateValue(query);
    setShowSuggestions(false);
    onHistorySelect?.(query);
    onSearch(query);
  };

  const handleClear = () => {
    updateValue('');
    inputRef.current?.focus();
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3 w-5 h-5 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={(event) => updateValue(event.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-dark-800 border border-primary-700/30 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
        />

        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-white transition-colors"
            aria-label="Очистить поиск"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {showHistory && showSuggestions && searchHistory.length > 0 && !currentValue && (
        <div className="absolute top-full mt-1 w-full bg-dark-800 border border-primary-700/30 rounded-lg overflow-hidden shadow-xl z-50">
          <div className="max-h-64 overflow-y-auto">
            {searchHistory.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => handleSelect(query)}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-primary-700/20 hover:text-primary-300 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
