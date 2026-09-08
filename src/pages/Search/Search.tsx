import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import MovieGrid from "../../components/movie/MovieGrid";
import { searchMovies } from "../../services/tmdb/movie";
import type { Movie } from "../../types/tmdb";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query")?.trim() ?? "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const loadSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await searchMovies(query);
        setMovies(response.results);
      } catch (error) {
        console.error("Failed to search movies:", error);
        setError("Unable to search movies right now.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = inputRef.current?.value.trim() ?? "";

    if (!trimmedQuery) {
      setSearchParams({});
      return;
    }

    setSearchParams({
      query: trimmedQuery,
    });
  };

  return (
    <main className="min-h-screen bg-[#08090b] pt-24 text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold md:text-4xl">Search Movies</h1>

          <p className="mt-2 text-zinc-400">Find movies by title.</p>

          <form key={query} onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <div className="relative flex-1">
              <SearchIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="search"
                ref={inputRef}
                defaultValue={query}
                placeholder="Search for a movie..."
                className="h-12 w-full rounded-xl border border-white/10 bg-zinc-900 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-zinc-200">
              Search
            </button>
          </form>
        </div>

        <div className="mt-12">
          {!query ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-8 text-center">
              <p className="text-sm text-zinc-500">
                Search for a movie to get started.
              </p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-8">
              <p className="text-sm text-zinc-400">{error}</p>
            </div>
          ) : loading ? (
            <MovieGrid movies={[]} loading />
          ) : movies.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-8 text-center">
              <p className="text-sm text-zinc-500">
                No movies found for "{query}".
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Results for "{query}"</h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {movies.length} movies found
                </p>
              </div>

              <MovieGrid movies={movies} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Search;
