import axios from "axios";

const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!tmdbAccessToken) {
  console.warn(
    "[CineVault] TMDB Access Token is not set. Please set VITE_TMDB_ACCESS_TOKEN or TMDB_ACCESS_TOKEN in Vercel Environment Variables."
  );
}

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${tmdbAccessToken || ""}`,
    accept: "application/json",
  },
});

export default tmdbClient;