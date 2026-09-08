import { useEffect, useRef, useState } from "react";

import FeedbackPanel from "../../components/common/FeedbackPanel";
import LoadingSkeleton from "../../components/movie/LoadingSkeleton";
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
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(0);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const requestIdRef = useRef(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    pageRef.current = 0;
    isLoadingRef.current = false;
    hasMoreRef.current = true;

    const loadPage = async (page: number) => {
      if (
        isLoadingRef.current ||
        !hasMoreRef.current ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      isLoadingRef.current = true;
      setLoading(true);

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

        if (requestId !== requestIdRef.current) return;

        const totalPages = Math.min(response.total_pages, 500);
        setMovies((currentMovies) => {
          const existingIds = new Set(currentMovies.map((movie) => movie.id));
          const newMovies = response.results.filter(
            (movie) => !existingIds.has(movie.id),
          );

          return page === 1
            ? response.results
            : [...currentMovies, ...newMovies];
        });
        pageRef.current = page;
        hasMoreRef.current = page < totalPages && response.results.length > 0;
        setHasMore(hasMoreRef.current);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        console.error("Failed to load movies:", error);
        setError("Unable to load movies right now.");
      } finally {
        if (requestId === requestIdRef.current) {
          isLoadingRef.current = false;
          setLoading(false);
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadPage(pageRef.current + 1);
        }
      },
      { rootMargin: "400px 0px" },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    void loadPage(1);

    return () => {
      observer.disconnect();
      requestIdRef.current += 1;
    };
  }, [category]);

  const handleCategoryChange = (nextCategory: MovieCategory) => {
    if (nextCategory === category) return;

    setMovies([]);
    setHasMore(true);
    setError(null);
    setLoading(true);
    setCategory(nextCategory);
  };

  return (
    <main className="min-h-screen bg-[#08090b] pt-24 text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold md:text-4xl">Movies</h1>

          <p className="mt-2 text-zinc-400">Discover movies worth watching.</p>
        </div>

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

        {error && movies.length === 0 ? (
          <FeedbackPanel message={error} />
        ) : (
          <>
            <MovieGrid
              movies={movies}
              loading={loading && movies.length === 0}
            />

            {error && <FeedbackPanel message={error} />}

            <div ref={loadMoreRef} className="mt-10 min-h-24">
              {loading && movies.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  <LoadingSkeleton count={6} />
                </div>
              )}

              {!loading && !hasMore && movies.length > 0 && (
                <p className="text-center text-sm text-(--color-text-muted)">
                  You&apos;ve reached the end of the list.
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Movies;
