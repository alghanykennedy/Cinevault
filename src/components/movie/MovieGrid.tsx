import type { Movie } from "../../types/tmdb";
import LoadingSkeleton from "./LoadingSkeleton";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid = ({ movies, loading = false }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {loading ? (
        <LoadingSkeleton count={12} />
      ) : (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
};

export default MovieGrid;
