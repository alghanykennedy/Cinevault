const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getPosterUrl = (
  path: string | null,
  size = "w500"
): string => {
  if (!path) {
    return "/placeholder-poster.jpg";
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (
  path: string | null,
  size = "original"
): string => {
  if (!path) {
    return "";
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};