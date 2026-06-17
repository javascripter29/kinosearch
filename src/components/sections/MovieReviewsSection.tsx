import React, { useState } from 'react';
import { MovieReview } from '@/api/types';
import { useAppStore } from '@/store/useAppStore';
import { formatRating } from '@/utils';

interface MovieReviewsSectionProps {
  movieId: string;
  movieTitle: string;
}

const formatReviewDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-400';
  if (rating >= 6) return 'text-yellow-400';
  if (rating >= 4) return 'text-orange-400';
  return 'text-red-400';
};

const getReviewCountLabel = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return 'отзыв';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'отзыва';
  return 'отзывов';
};

interface ReviewCardProps {
  review: MovieReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
  <article className="card-base p-5 space-y-3">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="font-semibold text-white">{review.author}</p>
        <p className="text-sm text-gray-500">{formatReviewDate(review.createdAt)}</p>
      </div>
      <span className={`text-lg font-bold ${getRatingColor(review.rating)}`}>
        {formatRating(review.rating)}/10
      </span>
    </div>
    <p className="text-gray-300 leading-relaxed">{review.text}</p>
  </article>
);

export const MovieReviewsSection: React.FC<MovieReviewsSectionProps> = ({
  movieId,
  movieTitle,
}) => {
  const { getMovieReviews, addReview } = useAppStore();
  const reviews = getMovieReviews(movieId);

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(8);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedText = text.trim();
    const trimmedAuthor = author.trim() || 'Аноним';

    if (trimmedText.length < 10) {
      setError('Отзыв должен содержать минимум 10 символов');
      return;
    }

    addReview({
      movieId,
      author: trimmedAuthor,
      rating,
      text: trimmedText,
    });

    setAuthor('');
    setRating(8);
    setText('');
    setError('');
  };

  return (
    <section className="mt-16 pt-12 border-t border-primary-700/20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-playfair gradient-text">Отзывы</h2>
          <p className="text-gray-400 mt-2">
            {reviews.length > 0
              ? `${reviews.length} ${getReviewCountLabel(reviews.length)} о "${movieTitle}"`
              : `Пока нет отзывов о "${movieTitle}"`}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="card-base p-6 space-y-5 h-fit">
          <h3 className="text-lg font-semibold text-white">Написать отзыв</h3>

          <div>
            <label htmlFor="review-author" className="block text-sm text-gray-400 mb-2">
              Ваше имя
            </label>
            <input
              id="review-author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Аноним"
              maxLength={50}
              className="w-full px-4 py-2 rounded-lg bg-dark-800 border border-primary-700/30 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="review-rating" className="block text-sm text-gray-400 mb-2">
              Оценка: <span className="text-primary-300 font-semibold">{rating}/10</span>
            </label>
            <input
              id="review-rating"
              type="range"
              min={1}
              max={10}
              step={1}
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
              className="w-full accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          <div>
            <label htmlFor="review-text" className="block text-sm text-gray-400 mb-2">
              Текст отзыва
            </label>
            <textarea
              id="review-text"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                if (error) setError('');
              }}
              placeholder="Поделитесь впечатлениями о фильме..."
              rows={5}
              maxLength={1000}
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-primary-700/30 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className="button-primary w-full sm:w-auto">
            Опубликовать отзыв
          </button>
        </form>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <div className="card-base p-8 text-center text-gray-400">
              <p className="text-lg mb-2">Отзывов пока нет</p>
              <p className="text-sm">
                Станьте первым, кто поделится мнением об этом фильме.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
