import React from 'react';
import { formatRating } from '@/utils';

interface RatingBadgeProps {
  rating: number;
  voteCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  voteCount,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const getColor = (rate: number) => {
    if (rate >= 8) return 'from-green-600 to-green-700';
    if (rate >= 6.5) return 'from-yellow-600 to-yellow-700';
    if (rate >= 5) return 'from-orange-600 to-orange-700';
    return 'from-red-600 to-red-700';
  };

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-full border-2 border-primary-500/50 bg-gradient-to-br ${getColor(
        rating
      )} ${sizeClasses[size]} ${className}`}
      title={voteCount ? `${voteCount} оценок` : undefined}
    >
      <span className="font-bold text-white">{formatRating(rating)}</span>
    </div>
  );
};

interface GenrePillProps {
  name: string;
  id?: number;
  onClick?: (id?: number) => void;
  active?: boolean;
  className?: string;
}

export const GenrePill: React.FC<GenrePillProps> = ({
  name,
  id,
  onClick,
  active = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick?.(id)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg shadow-primary-500/50'
          : 'bg-dark-800 border border-primary-700/30 text-primary-300 hover:border-primary-500 hover:bg-dark-700'
      } ${className}`}
    >
      {name}
    </button>
  );
};
