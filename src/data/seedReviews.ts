import { MovieReview } from '@/api/types';

export const SEED_REVIEWS: MovieReview[] = [
  {
    id: 'seed-review-1',
    movieId: 'tt1375666',
    author: 'Алексей',
    rating: 9,
    text: 'Фильм держит в напряжении до самого финала. Сильная идея, отличный темп и визуальная подача, которую хочется пересматривать.',
    createdAt: '2025-11-12T14:30:00.000Z',
  },
  {
    id: 'seed-review-2',
    movieId: 'tt1375666',
    author: 'Марина',
    rating: 8,
    text: 'Очень атмосферная история с хорошим актерским составом. Местами сложная, но именно это делает просмотр интереснее.',
    createdAt: '2025-12-03T09:15:00.000Z',
  },
];

export const getSeedReviewsByMovieId = (movieId: string): MovieReview[] =>
  SEED_REVIEWS.filter((review) => review.movieId === movieId);
