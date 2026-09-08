import tmdbClient from "./client";
import type { TVShow, TMDBResponse } from "../../types/tmdb";

export const getPopularTVShows = async (): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>(
    "/tv/popular"
  );

  return response.data;
};

export const getTopRatedTVShows = async (): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>(
    "/tv/top_rated"
  );

  return response.data;
};