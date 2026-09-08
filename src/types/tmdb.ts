export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieVideos {
  results: MovieVideo[];
}

export interface MovieCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCredits {
  cast: MovieCast[];
}

export interface MovieDetails extends Movie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;

  budget: number;
  genres: MovieGenre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: MovieProductionCompany[];
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;

  videos?: MovieVideos;
  credits?: MovieCredits;
  similar?: TMDBResponse<Movie>;
}