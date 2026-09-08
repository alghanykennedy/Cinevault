import tmdbClient from "./client";
import type { Movie, TMDBResponse } from "../../types/tmdb";

export const getPopularMovies = async (): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/popular"
  );

  return response.data;
};

export const getTopRatedMovies = async (): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/top_rated"
  );

  return response.data;
};

export const getUpcomingMovies = async (): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/upcoming"
  );

  return response.data;
};

export const getNowPlayingMovies = async (): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(
    "/movie/now_playing"
  );

  return response.data;
};