import tmdbClient from "./client";
import type { Movie, MovieDetails, TMDBResponse } from "../../types/tmdb";

export const getTrendingMovies = async (): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/trending/movie/week"
  );

  return response.data;
};

export const getPopularMovies = async (
  page = 1
): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/popular",
    {
      params: { page },
    }
  );

  return response.data;
};

export const getTopRatedMovies = async (
  page = 1
): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/top_rated",
    {
      params: { page },
    }
  );

  return response.data;
};

export const getUpcomingMovies = async (
  page = 1
): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/upcoming",
    {
      params: { page },
    }
  );

  return response.data;
};

export const getNowPlayingMovies = async (
  page = 1
): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/now_playing",
    {
      params: { page },
    }
  );

  return response.data;
};

export const searchMovies = async (
  query: string,
  page = 1
): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/search/movie",
    {
      params: {
        query,
        page,
      },
    }
  );

  return response.data;
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const response = await tmdbClient.get<MovieDetails>(
    `/movie/${movieId}`,
    {
      params: {
        append_to_response: "videos,credits,similar",
      },
    }
  );

  return response.data;
};