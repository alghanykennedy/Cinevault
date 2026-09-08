import tmdbClient from "./client";
import type { TVDetails, TVShow, TMDBResponse } from "../../types/tmdb";

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

export const getTVDetails = async (tvId: number): Promise<TVDetails> => {
  const response = await tmdbClient.get<TVDetails>(`/tv/${tvId}`, {
    params: {
      append_to_response: "videos,credits,similar",
    },
  });

  return response.data;
};