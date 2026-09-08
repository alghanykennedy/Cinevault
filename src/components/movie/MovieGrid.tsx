import type { Movie } from "../../types/tmdb";
import MediaGrid from "../media/MediaGrid";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid = ({ movies, loading = false }: MovieGridProps) => {
  return <MediaGrid media={movies} loading={loading} />;
};

export default MovieGrid;
