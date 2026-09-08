import tmdbClient from "./client";
import type { TVShow, TMDBResponse } from "../../types/tmdb";

export const getPopularTVShows = async (
  page = 1,
): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>(
    "/tv/popular",
    { params: { page } },
  );

  return response.data;
};

export const getTopRatedTVShows = async (
  page = 1,
): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>(
    "/tv/top_rated",
    { params: { page } },
  );

  return response.data;
};