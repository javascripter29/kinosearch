/**
 * ��������� ��������
 */

import React from 'react';

export const Loader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-3 border-primary-700/30 border-t-primary-500 rounded-full animate-spin`}
      />
    </div>
  );
};

/**
 * ��������� ��������� (��� loading states)
 */
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`skeleton rounded ${className}`} />;
};

/**
 * ����� ���������� ��� �������� �������
 */
export const MovieCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="w-full aspect-video rounded-lg" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

/**
 * ����� ���������� ��� ����� �������
 */
export const MovieGridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <MovieCardSkeleton key={i} />
    ))}
  </div>
);
