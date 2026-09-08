import { useEffect, useState } from "react";

import MovieGrid from "../../components/movie/MovieGrid";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../services/tmdb/movie";

import type { Movie } from "../../types/tmdb";

type MovieCategory = "popular" | "top-rated" | "upcoming";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState<MovieCategory>("popular");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        switch (category) {
          case "top-rated":
            response = await getTopRatedMovies(page);
            break;

          case "upcoming":
            response = await getUpcomingMovies(page);
            break;

          default:
            response = await getPopularMovies(page);
        }

        setMovies(response.results);
        setTotalPages(Math.min(response.total_pages, 500));
      } catch (error) {
        console.error("Failed to load movies:", error);
        setError("Unable to load movies right now.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category, page]);

  const handleCategoryChange = (nextCategory: MovieCategory) => {
    setCategory(nextCategory);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#08090b] pt-24 text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold md:text-4xl">Movies</h1>

          <p className="mt-2 text-zinc-400">Discover movies worth watching.</p>
        </div>

        {/* Category */}
        <div className="mb-10 flex gap-2 overflow-x-auto">
          {[
            ["popular", "Popular"],
            ["top-rated", "Top Rated"],
            ["upcoming", "Upcoming"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => handleCategoryChange(value as MovieCategory)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                category === value
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {error ? (
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-6">
            <p className="text-sm text-zinc-400">{error}</p>
          </div>
        ) : (
          <>
            <MovieGrid movies={movies} loading={loading} />

            {!loading && movies.length > 0 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40">
                  Previous
                </button>

                <span className="px-4 text-sm text-zinc-500">Page {page}</span>

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Movies;
