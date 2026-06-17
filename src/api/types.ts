/**
 * TypeScript ���� ��� Open Movie Database API
 */

/**
 * �������� ��������� ������/�������
 */
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore?: string;
  imdbRating: string;
  imdbVotes: string;
  Type: 'movie' | 'series' | 'episode';
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: 'True' | 'False';
  Error?: string;
  totalSeasons?: string;
}

/**
 * ������� ������
 */
export interface Rating {
  Source: string;
  Value: string;
}

/**
 * ��������� ������
 */
export interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

/**
 * ����� �� �����
 */
export interface SearchResponse {
  Search: SearchResult[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

/**
 * ��������������� ��������� ������ ��� ����������
 */
export interface NormalizedMovie {
  id: string;
  title: string;
  year: string;
  type: 'movie' | 'series' | 'episode';
  poster: string;
  rating: number;
  ratingCount: number;
  description: string;
  genres: string[];
  director?: string;
  actors?: string;
  runtime?: string;
  released?: string;
  country?: string;
  awards?: string;
  metascore?: number;
}

/**
 * ����� ������������ � ������
 */
export interface MovieReview {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
}

/**
 * ��������������� ��������� ������
 */
export interface NormalizedSearchResult {
  id: string;
  title: string;
  year: string;
  type: 'movie' | 'series' | 'episode';
  poster: string;
}
