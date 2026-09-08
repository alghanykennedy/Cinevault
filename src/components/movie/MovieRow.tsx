import type { Movie } from "../../types/tmdb";
import MovieCard from "./MovieCard";
import LoadingSkeleton from "./LoadingSkeleton";

interface MovieRowProps {
  title: string;
  description?: string;
  movies: Movie[];
  loading?: boolean;
}

const MovieRow = ({
  title,
  description,
  movies,
  loading = false,
}: MovieRowProps) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        {description && <p className="mt-2 text-zinc-400">{description}</p>}
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          <LoadingSkeleton count={6} variant="row" />
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-35 sm:min-w-42.5 md:min-w-47.5">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieRow;
