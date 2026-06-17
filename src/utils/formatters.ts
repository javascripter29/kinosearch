export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Неизвестно';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Неизвестно';
  }
};

export const formatYear = (dateString: string): number | string => {
  if (!dateString) return 'Неизвестно';

  try {
    return new Date(dateString).getFullYear();
  } catch {
    return 'Неизвестно';
  }
};

export const formatRating = (rating: number): string => rating.toFixed(1);

export const formatMoney = (amount: number): string => {
  if (!amount || amount === 0) return 'Неизвестно';

  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }

  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }

  return `$${amount.toLocaleString()}`;
};

export const formatDuration = (minutes: number): string => {
  if (!minutes) return 'Неизвестно';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}м`;
  if (mins === 0) return `${hours}ч`;

  return `${hours}ч ${mins}м`;
};

export const formatVoteCount = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }

  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }

  return count.toString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

export const formatPopularity = (popularity: number): string => {
  if (popularity >= 1_000) {
    return `${(popularity / 1_000).toFixed(1)}K`;
  }

  return popularity.toFixed(0);
};
