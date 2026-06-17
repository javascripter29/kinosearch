import axios, { AxiosInstance } from 'axios';
import {
  Movie,
  SearchResult,
  SearchResponse,
  NormalizedMovie,
  NormalizedSearchResult,
} from './types';

class OmdbService {
  private axiosInstance: AxiosInstance;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OMDB_API_KEY ?? '';
    this.baseUrl = import.meta.env.VITE_OMDB_BASE_URL || 'https://www.omdbapi.com/';

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  async searchMovies(query: string, page: number = 1): Promise<NormalizedSearchResult[]> {
    return this.search(query, page, 'movie');
  }

  async searchSeries(query: string, page: number = 1): Promise<NormalizedSearchResult[]> {
    return this.search(query, page, 'series');
  }

  async searchMulti(query: string, page: number = 1): Promise<NormalizedSearchResult[]> {
    return this.search(query, page);
  }

  async getMovieDetails(imdbID: string): Promise<NormalizedMovie | null> {
    return this.getDetailsById(imdbID, 'movie');
  }

  async getSeriesDetails(imdbID: string): Promise<NormalizedMovie | null> {
    return this.getDetailsById(imdbID, 'series');
  }

  async getDetails(imdbID: string): Promise<NormalizedMovie | null> {
    return this.getDetailsById(imdbID);
  }

  async checkAvailability(): Promise<boolean> {
    try {
      this.ensureConfigured();

      const response = await this.axiosInstance.get<SearchResponse>('/', {
        params: {
          apikey: this.apiKey,
          s: 'test',
          page: 1,
        },
      });

      return response.status === 200;
    } catch {
      return false;
    }
  }

  private async search(
    query: string,
    page: number,
    type?: 'movie' | 'series'
  ): Promise<NormalizedSearchResult[]> {
    this.ensureConfigured();

    const response = await this.axiosInstance.get<SearchResponse>('/', {
      params: {
        apikey: this.apiKey,
        s: query,
        page,
        ...(type ? { type } : {}),
      },
    });

    if (response.data.Response === 'False') {
      return [];
    }

    return (response.data.Search || []).map((item: SearchResult) =>
      this.normalizeSearchResult(item)
    );
  }

  private async getDetailsById(
    imdbID: string,
    type?: 'movie' | 'series'
  ): Promise<NormalizedMovie | null> {
    this.ensureConfigured();

    const response = await this.axiosInstance.get<Movie>('/', {
      params: {
        apikey: this.apiKey,
        i: imdbID,
        ...(type ? { type } : {}),
      },
    });

    if (response.data.Response === 'False' || response.data.Error) {
      return null;
    }

    return this.normalizeMovie(response.data);
  }

  private normalizeMovie(movie: Movie): NormalizedMovie {
    const imdbRating = parseFloat(movie.imdbRating) || 0;
    const ratingCount = parseInt((movie.imdbVotes || '').replace(/,/g, ''), 10) || 0;
    const genres = movie.Genre && movie.Genre !== 'N/A'
      ? movie.Genre.split(', ').map((genre) => genre.trim())
      : [];
    const metascore =
      movie.Metascore && movie.Metascore !== 'N/A' ? parseInt(movie.Metascore, 10) : undefined;

    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster !== 'N/A' ? movie.Poster : '',
      rating: imdbRating,
      ratingCount,
      description: movie.Plot !== 'N/A' ? movie.Plot : '',
      genres,
      director: movie.Director !== 'N/A' ? movie.Director : undefined,
      actors: movie.Actors !== 'N/A' ? movie.Actors : undefined,
      runtime: movie.Runtime !== 'N/A' ? movie.Runtime : undefined,
      released: movie.Released !== 'N/A' ? movie.Released : undefined,
      country: movie.Country !== 'N/A' ? movie.Country : undefined,
      awards: movie.Awards !== 'N/A' ? movie.Awards : undefined,
      metascore,
    };
  }

  private normalizeSearchResult(result: SearchResult): NormalizedSearchResult {
    return {
      id: result.imdbID,
      title: result.Title,
      year: result.Year,
      type: result.Type,
      poster: result.Poster !== 'N/A' ? result.Poster : '',
    };
  }

  private ensureConfigured(): void {
    if (!this.apiKey) {
      throw new Error('OMDb API key is not configured');
    }
  }
}

export const omdbService = new OmdbService();
